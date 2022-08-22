import {
  makeGradient,
  makeShadow,
  makeFluidFontSize,
  pxToEm,
  parseFontSettings,
} from '@utils/helpers';
import { fonts } from '@constants/fonts.js';
import { breakpoints, gradients, shadows } from '@constants/index';
import { fonts as fontSettings } from '@constants/fancyTextGenerator';

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

const getInitialState = (fontFamily) => {
  try {
    const font = fontSettings.find((settings) => settings?.name === fontFamily);
    return parseFontSettings(font.settings);
  }
  catch {
    return fontFamily;
  }
};

export const textGeneratorVariant = {
  hidden: ({ ...state }) => {
    const fontSettings = parseFontSettings(state.fonts[state.styles.fontFamily].initialSettings);

    // console.log(fontSettings);
    return {
      opacity: 0,
      '--fontFamily': state.styles.fontFamily,
      '--fontSize': state.styles.fontSize + 'px',
      '--fontSettings': fontSettings,
      '--strokeWidth': '0em',
      '--shadow': 'none',
      '--gradient': 'none',
      '--strokeColor': 'none',
      '--letterSpacing': 'none',
    };
  },
  show: ({ duration, ...state }) => {
    return {
      opacity: 1,
      '--fontSize': parseInt(state.styles.fontSize) + 'px',
      '--fontFamily': state.styles.fontFamily,
      '--fontSettings': state.styles.fontVariationSettings,
      '--strokeWidth': state.styles.strokeWidth + 'em',
      '--strokeColor': state.styles.strokeColor,
      '--letterSpacing': state.styles.letterSpacing + 'em',
      '--gradient': state.styles.gradient,
      '--shadow': state.styles.shadow,

      transition: {
        duration: duration,
        ease: 'easeOut',
        opacity: {
          duration: 0.2,
        },
      },
    };
  },
  close: ({ ...state }) => {
    return {
      opacity: 0,
      '--fontSize': parseInt(state.styles.fontSize) + 'px',
      '--fontFamily': state.styles.fontFamily,
      '--fontSettings': state.styles.fontVariationSettings,
      '--strokeWidth': 0,
      '--strokeColor': 0,
      '--letterSpacing': 0,
      '--gradient': 0,
      '--shadow': 0,
      transition: {
        duration: 1,
        opacity: {
          delay: 0.5,
          duration: 0.5,
        },
        // '--gradient': {
        //   delay: 0.8,
        //   duration: 0.8,
        // },
      },
    };
  },
  reset: (props) => {
    // console.log(props);
    return {
      x: -200,
      opacity: 0,
      transition: {
        duration: 2,
      },
      // '--fontSize': props.text.fontSize + 'vw',
      // '--fontFamily': props.font.fontName,
      // '--fontSettings': fontVariationSettings,
      // '--strokeWidth': props.text.strokeWidth + 'em',
      // '--strokeColor': props.text.strokeColor,
      // '--shadow': shadow,
      // '--gradient': gradient,
      // '--letterSpacing': props.text.letterSpacing + 'em',
    };
  },
};

// export const textGeneratorVariant = {
//   hidden: (props) => {
//     return {
//       '--fontSize': props.fontSize,
//       '--fontVariationSettings': props.initialSettings,
//       '--strokeWidth': 0,
//       '--shadow': 0,
//       '--gradient': 'none',
//       '--strokeColor': 'none',
//     };
//   },
//   show: (props) => {
//     const { isChangingFonts } = props?.state ?? props;
//     const duration = isChangingFonts ? 2 : 0.1;
//     const { fontSize, fontVariationSettings, strokeWidth, strokeColor, shadow, gradient } = props;

//     return {
//       '--fontSize': fontSize,
//       '--fontVariationSettings': fontVariationSettings,
//       '--strokeWidth': strokeWidth,
//       '--strokeColor': strokeColor,
//       '--shadow': shadow || 0,
//       '--gradient': gradient,
//       transition: {
//         duration: duration,
//         delay: 0,
//       },
//     };
//   },
//   close: { '--fontVariationSettings': fonts.presets.recursive3 },
// };

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

// import {
//   makeGradient,
//   makeShadow,
//   makeFluidFontSize,
//   pxToEm,
//   parseFontSettings,
// } from '@utils/helpers';
// import { fonts } from '@constants/fonts.js';
// import { breakpoints, gradients, shadows } from '@constants/index';

// const { mobile, desktop } = breakpoints;
// export const fontSize = makeFluidFontSize(36, 52, mobile, desktop);

// // export const gradient1 = makeGradient({
// //   gradientColorStart: 'blue',
// //   gradientColorEnd: 'orange',
// // });
// export const gradient2 = makeGradient({
//   gradientColorStart: 'red',
//   gradientColorEnd: 'gold',
//   gradientAngle: 180,
//   gradientMidpoint: 35,
//   gradientBlend: 24,
// });

// // export const shadow = makeShadow({
// //   shadowColorStart: 'aqua',
// //   shadowColorEnd: 'navy',
// //   shadowLayers: 24,
// //   shadowOffset: 4,
// //   shadowOffsetX: -5,
// //   shadowOffsetY: -5,
// //   shadowBlur: 0,
// // });

// export const strokeWidth = pxToEm(0.75) + 'em';
// export const strokeColor = '#000000';
// export const presets = fonts.presets;

// export const textGeneratorVariant = {
//   hidden: ({ state }) => {
//     // console.log(state);
//     // console.log(font);
//     const fontFamily = state.fontFamily;
//     const fontSettings = parseFontSettings(state[fontFamily].initialSettings);
//     const fontSize = state.css.fontSize + 'vw';
//     const strokeWidth = state.css.strokeWidth + 'em';
//     const strokeColor = state.css.strokeColor;
//     // const letterSpacing = state.letterSpacing + 'em';
//     // const savedState = font.savedStates.find((savedState) => savedState.name === font.fontName);
//     // console.log(savedState);
//     // const fontVariationSettings = parseFontSettings(state[state.fontFamily].currentSettings);
//     // console.log(fontVariationSettings);
//     return {
//       opacity: 0,
//       '--fontFamily': fontFamily,
//       '--fontSize': fontSize,
//       '--fontSettings': fontSettings,
//       '--strokeWidth': strokeWidth,
//       '--strokeColor': strokeColor,
//       '--letterSpacing': -0.25 + 'em',
//       '--shadow': 'none',
//       '--gradient': 'none',
//     };
//   },
//   show: ({ state, ...props }) => {
//     // console.log(state);

//     const fontFamily = state.fontFamily;
//     const fontSettings = parseFontSettings(state[fontFamily].currentSettings);
//     const fontSize = state.css.fontSize + 'vw';
//     const strokeWidth = state.css.strokeWidth + 'em';
//     const strokeColor = state.css.strokeColor;
//     const letterSpacing = state.css.letterSpacing + 'em';
//     const gradient = state.css.gradient;
//     const shadow = state.css.shadow;
//     // const gradient = makeGradient({ ...state });
//     // const shadow = state.shadow || makeShadow({ ...state.shadowSettings });
//     // const gradient = state.gradient || makeGradient({ ...state.gradientSettings });
//     // const shadow = makeShadow({ ...state });

//     // const savedState = props.font.savedStates.find(
//     //   (savedState) => savedState.name === props.font.fontName
//     // );
//     // const fontVariationSettings = parseFontSettings(savedState.current);
//     // console.log(props);
//     return {
//       opacity: 1,
//       '--fontSize': fontSize,
//       '--fontFamily': fontFamily,
//       '--fontSettings': fontSettings,
//       '--strokeWidth': strokeWidth,
//       '--strokeColor': strokeColor,
//       '--letterSpacing': letterSpacing,
//       '--shadow': shadow,
//       '--gradient': gradient,
//       transition: {
//         duration: props.duration,
//         delay: 0,
//         ease: 'easeOut',
//         opacity: {
//           duration: 0.2,
//         },
//       },
//     };
//   },
//   close: {
//     opacity: 0,
//     transition: {
//       duration: 1,
//     },
//   },
//   reset: (props) => {
//     // console.log(props);
//     return {
//       x: -200,
//       opacity: 0,
//       transition: {
//         duration: 2,
//       },
//       // '--fontSize': props.text.fontSize + 'vw',
//       // '--fontFamily': props.font.fontName,
//       // '--fontSettings': fontVariationSettings,
//       // '--strokeWidth': props.text.strokeWidth + 'em',
//       // '--strokeColor': props.text.strokeColor,
//       // '--shadow': shadow,
//       // '--gradient': gradient,
//       // '--letterSpacing': props.text.letterSpacing + 'em',
//     };
//   },
// };

// // export const textGeneratorVariant = {
// //   hidden: (props) => {
// //     return {
// //       '--fontSize': props.fontSize,
// //       '--fontVariationSettings': props.initialSettings,
// //       '--strokeWidth': 0,
// //       '--shadow': 0,
// //       '--gradient': 'none',
// //       '--strokeColor': 'none',
// //     };
// //   },
// //   show: (props) => {
// //     const { isChangingFonts } = props?.state ?? props;
// //     const duration = isChangingFonts ? 2 : 0.1;
// //     const { fontSize, fontVariationSettings, strokeWidth, strokeColor, shadow, gradient } = props;

// //     return {
// //       '--fontSize': fontSize,
// //       '--fontVariationSettings': fontVariationSettings,
// //       '--strokeWidth': strokeWidth,
// //       '--strokeColor': strokeColor,
// //       '--shadow': shadow || 0,
// //       '--gradient': gradient,
// //       transition: {
// //         duration: duration,
// //         delay: 0,
// //       },
// //     };
// //   },
// //   close: { '--fontVariationSettings': fonts.presets.recursive3 },
// // };

// export const textGenerator = {
//   fontSize,
//   // gradient1,
//   gradient2,
//   // shadow,
//   strokeWidth,
//   strokeColor,
//   presets,
//   textGeneratorVariant,
// };
