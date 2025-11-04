import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

export default function compress(xml: string, file: string): string {
  // Compress the XML string using raw DEFLATE (zlib format)
  // This matches Python's zlib.compress() format
  const compressed = deflateSync(xml);

  // Write the compressed data to the file
  writeFileSync(file, compressed);

  return xml;
}
