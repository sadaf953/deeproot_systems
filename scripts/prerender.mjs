// Injects the server-rendered homepage into dist/index.html so crawlers,
// link previews and reviewers see real content without running JavaScript.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist", "index.html");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(indexPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("Root marker not found in dist/index.html");

// Each page: its URL path, the file it is written to, and its own title, description and canonical link
const pages = [
  { path: "/", file: indexPath },
  {
    path: "/tools/",
    file: path.join(root, "dist", "tools", "index.html"),
    title: "Free Business Tools: GST, EMI, PDF, Background Remover | Deeproot Systems",
    description:
      "Free GST and EMI calculators, solar savings, PDF to text or Markdown, merge PDFs, images to PDF, background remover, image compressor and QR code maker. Runs in your browser; files are never uploaded.",
  },
];

for (const page of pages) {
  const appHtml = render(page.path);
  let html = template.replace(marker, `<div id="root">${appHtml}</div>`);
  if (page.title) {
    const url = `https://deeprootsystems.in${page.path}`;
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${page.description}`)
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${page.title}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${page.description}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  }
  fs.mkdirSync(path.dirname(page.file), { recursive: true });
  fs.writeFileSync(page.file, html);
  console.log(`Prerendered ${page.path} (${appHtml.length.toLocaleString()} chars of HTML).`);
}
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
