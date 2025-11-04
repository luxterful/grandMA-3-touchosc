// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require("uuid");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const wrapInGroup = (
  children: {
    node: unknown[];
  },
  width: number,
  height: number
): Record<string, unknown> => ({
  "?xml": {
    "@version": "1.0",
    "@encoding": "UTF-8",
  },
  lexml: {
    "@version": "5",
    node: {
      "@ID": uuidv4(),
      "@type": "GROUP",
      properties: {
        property: [
          {
            "@type": "b",
            key: {
              $: "background",
            },
            value: "1",
          },
          {
            "@type": "c",
            key: {
              $: "color",
            },
            value: {
              r: "0",
              g: "0",
              b: "0",
              a: "1",
            },
          },
          {
            "@type": "f",
            key: {
              $: "cornerRadius",
            },
            value: "1",
          },
          {
            "@type": "r",
            key: {
              $: "frame",
            },
            value: {
              x: "0",
              y: "0",
              w: width.toString(),
              h: height.toString(),
            },
          },
          {
            "@type": "b",
            key: {
              $: "grabFocus",
            },
            value: "0",
          },
          {
            "@type": "b",
            key: {
              $: "interactive",
            },
            value: "0",
          },
          {
            "@type": "b",
            key: {
              $: "locked",
            },
            value: "0",
          },
          {
            "@type": "i",
            key: {
              $: "orientation",
            },
            value: "0",
          },
          {
            "@type": "b",
            key: {
              $: "outline",
            },
            value: "1",
          },
          {
            "@type": "i",
            key: {
              $: "outlineStyle",
            },
            value: "0",
          },
          {
            "@type": "i",
            key: {
              $: "pointerPriority",
            },
            value: "0",
          },
          {
            "@type": "i",
            key: {
              $: "shape",
            },
            value: "1",
          },
          {
            "@type": "b",
            key: {
              $: "visible",
            },
            value: "1",
          },
        ],
      },
      values: {
        value: {
          key: {
            $: "touch",
          },
          locked: "0",
          lockedDefaultCurrent: "0",
          default: {
            $: "false",
          },
          defaultPull: "0",
        },
      },
      children,
    },
  },
});
