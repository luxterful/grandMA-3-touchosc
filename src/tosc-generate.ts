import * as toscWapper from "./tosc-wapper";
const { create } = require("xmlbuilder2");

import compress from "./compressor";
import { createKey, createOuterGroup } from "./tosc-entity-generator";

import { keys } from "./tosc-data";

/**
 * Calculate the total canvas size based on the keys positions and dimensions
 */
function calculateCanvasSize(
  keys: Array<{ x: number; y: number; w: number; h: number }>
) {
  if (keys.length === 0) {
    return { width: 0, height: 0 };
  }

  const maxRight = Math.max(...keys.map((key) => key.x + key.w));
  const maxBottom = Math.max(...keys.map((key) => key.y + key.h));

  return {
    width: maxRight,
    height: maxBottom,
  };
}

const totalSize = calculateCanvasSize(keys);

const xml = toscWapper.wrapInGroup(
  {
    node: [
      createOuterGroup(
        "grp_keys",
        [
          ...keys.map((key) =>
            createKey(key.x, key.y, key.h, key.w, key.label, key.cmd)
          ),
        ],
        totalSize.width,
        totalSize.height
      ),
    ],
  },
  totalSize.width,
  totalSize.height
);

// Create XML document from the lexml structure
const doc = create({ version: "1.0", encoding: "UTF-8" }, { lexml: xml.lexml });
let xmlString = doc.end({
  prettyPrint: true,
  headless: false,
});

console.log(xmlString);

compress(xmlString, "./dist/grandma3commandwing.tosc");
