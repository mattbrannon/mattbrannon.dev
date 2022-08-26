import { convert } from 'color-tools';
import { Color } from 'color-tools';
export { Color, Theme } from 'color-tools';

// function removePrefix(prefix) {
//   return function remove(str) {
//     return str.startsWith(prefix) ? str.slice(1) : str;
//   };
// }

// const removeHash = removePrefix('#');
// const toFloat = (n) => Math.round(n * 1000) / 1000;

// const makeKeepInRange =
//   (max, isCircular = false) =>
//     (n) => {
//       if (isCircular) {
//         return n >= max ? n - max : n < 0 ? n + max : n;
//       }
//       return n >= max ? max : n <= 0 ? 0 : n;
//     };

// export const keepHslInRange = makeKeepInRange(360, true);
// export const keepRgbInRange = makeKeepInRange(255, false);

// const isHex = (str) => {
//   const re = /^#?([a-fA-F0-9]{3}){1,2}/g;
//   try {
//     return str.match(re).join('').length === str.length;
//   }
//   catch {
//     return false;
//   }
// };

// function splitInPairs(str) {
//   return str.split('').reduce((acc, curr, i, coll) => {
//     acc = i % 2 === 1 ? acc.concat([[coll[i - 1], curr].join('')]) : acc;
//     return acc;
//   }, []);
// }

// const makeLongHex = (str) => {
//   const s = removeHash(str);
//   if (s.length > 3) return s;
//   return s
//     .split('')
//     .map((char) => char.repeat(2))
//     .join('');
// };

// const hexToRgb = (hex) => {
//   if (!isHex(hex)) {
//     throw Error(`${hex} is not a valid hex string`);
//   }

//   const s = makeLongHex(hex);
//   return splitInPairs(s).map((pair) => parseInt(pair, 16));
// };

// const luminance = (color) => {
//   if (isHex(color)) color = hexToRgb(color);
//   const a = color.map((v) => {
//     v /= 255;
//     return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
//   });
//   return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
// };

// export const contrast = (hex1, hex2) => {
//   const rgb1 = hexToRgb(hex1);
//   const rgb2 = hexToRgb(hex2);
//   const lum1 = luminance(rgb1);
//   const lum2 = luminance(rgb2); // this.luminance();
//   const brightest = Math.max(lum1, lum2);
//   const darkest = Math.min(lum1, lum2);
//   return toFloat((brightest + 0.05) / (darkest + 0.05));
// };

// export const rgbToHsl = (rgb) => {
//   const [r, g, b] = rgb.map((n) => (n /= 255));
//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);
//   let h, s, l;
//   l = (max + min) / 2;

//   if (max === min) {
//     h = s = 0;
//   }
//   else {
//     const delta = max - min;
//     s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
//     switch (max) {
//       case r:
//         h = (g - b) / delta + (g < b ? 6 : 0);
//         break;
//       case g:
//         h = (b - r) / delta + 2;
//         break;
//       case b:
//         h = (r - g) / delta + 4;
//         break;
//     }
//   }
//   h /= 6.0;

//   h = toFloat(h * 360);
//   s = toFloat(s * 100);
//   l = toFloat(l * 100);

//   return [h, s, l];
// };

// const makeColorObject = (...format) => {
//   return function (color) {
//     return Object.values(...format).reduce((acc, value, i) => {
//       acc[value] = color[i];
//       return acc;
//     }, {});
//   };
// };

// export const makeRgbObject = makeColorObject('rgb');
// export const makeHslObject = makeColorObject('hsl');

export const lighten = (hex, amount) => {
  // const rgb = convert.hexToRgb(hex);
  const color = new Color(hex);
  const rgb = color.rgb.object();
  return (
    '#' +
    Object.values(rgb)
      .map((value) => Math.max(value - amount, 15))
      .map((digit) => digit.toString(16).padStart(2, '0'))
      .join('')
  );
};
