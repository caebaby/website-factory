import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", ".git"].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}

function targetFile(fromFile, pathname) {
  let target = path.resolve(path.dirname(fromFile), pathname || path.basename(fromFile));
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
  return target;
}

walk(root);
const failures = [];
for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  const references = [...source.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map(match => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;
    const [pathAndQuery, fragment] = reference.split("#");
    const pathname = pathAndQuery.split("?")[0];
    const target = targetFile(file, pathname);
    if (!fs.existsSync(target)) {
      failures.push(`${path.relative(root, file)} -> ${reference} (missing file)`);
      continue;
    }
    if (fragment && target.endsWith(".html")) {
      const targetSource = fs.readFileSync(target, "utf8");
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`id=["']${escaped}["']`).test(targetSource)) failures.push(`${path.relative(root, file)} -> ${reference} (missing fragment)`);
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} broken internal reference(s):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files. All internal links and fragments resolve.`);
