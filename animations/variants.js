import { makeGradient, makeShadow, makeFluidFontSize, pxToEm } from '@utils/helpers';
import { fonts } from '@constants/fonts.js';
import { breakpoints, gradients, shadows } from '@constants/index';

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

export const strokeWidth = pxToEm(0.75) + 'em';
export const strokeColor = '#000000';
export const presets = fonts.presets;

export const textGeneratorVariant = {
  hidden: (props) => {
    return {
      '--fontSize': props.fontSize,
      '--fontVariationSettings': props.initialSettings,
      '--strokeWidth': 0,
      '--shadow': 0,
      '--gradient': 'none',
      '--strokeColor': 'none',
    };
  },
  show: (props) => {
    const { isChangingFonts } = props?.state ?? props;
    const duration = isChangingFonts ? 2 : 0.1;
    const { fontSize, fontVariationSettings, strokeWidth, strokeColor, shadow, gradient } = props;

    return {
      '--fontSize': fontSize,
      '--fontVariationSettings': fontVariationSettings,
      '--strokeWidth': strokeWidth,
      '--strokeColor': strokeColor,
      '--shadow': shadow || 0,
      '--gradient': gradient,
      transition: {
        duration: duration,
        delay: 0,
      },
    };
  },
  close: { '--fontVariationSettings': fonts.presets.recursive3 },
};

export const textGenerator = {
  fontSize,
  gradient1,
  gradient2,
  shadow,
  strokeWidth,
  strokeColor,
  presets,
  textGeneratorVariant,
};
