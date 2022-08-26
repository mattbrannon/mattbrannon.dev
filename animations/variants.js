import { makeGradient, makeShadow, makeFluidFontSize, parseFontSettings } from '@utils/helpers';

import { breakpoints } from '@constants/index';

const { mobile, desktop } = breakpoints;
export const fontSize = makeFluidFontSize(36, 52, mobile, desktop);

export const gradient1 = makeGradient({
  gradientColorStart: 'blue',
  gradientColorEnd: 'orange',
});
export const gradient2 = makeGradient({
  gradientColorStart: 'red',
  gradientColorEnd: 'gold',
  gradientAngle: 180,
  gradientMidpoint: 35,
  gradientBlend: 24,
});

export const shadow = makeShadow({
  shadowColorStart: 'aqua',
  shadowColorEnd: 'navy',
  shadowLayers: 24,
  shadowOffset: 4,
  shadowOffsetX: -5,
  shadowOffsetY: -5,
  shadowBlur: 0,
});

export const textGeneratorVariant = {
  hidden: ({ state, ...props }) => {
    // console.log(state, props);
    const fontVariationSettings = parseFontSettings(
      state.fonts[state.styles.fontFamily].initialSettings
    );

    return {
      '--fontFamily': state.styles.fontFamily,
      '--fontSize': state.styles.fontSize + 'px',
      '--fontSettings': fontVariationSettings,
      '--strokeWidth': 0,
      '--shadow': 0,
      '--gradient': 0,
      '--strokeColor': 0,
      '--letterSpacing': 0,
    };
  },
  show: ({ state, duration, ...props }) => {
    return {
      '--fontSize': parseInt(state.styles.fontSize) + 'px',
      '--fontFamily': state.styles.fontFamily,
      '--fontSettings': state.styles.end || state.styles.fontVariationSettings,
      '--strokeWidth': state.styles.strokeWidth + 'em',
      '--strokeColor': state.styles.strokeColor,
      '--letterSpacing': state.styles.letterSpacing + 'em',
      '--gradient': state.styles.gradient,
      '--shadow': state.styles.shadow,

      transition: {
        duration: state.reset ? 2 : duration,
        ease: 'linear',
      },
    };
  },
  close: ({ state }) => {
    console.log(state);
    return {
      '--fontSize': parseInt(state.styles.fontSize) + 'px',
      '--fontFamily': state.styles.fontFamily,
      '--fontSettings': state.styles.start,
      '--strokeWidth': state.styles.strokeWidth + 'em',
      '--strokeColor': state.styles.strokeColor,
      '--letterSpacing': state.styles.letterSpacing + 'em',
      '--gradient': state.styles.gradient,
      '--shadow': state.styles.shadow,

      transition: {
        // duration: 2,
        ease: 'linear',
      },
    };
  },
};

export const textGenerator = {
  fontSize,
  gradient1,
  gradient2,
  shadow,
  textGeneratorVariant,
};
