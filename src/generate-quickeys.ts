import keyMap from "./tosc-ma3-key-map";
import { create } from "xmlbuilder2";
import * as fs from "fs";
import * as path from "path";

// Create the XML structure matching clear.xml format
const obj = {
  GMA3: {
    "@DataVersion": "2.3.1.1",
    Quickey: Object.keys(keyMap)
      .filter((key: string) => keyMap[key as keyof typeof keyMap] !== null)
      .map((key: string) => ({
        "@Name": `TOSC ${key}`,
        "@Code": key,
      })),
  },
};

const doc = create({ version: "1.0", encoding: "UTF-8" }, obj);
const xml = doc.end({ prettyPrint: true });

// Ensure dist directory exists
const distDir = path.join(__dirname, "..", "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write to file
const outputPath = path.join(distDir, "tosc-quickeys.xml");
fs.writeFileSync(outputPath, xml, "utf-8");

// eslint-disable-next-line no-console
console.log(`Generated quickeys XML file: ${outputPath}`);
