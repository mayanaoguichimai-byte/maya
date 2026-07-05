import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverModule = await import("./dist/server/server.js");
const handler = serverModule.default ?? serverModule;

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const response = await handler.fetch(
      new Request(url, {
        method: req.method,
        headers: Object.fromEntries(
          Object.entries(req.headers).filter(([, v]) => typeof v === "string")
        ),
      }),
      {},
      {}
    );
    const body = await response.text();
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(body);
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end("Server Error");
  }
});

const PORT = 3456;
server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  // Fetch the homepage
  try {
    const resp = await fetch(`http://localhost:${PORT}/`);
    const html = await resp.text();
    
    // Write to dist/client/index.html
    const fs = await import("fs");
    const outPath = join(__dirname, "dist", "client", "index.html");
    fs.writeFileSync(outPath, html, "utf-8");
    console.log(`Written index.html (${html.length} bytes) to ${outPath}`);
    
    // Also write 404.html as fallback
    const outPath404 = join(__dirname, "dist", "client", "404.html");
    fs.writeFileSync(outPath404, html, "utf-8");
    console.log(`Written 404.html`);
  } catch (e) {
    console.error("Failed to fetch homepage:", e);
  }
  
  server.close();
  process.exit(0);
});
