import { useRef } from 'react';

const parseFonts = (fontObj) => {
  const fonts = Object.entries(fontObj).map(([name, obj]) => {
    return { name, settings: obj.settings, current: obj.settings, range: obj.properties };
  });
  return fonts;
};

const parseFontSettings = (settings) => {
  return Object.keys(settings)
    .reduce((acc, prop) => {
      acc = acc.concat(`"${prop}" ${settings[prop]}`);
      return acc;
    }, [])
    .join(', ');
};

const makeClamp = (min, max) => (n) => Math.min(Math.max(min, n), max);

export const useFonts = (fontObj) => {
  const fonts = parseFonts(fontObj);
  let fontName = fonts[0].name;
  const ref = useRef(fonts);
  return {
    get(name) {
      fontName = name ?? fontName;
      return ref.current.find((font) => font.name === fontName);
    },
    set(prop, value) {
      const font = this.get(fontName);
      const range = font.range;
      if (prop in font.current) {
        const [min, max] = range[prop];
        const clamp = makeClamp(min, max);
        font.current = { ...font.current, [prop]: clamp(value) };
      }
      return font.current;
    },
    current() {
      const { current } = this.get(fontName);
      return parseFontSettings(current);
    },
    initial() {
      const { settings } = this.get(fontName);
      return parseFontSettings(settings);
    },
    range() {
      return this.get(fontName).range;
    },
    list() {
      return ref.current;
    },
    name: fontName,
  };
};

// function makeFonts() {
//   const fonts = parseFonts(fontObj);
//   let fontName = fonts[0].name;
//   return {
//     get(name) {
//       fontName = name;
//       return fonts.find((font) => font.name === name);
//     },
//     set(prop, value) {
//       const font = this.get(fontName);
//       const range = font.range;
//       if (prop in font.current) {
//         const [min, max] = range[prop];
//         const clamp = makeClamp(min, max);
//         font.current = { ...font.current, [prop]: clamp(value) };
//       }
//       return font.current;
//     },
//     current() {
//       const { current } = this.get(fontName);
//       return parseFontSettings(current);
//     },
//     initial() {
//       const { settings } = this.get(fontName);
//       return parseFontSettings(settings);
//     },
//     range() {
//       return this.get(fontName).range;
//     },
//   };
// }
