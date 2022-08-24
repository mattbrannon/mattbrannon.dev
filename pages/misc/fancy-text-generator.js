import styled from 'styled-components';
import { useState, useReducer, useEffect, useRef } from 'react';
import { fonts, fancyTextInitialState } from '@constants/fancyTextGenerator';
// import { fancyTextReducer } from '@utils/reducers';

import { FontControls } from '@components/Controls/FontControls';

import { MainView, HelpView, CodeView } from 'views/FancyTextGenerator';

import { AnimatePresence } from 'framer-motion';
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
  textContent: 'Blah blah blah',

  shadow: {
    shadowColorStart: '#cdbdb6',
    shadowColorEnd: '#3e3532',
    shadowLayers: 10,
    shadowGap: 2,
    shadowBlur: 1,
    shadowOffsetX: -5,
    shadowOffsetY: -5,
  },
  gradient: {
    gradientColorStart: '#082640',
    gradientColorEnd: '#97f7f1',
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

  styles: {
    fontFamily: 'Recursive',
    fontSize: 96,
    strokeWidth: 0.02,
    strokeColor: '#536897',
    letterSpacing: 0.05,
    fontVariationSettings: parseFontSettings({ wght: 1000, slnt: 0, CASL: 0, CRSV: 0, MONO: 0 }),
    gradient: makeGradient({
      gradientColorStart: '#082640',
      gradientColorEnd: '#97f7f1',
      gradientAngle: 0,
      gradientMidpoint: 50,
      gradientBlend: 50,
    }),
    shadow: makeShadow({
      shadowColorStart: '#cdbdb6',
      shadowColorEnd: '#3e3532',
      shadowLayers: 10,
      shadowGap: 2,
      shadowBlur: 1,
      shadowOffsetX: -5,
      shadowOffsetY: -5,
    }),
  },
};

// const fancyTextReducer = (state, action) => {
//   switch (action.type) {
//     case 'gradient_Color_Start':
//     case 'gradient_Color_End':
//     case 'gradient_Angle':
//     case 'gradient_Midpoint':
//     case 'gradient_Blend': {
//       const gradientState = { ...state.gradient, [action.type]: action.value };
//       const gradient = makeGradient(gradientState);
//       const styles = { ...state.styles };
//       return {
//         ...state,
//         gradient: { ...gradientState },
//         styles: { ...styles, gradient },
//       };
//     }
//     case 'shadowColorStart':
//     case 'shadowColorEnd':
//     case 'shadowLayers':
//     case 'shadowGap':
//     case 'shadowBlur':
//     case 'shadowOffsetX':
//     case 'shadowOffsetY': {
//       const shadowState = { ...state.shadow, [action.type]: action.value };
//       const shadow = makeShadow(shadowState);
//       const styles = { ...state.styles };
//       return {
//         ...state,
//         shadow: { ...shadowState },
//         styles: { ...styles, shadow },
//       };
//     }
//     case 'wght':
//     case 'slnt':
//     case 'ital':
//     case 'wdth':
//     case 'CASL':
//     case 'CRSV':
//     case 'MONO':
//     case 'BLDA':
//     case 'BLDB':
//     case 'SKLA':
//     case 'SKLB':
//     case 'SKLD':
//     case 'TRMA':
//     case 'TRMB':
//     case 'TRMC':
//     case 'TRMD':
//     case 'TRME':
//     case 'TRMF':
//     case 'TRMG':
//     case 'TRMK':
//     case 'TRML':
//     case 'WMX2': {
//       const fontFamily = state.fontFamily;
//       const currentFont = { ...state.fonts[fontFamily] };
//       const { currentSettings, initialSettings } = currentFont;
//       const updatedSettings = { ...currentSettings, [action.type]: action.value };
//       const fontVariationSettings = parseFontSettings(updatedSettings);
//       return {
//         ...state,
//         fonts: {
//           ...state.fonts,
//           [fontFamily]: {
//             initialSettings,
//             currentSettings: updatedSettings,
//           },
//         },
//         styles: {
//           ...state.styles,
//           fontVariationSettings,
//         },
//       };
//     }
//     case 'fontFamily':
//     case 'fontSize':
//     case 'strokeWidth':
//     case 'strokeColor':
//     case 'letterSpacing': {
//       const styles = { ...state.styles };
//       return { ...state, styles: { ...styles, [action.type]: action.value } };
//     }
//   }
// };

const fancyTextReducer = (state, action) => {
  switch (action.type) {
    case 'GRADIENT_COLOR_START':
    case 'GRADIENT_COLOR_END':
    case 'GRADIENT_ANGLE':
    case 'GRADIENT_MIDPOINT':
    case 'GRADIENT_BLEND': {
      const type = snakeToCamel(action.type);
      console.log(type);
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
  }
};

export default function Page() {
  const [state, dispatch] = useReducer(fancyTextReducer, initialState);

  const onChange = (e) => {
    const type = toSnakeUpperCase(e.target.name);
    dispatch({ type, value: e.target.value });
  };

  return (
    <>
      <FontControls onChange={onChange} state={state} dispatch={dispatch} />
      <Main style={{ '--controlWidth': 320 + 'px' }}>
        <MainView state={state}>{state.textContent}</MainView>

        {/* <AnimatePresence exitBeforeEnter>
          {state.help ? (
            <HelpView key={state.help} />
          ) : state.code ? (
            <CodeView key={state.code} styles={state} />
          ) : (
            <MainView state={state}>{state.textContent}</MainView>
          )}
        </AnimatePresence> */}
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

/*

import styled from 'styled-components';
import { useState, useReducer, useEffect, useRef } from 'react';
import {
  fonts,
  gradientDefault,
  shadowDefault,
  textDefault,
  buttonDefault,
} from '@constants/fancyTextGenerator';

import { FontControls } from '@components/Controls/FontControls';

import {
  fontReducer,
  gradientReducer,
  shadowReducer,
  initializeFontState,
  textReducer,
  buttonReducer,
} from '@utils/reducers';

import { MainView, HelpView, CodeView } from 'views/FancyTextGenerator';

import { AnimatePresence } from 'framer-motion';
import { parseFontSettings } from '@utils/helpers';
import FancyTitle from '@components/FancyTitle';

export default function Page() {
  const initialFontState = initializeFontState(fonts);
  const [font, dispatch] = useReducer(fontReducer, initialFontState);
  const [gradient, gradientDispatch] = useReducer(gradientReducer, gradientDefault);
  const [shadow, shadowDispatch] = useReducer(shadowReducer, shadowDefault);
  const [show, buttonDispatch] = useReducer(buttonReducer, buttonDefault);
  const [text, textDispatch] = useReducer(textReducer, textDefault);
  const [controlWidth, setControlWidth] = useState(0);
  const controlRef = useRef();
  const [styles, setStyles] = useState({});

  // useEffect(() => {
  //   if (show.reset) {
  //     const { current, settings } = font.savedStates.find((savedState) => {
  //       return savedState.name === font.fontName;
  //     });

  //     font.css = parseFontSettings(settings);

  //     console.log(current, settings);
  //   }
  // }, [show.reset]);

  useEffect(() => {
    // font.find(font => font.f)
    setStyles({
      initial: font.initialCss,
      current: font.currentCss,
      gradient: gradient.css,
      shadow: shadow.css,
      letterSpacing: `${text.letterSpacing}em`,
      fontSize: `${text.fontSize}px`,
      strokeWidth: `${text.strokeWidth}em`,
      strokeColor: `${text.strokeColor}`,
      fontSettings: font.css,
      fontFamily: font.fontName,
    });
  }, [gradient, shadow, font, text]);

  useEffect(() => {
    const { width } = controlRef.current.getBoundingClientRect();
    // console.log(width);
    setControlWidth(width);
  }, []);

  const onChange = (e) => {
    const reducerType = e.target.name.slice(0, e.target.name.indexOf(' '));
    const actionType = e.target.name.toUpperCase().split(' ').slice(1).join('_');

    const callback =
      reducerType === 'gradient'
        ? gradientDispatch
        : reducerType === 'shadow'
        ? shadowDispatch
        : reducerType === 'text'
        ? textDispatch
        : dispatch;

    callback({ type: actionType, value: e.target.value });
  };

  const onClick = (e) => {
    const name = e.target.name;
    buttonDispatch({ type: name.toUpperCase(), value: !show[name] });
  };

  return (
    <>
      <FontControls
        ref={controlRef}
        dispatch={dispatch}
        onChange={onChange}
        onClick={onClick}
        setControlWidth={setControlWidth}
        font={font}
        gradient={gradient}
        shadow={shadow}
        text={text}
        show={show}
      />
      <Main style={{ '--controlWidth': 320 + 'px' }}>
        <AnimatePresence exitBeforeEnter>
          {show.help ? (
            <HelpView key={show.help} />
          ) : show.code ? (
            <CodeView key={show.code} styles={styles} />
          ) : (
            <MainView styles={styles} show={show}>
              {text.content}
            </MainView>
          )}
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

// import styled from 'styled-components';
// import { useState, useReducer, useEffect, useRef } from 'react';
// import {
//   fonts,
//   gradientDefault,
//   shadowDefault,
//   textDefault,
//   buttonDefault,
//   fancyTextInitialState,
// } from '@constants/fancyTextGenerator';

// import { FontControls } from '@components/Controls/FontControls';

// import {
//   fontReducer,
//   gradientReducer,
//   shadowReducer,
//   initializeFontState,
//   textReducer,
//   buttonReducer,
//   fancyTextReducer,
// } from '@utils/reducers';

// import { MainView, HelpView, CodeView } from 'views/FancyTextGenerator';

// import { AnimatePresence } from 'framer-motion';
// import { parseFontSettings } from '@utils/helpers';

// export default function Page() {
//   // const initialFontState = initializeFontState(fonts);
//   // const [font, fontDispatch] = useReducer(fontReducer, initialFontState);
//   // const [gradient, gradientDispatch] = useReducer(gradientReducer, gradientDefault);
//   // const [shadow, shadowDispatch] = useReducer(shadowReducer, shadowDefault);
//   // const [show, buttonDispatch] = useReducer(buttonReducer, buttonDefault);
//   // const [text, textDispatch] = useReducer(textReducer, textDefault);
//   const [state, dispatch] = useReducer(fancyTextReducer, fancyTextInitialState);

//   const [controlWidth, setControlWidth] = useState(0);

//   const controlRef = useRef();

//   useEffect(() => {
//     const { width } = controlRef.current.getBoundingClientRect();
//     // console.log(width);
//     setControlWidth(width);
//   }, []);

//   // useEffect(() => {
//   //   console.log(state);
//   // }, [state]);

//   // const onChange = (e) => {
//   //   const reducerType = e.target.name.slice(0, e.target.name.indexOf(' '));
//   //   const actionType = e.target.name.toUpperCase().split(' ').slice(1).join('_');

//   //   const callback =
//   //     reducerType === 'gradient'
//   //       ? gradientDispatch
//   //       : reducerType === 'shadow'
//   //       ? shadowDispatch
//   //       : reducerType === 'text'
//   //       ? textDispatch
//   //       : dispatch;

//   //   callback({ type: actionType, value: e.target.value });
//   // };

//   const onChange = (e) => {
//     // const type = e.target.name.toUpperCase().split(' ').join('_');
//     const [actionType, actionProperty] = e.target.name
//       .split(' ')
//       .map((word) => word.replace('-', '_').toUpperCase());

//     dispatch({ type: actionType, property: actionProperty, value: e.target.value });
//     // console.log(t, e.target.value);
//     // dispatch({ type, value: e.target.value });
//   };

//   const onClick = (e) => {
//     const name = e.target.name;
//     dispatch({ type: name.toUpperCase(), value: !state[name] });
//   };

//   // const onClick = (e) => {
//   //   const name = e.target.name;
//   //   buttonDispatch({ type: name.toUpperCase(), value: !show[name] });
//   // };

//   return (
//     <>
//       <FontControls
//         ref={controlRef}
//         dispatch={dispatch}
//         onChange={onChange}
//         // onClick={onClick}
//         // setControlWidth={setControlWidth}
//         // font={font}
//         // show={show}
//         state={state}
//       />
//       <Main style={{ '--controlWidth': 320 + 'px' }}>
//         <AnimatePresence exitBeforeEnter>
//           {state.help ? (
//             <HelpView key={state.help} />
//           ) : state.code ? (
//             <CodeView key={state.code} styles={{ ...state.css }} />
//           ) : (
//             <MainView
//               // font={font}
//               // gradient={gradient.css}
//               // shadow={shadow.css}
//               // text={text}
//               // show={show}
//               state={state}
//               // dispatch={textDispatch}
//             >
//               blah blah blah
//             </MainView>
//           )}
//         </AnimatePresence>
//       </Main>
//     </>
//   );
// }
// const Main = styled.div`
//   position: absolute;
//   top: var(--header-height);
//   left: var(--controlWidth);
//   right: 0;
//   bottom: var(--footer-height);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow-x: hidden;
// `;

// const NoScript = styled.noscript`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   z-index: -1;
//   display: grid;
//   place-items: center;
//   font-size: var(--size52);
//   font-family: recursive;
//   font-variation-settings: 'wght' 800, 'slnt' -6, 'CRSV' 0, 'CASL' 0, 'MONO' 0;
//   text-align: center;
// `;


*/
