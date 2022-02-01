import Color from 'color-tools';
// export const makeShadow = (startingColor, layers, step) => {
//   const color = new Color(startingColor);
//   const shades = color.hsl.shades(layers, 5);
//   const textShadow = shades
//     .map((shade, i) => {
//       // const blur = 0.05;
//       const spread = layers * 1;
//       const blur = spread / shades.length;

//       const x = (i + 1) * blur * -1;
//       const y = (i + 1) * blur * -1;

//       // console.log({ x, y, blur, shade });

//       return `${x}px ${y}px ${0}em ${shade}`;
//     })
//     .join(', ');

//   return textShadow;
// };

// function emToPx(size) {
//     return size / 0.0625;
// }

// function pxToEm(size) {
//     return size * 0.0625;
// }

export const emToPx = (size) => size / 0.0625;
export const pxToEm = (size) => size * 0.0625;

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const toFloat = (n) => Math.round(n * 100) / 100;

// function createShadow(startColor) {
//   const color1 = new Color(startColor);
//   return function (endColor) {
//     const color2 = new Color(endColor);
//     let [ h1, s1, l1 ] = color1.hsl.array();
//     let [ h2, s2, l2 ] = color2.hsl.array();
//     const dS = Math.abs(s2 - s1);
//     const dL = Math.abs(l2 - l1);
//     const { direction, shortest } = getDirection(h1, h2);

//     let h = h1;
//     let s = s1;
//     let l = l1;

//     const sDirection = s1 < s2 ? 1 : s1 > s2 ? -1 : s1 === s2 ? 1 : 0;
//     const lDirection = l1 < l2 ? 1 : l1 > l2 ? -1 : l1 === l2 ? 1 : 0;
//     return function (x) {
//       return function (y) {
//         return function (offset) {
//           return function (layers) {
//             const steps = (shortest / layers) * direction;

//             const iS = toFloat(dS / layers);
//             const iL = toFloat(dL / layers);
//           };
//         };
//       };
//     };
//   };
// }

export const makeShadow = ({
  startColor,
  endColor,
  layers = 12,
  offsetAmount = 1,
  x = 1,
  y = 1,
  blurAmount = 1,
}) => {
  // const offset = offsetAmount * 0.001;
  const offset = pxToEm(offsetAmount * 0.25);
  const blurOffset = pxToEm(blurAmount * 0.01);
  // const blurOffset = blurAmount * 0.0001;
  const color1 = new Color(startColor);
  const color2 = new Color(endColor);

  const [ h1, s1, l1 ] = color1.hsl.array();
  const [ h2, s2, l2 ] = color2.hsl.array();

  // const dH = Math.abs(h2 - h1);
  const dS = Math.abs(s2 - s1);
  const dL = Math.abs(l2 - l1);

  const { direction, shortest } = getDirection(h1, h2);
  // const distance = getDistance(h1, h2);

  const steps = (shortest / layers) * direction;

  const iS = toFloat(dS / layers);
  const iL = toFloat(dL / layers);

  let h = h1;
  let s = s1;
  let l = l1;

  const sDirection = s1 < s2 ? 1 : s1 > s2 ? -1 : s1 === s2 ? 1 : 0;
  const lDirection = l1 < l2 ? 1 : l1 > l2 ? -1 : l1 === l2 ? 1 : 0;

  // const hsl = [];

  const hsl = Array.from({ length: layers }, () => {
    h = toFloat(keepHueInRange(h + steps));
    s = toFloat(s + iS * sDirection);
    l = toFloat(l + iL * lDirection);
    return new Color({ h, s, l }).hsl.css();
  });

  const shadow = hsl
    .map((color, i) => {
      const blur = blurOffset * i;
      // const xOffset = toFloat(i * offset * x);
      // const yOffset = toFloat(i * offset * y);
      const yOffset = pxToEm(y * i * offset);
      const xOffset = pxToEm(x * i * offset);

      // const blur = (layers / hsl.length) * offset * blurAmount;
      // console.log({ blur });
      return `${xOffset}em ${yOffset}em ${toFloat(blur)}em ${color}`;
    })
    .join(', ');

  return shadow;
};

export const generateShadow = (config) => {
  const shadow = makeShadow(config);
  return function () {
    return shadow;
  };
};

const makeCamelCase = (re) => (s) => {
  return s.toLocaleLowerCase().replace(re, (v) => v.slice(1).toUpperCase());
};

export function spaceToCamelCase(str) {
  const transform = (v, i) => {
    return i === 0 ? v : v.charAt(0).toUpperCase() + v.slice(1);
  };

  return str
    .split(' ')
    .map(transform)
    .join('');
}

export const snakeToCamel = makeCamelCase(/(_[a-z]){1}/g);
export const toCamelCase = makeCamelCase(/(-[a-z]){1}/g);

export const toSnakeUpperCase = (str) => {
  return str
    .split(' ')
    .map((v) => v.toUpperCase())
    .join('_');
};

// export const makeShadow = (shadowColor, layers) => {
//   const color = new Color(shadowColor);
//   const shades = color.hsl.shades('array', 2, 12);
//   console.log({ shades, color: color.hsl.object().l });
//   const shadow = shades
//     .reverse()
//     .map((shade, i) => {
//       const [ h, s, l ] = shade;
//       const x = (i + 1) * -1;
//       const y = (i + 1) * -1;
//       return `${x}px ${y}px ${0}px hsl(${h}deg, ${s}%, ${l}%)`;
//     })
//     .join(', ');

//   return shadow;
// };

function getDirection(start, end) {
  const normalWay = Math.max(start, end) - Math.min(start, end);
  const loopAround = 360 - Math.max(start, end) + Math.min(start, end);
  const shortest = Math.min(normalWay, loopAround);
  const longest = Math.max(normalWay, loopAround);

  const direction =
    start < end && normalWay < loopAround
      ? 1
      : start > end && normalWay < loopAround
      ? -1
      : start < end && normalWay > loopAround
      ? -1
      : start > end && normalWay > loopAround
      ? 1
      : 1; // default direction value if distance is equal in both directions

  // default direction could possibly be set based on the start and ending hue
  // e.g. if start >= 180 && start <= 240 && end >= 0 && end <= 60 then direction = ... something

  return { shortest, longest, direction, start, end };
}

const getDistance = (start, end) => {
  const normalWay = Math.max(start, end) - Math.min(start, end);
  const loopAround = 360 - Math.max(start, end) + Math.min(start, end);
  return Math.min(normalWay, loopAround);
};

const keepHueInRange = (hue) => {
  hue = Number(hue);
  while (hue > 360 || hue < 0) {
    hue = hue > 360 ? hue - 360 : hue < 0 ? hue + 360 : hue;
  }
  return hue;
};

export const makeGradient = (startColor, endColor, limit = 5, dir = 0) => {
  const color1 = new Color(startColor);
  const color2 = new Color(endColor);

  const start = color1.hsl.object().h;
  const end = color2.hsl.object().h;

  const direction = dir || getDirection(start, end);
  const distance = getDistance(start, end);
  const step = distance / limit;

  let hue = start;

  const colors = [];

  for (let i = 0; i < limit; i++) {
    hue = direction === 1 ? hue + step : hue - step;
    hue = keepHueInRange(hue);
    colors.push(`hsl(${hue}deg, 100%, 50%)`);
  }

  return colors;
};

export const getFluidSizes = (size, min = 0, max = 100) => {
  min = typeof min === 'number' ? `${min}px` : min;
  max = typeof max === 'number' ? `${max}%` : max;
  size = typeof size === 'number' ? `${size}px` : size;
  return {
    clamp: `clamp(${min}, ${max}, ${size})`,
    fallback: `max(${min}, min(${size}, ${max}))`,
  };
};

export const replaceShadowValues = (shadow) => {
  let re = /-?\d+\.?\d{0,}px/g;
  shadow.match(re).forEach((px) => {
    const n = px.replace('px', '');
    const em = toFloat(pxToEm(n));
    shadow = shadow.replace(px, `${em}em`);
  });
  return shadow;
};

// export const toFloat = (n) => Math.round(n * 100) / 100;

// export const getShadowConfig = (layers = 4, opacity = 0.4) => {
//   const config = [];
//   const color = `hsl(var(--shadow-color) / ${opacity})`;
//   for (let i = 0; i < layers; i++) {
//     const x = i === 0 ? 1 : config[i - 1].x * 2;
//     const y = i === 0 ? 2 : config[i - 1].y * 2;
//     const blur = Math.max(Math.abs(x), Math.abs(y));

//     config.push({ x: toFloat(x), y: toFloat(y), blur: toFloat(blur), color });
//   }
//   // console.log(config);
//   return config;
// };

// export const createShadow = (layers, opacity) => {
//   const config = getShadowConfig(layers, opacity);
//   const shadow = config
//     .map(({ x, y, blur, color }) => `${x}px ${y}px ${blur}px ${color}`)
//     .join(', ');

//   return shadow;
// };

// export const random = (n) => Math.floor(Math.random() * (n + 1));

// export function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min);
// }

// export const getFrameOffsets = (steps) => {
//   let min = 0;
//   let max = 100;
//   let limit = max / steps;
//   let frames = [];
//   for (let i = min; i < steps; i++) {
//     let start = i === 0 ? i : Math.round(limit * i);
//     let stop = Math.round(limit * (i + 1));
//     let n = getRandomInt(start, stop);
//     let x = min;
//     min = n + 1;
//     frames.push({ start: x + '%', stop: n + '%' });
//     if (i === steps - 1) {
//       frames.push({ start: n + '%', stop: '100%' });
//     }
//   }
//   return frames;
// };

// export const getGlitchValues = (steps = 8, xMax = 4, yMax = 3) => {
//   return getFrameOffsets(steps).map((obj, i) => {
//     const sign = random(1) === 1 ? 1 : -1;
//     const x = i % 2 === 0 ? random(xMax) : random(xMax) * sign;
//     const y = i % 2 === 1 ? random(yMax) : random(yMax) * sign;
//     const start = obj.start;
//     const stop = obj.stop;

//     const lowX = getRandomInt(0, 30);
//     const highX = getRandomInt(60, 100);
//     const lowY = getRandomInt(0, 30);
//     const highY = getRandomInt(60, 100);

//     return {
//       [start]: {
//         transform: `translate(${x}px, ${y}px);`,
//         'clip-path': `polygon(${lowX}% ${lowY}%, ${highX}% ${lowY}%, ${highX}% ${highY}%, ${lowX}% ${highY}%)`,
//       },
//       [stop]: {
//         transform: `translate(${x}px, ${y}px);`,
//         'clip-path': `polygon(${lowX}% ${lowY}%, ${highX}% ${lowY}%, ${highX}% ${highY}%, ${lowX}% ${highY}%)`,
//       },
//     };
//   });
// };

// export const getGlitchCss = (steps, max) => {
//   let css = '';
//   getGlitchValues(steps, max).forEach((obj) => {
//     Object.entries(obj).forEach((entry) => {
//       const [ percent, sub ] = [ entry[0], entry[1] ];
//       const prop = Object.keys(sub)[0];
//       const values = Object.values(sub)[0];
//       css += `\n${percent} { \n  ${prop}: ${values};\n }`;
//     });
//   });
//   return css;
// };

// export default class Css {
//   boxShadow(layers, opacity) {
//     return createShadow(layers, opacity);
//   }
//   glitchText(steps, max) {
//     return getGlitchCss(steps, max);
//   }
// }

// export const mapSources = (data) => {
//   return data.map(({ src, id, alt, tags }) => {
//     const types = [ '.avif', '.jpg', '.png' ];
//     const sizes = [ '@1x', '@2x', '@3x', '@4x', '@5x' ];
//     const sources = types.map((type) =>
//       sizes.map((size) => {
//         const variant = size.replace('@', '');
//         return src.replace(/\..+/g, `${size}${type} ${variant}`).trim();
//       })
//     );
//     return { sources, id, alt, tags, src };
//   });
// };

// const keepInRange = (n) => {
//   while (n > 360) {
//     n -= 360;
//   }
//   while (n < 0) {
//     n += 360;
//   }
//   return n;
// };

// const colors = [
//   '#000',
//   '#111',
//   '#222',
//   '#333',
//   '#444',
//   '#555',
//   '#666',
//   '#777',
//   '#888',
//   '#999',
//   '#aaa',
//   '#bbb',
//   '#ccc',
//   '#ddd',
//   '#eee',
//   '#fff',
// ];

// export const makeConicGradient = (startFrom, numberOfSteps) => {
//   const incrementBy = Math.floor(360 / numberOfSteps);
//   let beginAt = startFrom;
//   return Array.from({ length: numberOfSteps }).map((value, i) => {
//     beginAt += i === 0 ? 0 : incrementBy;
//     beginAt = keepInRange(beginAt);
//     const endAt =
//       i < numberOfSteps - 1 ? keepInRange(beginAt + incrementBy) : keepInRange(startFrom);

//     const pointer = i < colors.length ? i : i - colors.length;

//     return `${colors[pointer]} ${beginAt}deg ${endAt}deg`;
//   });
// };

// const getTranslateXPoints = (start, end, divider) => {
//   let total = Math.abs(start) + Math.abs(end);
//   let multiplier = start < end ? 1 : -1;
//   let steps = total / divider;
//   let arr = [ start ];
//   for (let i = 0; i < steps; i++) {
//     start += divider * multiplier;
//     arr.push(start);
//   }
//   return arr;
// };

// export const makeAnimation = (start, end, amount, xdeg, ydeg) => {
//   return getTranslateXPoints(start, end, amount).map((frame, i) => {
//     const rotateX = i % 2 === 0 ? xdeg : xdeg * -1;
//     const rotateY = i % 2 === 0 ? ydeg : ydeg + 5;
//     const translateX = frame + 'px';
//     return {
//       transform: `translateX(${translateX}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
//     };
//   });
// };

// const getFontFrames = () => {
//   const frames = [];
//   let weight = 92;
//   return Array.from({ length: 101 }, (value, i) => {
//     // let j = i % 10 === 0 ? i : i + 1;
//     weight += 8;
//     return `${i}%{font-variation-settings: 'wght' ${weight} 'ital' ${
//       Math.round(i * 100) / 10000
//     };}`;
//   });
// };

// const frames = getFontFrames();
// console.log(frames);

// let getShades = (layers, hue) => {
//   let saturation = 100;
//   let lightness = 90;
//   const shades = [];
//   for (let i = 0; i <= layers; i++) {
//     let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//     shades.push(color);
//     saturation -= 5;
//     lightness -= 5;
//     if (saturation === 0 || lightness === 0) {
//       break;
//     }
//   }
//   return shades;
// };

// const textShadow = (layers, hue, pixels = 0.0125, incrementBy = 0.75) => {
//   let saturation = 100;
//   let lightness = 90;
//   for (let i = 0; i < layers; i++) {
//     let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//     saturation -= 5;
//     lightness -= 5;
//     if (saturation === 0 || lightness === 0) {
//       break;
//     }
//     // console.log(color);
//   }
// };

// let getBlur = (layers, step = 1) => {
//   let blur = 0;
//   let increment = step;
//   let values = [];
//   let blurPx = toFloat(0.0125 * 0.2);
//   for (let i = 0; i <= layers; i++) {
//     values.push(blur * blurPx);
//     blur += increment;
//     const blurString = blur.toString();
//     const isDecimal = /\d+\.\d+/g.test(blurString);
//     increment = isDecimal ? increment : increment / 2;
//   }
//   return values;
// };

// let toFloat = (n) => Math.round(n * 10000) / 10000;

// let getOffsets = (layers, x, y, pixelValue = 0.0125, incrementBy = 1) => {
//   let offsets = [];
//   for (let i = 1; i <= layers; i++) {
//     let multiplier = i * incrementBy;
//     let px = toFloat(pixelValue * multiplier);
//     offsets.push(px);
//   }
//   return offsets;
// };

// let getBlur = (layers, offset = 0.0125, step = 1) => {
//   let blur = 0;
//   let increment = step;
//   let values = [];
//   let blurPx = toFloat(offset * 0.2);
//   for (let i = 0; i <= layers; i++) {
//     values.push(blur * blurPx);
//     blur += increment;
//     const blurString = blur.toString();
//     const isDecimal = /\d+\.\d+/g.test(blurString);
//     increment = isDecimal ? increment : increment / 2;
//   }
//   return values;
// };

// let getShades = (layers, hue) => {
//   let saturation = 100;
//   let lightness = 85;
//   const shades = [];
//   for (let i = 0; i <= layers; i++) {
//     let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//     shades.push(color);
//     saturation -= 5;
//     lightness -= 5;
//     if (saturation === 0 || lightness === 0) {
//       break;
//     }
//   }
//   return shades;
// };

// let getOffsets = (layers, x = -1, y = -1, pixelValue = 0.0125, incrementBy = 1) => {
//   let offsets = [];
//   for (let i = 1; i <= layers; i++) {
//     let multiplier = i * incrementBy;
//     let X = toFloat(pixelValue * multiplier * x);
//     let Y = toFloat(pixelValue * multiplier * y);
//     offsets.push({ x: X, y: Y });
//   }
//   return offsets;
// };

// export const getTextShadow = (layers, hue, offset = 0.0125, x = -1, y = -1) => {
//   const blurs = getBlur(layers, offset, 1);
//   const shades = getShades(layers, hue);
//   const offsets = getOffsets(layers, x, y, offset);
//   const max = Math.min(blurs.length, shades.length, offsets.length);
//   let css = '';
//   for (let i = 0; i < max; i++) {
//     css += ` ${offsets[i].x}em ${offsets[i].y}em ${blurs[i]}em ${shades[i]},`;
//   }
//   return css.slice(0, -1);
// };

// const getColors = (layers, hue) => {
//   let saturation = 100;
//   let lightness = 85;
//   const shades = [];
//   for (let i = 0; i <= layers; i++) {
//     let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//     shades.push(color);
//     saturation -= 15;
//     lightness -= 5;
//     if (saturation === 0 || lightness === 0) {
//       break;
//     }
//   }
//   return shades;
// };

// let buildGradient = (hue1, hue2, steps = 2) => {
//   let begin = keepInRange(hue1);
//   const end = keepInRange(hue2);

//   const goingUpDistance = begin < end ? end - begin : 360 - begin + end;
//   const goingDownDistance = begin > end ? begin - end : 360 - end + begin;
//   const shortestDistance = Math.min(goingUpDistance, goingDownDistance);
//   const incrementHueBy = shortestDistance / steps;

//   const firstColor = `hsl(${begin} 100% 50%)`;
//   const values = [ firstColor ];

//   for (let i = 0; i < steps; i++) {
//     begin =
//       goingUpDistance < goingDownDistance
//         ? begin + incrementHueBy
//         : goingDownDistance < goingUpDistance
//         ? begin - incrementHueBy
//         : begin + incrementHueBy;

//     let hue = Math.round(keepInRange(begin));
//     let color = `hsl(${hue} 100% 50%)`;
//     values.push(color);
//   }
//   return values.join(', ');
// };

// export const getGradient = (hue, total) => {
//   const colors = getColors(total, hue);
//   let css = '';
//   for (let i = 0; i < colors.length; i++) {
//     css += ` ${colors[i]},`;
//   }
//   return css.slice(0, -1);
// };

// --orange1: hsl(36deg, 65%, 72%);
// --orange2: hsl(36deg, 100%, 62%);
// --orange3: hsl(36deg, 63%, 42%);
// --orange4: hsl(36deg, 62%, 35%);
