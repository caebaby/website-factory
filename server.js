const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2"
};

function resolveRequest(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const safe = path.normalize(clean).replace(/^(\.\.[/\\])+/, "");
  let candidate = path.join(root, safe);
  if (!candidate.startsWith(root)) return null;
  if (candidate.endsWith(path.sep)) candidate = path.join(candidate, "index.html");
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) candidate = path.join(candidate, "index.html");
  return candidate;
}

http.createServer((request, response) => {
  const host = String(request.headers.host || "").split(":")[0].toLowerCase();
  const canonicalHost = "advisorgrowthlab.com";

  if (host === `www.${canonicalHost}`) {
    response.writeHead(308, { Location: `https://${canonicalHost}${request.url || "/"}` });
    response.end();
    return;
  }

  const file = resolveRequest(request.url || "/");
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      ...(host !== canonicalHost ? { "X-Robots-Tag": "noindex, nofollow" } : {})
    });
    response.end("Page not found");
    return;
  }
  response.writeHead(200, {
    "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": file.endsWith(".html") ? "no-cache" : "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    ...(host !== canonicalHost ? { "X-Robots-Tag": "noindex, nofollow" } : {})
  });
  fs.createReadStream(file).pipe(response);
}).listen(port, "0.0.0.0", () => {
  console.log(`Advisor Growth Lab is running on port ${port}`);
});
