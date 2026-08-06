import { readFile, stat } from "node:fs/promises";
import { dirname, join, normalize } from "node:path";
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

const failures = [];
const localRefPattern = /(?:href|src|poster|data-src|data-src-mobile|data-poster-mobile)=["']([^"']+)["']/g;

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

for (const page of pages) {
  const path = join(root, page);
  const html = await readFile(path, "utf8");

  if (!/<meta\s+name=["']viewport["']/i.test(html)) fail(page, "missing viewport metadata");
  if (!/<meta\s+name=["']robots["']\s+content=["']noindex,nofollow["']/i.test(html)) fail(page, "review package must stay noindex,nofollow");
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(page, "missing title");
  if (!/<meta\s+name=["']description["']/i.test(html)) fail(page, "missing meta description");
  if (!/<link\s+rel=["']canonical["']/i.test(html)) fail(page, "missing review canonical");
  if ((html.match(/<h1(?:\s|>)/gi) || []).length !== 1) fail(page, "must contain exactly one H1");
  if ((html.match(/>Client Login</g) || []).length < 2) fail(page, "Client Login must appear in navigation and footer");

  for (const match of html.matchAll(localRefPattern)) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/i.test(raw)) continue;
    const [filePart, fragment] = raw.split("#", 2);
    const clean = filePart.split("?", 1)[0];
    const target = normalize(join(root, dirname(page), clean || page));
    if (!(await exists(target))) {
      fail(page, `missing local reference ${raw}`);
      continue;
    }
    if (fragment && target.endsWith(".html")) {
      const targetHtml = await readFile(target, "utf8");
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`id=["']${escaped}["']`).test(targetHtml)) fail(page, `missing fragment ${raw}`);
    }
  }
}

const home = await readFile(join(root, "index.html"), "utf8");
const alias = await readFile(join(root, "home-v6.html"), "utf8");
if (home !== alias) fail("index.html", "must match the review-compatible homepage alias");

const family = home.indexOf('<section class="hero-slide" data-market="family"');
const energy = home.indexOf('<section class="hero-slide" data-market="energy"');
const business = home.indexOf('<section class="hero-slide" data-market="business"');
if (!(family >= 0 && family < energy && energy < business)) fail("index.html", "hero order must be Families, Oil & Gas, Business Owners");

for (const required of [
  "A dedicated advisor who sees <em>the whole picture.</em>",
  "decision moving from the same plan",
  "Investment strategy",
  "Not sure",
  "follow up within one business day. No pitch. Just a clear next step.",
  ">Take the Fit Check <",
]) {
  if (!home.includes(required)) fail("index.html", `missing approved Alex copy: ${required}`);
}

for (const forbidden of ["family-3gen", "mixkit-"]) {
  if (home.toLowerCase().includes(forbidden)) fail("index.html", `restricted/inactive asset reference: ${forbidden}`);
}

const robots = await readFile(join(root, "robots.txt"), "utf8");
if (!/Disallow:\s*\//i.test(robots)) fail("robots.txt", "review package must disallow crawling");

const aiNotes = await readFile(join(root, "AI-HANDOFF-NOTES.md"), "utf8");
for (const required of ["MEDIA-01", "MEDIA-02", "MEDIA-03", "MEDIA-04", "MEDIA-05", "MEDIA-06", "MEDIA-07", "MEDIA-08", "MEDIA-09"]) {
  if (!aiNotes.includes(required)) fail("AI-HANDOFF-NOTES.md", `missing media placement ${required}`);
}
for (const required of ["hero-business-loop.mp4", "hero-business-poster.png", "team.html", "#alex-story", "#insights", "podcast-template.html", "og:image"]) {
  if (!aiNotes.includes(required)) fail("AI-HANDOFF-NOTES.md", `missing AI replacement instruction: ${required}`);
}

const verification = await readFile(join(root, "PRELAUNCH-VERIFICATION.md"), "utf8");
for (const required of [
  "FORMAL_COMPLIANCE_APPROVAL=NOT_RECEIVED",
  "PRODUCTION_INDEXING=BLOCKED",
  "MOBILE_QA=PASS",
  "LOCAL_LINKS=PASS",
  "SEO_GEO_STRUCTURE=PASS_REVIEW_MODE",
]) {
  if (!verification.includes(required)) fail("PRELAUNCH-VERIFICATION.md", `missing release state ${required}`);
}
const approvalStates = [...verification.matchAll(/^FORMAL_COMPLIANCE_APPROVAL=([^\s]+)$/gm)].map(match => match[1]);
if (approvalStates.length !== 1) {
  fail("PRELAUNCH-VERIFICATION.md", "must contain exactly one formal compliance approval state");
} else if (approvalStates[0] !== "NOT_RECEIVED") {
  fail("PRELAUNCH-VERIFICATION.md", "review package approval state must remain NOT_RECEIVED until an authorized approval artifact and audited gate update exist");
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} issue(s)`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`PASS — ${pages.length} pages, local references, Alex copy, Client Login, audience order, and review-mode crawler controls verified.`);
