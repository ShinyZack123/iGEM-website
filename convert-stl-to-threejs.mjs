// Usage: node convert-stl-to-threejs.mjs path/to/model.stl path/to/output/model-geometry.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";

const [, , inPath, outPathArg] = process.argv;
if (!inPath) {
  console.error("Usage: node convert-stl-to-threejs.mjs input.stl [output.js]");
  process.exit(1);
}

const outPath = outPathArg || path.join(process.cwd(), "model-geometry.js");

// Read STL as ArrayBuffer (careful to slice Buffer correctly)
const buf = fs.readFileSync(inPath);
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

// Parse STL → BufferGeometry
const loader = new STLLoader();
const geometry = loader.parse(ab);

// Optional: tidy up the geometry for consistent rendering
if (!geometry.hasAttribute("normal")) {
  geometry.computeVertexNormals();
}
geometry.center();                 // center around origin
geometry.computeBoundingBox();
geometry.computeBoundingSphere();

// Convert to Three's JSON format for BufferGeometry
const geoJSON = geometry.toJSON();

// Write a JS module that exports this JSON object
const banner = `// Auto-generated from ${path.basename(inPath)} on ${new Date().toISOString()}\n`;
const jsModule = `${banner}export default ${JSON.stringify(geoJSON)};\n`;

fs.writeFileSync(outPath, jsModule);
console.log(`Wrote ${outPath}`);


