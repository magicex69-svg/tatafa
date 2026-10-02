#!/usr/bin/env node
// Builds a path-independent static copy of the site into ./site (for GitHub Pages or any static host).
//   node scripts/build-static.mjs
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "site");

rmSync(join(ROOT, "dist"), { recursive: true, force: true });
const build = spawnSync("npx", ["vite", "build"], { cwd: ROOT, stdio: "inherit", shell: true, env: { ...process.env, STATIC: "1", BASE: "./" } });
if (build.status !== 0) process.exit(build.status ?? 1);

const client = join(ROOT, "dist", "client");
if (!existsSync(join(client, "index.html"))) { console.error("Static build produced no index.html"); process.exit(1); }

rmSync(OUT, { recursive: true, force: true });
cpSync(client, OUT, { recursive: true });
// Template leftovers the page does not use (a 30 MB scroll video among them).
for (const unused of ["assets/world", "assets/landing", "presets"]) rmSync(join(OUT, unused), { recursive: true, force: true });

// The server manifest writes entry scripts and styles as /assets/...; make them relative so the
// site works from any folder (https://user.github.io/tatafa/).
const fix = (text) => text.split("/./assets/").join("./assets/").replace(/(["'(=])\/assets\//g, "$1./assets/").replace(/\\"\/assets\//g, '\\"./assets/');
const page = join(OUT, "index.html");
writeFileSync(page, fix(readFileSync(page, "utf8")));
for (const file of readdirSync(join(OUT, "assets"))) {
  if (!file.endsWith(".js")) continue;
  const path = join(OUT, "assets", file);
  const text = readFileSync(path, "utf8");
  // Chunks import each other from the same folder: /assets/x.js -> ./x.js
  const fixed = text.split("/./assets/").join("./assets/").replace(/(["'`])\/assets\/([\w.-]+\.(?:js|css))/g, "$1./$2");
  if (fixed !== text) writeFileSync(path, fixed);
}
writeFileSync(join(OUT, ".nojekyll"), "");
console.log("Static site ready in", OUT);
