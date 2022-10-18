import {
  makeGradient,
  makeGradient2,
  makeShadow,
  makeShadow2,
  parseFontSettings,
} from '@utils/helpers';

export const labels = {
  wght: 'font weight',
  slnt: 'font slant',
  ital: 'font italic',
  wdth: 'font width',
  CASL: 'font casual',
  CRSV: 'font cursive',
  MONO: 'font monospace',
  BLDA: 'font inline',
  BLDB: 'font worm',
  SKLA: 'font inline skeleton',
  SKLB: 'font worm skeleton',
  SKLD: 'font stripes',
  TRMA: 'font rounded',
  TRMB: 'font flared',
  TRMC: 'font rounded slab',
  TRMD: 'font sheared',
  TRME: 'font bifurcated',
  TRMF: 'font open terminal',
  TRMG: 'font slab',
  TRMK: 'font inline terminal',
  TRML: 'font worm terminal',
  WMX2: 'font mass',
};

export const fonts = [
  {
    name: 'Recursive',
    properties: {
      MONO: [0, 1],
      CRSV: [0, 1],
      CASL: [0, 1],
      wght: [300, 1000],
      slnt: [-15, 0],
    },
    settings: {
      wght: 300,
      slnt: -6,
      CASL: 1,
      CRSV: 0,
      MONO: 0.49,
    },
    current: {
      wght: 1000,
      slnt: 0,
      CASL: 0,
      CRSV: 0,
      MONO: 0,
    },
    default: true,
    homepage: 'https://www.recursive.design/',
    github: 'https://github.com/arrowtype/recursive',
  },
  {
    name: 'Inter',
    properties: {
      wght: [100, 900],
      slnt: [-10, 0],
    },
    settings: {
      wght: 100,
      slnt: -10,
    },
    current: {
      wght: 900,
      slnt: 0,
    },
    default: false,
    homepage: 'https://rsms.me/inter/',
    github: 'https://github.com/rsms/inter',
  },
  {
    name: 'JetBrainsMono',
    properties: {
      wght: [100, 800],
    },
    default: false,
    homepage: 'https://www.jetbrains.com/lp/mono/',
    github: 'https://github.com/JetBrains/JetBrainsMono',
  },
  {
    name: 'OpenSans',
    properties: {
      wght: [300, 800],
      wdth: [75, 100],
    },
    settings: {
      wght: 300,
      wdth: 95,
    },
    current: {
      wght: 800,
      wdth: 75,
    },
    default: false,
    homepage: 'https://www.opensans.com/',
    github: 'https://github.com/googlefonts/opensans',
  },
  {
    name: 'Jost',
    properties: {
      wght: [100, 900],
      ital: [0, 2],
    },
    settings: {
      wght: 600,
      ital: 0,
    },
    current: {
      wght: 900,
      ital: 2,
    },
    default: false,
    homepage: 'https://indestructibletype.com/Jost.html',
    github: 'https://github.com/indestructible-type/Jost',
  },
  {
    name: 'Decovar',
    properties: {
      BLDA: [0, 1000],
      TRMD: [0, 1000],
      TRMC: [0, 1000],
      SKLD: [0, 1000],
      TRML: [0, 1000],
      SKLA: [0, 1000],
      TRMF: [0, 1000],
      TRMK: [0, 1000],
      BLDB: [0, 1000],
      WMX2: [0, 1000],
      TRMB: [0, 1000],
      TRMA: [0, 1000],
      SKLB: [0, 1000],
      TRMG: [0, 1000],
      TRME: [0, 1000],
    },
    settings: {
      BLDA: 0,
      BLDB: 0,
      SKLA: 500,
      SKLB: 0,
      SKLD: 0,
      TRMA: 0,
      TRMB: 0,
      TRMC: 0,
      TRMD: 0,
      TRME: 0,
      TRMF: 0,
      TRMG: 0,
      TRMK: 0,
      TRML: 0,
      WMX2: 0,
    },
    current: {
      BLDA: 0,
      BLDB: 0,
      SKLA: 0,
      SKLB: 0,
      SKLD: 0,
      TRMA: 0,
      TRMB: 0,
      TRMC: 0,
      TRMD: 1000,
      TRME: 1000,
      TRMF: 0,
      TRMG: 0,
      TRMK: 0,
      TRML: 0,
      WMX2: 0,
    },
    default: false,
    homepage:
      'https://www.typenetwork.com/brochure/decovar-a-decorative-variable-font-by-david-berlow',
    github: 'https://github.com/sannorozco/Decovar',
  },
];

// export const gradientDefault = {
//   colorStart: '#97f7f1',
//   colorEnd: '#082640',
//   angle: 180,
//   midPoint: 50,
//   blend: 50,
// };

const gradientProps = {
  colorStart: '#97f7f1',
  colorEnd: '#082640',
  angle: 180,
  midPoint: 50,
  blend: 50,
};

const shadowProps = {
  colorStart: '#cdbdb6',
  colorEnd: '#3e3532',
  layers: 10,
  gap: 2,
  blur: 1,
  offsetX: -5,
  offsetY: -5,
};

const gradientCss = makeGradient2(gradientProps);
const shadowCss = makeShadow2(shadowProps);

export const gradientDefault = {
  ...gradientProps,
  css: gradientCss,
};

export const shadowDefault = {
  ...shadowProps,
  css: shadowCss,
};

export const textDefault = {
  letterSpacing: 0.05,
  content: 'Blah blah blah',
  fontSize: 96,
  strokeWidth: 0.035,
  strokeColor: '#000000',
};

export const buttonDefault = {
  code: false,
  help: false,
  reset: false,
};

// export const fancyTextInitialState = {
//   gradientColorStart: '#082640',
//   gradientColorEnd: '#97f7f1',
//   gradientAngle: 0,
//   gradientMidpoint: 50,
//   gradientBlend: 50,
//   shadowColorStart: '#cdbdb6',
//   shadowColorEnd: '#3e3532',
//   shadowLayers: 10,
//   shadowGap: 2,
//   shadowBlur: 1,
//   shadowOffsetX: -5,
//   shadowOffsetY: -5,
//   letterSpacing: 0.05,
//   textContent: 'Blah blah blah',
//   fontSize: 8,
//   fontFamily: 'Recursive',
//   strokeWidth: 0.035,
//   strokeColor: '#536897',
//   Recursive: {
//     initialSettings: { wght: 300, slnt: -6, CASL: 1, CRSV: 0, MONO: 0.49 },
//     currentSettings: { wght: 1000, slnt: 0, CASL: 0, CRSV: 0, MONO: 0 },
//   },
//   Inter: {
//     initialSettings: { wght: 100, slnt: -10 },
//     currentSettings: { wght: 900, slnt: 0 },
//   },
//   OpenSans: {
//     initialSettings: { wght: 300, wdth: 95 },
//     currentSettings: { wght: 800, wdth: 75 },
//   },
//   Jost: {
//     initialSettings: { wght: 600, ital: 0 },
//     currentSettings: { wght: 900, ital: 2 },
//   },
//   Decovar: {
//     initialSettings: {
//       BLDA: 0,
//       BLDB: 0,
//       SKLA: 500,
//       SKLB: 0,
//       SKLD: 0,
//       TRMA: 0,
//       TRMB: 0,
//       TRMC: 0,
//       TRMD: 0,
//       TRME: 0,
//       TRMF: 0,
//       TRMG: 0,
//       TRMK: 0,
//       TRML: 0,
//       WMX2: 0,
//     },
//     currentSettings: {
//       BLDA: 0,
//       BLDB: 500,
//       SKLA: 0,
//       SKLB: 500,
//       SKLD: 0,
//       TRMA: 0,
//       TRMB: 0,
//       TRMC: 500,
//       TRMD: 0,
//       TRME: 0,
//       TRMF: 500,
//       TRMG: 0,
//       TRMK: 0,
//       TRML: 0,
//       WMX2: 0,
//     },
//   },
//   fontProperties: {
//     wght: 'font weight',
//     slnt: 'font slant',
//     ital: 'font italic',
//     wdth: 'font width',
//     CASL: 'font casual',
//     CRSV: 'font cursive',
//     MONO: 'font monospace',
//     BLDA: 'font inline',
//     BLDB: 'font worm',
//     SKLA: 'font inline skeleton',
//     SKLB: 'font worm skeleton',
//     SKLD: 'font stripes',
//     TRMA: 'font rounded',
//     TRMB: 'font flared',
//     TRMC: 'font rounded slab',
//     TRMD: 'font sheared',
//     TRME: 'font bifurcated',
//     TRMF: 'font open terminal',
//     TRMG: 'font slab',
//     TRMK: 'font inline terminal',
//     TRML: 'font worm terminal',
//     WMX2: 'font mass',
//   },
//   gradient: makeGradient({
//     gradientColorStart: '#082640',
//     gradientColorEnd: '#97f7f1',
//     gradientAngle: 0,
//     gradientMidpoint: 50,
//     gradientBlend: 50,
//   }),
//   shadow: makeShadow({
//     shadowColorStart: '#cdbdb6',
//     shadowColorEnd: '#3e3532',
//     shadowLayers: 10,
//     shadowGap: 2,
//     shadowBlur: 1,
//     shadowOffsetX: -5,
//     shadowOffsetY: -5,
//   }),
// };

const propertyLabels = {
  wght: 'weight',
  slnt: 'slant',
  ital: 'italic',
  wdth: 'width',
  CASL: 'casual',
  CRSV: 'cursive',
  MONO: 'monospace',
  BLDA: 'inline',
  BLDB: 'worm',
  SKLA: 'inline skeleton',
  SKLB: 'worm skeleton',
  SKLD: 'stripes',
  TRMA: 'rounded',
  TRMB: 'flared',
  TRMC: 'rounded slab',
  TRMD: 'sheared',
  TRME: 'bifurcated',
  TRMF: 'open terminal',
  TRMG: 'slab',
  TRMK: 'inline terminal',
  TRML: 'worm terminal',
  WMX2: 'mass',
};

// export const shadowDefault = {
//   colorStart: '#cdbdb6',
//   colorEnd: '#3e3532',
//   layers: 10,
//   gap: 2,
//   blur: 1,
//   offsetX: -5,
//   offsetY: -5,
// };

export const fancyTextInitialState = {
  fontFamily: 'Recursive',
  fontSize: 8,
  strokeWidth: 0.035,
  strokeColor: '#536897',
  letterSpacing: 0.05,
  help: false,
  code: false,
  textContent: 'Blah blah blah',
  fontSettings: parseFontSettings({ wght: 300, slnt: -6, CASL: 1, CRSV: 0, MONO: 0.49 }),

  gradient: {
    colorStart: '#082640',
    colorEnd: '#97f7f1',
    angle: 0,
    midpoint: 50,
    blend: 50,
  },
  shadow: {
    colorStart: '#cdbdb6',
    colorEnd: '#3e3532',
    layers: 10,
    gap: 2,
    blur: 1,
    offsetX: -5,
    offsetY: -5,
  },
  fonts: {
    Recursive: {
      initialSettings: { wght: 300, slnt: -6, CASL: 1, CRSV: 0, MONO: 0.49 },
      currentSettings: { wght: 1000, slnt: 0, CASL: 0, CRSV: 0, MONO: 0 },
    },
    Inter: {
      initialSettings: { wght: 100, slnt: -10 },
      currentSettings: { wght: 900, slnt: 0 },
    },
    OpenSans: {
      initialSettings: { wght: 300, wdth: 95 },
      currentSettings: { wght: 800, wdth: 75 },
    },
    Jost: {
      initialSettings: { wght: 600, ital: 0 },
      currentSettings: { wght: 900, ital: 2 },
    },
    Decovar: {
      initialSettings: {
        BLDA: 0,
        BLDB: 0,
        SKLA: 500,
        SKLB: 0,
        SKLD: 0,
        TRMA: 0,
        TRMB: 0,
        TRMC: 0,
        TRMD: 0,
        TRME: 0,
        TRMF: 0,
        TRMG: 0,
        TRMK: 0,
        TRML: 0,
        WMX2: 0,
      },
      currentSettings: {
        BLDA: 0,
        BLDB: 500,
        SKLA: 0,
        SKLB: 500,
        SKLD: 0,
        TRMA: 0,
        TRMB: 0,
        TRMC: 500,
        TRMD: 0,
        TRME: 0,
        TRMF: 500,
        TRMG: 0,
        TRMK: 0,
        TRML: 0,
        WMX2: 0,
      },
    },
  },
  css: {
    shadow: makeShadow({
      shadowColorStart: '#cdbdb6',
      shadowColorEnd: '#3e3532',
      shadowLayers: 10,
      shadowGap: 2,
      shadowBlur: 1,
      shadowOffsetX: -5,
      shadowOffsetY: -5,
    }),
    gradient: makeGradient({
      gradientColorStart: '#082640',
      gradientColorEnd: '#97f7f1',
      gradientAngle: 0,
      gradientMidpoint: 50,
      gradientBlend: 50,
    }),
  },
};

const initState = {
  fontFamily: 'Recursive',
  fontSize: 8,
  strokeWidth: 0.02,
  strokeColor: '#536897',
  letterSpacing: 0.05,
  fontVariationSettings: parseFontSettings({ wght: 300, slnt: -6, CASL: 1, CRSV: 0, MONO: 0.49 }),
  help: false,
  code: false,
  textContent: 'Blah blah blah',

  shadowColorStart: '#cdbdb6',
  shadowColorEnd: '#3e3532',
  shadowLayers: 10,
  shadowGap: 2,
  shadowBlur: 1,
  shadowOffsetX: -5,
  shadowOffsetY: -5,

  gradientColorStart: '#082640',
  gradientColorEnd: '#97f7f1',
  gradientAngle: 0,
  gradientMidpoint: 50,
  gradientBlend: 50,

  fonts: {
    Recursive: {
      initialSettings: { wght: 300, slnt: -6, CASL: 1, CRSV: 0, MONO: 0.49 },
      currentSettings: { wght: 1000, slnt: 0, CASL: 0, CRSV: 0, MONO: 0 },
    },
    Inter: {
      initialSettings: { wght: 100, slnt: -10 },
      currentSettings: { wght: 900, slnt: 0 },
    },
    OpenSans: {
      initialSettings: { wght: 300, wdth: 95 },
      currentSettings: { wght: 800, wdth: 75 },
    },
    Jost: {
      initialSettings: { wght: 600, ital: 0 },
      currentSettings: { wght: 900, ital: 2 },
    },
    Decovar: {
      initialSettings: {
        BLDA: 0,
        BLDB: 0,
        SKLA: 500,
        SKLB: 0,
        SKLD: 0,
        TRMA: 0,
        TRMB: 0,
        TRMC: 0,
        TRMD: 0,
        TRME: 0,
        TRMF: 0,
        TRMG: 0,
        TRMK: 0,
        TRML: 0,
        WMX2: 0,
      },
      currentSettings: {
        BLDA: 0,
        BLDB: 500,
        SKLA: 0,
        SKLB: 500,
        SKLD: 0,
        TRMA: 0,
        TRMB: 0,
        TRMC: 500,
        TRMD: 0,
        TRME: 0,
        TRMF: 500,
        TRMG: 0,
        TRMK: 0,
        TRML: 0,
        WMX2: 0,
      },
    },
  },
};

// gradientColorStart: '#082640',
// gradientColorEnd: '#97f7f1',
// gradientAngle: 0,
// gradientMidpoint: 50,
// gradientBlend: 50,

const blahState = {
  fontFamily: 'Recursive',
  fontSize: 8,
  strokeWidth: 0.02,
  strokeColor: '#536897',
  letterSpacing: 0.05,
  fontVariationSettings: parseFontSettings({ wght: 300, slnt: -6, CASL: 1, CRSV: 0, MONO: 0.49 }),

  help: false,
  code: false,
  textContent: 'Blah blah blah',

  shadowState: {
    shadowColorStart: '#cdbdb6',
    shadowColorEnd: '#3e3532',
    shadowLayers: 10,
    shadowGap: 2,
    shadowBlur: 1,
    shadowOffsetX: -5,
    shadowOffsetY: -5,
  },
  gradientState: {
    gradientColorStart: '#082640',
    gradientColorEnd: '#97f7f1',
    gradientAngle: 0,
    gradientMidpoint: 50,
    gradientBlend: 50,
  },

  fontState: {
    Recursive: {
      initialSettings: { wght: 300, slnt: -6, CASL: 1, CRSV: 0, MONO: 0.49 },
      currentSettings: { wght: 1000, slnt: 0, CASL: 0, CRSV: 0, MONO: 0 },
    },
    Inter: {
      initialSettings: { wght: 100, slnt: -10 },
      currentSettings: { wght: 900, slnt: 0 },
    },
    OpenSans: {
      initialSettings: { wght: 300, wdth: 95 },
      currentSettings: { wght: 800, wdth: 75 },
    },
    Jost: {
      initialSettings: { wght: 600, ital: 0 },
      currentSettings: { wght: 900, ital: 2 },
    },
    Decovar: {
      initialSettings: {
        BLDA: 0,
        BLDB: 0,
        SKLA: 500,
        SKLB: 0,
        SKLD: 0,
        TRMA: 0,
        TRMB: 0,
        TRMC: 0,
        TRMD: 0,
        TRME: 0,
        TRMF: 0,
        TRMG: 0,
        TRMK: 0,
        TRML: 0,
        WMX2: 0,
      },
      currentSettings: {
        BLDA: 0,
        BLDB: 500,
        SKLA: 0,
        SKLB: 500,
        SKLD: 0,
        TRMA: 0,
        TRMB: 0,
        TRMC: 500,
        TRMD: 0,
        TRME: 0,
        TRMF: 500,
        TRMG: 0,
        TRMK: 0,
        TRML: 0,
        WMX2: 0,
      },
    },
  },
};

const blahReducer = (state, action) => {
  switch (action.type) {
    case 'gradientColorStart':
    case 'gradientColorEnd':
    case 'gradientAngle':
    case 'gradientMidpoint':
    case 'gradientBlend': {
      const gradientState = { ...state.gradientState, [action.type]: action.value };
      const gradient = makeGradient(gradientState);
      return { ...state, gradientState, gradient };
    }
    case 'shadowColorStart':
    case 'shadowColorEnd':
    case 'shadowLayers':
    case 'shadowGap':
    case 'shadowBlur':
    case 'shadowOffsetX':
    case 'shadowOffsetY': {
      const shadowState = { ...state.shadowState, [action.type]: action.value };
      const shadow = makeShadow(shadowState);
      return { ...state, shadowState, shadow };
    }
    case 'wght':
    case 'slnt':
    case 'ital':
    case 'wdth':
    case 'CASL':
    case 'CRSV':
    case 'MONO':
    case 'BLDA':
    case 'BLDB':
    case 'SKLA':
    case 'SKLB':
    case 'SKLD':
    case 'TRMA':
    case 'TRMB':
    case 'TRMC':
    case 'TRMD':
    case 'TRME':
    case 'TRMF':
    case 'TRMG':
    case 'TRMK':
    case 'TRML':
    case 'WMX2': {
      const fontFamily = state.fontFamily;
      const {
        fontState: {
          [fontFamily]: { initialSettings, currentSettings },
        },
      } = state;

      const fontState = { ...currentSettings, [action.type]: action.value };
      const fontVariationSettings = parseFontSettings(fontState);
      return {
        ...state,
        fontVariationSettings,
        fontState: {
          ...state.fontState,
          [fontFamily]: { initialSettings, currentSettings: fontState },
        },
      };
    }
    case 'fontFamily':
    case 'fontSize':
    case 'strokeWidth':
    case 'strokeColor':
    case 'letterSpacing': {
      return { ...state, [action.type]: action.value };
    }
  }
};
