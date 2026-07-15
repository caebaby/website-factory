import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const siteRoot = new URL("../", import.meta.url);
const homepagePath = fileURLToPath(new URL("index.html", siteRoot));
const homepage = await readFile(homepagePath, "utf8");

const heroStart = homepage.search(/<header\s+class=["'][^"']*\bhero\b[^"']*["'][^>]*>/i);
const heroEnd = heroStart === -1 ? -1 : homepage.indexOf("</header>", heroStart);

if (heroStart === -1 || heroEnd === -1) {
  throw new Error("Could not locate the homepage hero section.");
}

const hero = homepage.slice(heroStart, heroEnd + "</header>".length);
const activeAssets = [
  "assets/hero-option-sunrise.webp",
  "assets/hero-sunrise-mid.webp",
  "assets/hero-sunrise-day.webp",
];
const legacyAssets = [
  "hero-waves-loop.mp4",
  "hero-waves-poster.webp",
  "hero-cinematic.webp",
];

if (/<video\b/i.test(hero)) {
  throw new Error("The current AGL hero is static, but a video element was found in the hero.");
}

for (const asset of activeAssets) {
  if (!hero.includes(asset)) {
    throw new Error(`The current hero is missing its active asset reference: ${asset}`);
  }

  await access(new URL(asset, siteRoot));
}

for (const asset of legacyAssets) {
  if (hero.includes(asset)) {
    throw new Error(`The hero references a legacy asset: ${asset}`);
  }
}

console.log("Current design check passed: homepage hero uses the canonical static sunrise image sequence.");
