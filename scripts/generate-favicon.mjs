import sharp from "sharp";
import path from "path";
import fs from "fs";

const root = path.resolve(import.meta.dirname, "..");
const svgPath = path.join(root, "src/assets/k1w1-logo.svg");
const svg = fs.readFileSync(svgPath);

const targets = [
  { out: "src/app/icon.png", size: 256 },
  { out: "src/app/apple-icon.png", size: 180 },
];

// site's dark theme background (--color-black-100), so the white kiwi mark stays visible
const backing = { r: 0x0e, g: 0x0e, b: 0x10, alpha: 1 };

for (const { out, size } of targets) {
  const outPath = path.join(root, out);
  const mark = await sharp(svg, { density: 384 })
    .resize(Math.round(size * 0.72), Math.round(size * 0.72), {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: backing },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(outPath);
  console.log(`wrote ${out}`);
}
