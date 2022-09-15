import { Color } from '@mattbrannon/color-tools';

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomNumber = (min) => (max) => {
  return randomInt(min, max);
};

export const compose =
  (...fns) =>
    (arg) =>
      fns.reduceRight((acc, callback) => callback(acc), arg);

export const pipe =
  (...fns) =>
    (arg) =>
      fns.reduce((acc, callback) => callback(acc), arg);

export const random = randomNumber(0);

const makeFloat = (decimal) => (value) => Math.round(value * decimal) / decimal;
export const toFloat = makeFloat(100);
export const toPrecision = makeFloat(100000);

export const emToPx = (size) => size / 0.0625;
export const pxToEm = (size) => size * 0.0625;
export const pxToRem = (size) => toFloat(size / 16);

export function getDirection(start, end) {
  const normalWay = Math.max(start, end) - Math.min(start, end);
  const loopAround = 360 - Math.max(start, end) + Math.min(start, end);
  const distance = Math.min(normalWay, loopAround);
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
      : 0; // default direction value if distance is equal in both directions

  // default direction could possibly be set based on the start and ending hue
  // e.g. if start >= 180 && start <= 240 && end >= 0 && end <= 60 then direction = ... something

  return { distance, direction, longest, start, end };
}

const getLinearDirection = (a, b) => {
  const distance = Math.abs(a - b);
  const direction = a < b ? 1 : a > b ? -1 : a === b ? 1 : 0;

  return { distance, direction };
};

const getLinearSteps = (start, end, layers) => {
  const { distance, direction } = getLinearDirection(start, end);

  const stepBy = (distance / (layers - 1)) * direction;
  return stepBy;
};

const buildArray = (start, stepBy, steps) => {
  return Array.from({ length: steps }, (_, i) => {
    const step = i === 0 ? start : (start += stepBy);
    return toFloat(step);
  });
};

const getRotateXValues =
  (x1, x2 = x1 * -1) =>
    (steps) => {
      return Array.from({ length: steps }, (_, i) => {
        return i % 2 === 0 ? x1 : x2;
      });
    };
const getRotateYValues =
  (y1, y2 = y1 - 5) =>
    (steps) => {
      return Array.from({ length: steps }, (_, i) => {
        return i % 2 === 0 ? y1 : y2;
      });
    };

export function getAnimationValues(start, stop, steps) {
  return function (x1, x2) {
    const rotateXValues = getRotateXValues(x1, x2)(steps);
    return function (y1, y2) {
      const rotateYValues = getRotateYValues(y1, y2)(steps);

      const stepBy = getLinearSteps(start, stop, steps);
      const translateX = buildArray(start, stepBy, steps);

      // const rotateX = getRotateXValues(steps);
      // const rotateY = getRotateYValues(steps);

      const transform = translateX.map((translate, i) => {
        const xAngle = rotateXValues[i];
        const yAngle = rotateYValues[i];
        return {
          transform: `translateX(${translate}px) rotateX(${xAngle}deg) rotateY(${yAngle}deg)`,
        };
      });

      return transform;
    };
  };
}

// export function getAnimationValues(start, stop, steps) {
//   const stepBy = getLinearSteps(start, stop, steps);
//   const translateX = buildArray(start, stepBy, steps);
//   const rotateX = getRotateXValues(steps);
//   const rotateY = getRotateYValues(steps);
//   return { translateX, rotateX, rotateY };
// }

export function createWalkingAnimation(start, stop, steps) {
  const stepBy = getLinearSteps(start, stop, steps);
  return Array.from({ length: steps }, () => {
    start += stepBy;
    return toFloat(start);
  });
}

export function makeFluidFontSize(minFont, maxFont, minView, maxView) {
  const pxToRem = (n) => toFloat(n / 16);

  const minRem = pxToRem(minFont);
  const maxRem = pxToRem(maxFont);

  const m = (maxFont - minFont) / (maxView - minView);
  const slope = `${toFloat(m * 100)}vw`;
  const b = toFloat((minFont - m * minView) / 16);

  const operator = Math.sign(b) < 0 ? '-' : '+';
  const clampedValue = `${slope} ${operator} ${Math.abs(b)}rem`;

  return `clamp(${minRem}rem, ${clampedValue}, ${maxRem}rem)`;
}

export const debounce = (cb, delay) => {
  let isDebounced = null;
  return (...args) => {
    clearTimeout(isDebounced);
    isDebounced = setTimeout(() => cb(...args), delay);
  };
};

export const throttle = (cb, delay) => {
  let isThrottled = false;
  return (...args) => {
    if (isThrottled) return;
    isThrottled = true;
    cb(...args);
    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
};

export function adjustLinearValues(start, stop, steps) {
  const { distance, direction } = getDirection(start, stop);
  const adjustBy = (distance / (steps - 1)) * direction;

  const values = [];
  for (let i = 0; i < steps; i++) {
    values.push(toFloat(start));
    start += adjustBy;
  }

  return values;
}

export function adjustCircularValues(start, stop, steps) {
  const { direction, distance } = getDirection(start, stop);
  // const distance = getDistance(start, stop);

  const adjustBy = (distance / steps) * direction;
  const hValues = [start];

  for (let i = 0; i < steps; i++) {
    start += adjustBy;
    hValues.push(keepHueInRange(start));
  }

  return hValues;
}

export function makeCamelCase(re) {
  return function (s) {
    return s.toLocaleLowerCase().replace(re, (v) => v.slice(1).toUpperCase());
  };
}

export const snakeToCamel = makeCamelCase(/(_[a-z]){1}/g);
// export const toCamelCase = makeCamelCase(/(-[a-z]){1}/g);

export const toCamelCase = (s) => {
  const re = /\s|_|-/g;
  return s
    .split(re)
    .map((word, i) => {
      word = word.toLowerCase();
      return i > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join('');
};

export function spaceToCamelCase(str) {
  function camelCase(v, i) {
    return i === 0 ? v : v.charAt(0).toUpperCase() + v.slice(1);
  }

  return str.split(' ').map(camelCase).join('');
}

export function toSnakeUpperCase(str) {
  return str
    .split(/\s|-/)
    .map((v) => v.toUpperCase())
    .join('_');
}

export const spaceToKebab = (str) => {
  return str.toLocaleLowerCase().split(' ').join('-');
};

export const camelToKebab = (str) => {
  return str.replace(/([A-Z])/g, (v) => '-' + v.toLowerCase());
};

export const isCamelCase = (str) => {
  return /\s/.test(str) === false && /^[a-z]+[A-Z]+/.test(str);
};

export const kebabToLabel = (name) => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const kebabToCamel = (name) => {
  return name
    .split('-')
    .map((word, i) => (i > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join('');
};

export const getDataType = (data) => {
  return Object.prototype.toString.call(data).slice(8, -1);
};

export const toHeadingId = (str) => {
  try {
    return (
      str.slice(0, 1).toLowerCase() +
      str
        .slice(1)
        .split(' ')
        .map((s) => s.replace(/[A-Z]/g, (v) => '-' + v.toLowerCase()))
        .join('-')
        .replace(/-+/g, '-')
    );
  }
  catch {
    return str;
  }
};

const keepHueInRange = (hue) => {
  hue = Number(hue);
  while (hue > 360 || hue < 0) {
    hue = hue > 360 ? hue - 360 : hue < 0 ? hue + 360 : hue;
  }
  return hue;
};

function getPoints(gap, midpoint) {
  gap = parseInt(gap);
  midpoint = parseInt(midpoint);
  return Array(2)
    .fill(0)
    .map((v, i) => {
      return i % 2 === 0 ? midpoint - gap / 2 : midpoint + gap / 2;
    });
}

const getRangeOfHues = (start, end, steps) => {
  const { direction, distance } = getDirection(start, end);
  const adjustBy = (distance / (steps - 1)) * direction;

  const hues = [];
  for (let i = 0; i < steps; i++) {
    hues.push(start);
    start += adjustBy;
  }

  return hues;
};

export const makeGradient2 = ({
  colorStart = 'blue',
  colorEnd = 'red',
  blend = 10,
  midPoint = 47,
  angle = 0,
}) => {
  let [h1, s1, l1] = new Color(colorStart).hsl.array();
  let [h2, s2, l2] = new Color(colorEnd).hsl.array();

  const hValues = getRangeOfHues(h1, h2, 2);
  const sValues = adjustLinearValues(s1, s2, 2);
  const lValues = adjustLinearValues(l1, l2, 2);

  const [begin, end] = getPoints(blend, midPoint);
  // console.log({ begin, end });
  const cssValues = hValues.reduce((acc, h, i) => {
    const s = sValues[i];
    const l = lValues[i];
    acc = acc.concat(new Color({ h, s, l }).hsl.css());
    return acc;
  }, []);

  return `linear-gradient(
      ${angle}deg,
      ${cssValues[0]} ${begin}%,
      ${cssValues[1]} ${end}%
    )`;
  // return `linear-gradient(${cssValues[0]} ${begin}%, ${cssValues.slice(1).join(',')})`;
};

export const makeGradient = ({
  gradientColorStart = 'blue',
  gradientColorEnd = 'red',
  gradientBlend = 10,
  gradientMidpoint = 47,
  gradientAngle = 0,
}) => {
  let [h1, s1, l1] = new Color(gradientColorStart).hsl.array();
  let [h2, s2, l2] = new Color(gradientColorEnd).hsl.array();

  const hValues = getRangeOfHues(h1, h2, 2);
  const sValues = adjustLinearValues(s1, s2, 2);
  const lValues = adjustLinearValues(l1, l2, 2);

  const [begin, end] = getPoints(gradientBlend, gradientMidpoint);
  // console.log({ begin, end });
  const cssValues = hValues.reduce((acc, h, i) => {
    const s = sValues[i];
    const l = lValues[i];
    acc = acc.concat(new Color({ h, s, l }).hsl.css());
    return acc;
  }, []);

  return `linear-gradient(
      ${gradientAngle}deg,
      ${cssValues[0]} ${begin}%,
      ${cssValues[1]} ${end}%
    )`;
  // return `linear-gradient(${cssValues[0]} ${begin}%, ${cssValues.slice(1).join(',')})`;
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

export const parseFontSettings = (settings) => {
  return Object.keys(settings)
    .reduce((acc, prop) => {
      acc = acc.concat(`"${prop}" ${settings[prop]}`);
      return acc;
    }, [])
    .join(', ');
};

// export const loadFeatures = () => d("./features.js").then(res => res.default)
// export const loadFeatures = () =>
//   dynamic(() => import('@animations/features.js').then((res) => res.default));

// export const loadFeatures = () => import('@animations/features.js').then((res) => res.default);

// export const loadFeatures = dynamic(() =>
//   import('@animations/features.js').then((res) => res.default)
// );

export function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

export const getDistanceBetweenPoints = (p1, p2) => {
  const deltaX = Math.abs(p2.x - p1.x);
  const deltaY = Math.abs(p2.y - p1.y);
  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

export const makeClipPath = (n) => {
  return Array.from({ length: n }, (_, i) => {
    const low = randomNumber(5);
    const high = randomNumber(15);

    const top = i % 2 === 0 ? low(25) : high(45);
    const bottom = 100 - top;

    return `polygon(0 ${top}%, 100% ${top}%, 100% ${bottom}%, 0 ${bottom}%)`;
  });
};

const getMultiPoints = (midpoint, gap, values) => {
  const nums = [];
  while (nums.length < values.length) {
    const i = nums.length + 1;
    const [a, b] = [midpoint - (gap / 2) * i, midpoint + (gap / 2) * i];
    nums.unshift(a);
    nums.push(b);
  }
  return nums;
};

export const createGradient = (values, gap, midpoint = 50, angle = 35) => {
  const points = getMultiPoints(midpoint, gap, values);
  const colors = values.map((color, i) => {
    const location = points[i];
    return `${color} ${location}%`;
  });

  const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  return gradient;
};

// export const makeGradient = ({
//   gradientColors,
//   gradientBlend,
//   gradientMidpoint,
//   gradientAngle,
// }) => {
//   const points = getMultiPoints(gradientMidpoint, gradientBlend, gradientColors);
//   const colors = gradientColors.map((color, i) => {
//     const location = points[i];
//     return `${color} ${location}%`;
//   });

//   const gradient = `linear-gradient(${gradientAngle}deg, ${colors.join(', ')})`;
//   return gradient;
// };

export const createFullStopGradient = (values) => {
  return values
    .map((color, i) => {
      const start = (i / values.length) * 100;
      const stop = ((i + 1) / values.length) * 100;
      return `${color} ${start}%, ${color} ${stop}%`;
    })
    .join(', ');
};

export const makeShadow2 = ({
  colorStart,
  colorEnd,
  layers,
  gap = 1,
  offsetX = -1,
  offsetY = -1,
  blur = 1,
}) => {
  if (parseInt(layers) === 0) return 'none';

  let [h1, s1, l1] = new Color(colorStart).hsl.array();
  let [h2, s2, l2] = new Color(colorEnd).hsl.array();

  const { direction, distance } = getDirection(h1, h2);

  const hStepBy = (distance / (layers - 1)) * direction;
  const sStepBy = getLinearSteps(s1, s2, layers);
  const lStepBy = getLinearSteps(l1, l2, layers);
  const blurStepBy = getLinearSteps(0, blur, layers);

  // console.log(blurStepBy);
  let blurValue = 0;
  const blurs = [];
  const colors = [];
  for (let i = 0; i < layers; i++) {
    const h = toFloat(keepHueInRange(h1));
    const s = toFloat(s1);
    const l = toFloat(l1);
    // const b = toFloat(blurValue);
    blurs.push(toPrecision(pxToEm(blurValue * 0.1)));
    colors.push(new Color({ h, s, l }).hsl.css());
    h1 += hStepBy;
    s1 += sStepBy;
    l1 += lStepBy;
    blurValue += blurStepBy;
  }

  // console.log(blurs);
  // const offsetAmount = pxToEm(gap * 0.25);
  const blurAmount = pxToEm(blur * 0.1);
  const offsetAmount = pxToEm(gap * 0.25);

  return colors
    .map((color, i) => {
      const blur = toFloat(blurAmount);
      const xOffset = toFloat(pxToEm((i + 1) * offsetAmount * offsetX));
      const yOffset = toFloat(pxToEm((i + 1) * offsetAmount * offsetY));

      return `${xOffset}em ${yOffset}em ${blur}em ${color}`;
    })
    .join(',\n    ');
};

export const makeShadow = ({
  shadowColorStart,
  shadowColorEnd,
  shadowLayers,
  shadowGap = 1,
  shadowOffsetX = -1,
  shadowOffsetY = -1,
  shadowBlur = 1,
}) => {
  if (parseInt(shadowLayers) === 0) return 'none';

  let [h1, s1, l1] = new Color(shadowColorStart).hsl.array();
  let [h2, s2, l2] = new Color(shadowColorEnd).hsl.array();

  const { direction, distance } = getDirection(h1, h2);

  const hStepBy = (distance / (shadowLayers - 1)) * direction;
  const sStepBy = getLinearSteps(s1, s2, shadowLayers);
  const lStepBy = getLinearSteps(l1, l2, shadowLayers);
  const blurStepBy = getLinearSteps(0, shadowBlur, shadowLayers);

  // console.log(blurStepBy);
  let blurValue = 0;
  const blurs = [];
  const colors = [];
  for (let i = 0; i < shadowLayers; i++) {
    const h = toFloat(keepHueInRange(h1));
    const s = toFloat(s1);
    const l = toFloat(l1);
    // const b = toFloat(blurValue);
    blurs.push(toPrecision(pxToEm(blurValue * 0.1)));
    colors.push(new Color({ h, s, l }).hsl.css());
    h1 += hStepBy;
    s1 += sStepBy;
    l1 += lStepBy;
    blurValue += blurStepBy;
  }

  // console.log(blurs);
  // const offsetAmount = pxToEm(shadowGap * 0.25);
  const blurAmount = pxToEm(shadowBlur * 0.1);
  const offsetAmount = pxToEm(shadowGap * 0.25);

  return colors
    .map((color, i) => {
      const blur = toPrecision(blurAmount);
      const xOffset = toPrecision(pxToEm((i + 1) * offsetAmount * shadowOffsetX));
      const yOffset = toPrecision(pxToEm((i + 1) * offsetAmount * shadowOffsetY));

      return `${xOffset}em ${yOffset}em ${blur}em ${color}`;
    })
    .join(',\n    ');
};
