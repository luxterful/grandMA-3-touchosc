// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require("uuid");

// Helper to create a property
const prop = (type: string, key: string, value: unknown) => ({
  "@type": type,
  key: { "#": key },
  value,
});

// Helper to create a color value
const color = (r: number, g: number, b: number, a: number) => ({
  r: r.toString(),
  g: g.toString(),
  b: b.toString(),
  a: a.toString(),
});

// Helper to create a frame/rect value
const frame = (x: number, y: number, w: number, h: number) => ({
  x: x.toString(),
  y: y.toString(),
  w: w.toString(),
  h: h.toString(),
});

// Helper to create a touch value
const touchValue = (defaultVal = "false") => ({
  key: { "#": "touch" },
  locked: "0",
  lockedDefaultCurrent: "0",
  default: { "#": defaultVal },
  defaultPull: "0",
});

/**
 * Creates the outer root GROUP container
 * @param children - Array of child nodes to include in the root group
 */
export const createOuterGroup = (
  grpName: string,
  children: unknown[] = [],
  width: number,
  height: number
) => ({
  "@ID": uuidv4(),
  "@type": "GROUP",
  properties: {
    property: [
      prop("b", "background", "1"),
      prop("c", "color", color(0, 0, 0, 0)),
      prop("f", "cornerRadius", "1"),
      prop("r", "frame", frame(0, 0, width, height)),
      prop("b", "grabFocus", "0"),
      prop("b", "interactive", "0"),
      prop("b", "locked", "0"),
      prop("i", "orientation", "0"),
      prop("b", "outline", "1"),
      prop("i", "outlineStyle", "0"),
      prop("i", "pointerPriority", "0"),
      prop("i", "shape", "1"),
      prop("b", "visible", "1"),
      prop("s", "name", { "#": grpName }),
    ],
  },
  values: {
    value: touchValue(),
  },
  children: {
    node: children,
  },
});

/**
 * Creates a key GROUP with button and label
 * @param x - X coordinate for the key group
 * @param y - Y coordinate for the key group
 * @param label - Display text for the label
 * @param oscArgument - OSC command argument (e.g., 'Quickey "TOSC CLEAR"')
 * @param groupName - Optional name for the group (defaults to grp_[label])
 */
export const createKey = (
  x: number,
  y: number,
  h: number,
  w: number,
  label: string,
  oscArgument: string
) => {
  const grpName = `grp_${label}`;
  const btnName = `btn_${label}`;
  const lblName = `lbl_${label}`;

  return {
    "@ID": uuidv4(),
    "@type": "GROUP",
    properties: {
      property: [
        prop("b", "background", "1"),
        prop("c", "color", color(0, 0, 0, 0)),
        prop("f", "cornerRadius", "1"),
        prop("r", "frame", frame(x, y, w, h)),
        prop("b", "grabFocus", "0"),
        prop("b", "interactive", "0"),
        prop("b", "locked", "0"),
        prop("s", "name", { "#": grpName }),
        prop("i", "orientation", "0"),
        prop("b", "outline", "1"),
        prop("i", "outlineStyle", "0"),
        prop("i", "pointerPriority", "0"),
        prop("i", "shape", "1"),
        prop("b", "visible", "1"),
      ],
    },
    values: {
      value: touchValue(),
    },
    children: {
      node: [
        // BUTTON
        {
          "@ID": uuidv4(),
          "@type": "BUTTON",
          properties: {
            property: [
              prop("b", "background", "1"),
              prop("i", "buttonType", "0"),
              prop("c", "color", color(0.5, 0.5, 0.5, 1)),
              prop("f", "cornerRadius", "1"),
              prop("r", "frame", frame(0, 0, w, h)),
              prop("b", "grabFocus", "1"),
              prop("b", "interactive", "1"),
              prop("b", "locked", "0"),
              prop("s", "name", { "#": btnName }),
              prop("i", "orientation", "0"),
              prop("b", "outline", "1"),
              prop("i", "outlineStyle", "1"),
              prop("i", "pointerPriority", "0"),
              prop("b", "press", "1"),
              prop("b", "release", "1"),
              prop("i", "shape", "1"),
              prop("b", "valuePosition", "0"),
              prop("b", "visible", "1"),
            ],
          },
          values: {
            value: [
              {
                key: { "#": "x" },
                locked: "0",
                lockedDefaultCurrent: "0",
                default: { "#": "0" },
                defaultPull: "0",
              },
              touchValue(),
            ],
          },
          messages: {
            osc: {
              enabled: "1",
              send: "1",
              receive: "0",
              feedback: "0",
              noDuplicates: "0",
              connections: "1111111111",
              triggers: {
                trigger: {
                  var: { "#": "touch" },
                  condition: "FALL",
                },
              },
              path: {
                partial: [
                  {
                    type: "CONSTANT",
                    conversion: "STRING",
                    value: { "#": "/" },
                    scaleMin: "0",
                    scaleMax: "1",
                  },
                  {
                    type: "CONSTANT",
                    conversion: "STRING",
                    value: { "#": "cmd" },
                    scaleMin: "0",
                    scaleMax: "1",
                  },
                ],
              },
              arguments: {
                partial: {
                  type: "CONSTANT",
                  conversion: "STRING",
                  value: { "#": oscArgument },
                  scaleMin: "0",
                  scaleMax: "1",
                },
              },
            },
          },
        },
        // LABEL
        {
          "@ID": uuidv4(),
          "@type": "LABEL",
          properties: {
            property: [
              prop("b", "background", "0"),
              prop("c", "color", color(1, 0, 0, 1)),
              prop("f", "cornerRadius", "1"),
              prop("i", "font", "0"),
              prop("r", "frame", frame(0, 0, w, h)),
              prop("b", "grabFocus", "1"),
              prop("b", "interactive", "0"),
              prop("b", "locked", "0"),
              prop("s", "name", { "#": lblName }),
              prop("i", "orientation", "0"),
              prop("b", "outline", "0"),
              prop("i", "outlineStyle", "1"),
              prop("i", "pointerPriority", "0"),
              prop("i", "shape", "1"),
              prop("i", "textAlignH", "2"),
              prop("i", "textAlignV", "2"),
              prop("b", "textClip", "1"),
              prop("c", "textColor", color(1, 1, 1, 1)),
              prop("i", "textLength", "0"),
              prop("i", "textSize", "14"),
              prop("b", "visible", "1"),
            ],
          },
          values: {
            value: [
              {
                key: { "#": "text" },
                locked: "0",
                lockedDefaultCurrent: "1",
                default: { "#": label },
                defaultPull: "0",
              },
              touchValue(),
            ],
          },
        },
      ],
    },
  };
};

/**
 * Creates a keys container GROUP
 * @param keys - Array of key nodes
 * @param x - X coordinate for the keys group (default: -5)
 * @param y - Y coordinate for the keys group (default: -5)
 * @param w - Width of the keys group (default: 120)
 * @param h - Height of the keys group (default: 70)
 */
export const createKeysGroup = (
  keys: unknown[],
  x = -5,
  y = -5,
  w = 120,
  h = 70
) => ({
  "@ID": uuidv4(),
  "@type": "GROUP",
  properties: {
    property: [
      prop("b", "background", "1"),
      prop("c", "color", color(0, 0, 0, 0)),
      prop("f", "cornerRadius", "1"),
      prop("r", "frame", frame(x, y, w, h)),
      prop("b", "grabFocus", "0"),
      prop("b", "interactive", "0"),
      prop("b", "locked", "0"),
      prop("s", "name", { "#": "grp_KEYS" }),
      prop("i", "orientation", "0"),
      prop("b", "outline", "1"),
      prop("i", "outlineStyle", "0"),
      prop("i", "pointerPriority", "0"),
      prop("i", "shape", "1"),
      prop("b", "visible", "1"),
    ],
  },
  values: {
    value: touchValue(),
  },
  children: {
    node: keys,
  },
});
