// Rebuilds public/models/k1w1.glb from src/assets/k1w1-logo.svg by extruding the
// flat vector into solid 3D geometry (SVGLoader + ExtrudeGeometry), replacing the
// old hand-built-in-Blender model. Re-run this whenever the logo SVG changes.
import { DOMParser } from "@xmldom/xmldom";
globalThis.DOMParser = DOMParser;

// GLTFExporter's binary path only needs Blob -> ArrayBuffer, which Node's
// Blob supports directly; FileReader itself doesn't exist outside browsers.
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
};

import fs from "fs";
import path from "path";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

const root = path.resolve(import.meta.dirname, "..");
const svgText = fs.readFileSync(path.join(root, "src/assets/k1w1-logo.svg"), "utf-8");

const { paths } = new SVGLoader().parse(svgText);

const extrudeSettings = {
  depth: 42,
  bevelEnabled: true,
  bevelThickness: 5,
  bevelSize: 4,
  bevelSegments: 4,
  curveSegments: 32,
};

const geometries = [];
for (const shapePath of paths) {
  for (const shape of SVGLoader.createShapes(shapePath)) {
    geometries.push(new THREE.ExtrudeGeometry(shape, extrudeSettings));
  }
}

let merged = mergeGeometries(geometries, false);

// SVG space is y-down and unnormalized; flip to y-up, then center and
// normalize so the model is a sane, predictable size in world units.
// Use a rotation (not a negative-axis scale) so triangle winding/handedness
// is preserved - a mirroring scale flips winding and causes WebGL's
// backface culling to discard the faces that should be visible, leaving
// only thin extrusion side-walls (hollow-looking "outline only" shapes).
merged.rotateX(Math.PI);
merged.computeVertexNormals();
merged.computeBoundingBox();
const bbox = merged.boundingBox;
const center = new THREE.Vector3();
bbox.getCenter(center);
merged.translate(-center.x, -center.y, -center.z);

const size = new THREE.Vector3();
bbox.getSize(size);
const targetHeight = 2;
const scale = targetHeight / size.y;
merged.scale(scale, scale, scale);
merged.computeBoundingBox();
merged.computeVertexNormals();

const material = new THREE.MeshStandardMaterial({
  name: "SVGMat",
  color: 0xffffff,
  roughness: 0.35,
  metalness: 0.05,
});

const mesh = new THREE.Mesh(merged, material);
mesh.name = "K1W1Logo";

const scene = new THREE.Scene();
scene.add(mesh);

const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (gltf) => {
    const outPath = path.join(root, "public/models/k1w1.glb");
    fs.writeFileSync(outPath, Buffer.from(gltf));
    console.log(`wrote ${outPath} (${(gltf.byteLength / 1024).toFixed(1)} KB)`);
  },
  (err) => {
    console.error("GLTF export failed", err);
    process.exit(1);
  },
  { binary: true }
);
