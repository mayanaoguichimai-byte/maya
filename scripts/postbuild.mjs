import { cpSync, existsSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distClient = join(root, "dist", "client");

// Copy .netlify/functions-internal to dist/client/.netlify/functions-internal
const netlifySrc = join(root, ".netlify");
const netlifyDst = join(distClient, ".netlify");

if (existsSync(netlifySrc)) {
  cpSync(netlifySrc, netlifyDst, { recursive: true });
  console.log("✓ Copied .netlify to dist/client/.netlify");
} else {
  console.warn("⚠ .netlify directory not found, skipping copy");
}

// Overwrite _redirects: route all non-static-file requests through Nitro handler
writeFileSync(
  join(distClient, "_redirects"),
  "/* /.netlify/functions-internal/server/main 200\n"
);
console.log("✓ Wrote _redirects for SSR routing");

console.log("Post-build complete.");
