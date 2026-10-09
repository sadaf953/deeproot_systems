// Injects the server-rendered homepage into dist/index.html so crawlers,
// link previews and reviewers see real content without running JavaScript.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist", "index.html");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

const template = fs.readFileSync(indexPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("Root marker not found in dist/index.html");

fs.writeFileSync(indexPath, template.replace(marker, `<div id="root">${appHtml}</div>`));
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`Prerendered homepage (${appHtml.length.toLocaleString()} chars of HTML).`);
