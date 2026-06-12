import fs from "fs";
import path from "path";

const ASSETS = path.resolve("assets");
const OUT = path.resolve("emojis/3D");

fs.mkdirSync(OUT, { recursive: true });

const toneMap = {
  "1f3fb": "_light",
  "1f3fc": "_medium_light",
  "1f3fd": "_medium",
  "1f3fe": "_medium_dark",
  "1f3ff": "_dark",
};

// -----------------------------
// GLOBAL INDEX
// -----------------------------
const index = new Map();

function buildIndex(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const metaPath = path.join(dir, "metadata.json");

  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));

      index.set(dir, {
        unicode: meta.unicode,
        cldr: meta.cldr?.toLowerCase(),
      });
    } catch {}
  }

  for (const e of entries) {
    if (e.isDirectory()) {
      buildIndex(path.join(dir, e.name));
    }
  }
}

// -----------------------------
// RESOLVE EMOJI
// -----------------------------
function resolve(dir) {
  // 1. direct metadata match
  if (index.has(dir)) return index.get(dir).unicode;

  // 2. walk up
  let cur = dir;
  while (cur !== ASSETS) {
    cur = path.dirname(cur);
    if (index.has(cur)) return index.get(cur).unicode;
  }

  // 3. try CLDR folder match
  const folderName = path.basename(dir).toLowerCase();

  for (const v of index.values()) {
    if (v.cldr === folderName) return v.unicode;
  }

  return null;
}

// -----------------------------
// NAME BUILDER
// -----------------------------
function toName(seq) {
  const parts = seq.toLowerCase().split(/\s+/);

  const tone = parts.find(p => toneMap[p]);
  const base = parts.filter(p => !toneMap[p]).join("-");

  return base + (tone ? toneMap[tone] : "");
}

// -----------------------------
// FIND 3D FOLDERS
// -----------------------------
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  if (entries.some(e => e.name === "3D" && e.isDirectory())) {
    process3D(dir);
  }

  for (const e of entries) {
    if (e.isDirectory()) {
      walk(path.join(dir, e.name));
    }
  }
}

// -----------------------------
// PROCESS
// -----------------------------
function process3D(dir) {
  const unicode = resolve(dir);

  if (!unicode) {
    console.log("SKIP (no unicode):", dir);
    return;
  }

  const threeD = path.join(dir, "3D");

  const files = fs.readdirSync(threeD)
    .filter(f => f.endsWith(".png"));

  for (const file of files) {
    const outName = toName(unicode) + ".png";
    const outPath = path.join(OUT, outName);

    if (fs.existsSync(outPath)) continue;

    fs.copyFileSync(path.join(threeD, file), outPath);

    console.log("copied:", outName);
  }
}

// -----------------------------
// RUN
// -----------------------------
console.log("Indexing...");
buildIndex(ASSETS);

console.log("Processing...");
walk(ASSETS);

console.log("Done");