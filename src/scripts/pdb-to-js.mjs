// Usage: node scripts/pdb-to-js.mjs path/to/input.pdb src/assets/my-structure-pdb.ts
import fs from "node:fs";
import path from "node:path";

const [, , inPath, outPathArg] = process.argv;
if (!inPath) {
  console.error("Usage: node scripts/pdb-to-js.mjs input.pdb [out.ts]");
  process.exit(1);
}
const outPath =
  outPathArg ||
  path.join("src/assets", path.basename(inPath).replace(/\.[^.]+$/, "-pdb.ts"));

const raw = fs.readFileSync(inPath, "utf8");

// Escape backticks to keep template literal safe
const safe = raw.replace(/`/g, "\\`");

const ts = `// Auto-generated from ${path.basename(inPath)} on ${new Date().toISOString()}
const pdbText = \`
${safe}
\`;
export default pdbText;
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, ts);
console.log("Wrote", outPath);


