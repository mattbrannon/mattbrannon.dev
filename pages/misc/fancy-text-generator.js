import styled from 'styled-components';
import { useState, useReducer, useEffect, useRef } from 'react';
import { fonts, fancyTextInitialState } from '@constants/fancyTextGenerator';
// import { fancyTextReducer } from '@utils/reducers';

import { FontControls } from '@components/Controls/FontControls';

import { MainView, HelpView, CodeView } from 'views/FancyTextGenerator';

import { AnimatePresence, m as motion } from 'framer-motion';
import {
  parseFontSettings,
  makeGradient,
  makeShadow,
  snakeToCamel,
  toSnakeUpperCase,
} from '@utils/helpers';

const initialState = {
  help: false,
  code: false,
  reset: false,
  textContent: 'Blah blah blah',
  applyToWords: false,

  shadow: {
    shadowColorStart: '#80e5ff',
    shadowColorEnd: '#110c1d',
    shadowLayers: 10,
    shadowGap: 10,
    shadowBlur: 0,
    shadowOffsetX: -1,
    shadowOffsetY: -1,
  },
  gradient: {
    gradientColorStart: '#0c0066',
    gradientColorEnd: '#ff00c8',
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
        BLDA: 443,
        BLDB: 0,
        SKLA: 176,
        SKLB: 1000,
        SKLD: 311,
        TRMA: 0,
        TRMB: 0,
        TRMC: 0,
        TRMD: 0,
        TRME: 0,
        TRMF: 247,
        TRMG: 0,
        TRMK: 389,
        TRML: 0,
        WMX2: 407,
      },
    },
  },

  styles: {
    fontFamily: 'Recursive',
    fontSize: 144,
    strokeWidth: 0.015,
    strokeColor: '#ffdd00',
    letterSpacing: 0,
    fontVariationSettings: parseFontSettings({ wght: 1000, slnt: 0, CASL: 0, CRSV: 0, MONO: 0 }),
    gradient: makeGradient({
      gradientColorStart: '#0c0066',
      gradientColorEnd: '#ff00c8',
      gradientAngle: 0,
      gradientMidpoint: 50,
      gradientBlend: 50,
    }),
    shadow: makeShadow({
      shadowColorStart: '#80e5ff',
      shadowColorEnd: '#110c1d',
      shadowLayers: 10,
      shadowGap: 10,
      shadowBlur: 0,
      shadowOffsetX: -1,
      shadowOffsetY: -1,
    }),
  },
};

const fancyTextReducer = (state, action) => {
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

export default function Page({ ...props }) {
  const [state, dispatch] = useReducer(fancyTextReducer, initialState);
  const ref = useRef();
  const [view, setView] = useState('main');

  const onChange = (e) => {
    const type = toSnakeUpperCase(e.target.name);
    dispatch({ type, value: e.target.value });
  };

  useEffect(() => {
    if (state.help) {
      setView('help');
    }
    else if (state.code) {
      setView('code');
    }
    else {
      setView('main');
    }
  }, [state.help, state.code]);

  return (
    <>
      <FontControls ref={ref} onChange={onChange} state={state} dispatch={dispatch} />
      <Main style={{ '--controlWidth': 336 + 'px' }}>
        <AnimatePresence>
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {view === 'help' ? (
              <HelpView state={state} />
            ) : view === 'code' ? (
              <CodeView styles={state.styles} />
            ) : (
              <MainView {...props} dispatch={dispatch} state={state} />
            )}
          </motion.div>
        </AnimatePresence>
      </Main>
    </>
  );
}
const Main = styled.div`
  position: absolute;
  top: var(--header-height);
  left: var(--controlWidth);
  right: 0;
  bottom: var(--footer-height);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const NoScript = styled.noscript`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  display: grid;
  place-items: center;
  font-size: var(--size52);
  font-family: recursive;
  font-variation-settings: 'wght' 800, 'slnt' -6, 'CRSV' 0, 'CASL' 0, 'MONO' 0;
  text-align: center;
`;
