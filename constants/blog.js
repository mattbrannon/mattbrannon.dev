import { makeGradient, makeShadow, makeFluidFontSize, pxToEm } from '@utils/helpers.js';
import { fonts } from './fonts.js';
import { breakpoints } from './breakpoints';

const { mobile, desktop } = breakpoints;
export const fontSize = makeFluidFontSize(36, 52, mobile, desktop);

export const gradient1 = makeGradient({
  gradientColorStart: 'gold',
  gradientColorEnd: 'orange',
  gradientBlend: 0,
});

// gradientColorStart,
// gradientColorEnd,
// gradientBlend = 10,
// gradientMidpoint = 47,
// gradientAngle = 0,

export const gradient2 = makeGradient({
  gradientColorStart: 'orange',
  gradientColorEnd: 'darkorange',
  gradientBlend: 50,
});

export const shadow = makeShadow({
  shadowColorStart: 'white',
  shadowColorEnd: '#111',
  shadowLayers: 24,
  shadowGap: 2,
  shadowOffsetX: -2,
  shadowOffsetY: -2,
  shadowBlur: 0,
});

// export const shadow = makeShadow({
//   shadowColorStart: 'firebrick',
//   shadowColorEnd: 'white',
//   shadowLayers: 50,
//   shadowGap: 10,
//   offsetX: 0,
//   offsetY: 0,
//   blur: 6,
// });

export const strokeWidth = pxToEm(0.75) + 'em';
export const strokeColor = '#000000';
export const presets = fonts.presets;

export const blogVariant = {
  hidden: {
    '--fontSize': fontSize,
    '--fontVariationSettings': fonts.presets.recursive3,
    '--strokeWidth': 0,
    '--shadow': 'none',
    '--gradient': gradient1,
  },
  show: {
    // opacity: 1,
    '--fontVariationSettings': fonts.presets.recursive4,
    '--strokeWidth': strokeWidth,
    '--strokeColor': '#000000',
    '--shadow': shadow,
    '--gradient': gradient2,
    transition: {
      '--strokeWidth': {
        delay: 2,
        duration: 2,
      },
      '--strokeColor': {
        delay: 1,
        duration: 3,
      },
      '--shadow': {
        delay: 2,
        duration: 2,
      },
      '--gradient': {
        delay: 1,
        duration: 2,
      },
      '--fontVariationSettings': {
        duration: 1,
      },
    },
  },
  close: { opacity: 0, '--fontVariationSettings': fonts.presets.recursive3 },
};

export const blogHeader = {
  fontSize,
  gradient1,
  gradient2,
  shadow,
  strokeWidth,
  strokeColor,
  presets,
  blogVariant,
};
