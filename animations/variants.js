import { makeGradient, makeShadow, makeFluidFontSize, pxToEm } from '@utils/helpers';
import { fonts } from '@constants/fonts';
import { breakpoints } from '@constants/breakpoints';

const { mobile, desktop } = breakpoints;
export const fontSize = makeFluidFontSize(36, 52, mobile, desktop);

export const gradient1 = makeGradient({
  gradientColorStart: 'blue',
  gradientColorEnd: 'orange',
});
export const gradient2 = makeGradient({
  gradientColorStart: 'green',
  gradientColorEnd: 'gold',
});

export const shadow = makeShadow({
  shadowColorStart: 'white',
  shadowColorEnd: '#111',
  shadowLayers: 24,
  shadowOffset: 4,
  offsetX: -1,
  offsetY: -1,
  blur: 0,
});

export const strokeWidth = pxToEm(0.75) + 'em';
export const strokeColor = '#000000';
export const presets = fonts.presets;

export const textGeneratorVariant = {
  hidden: (props) => {
    return {
      '--fontSize': props.fontSize,
      '--fontVariationSettings': fonts.presets.recursive3,
      '--strokeWidth': 0,
      '--shadow': 'none',
      '--gradient': gradient1,
      '--strokeColor': 'none',
    };
  },
  show: (props) => {
    const {
      fontSize,
      fontVariationSettings,
      strokeWidth,
      strokeColor,
      shadow,
      gradient,
    } = props;
    if (fontVariationSettings.length) {
      return {
        '--fontSize': fontSize,
        '--fontVariationSettings': fontVariationSettings,
        '--strokeWidth': strokeWidth,
        '--strokeColor': strokeColor,
        '--shadow': shadow,
        '--gradient': gradient,
        transition: {
          easing: 'linear',
        },
        // transition: {
        //   '--strokeWidth': {
        //     delay: 0,
        //     duration: 0.1,
        //     easing: 'linear',
        //   },
        //   '--strokeColor': {
        //     delay: 0,
        //     // duration: 0.05,
        //     easing: 'linear',
        //   },
        //   '--shadow': {
        //     delay: 0,
        //     // duration: 0.05,
        //     easing: 'linear',
        //   },
        //   '--gradient': {
        //     delay: 0,
        //     // duration: 0.05,
        //     easing: 'linear',
        //   },
        //   '--fontVariationSettings': {
        //     delay: 0,
        //     duration: 0.1,
        //     easing: 'linear',
        //   },
        // },
      };
    }
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

// export const textGeneratorVariant = {
//   hidden: (props) => {
//     console.log({ gen: props });
//     return {
//       '--fontSize': props.fontSize,
//       '--gradient': makeGradient({ gradientColorStart: 'red', gradientColorEnd: 'blue' }),
//       '--shadow': 'none',
//       '--fontVariationSettings': 'none',
//       '--strokeDelay': 4,
//       opacity: 0,
//       transition: {
//         duration: 2,
//       },
//     };
//   },
//   show: (props) => {
//     console.log({ ggggggg: props.gradient });
//     return {
//       '--delay': '0s',
//       '--fontSize': props.fontSize,
//       '--strokeDelay': '0s',
//       '--strokeColor': props.strokeColor,
//       '--strokeWidth': props.strokeWidth,
//       '--shadow': props.shadow,
//       '--gradient': props.gradient,
//       '--shadowDelay': 4,
//       '--fontVariationSettings': props.fontVariationSettings,
//       opacity: 1,
//       transition: {
//         easing: 'linear',
//         duration: 0.1,
//       },
//     };
//   },
//   close: (props) => {
//     return {
//       '--fontVariationSettings': props.initialSettings,
//       '--gradient': makeGradient({ gradientColorStart: 'red', gradientColorEnd: 'blue' }),

//       opacity: 0,
//       transition: {
//         duration: 2,
//       },
//     };
//   },
// };

// // const initialSettings = props.initialSettings;
// // console.log({ initialSettings });

// // '--delay': '5s',

// // transition: {
// //   '--strokeWidth': {
// //     easing: 'linear',
// //   },
// //   '--strokeColor': {
// //     easing: 'linear',
// //   },
// //   '--gradient': {
// //     delay: 0,
// //     duration: 4,
// //   },
// //   '--shadow': {
// //     delay: 'var(--shadowDelay)',
// //     duration: 3,
// //     type: 'tween',
// //   },
// //   '--fontVariationSettings': {
// //     delay: 0,
// //     duration: 1,
// //   },
// // },

// // console.log({ show: props });

// // console.log({ initialSettings });
