import keyMap from "./tosc-ma3-key-map";
const keySize = 75;
const keySizeWide = 100;
const space = 20;

interface KeyOutput {
  label: string;
  cmd: string;
  x: number;
  y: number;
  h: number;
  w: number;
}

interface GroupParams {
  keys: (
    | keyof typeof keyMap
    | { label: keyof typeof keyMap; wide?: boolean }
  )[];
  x: number;
  y: number;
  cols: number;
  gap?: number;
}

// Utility function for generating commands (currently unused)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function cmdGen(key: keyof typeof keyMap): string {
  return `Quickey "TOSC ${key}"`;
}

function group(params: GroupParams): KeyOutput[] {
  const { keys, x, y, cols } = params;
  const gap = params.gap ?? 0;

  return keys.map((key, index) => {
    let _key;
    let _wide = false;
    if (typeof key === "object") {
      _key = key.label;
      _wide = key.wide ?? false;
    } else {
      _key = key;
    }
    return {
      label: keyMap[_key]!,
      cmd: cmdGen(_key),
      x: x + (index % cols) * (keySize + gap),
      y: y + Math.floor(index / cols) * (keySize + gap),
      h: keySize,
      w: _wide ? keySizeWide : keySize,
    };
  });
}

const keys = [
  ...group({
    x: 0,
    y: 0,
    cols: 2,
    keys: ["PREV", "NEXT", "SET", "UP", "SELFIX", "DOWN"],
  }),
  ...group({
    x: keySize * 2 + space,
    y: 0,
    cols: 1,
    keys: ["HIGHLIGHT", "SOLO", "FREEZE", "PREVIEW", "BLIND"],
  }),
  ...group({
    x: keySize * 3 + space * 2,
    y: 0,
    cols: 2,
    keys: [
      "ON",
      "OFF",
      "MOVE",
      "COPY",
      "DELETE",
      "ALIGN",
      "STOMP",
      "HELP",
      "SELECT",
      "GOTO",
    ],
  }),
  ...group({
    x: keySize * 13 + space * 6,
    y: keySize,
    cols: 1,
    keys: ["XKEYS"],
  }),
  ...group({
    x: keySize * 14 + space * 8,
    y: keySize,
    cols: 1,
    keys: ["MENU"],
  }),
  ...group({
    x: keySize * 13 + space * 6,
    y: keySize * 2 + space,
    cols: 1,
    keys: ["LIST"],
  }),
  ...group({
    x: keySize * 5 + space * 4,
    y: keySize * 4,
    cols: 3,
    keys: ["PAUSE", "GOBACK", "GO"],
  }),
  ...group({
    x: keySize * 8 + space * 6,
    y: keySize * 4,
    cols: 1,
    keys: ["MA1"],
  }),
  ...group({
    x: keySize * 9 + space * 8,
    y: keySize * 4,
    cols: 3,
    keys: ["LEARN", "GOBACKFAST", "GOFAST"],
  }),
  ...group({
    x: keySize - Math.round(keySizeWide / 2),
    y: keySize * 7 + space,
    cols: 1,
    keys: [
      { label: "PAUSE", wide: true },
      { label: "GOBACK", wide: true },
      { label: "GO", wide: true },
    ],
  }),
  ...group({
    x: keySize * 2 + space,
    y: keySize * 5 + space,
    cols: 1,
    keys: ["USER1", "USER2"],
  }),
  ...group({
    x: keySize * 2 + space,
    y: keySize * 8 + space,
    cols: 1,
    keys: ["PAGE_UP", "PAGE_DOWN"],
  }),
  ...group({
    x: keySize * 3 + space * 2,
    y: keySize * 5 + space,
    cols: 1,
    keys: ["FIXTURE"],
  }),
  ...group({
    x: keySize * 3 + space * 2,
    y: keySize * 6 + space * 2,
    cols: 1,
    keys: ["PRESET"],
  }),
  ...group({
    x: keySize * 3 + space * 2,
    y: keySize * 7 + space * 3,
    cols: 1,
    keys: ["EDIT"],
  }),
  ...group({
    x: keySize * 3 + space * 2,
    y: keySize * 8 + space * 4,
    cols: 1,
    keys: ["UPDATE"],
  }),
  ...group({
    x: keySize * 4 + space * 3,
    y: keySize * 5 + space,
    cols: 1,
    keys: ["CHANNEL"],
  }),
  ...group({
    x: keySize * 4 + space * 3,
    y: keySize * 6 + space * 2,
    cols: 1,
    keys: ["SEQUENCE"],
  }),
  ...group({
    x: keySize * 4 + space * 3,
    y: keySize * 7 + space * 3,
    cols: 1,
    keys: ["ASSIGN"],
  }),
  ...group({
    x: keySize * 5 + space * 4,
    y: keySize * 5 + space,
    cols: 1,
    keys: ["GROUP"],
  }),
  ...group({
    x: keySize * 5 + space * 4,
    y: keySize * 6 + space * 2,
    cols: 1,
    keys: ["CUE"],
  }),
  ...group({
    x: keySize * 5 + space * 4,
    y: keySize * 7 + space * 3,
    cols: 1,
    keys: ["TIME"],
  }),
  ...group({
    x: keySize * 6 + space * 4 - keySizeWide,
    y: keySize * 8 + space * 4,
    cols: 1,
    keys: [{ label: "STORE", wide: true }],
  }),
  ...group({
    x: keySize * 6 + space * 6,
    y: keySize * 5 + space,
    cols: 4,
    keys: [
      "NUM7",
      "NUM8",
      "NUM9",
      "PLUS",
      "NUM4",
      "NUM5",
      "NUM6",
      "THRU",
      "NUM1",
      "NUM2",
      "NUM3",
      "MINUS",
      "NUM0",
      "DOT",
      "IF",
      "AT",
      "MA2",
      "SLASH",
    ],
  }),
  ...group({
    x: keySize * 10 + space * 6 - keySizeWide,
    y: keySize * 9 + space,
    cols: 4,
    keys: [{ label: "PLEASE", wide: true }],
  }),
  ...group({
    x: keySize * 10 + space * 8,
    y: keySize * 5 + space,
    cols: 1,
    keys: ["OOPS"],
  }),
  ...group({
    x: keySize * 10 + space * 8,
    y: keySize * 8,
    cols: 1,
    keys: ["ESC"],
  }),
  ...group({
    x: keySize * 10 + space * 8,
    y: keySize * 9 + space,
    cols: 1,
    keys: ["CLEAR"],
  }),
  ...group({
    x: keySize * 11 + space * 9,
    y: keySize * 9 + space,
    cols: 1,
    keys: ["FULL"],
  }),
];

// Uncomment to print keys during development
// console.log(JSON.stringify(keys, null, 2));

export { keys };
export type { KeyOutput };
