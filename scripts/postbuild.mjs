import { cpSync, existsSync, unlinkSync } from "fs";
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

// DELETE the SPA _redirects file so Netlify auto-discovers .netlify/functions-internal
// Netlify will automatically route unmatched requests to the Nitro handler
const redirectsFile = join(distClient, "_redirects");
if (existsSync(redirectsFile)) {
  unlinkSync(redirectsFile);
  console.log("✓ Deleted _redirects (Netlify will auto-route to Nitro functions-internal)");
}

console.log("Post-build complete.");
