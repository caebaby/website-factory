import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const pages = [
  "index.html",
  "home-v6.html",
  "about.html",
  "team.html",
  "high-net-worth-families.html",
  "oil-gas-executives.html",
  "business-owners.html",
  "resources.html",
  "blog-template.html",
  "podcast-template.html",
];

const urls = new Set();
for (const page of pages) {
  const html = await readFile(join(root, page), "utf8");
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["'](https?:\/\/[^"']+)["']/gi)) urls.add(match[1]);
}

const failures = [];
for (const url of [...urls].sort()) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal });
    if ([403, 405].includes(response.status)) response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
    if (response.status < 200 || response.status >= 400) failures.push(`${url} returned HTTP ${response.status}`);
    else console.log(`OK ${response.status} ${url} -> ${response.url}`);
  } catch (error) {
    failures.push(`${url}: ${error.name === "AbortError" ? "timed out" : error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}

if (failures.length) {
  console.error(`FAIL: ${failures.length} external link(s)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PASS: ${urls.size} unique external destination(s)`);
