// scripts/build.ts
import { execSync } from "child_process";
import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  rmSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { join } from "path";

const mode = process.argv[2] || "dev";
const root = process.cwd();
const distPath = join(root, "dist");
const targetStatic = join(root, "..", "scraper-news", "static");
const targetTemplates = join(root, "..", "scraper-news", "templates");

console.log(`🛠️ Building Vue app with mode: ${mode}`);
execSync(`vite build --mode ${mode}`, { stdio: "inherit" });

console.log(`🧹 Cleaning target folders`);
rmSync(targetStatic, { recursive: true, force: true });
rmSync(targetTemplates, { recursive: true, force: true });
mkdirSync(targetStatic, { recursive: true });
mkdirSync(targetTemplates, { recursive: true });

console.log(`🛠️ Rewriting index.html asset paths`);
const indexPath = join(distPath, "index.html");
let indexHtml = readFileSync(indexPath, "utf-8");
indexHtml = indexHtml
  .replace(/(src|href)="\/assets\//g, '$1="../static/assets/')
  .replace(/href="\/favicon\.(?:svg|png|ico)"/g, match =>
    match.replace("/favicon.", "../static/favicon.")
  );
writeFileSync(indexPath, indexHtml);

console.log(`📦 Copying index.html to templates`);
copyFileSync(indexPath, join(targetTemplates, "index.html"));

console.log(`🛠️ Rewriting asset paths in JS chunks`);
const rewriteRecursive = (dir: string) => {
  for (const file of readdirSync(dir)) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      rewriteRecursive(filePath);
    } else if (file.endsWith(".js")) {
      let content = readFileSync(filePath, "utf-8");
      // Replace both "/assets/" and "assets/" (for __vite__mapDeps arrays)
      content = content.replace(/["']\/assets\//g, '"static/assets/');
      content = content.replace(/["']assets\//g, '"static/assets/');
      writeFileSync(filePath, content);
    }
  }
};
rewriteRecursive(distPath);

console.log(`📦 Copying assets to static folder`);
const copyRecursive = (src: string, dest: string) => {
  mkdirSync(dest, { recursive: true });
  for (const file of readdirSync(src)) {
    const srcFile = join(src, file);
    const destFile = join(dest, file);
    if (statSync(srcFile).isDirectory()) {
      copyRecursive(srcFile, destFile);
    } else if (file !== "index.html") {
      copyFileSync(srcFile, destFile);
    }
  }
};
copyRecursive(distPath, targetStatic);

console.log("✅ Build and copy complete.");
