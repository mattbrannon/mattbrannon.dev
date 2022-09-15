import { snakeToCamel, parseFontSettings, makeGradient, makeShadow } from '@utils/helpers';

// #9eecff #21383f #47afff #192f70

export const initialState = {
  help: false,
  code: false,
  reset: false,
  textContent: 'The quick brown fox jumped over the lazy dog',
  applyToWords: false,

  shadow: {
    shadowColorStart: '#f4ccff',
    shadowColorEnd: '#3a313a',
    shadowLayers: 6,
    shadowGap: 18,
    shadowBlur: 0,
    shadowOffsetX: -0.9,
    shadowOffsetY: -0.6,
  },
  gradient: {
    gradientColorStart: '#4f5940',
    gradientColorEnd: '#ffe45c',
    gradientAngle: 0,
    gradientMidpoint: 50,
    gradientBlend: 50,
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
      initialSettings: { wght: 600, wdth: 100 },
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
        BLDB: 0,
        SKLA: 500,
        SKLB: 750,
        SKLD: 250,
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
    },
  },

  styles: {
    fontFamily: 'Recursive',
    fontSize: 128,
    strokeWidth: 0.02,
    strokeColor: '#7f00ad',
    letterSpacing: 0,
    fontVariationSettings: parseFontSettings({ wght: 1000, slnt: 0, CASL: 0, CRSV: 0, MONO: 0 }),
    gradient: makeGradient({
      gradientColorStart: '#4f5940',
      gradientColorEnd: '#ffe45c',
      gradientAngle: 0,
      gradientMidpoint: 50,
      gradientBlend: 50,
    }),
    shadow: makeShadow({
      shadowColorStart: '#f4ccff',
      shadowColorEnd: '#3a313a',
      shadowLayers: 6,
      shadowGap: 18,
      shadowBlur: 0,
      shadowOffsetX: -0.9,
      shadowOffsetY: -0.6,
    }),
  },
};

export const fancyTextReducer = (state, action) => {
  switch (action.type) {
    case 'GRADIENT_COLOR_START':
    case 'GRADIENT_COLOR_END':
    case 'GRADIENT_ANGLE':
    case 'GRADIENT_MIDPOINT':
    case 'GRADIENT_BLEND': {
      const type = snakeToCamel(action.type);
      const gradientState = { ...state.gradient, [type]: action.value };
      const gradient = makeGradient(gradientState);
      const styles = { ...state.styles };
      return {
        ...state,
        gradient: { ...gradientState },
        styles: { ...styles, gradient },
      };
    }
    case 'SHADOW_COLOR_START':
    case 'SHADOW_COLOR_END':
    case 'SHADOW_LAYERS':
    case 'SHADOW_GAP':
    case 'SHADOW_BLUR':
    case 'SHADOW_OFFSET_X':
    case 'SHADOW_OFFSET_Y': {
      const type = snakeToCamel(action.type);
      const shadowState = { ...state.shadow, [type]: action.value };
      const shadow = makeShadow(shadowState);
      const styles = { ...state.styles };
      return {
        ...state,
        shadow: { ...shadowState },
        styles: { ...styles, shadow },
      };
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
      const fontFamily = state.styles.fontFamily;
      const currentFont = { ...state.fonts[fontFamily] };
      const { currentSettings, initialSettings } = currentFont;
      const updatedSettings = { ...currentSettings, [action.type]: action.value };
      const fontVariationSettings = parseFontSettings(updatedSettings);
      return {
        ...state,
        fonts: {
          ...state.fonts,
          [fontFamily]: {
            initialSettings,
            currentSettings: updatedSettings,
          },
        },
        styles: {
          ...state.styles,
          fontVariationSettings,
        },
      };
    }
    case 'FONT_SIZE':
    case 'STROKE_WIDTH':
    case 'STROKE_COLOR':
    case 'LETTER_SPACING': {
      const type = snakeToCamel(action.type);
      const { styles } = state;
      return { ...state, styles: { ...styles, [type]: action.value } };
    }
    case 'FONT_FAMILY': {
      const fontFamily = action.value;
      const { currentSettings } = state.fonts[fontFamily];
      return {
        ...state,
        styles: {
          ...state.styles,
          fontFamily,
          fontVariationSettings: parseFontSettings(currentSettings),
        },
      };
    }
    case 'help':
    case 'code': {
      return { ...state, [action.type]: action.value };
    }
    case 'TEXT_CONTENT': {
      return { ...state, textContent: action.value };
    }
    case 'APPLY_TO_WORDS': {
      return { ...state, applyToWords: action.value };
    }
    case 'reset': {
      const colorKeys = [
        'gradientColorStart',
        'gradientColorEnd',
        'shadowColorStart',
        'shadowColorEnd',
        'textStrokeColor',
      ];
      // const initial = getInitialSettings(state.font).settings;
      const initialSettings = state.fonts[state.styles.fontFamily].initialSettings;
      // const settings = state.settings;

      // for (const key in settings) {
      //   settings[key] = initial[key];
      // }

      const newState = { ...initialState };
      const gradientState = { ...initialState.gradient };
      const shadowState = {
        ...initialState.shadow,
        shadowLayers: state.shadow.shadowLayers,
        shadowGap: state.shadow.shadowGap,
      };
      const fontState = { ...initialState.fonts };

      console.log(fontState[state.styles.fontFamily]);

      const styleState = {
        ...initialState.styles,
        fontFamily: state.styles.fontFamily,
        fontVariationSettings: parseFontSettings(
          fontState[state.styles.fontFamily].currentSettings
        ),
        shadow: makeShadow(shadowState),
      };

      return {
        ...newState,
        reset: action.value,
        applyToWords: state.applyToWords,
        textContent: state.textContent,
        gradient: gradientState,
        shadow: shadowState,
        fonts: fontState,
        styles: styleState,
      };
    }
  }
};
