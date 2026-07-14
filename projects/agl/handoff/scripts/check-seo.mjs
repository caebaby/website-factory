import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const origin = "https://advisorgrowthlab.com";
const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function htmlFileFor(pathname) {
  if (pathname === "/") return "index.html";
  const clean = pathname.replace(/^\//, "");
  return clean.endsWith("/") ? `${clean}index.html` : clean;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"));
  return match ? match[1] : "";
}

function meta(html, key, value) {
  const tag = tags(html, "meta").find((item) => attr(item, key).toLowerCase() === value.toLowerCase());
  return tag ? attr(tag, "content") : "";
}

function link(html, rel, type = "") {
  return tags(html, "link").find((item) => {
    const rels = attr(item, "rel").toLowerCase().split(/\s+/);
    return rels.includes(rel.toLowerCase()) && (!type || attr(item, "type").toLowerCase() === type.toLowerCase());
  });
}

function schemaTypes(value, output = new Set()) {
  if (Array.isArray(value)) value.forEach((item) => schemaTypes(item, output));
  else if (value && typeof value === "object") {
    const type = value["@type"];
    if (Array.isArray(type)) type.forEach((item) => output.add(item));
    else if (type) output.add(type);
    Object.values(value).forEach((item) => schemaTypes(item, output));
  }
  return output;
}

function schemaNodes(value, wanted, output = []) {
  if (Array.isArray(value)) value.forEach((item) => schemaNodes(item, wanted, output));
  else if (value && typeof value === "object") {
    const type = value["@type"];
    if (type === wanted || (Array.isArray(type) && type.includes(wanted))) output.push(value);
    Object.values(value).forEach((item) => schemaNodes(item, wanted, output));
  }
  return output;
}

function schemas(html, file) {
  const output = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    try {
      output.push(JSON.parse(match[1]));
    } catch (error) {
      fail(file, `invalid JSON-LD (${error.message})`);
    }
  }
  return output;
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapEntries = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)]
  .map((match) => ({ url: match[1], lastmod: match[2] }));

if (!sitemapEntries.length) fail("sitemap.xml", "contains no URL entries with lastmod dates");

const publicPaths = new Set();
const titleOwners = new Map();
const descriptionOwners = new Map();

for (const entry of sitemapEntries) {
  let parsed;
  try {
    parsed = new URL(entry.url);
  } catch {
    fail("sitemap.xml", `invalid URL ${entry.url}`);
    continue;
  }
  if (parsed.origin !== origin) fail("sitemap.xml", `unexpected origin for ${entry.url}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod)) fail("sitemap.xml", `invalid lastmod for ${entry.url}`);

  const file = htmlFileFor(parsed.pathname);
  publicPaths.add(file);
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) {
    fail("sitemap.xml", `missing file for ${entry.url}`);
    continue;
  }

  const html = fs.readFileSync(absolute, "utf8");
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() || "";
  const description = meta(html, "name", "description");
  const robots = meta(html, "name", "robots");
  const canonicalTag = link(html, "canonical");
  const canonical = canonicalTag ? attr(canonicalTag, "href") : "";
  const jsonLd = schemas(html, file);
  const types = schemaTypes(jsonLd);

  if (attr(html.match(/<html\b[^>]*>/i)?.[0] || "", "lang") !== "en") fail(file, "missing html lang=en");
  if (!title) fail(file, "missing title");
  if (!description) fail(file, "missing meta description");
  if (description && (description.length < 70 || description.length > 170)) fail(file, `meta description length is ${description.length}, expected 70-170`);
  if (!robots.includes("index") || !robots.includes("max-image-preview:large")) fail(file, "public page needs index and max-image-preview:large robots directives");
  if (canonical !== entry.url) fail(file, `canonical ${canonical || "missing"} does not match sitemap URL ${entry.url}`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) fail(file, "must contain exactly one h1");
  if (!jsonLd.length) fail(file, "missing JSON-LD");
  if (parsed.pathname === "/") {
    if (!types.has("Organization")) fail(file, "homepage schema needs Organization");
    if (!types.has("WebSite")) fail(file, "homepage schema needs WebSite");
  } else if (!types.has("BreadcrumbList")) fail(file, "missing BreadcrumbList schema");

  for (const [property, label] of [["og:title", "Open Graph title"], ["og:description", "Open Graph description"], ["og:url", "Open Graph URL"], ["og:image", "Open Graph image"]]) {
    if (!meta(html, "property", property)) fail(file, `missing ${label}`);
  }
  if (meta(html, "property", "og:url") !== entry.url) fail(file, "og:url does not match canonical URL");
  if (meta(html, "name", "twitter:card") !== "summary_large_image") fail(file, "twitter card must be summary_large_image");
  if (!link(html, "alternate", "application/rss+xml")) fail(file, "missing RSS autodiscovery link");

  if (titleOwners.has(title)) fail(file, `duplicate title also used by ${titleOwners.get(title)}`);
  else titleOwners.set(title, file);
  if (descriptionOwners.has(description)) fail(file, `duplicate meta description also used by ${descriptionOwners.get(description)}`);
  else descriptionOwners.set(description, file);

  const isArticle = /^resources\/[^/]+\.html$/.test(file) && path.basename(file) !== "index.html";
  const isEpisode = /^resources\/podcast\/[^/]+\.html$/.test(file) && path.basename(file) !== "index.html";
  if (isArticle) {
    if (!types.has("BlogPosting")) fail(file, "article needs BlogPosting schema");
    if (!types.has("FAQPage")) fail(file, "question-led article needs FAQPage schema");
    if (!html.includes('class="source-notes')) fail(file, "article needs a visible source section");
    const externalCitations = [...html.matchAll(/<a\b[^>]*href=["']https?:\/\//gi)].length;
    if (externalCitations < 2) fail(file, "article needs at least two visible external source links");
    const basename = path.basename(file);
    if (!html.includes(`href="podcast/${basename}"`)) fail(file, "article must link to its companion podcast episode");
    const articleNode = schemaNodes(jsonLd, "BlogPosting")[0];
    for (const property of ["headline", "description", "datePublished", "dateModified", "author", "publisher", "image", "articleSection", "mainEntityOfPage"]) {
      if (!articleNode?.[property]) fail(file, `BlogPosting schema missing ${property}`);
    }
    if (!Array.isArray(articleNode?.citation) || articleNode.citation.length < 2) fail(file, "BlogPosting schema needs at least two citations");
  }
  if (isEpisode) {
    if (!types.has("PodcastEpisode")) fail(file, "episode needs PodcastEpisode schema");
    if (!html.toLowerCase().includes("episode transcript")) fail(file, "episode needs a visible transcript label");
    const basename = path.basename(file);
    if (!html.includes(`href="../${basename}"`)) fail(file, "episode must link to its companion article");
    const episodeNode = schemaNodes(jsonLd, "PodcastEpisode")[0];
    for (const property of ["name", "description", "episodeNumber", "datePublished", "dateModified", "publisher", "image", "partOfSeries", "isBasedOn", "mainEntityOfPage"]) {
      if (!episodeNode?.[property]) fail(file, `PodcastEpisode schema missing ${property}`);
    }
  }
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return entry.name.endsWith(".html") ? [path.relative(root, absolute)] : [];
  });
}

for (const file of walk(root)) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const robotsDirective = meta(html, "name", "robots");
  if (robotsDirective.includes("noindex") && publicPaths.has(file)) fail(file, "noindex page must not appear in sitemap");
  if (!publicPaths.has(file) && !robotsDirective.includes("noindex")) fail(file, "non-public HTML page must include a noindex directive");
}

const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
if (!/User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i.test(robots)) fail("robots.txt", "OAI-SearchBot is not explicitly allowed");
if (!robots.includes(`${origin}/sitemap.xml`)) fail("robots.txt", "missing production sitemap URL");

const feed = fs.readFileSync(path.join(root, "feed.xml"), "utf8");
if (!/<rss\b/.test(feed) || !/<channel>/.test(feed)) fail("feed.xml", "invalid RSS channel");
for (const entry of sitemapEntries.filter(({ url }) => url.includes("/resources/") && url.endsWith(".html"))) {
  if (!feed.includes(entry.url)) fail("feed.xml", `missing resource entry ${entry.url}`);
}

if (failures.length) {
  console.error(`SEO/GEO validation failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`Checked ${sitemapEntries.length} public URLs. Metadata, schema, sources, discovery, and companion links pass.`);
