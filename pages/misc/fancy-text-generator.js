import { FontControls } from '@components/Controls/FontControls';
import styled from 'styled-components';
import { useEffect, useReducer, useRef, useState } from 'react';
import { withGradient, Text } from '@components/GradientText';

import { textGeneratorVariant } from '@animations/variants';
import {
  makeShadow,
  makeGradient,
  snakeToCamel,
  pxToEm,
  parseFontSettings,
} from '@utils/helpers.js';

import Head from '@components/Head';
import { motion, AnimatePresence } from 'framer-motion';
import SyntaxHighlighter from '@components/SyntaxHighlighter';
import { Color } from 'color-tools';

import Help from '@components/Help';

const fontProperties = {
  Recursive: {
    MONO: [ 0, 1 ],
    CRSV: [ 0, 1 ],
    CASL: [ 0, 1 ],
    wght: [ 300, 1000 ],
    slnt: [ -15, 0 ],
  },
  OpenSans: {
    wght: [ 300, 800 ],
    wdth: [ 75, 100 ],
  },
  Jost: {
    wght: [ 100, 900 ],
    ital: [ 0, 2 ],
  },
  Decovar: {
    BLDA: [ 0, 1000 ],
    TRMD: [ 0, 1000 ],
    TRMC: [ 0, 1000 ],
    SKLD: [ 0, 1000 ],
    TRML: [ 0, 1000 ],
    SKLA: [ 0, 1000 ],
    TRMF: [ 0, 1000 ],
    TRMK: [ 0, 1000 ],
    BLDB: [ 0, 1000 ],
    WMX2: [ 0, 1000 ],
    TRMB: [ 0, 1000 ],
    TRMA: [ 0, 1000 ],
    SKLB: [ 0, 1000 ],
    TRMG: [ 0, 1000 ],
    TRME: [ 0, 1000 ],
  },
};

const data = {
  fonts: [
    {
      name: 'Recursive',
      settings: {
        wght: 800,
        slnt: -6,
        CASL: 0,
        CRSV: 0,
        MONO: 0,
      },
      default: true,
      homepage: 'https://www.recursive.design/',
      github: 'https://github.com/arrowtype/recursive',
    },

    {
      name: 'Decovar',
      settings: {
        BLDA: 0,
        TRMD: 1000,
        TRMC: 1000,
        SKLD: 260,
        TRML: 100,
        SKLA: 612,
        TRMF: 395,
        TRMK: 394,
        BLDB: 165,
        WMX2: 163,
        TRMB: 0,
        TRMA: 0,
        SKLB: 0,
        TRMG: 0,
        TRME: 204,
      },
      default: false,
      homepage:
        'https://www.typenetwork.com/brochure/decovar-a-decorative-variable-font-by-david-berlow',
      github: 'https://github.com/sannorozco/Decovar',
    },
    {
      name: 'Jost',
      settings: {
        wght: 600,
        ital: 1,
      },
      default: false,
      homepage: 'https://indestructibletype.com/Jost.html',
      github: 'https://github.com/indestructible-type/Jost',
    },
    {
      name: 'OpenSans',
      settings: {
        wght: 700,
        wdth: 95,
      },
      default: false,
      homepage: 'https://www.opensans.com/',
      github: 'https://github.com/googlefonts/opensans',
    },
  ],
};

const getDefaultFont = () => {
  const { name, settings } = data.fonts.find((font) => font.default);
  return { name, settings };
};

const getInitialSettings = (function parseFonts(fonts) {
  const defaultSettings = [ ...fonts ].map((font) => {
    return Object.assign({}, font);
  });
  return function getDefault(fontName) {
    return defaultSettings.find((font) => font.name === fontName);
  };
})(data.fonts);

const initialState = {
  font: getDefaultFont().name,
  settings: Object.assign({}, getDefaultFont().settings),

  fonts: data.fonts,
  fontSize: 10,
  gradientColorStart: '#00db87', //'gold', //'hsl(67deg, 75%, 42%)',
  gradientColorEnd: '#4dc4ff', //'darkorange', //'hsl(148deg 100% 19%)',
  gradientMidpoint: 50,
  gradientBlend: 50,
  gradientAngle: 180,
  shadowColorStart: '#aa00ff', //'hsl(210 35% 85%)', //'hsl(173deg 100% 67%)',
  shadowColorEnd: '#19103d', // 'hsl(195 65% 20%)', //'hsl(227deg 100% 52%)',
  shadowLayers: 20,
  shadowGap: 1,
  offsetX: -5,
  offsetY: -5,
  textStrokeColor: '#000000',
  textStrokeWidth: 0.35,
  blur: 1,
  toggleCode: false,
  isChangingFonts: false,
  showBackground: false,
  help: false,
};

function reducer(state, action) {
  const actionType = snakeToCamel(action.type);

  switch (action.type) {
    case 'GRADIENT_COLOR_START':
    case 'GRADIENT_COLOR_END':
    case 'SHADOW_COLOR_START':
    case 'SHADOW_COLOR_END':
    case 'SHADOW_LAYERS':
    case 'SHADOW_GAP':
    case 'OFFSET_X':
    case 'OFFSET_Y':
    case 'BLUR':
    case 'TEXT_STROKE_COLOR':
    case 'TEXT_STROKE_WIDTH':
    case 'FONT_SIZE':
    case 'GRADIENT_MIDPOINT':
    case 'GRADIENT_BLEND':
    case 'GRADIENT_ANGLE':
    case 'TOGGLE_CODE':
    case 'HELP':
    case 'IS_CHANGING_FONTS':
    case 'SHOW_BACKGROUND':
      return { ...state, [actionType]: action.value };
    case 'MONO':
    case 'CRSV':
    case 'CASL':
    case 'BLDA':
    case 'TRMD':
    case 'TRMC':
    case 'SKLD':
    case 'TRML':
    case 'SKLA':
    case 'TRMF':
    case 'TRMK':
    case 'BLDB':
    case 'WMX2':
    case 'TRMB':
    case 'TRMA':
    case 'SKLB':
    case 'TRMG':
    case 'TRME': {
      const settings = state.settings;
      return {
        ...state,
        settings: { ...settings, [action.type]: action.value },
      };
    }
    case 'WGHT':
    case 'SLNT':
    case 'WDTH':
    case 'ITAL': {
      const type = action.type.toLowerCase();
      const settings = state.settings;
      return { ...state, settings: { ...settings, [type]: action.value } };
    }

    case 'CHANGE_FONT': {
      const previousFont = state.font;
      const previousFontSettings = Object.assign({}, state.settings);

      let prev = state.fonts.find((font) => font.name === previousFont);
      prev.settings = previousFontSettings;
      const nextFont = action.value;
      const settings = state.fonts
        .filter((obj) => obj.name === nextFont)
        .map((obj) => obj.settings)[0];

      return {
        ...state,
        settings,
        previousFontSettings,
        previousFont,
        font: nextFont,
        change: true,
      };
    }

    case 'RESET': {
      const colorKeys = [
        'gradientColorStart',
        'gradientColorEnd',
        'shadowColorStart',
        'shadowColorEnd',
        'textStrokeColor',
      ];
      const initial = getInitialSettings(state.font).settings;
      const settings = state.settings;

      for (const key in settings) {
        settings[key] = initial[key];
      }
      for (const key in state) {
        if (key !== 'font') {
          if (colorKeys.includes(key)) {
            state[key] = new Color(initialState[key]).hex.css();
          }
          else {
            state[key] = initialState[key];
          }
        }
      }

      return { ...state, settings, font: state.font };
    }
    default:
      return { ...state };
  }
}

export default function VariableFontPlayground() {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const [ controlWidth, setControlWidth ] = useState(0);
  const [ fontVariationSettings, setFontVariationSettings ] = useState('');
  const [ initialSettings, setInitialSettings ] = useState('');
  const [ shadow, setShadow ] = useState('');
  const [ gradient, setGradient ] = useState('');
  const [ text, setText ] = useState('');

  const headingRef = useRef();
  const overflowRef = useRef();

  useEffect(() => {
    const fontVariationSettings = parseFontSettings(state.settings);
    const { settings } = getInitialSettings(state.font);
    const defaultSettings = parseFontSettings(settings);

    setFontVariationSettings(fontVariationSettings);
    setInitialSettings(defaultSettings);
  }, [ state ]);

  useEffect(() => {
    const shadow = makeShadow(state);
    setShadow(shadow);
  }, [ state, shadow ]);

  useEffect(() => {
    const gradient = makeGradient(state);
    setGradient(gradient);
  }, [ state, gradient ]);

  return (
    <>
      <Head title="Fancy Text Generator" description="Variable font and text shadow generator" />
      <Container>
        <ControlWrapper>
          <FontControls
            state={state}
            font={fontProperties[state.font]}
            dispatch={dispatch}
            setControlWidth={setControlWidth}
          />
        </ControlWrapper>

        <Main ref={overflowRef} style={{ '--controlWidth': controlWidth }}>
          <Wrapper>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={state.font}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <TextContent
                  key={state.font}
                  ref={headingRef}
                  style={{
                    '--fontSize': state.fontSize + 'vw',
                    '--fontFamily': state.font,
                  }}
                >
                  <Gradient
                    style={{
                      '--fontSize': `${state.fontSize}vw`,
                    }}
                    dispatch={dispatch}
                    state={state}
                    shadow={shadow}
                    gradient={gradient}
                    fontSize={`${state.fontSize}vw`}
                    strokeWidth={`${pxToEm(state.textStrokeWidth)}em`}
                    strokeColor={state.textStrokeColor}
                    fontVariationSettings={fontVariationSettings}
                    initialSettings={initialSettings}
                  >
                    {text || 'Click to edit'}
                  </Gradient>
                </TextContent>
              </motion.div>
            </AnimatePresence>

            <TextInput
              spellCheck={false}
              maxLength={50}
              state={state}
              onChange={(e) => {
                const text = e.target.value.replace(/'/g, '‘');
                const final = text.replace(/[\\]+/g, '');
                setText(final);
              }}
              style={{
                '--fontSize': state.fontSize + 'vw',
                '--fontFamily': state.font,
                '--fontVariationSettings': state.fontVariationSettings,
              }}
            />
          </Wrapper>

          <AnimatePresence exitBeforeEnter>
            {state.toggleCode ? (
              <CodeBlock
                key={state.toggleCode}
                state={state}
                fontFamily={state.font}
                shadow={shadow}
                gradient={gradient}
                fontSize={`${state.fontSize}vw`}
                strokeWidth={`${pxToEm(state.textStrokeWidth)}em`}
                strokeColor={state.textStrokeColor}
                fontVariationSettings={fontVariationSettings}
              />
            ) : state.help ? (
              <HelpContainer
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ width: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.8, ease: 'anticipate' }}
              >
                <Help key={state.help} />
              </HelpContainer>
            ) : null}
          </AnimatePresence>
        </Main>
      </Container>
      <NoScript>This tool requires javascript to work properly</NoScript>
    </>
  );
}

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

const getCss = ({
  shadow,
  gradient,
  fontVariationSettings,
  fontSize,
  strokeWidth,
  strokeColor,
  fontFamily,
}) => {
  const currentFont = data.fonts.find((font) => font.name === fontFamily);
  const staticCSS = `
/* 

${fontFamily}
  homepage: ${currentFont.homepage}
  github: ${currentFont.github}

*/

.fancy-text {
  --shadow: ${shadow || 'none'};
  --gradient: ${gradient};
  --fontFamily: ${fontFamily};
  --fontSize: ${fontSize};
  --fontVariationSettings: ${fontVariationSettings};
  --strokeWidth: ${strokeWidth};
  --strokeColor: ${strokeColor};

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  padding: 16px 0;

  font-family: var(--fontFamily);
  font-size: var(--fontSize);
  font-variation-settings: var(--fontVariationSettings);
  background-image: var(--gradient);
}

.fancy-text:before {
  /* 
    in your html: 
      <div class="fancy-text" data-content="your text here">
        your text here
      </div> 
  */
  content: attr(data-content);
  position: absolute;
  z-index: -1;

  text-shadow: var(--shadow);
  -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
}
`;

  return staticCSS;
};

const StaticCode = ({ children }) => {
  return (
    <div className="language-css" style={{ padding: '100px 0' }}>
      <div className="language-css">{children}</div>
    </div>
  );
};

const CodeBlock = (props) => {
  const {
    fontSize,
    strokeWidth,
    strokeColor,
    shadow,
    gradient,
    fontVariationSettings,
    fontFamily,
  } = props;

  return (
    <CodeWrapper
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ width: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, ease: 'anticipate' }}
    >
      <SyntaxHighlighter language="css">
        <StaticCode>
          {getCss({
            fontSize,
            strokeWidth,
            strokeColor,
            gradient,
            shadow,
            fontVariationSettings,
            fontFamily,
          })}
        </StaticCode>
      </SyntaxHighlighter>
    </CodeWrapper>
  );
};

const Container = styled.div``;

const Main = styled.div`
  position: absolute;
  top: var(--header-height);
  left: var(--controlWidth);
  right: 0;
  bottom: var(--footer-height);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CodeWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  left: 0;
  right: 0;
  top: 0;
`;

const HelpContainer = styled(CodeWrapper)``;

const TextContent = styled(motion.h1)`
  white-space: nowrap;
`;

const TextInput = styled.input`
  position: absolute;
  background: transparent;
  border: none;
  outline: none;
  top: 0;
  bottom: 0;
  width: 100%;

  font-size: var(--fontSize);
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontVariationSettings);
  caret-color: black;
  color: transparent;
  padding-left: 24px;

  &::selection {
    background: hsl(0 0% 20% / 0.3);
  }
`;

const Wrapper = styled.div`
  /* background: purple; */
  position: relative;
`;

const ControlWrapper = styled.div`
  /* margin-bottom: -96px; */
  overflow: auto;
  height: 0;
`;

const TextWrapper = styled(Text)`
  font-size: var(--fontSize);
  font-variation-settings: var(--fontVariationSettings);
  padding: 8px 24px;
  transition: font-size 0.3s linear;
`;

const GradientText = (props) => {
  const handleFontChange = () => {
    const { isChangingFonts } = props.state;
    if (isChangingFonts) {
      props.dispatch({ type: 'IS_CHANGING_FONTS', value: false });
    }
  };

  return (
    <TextWrapper
      {...props}
      variants={textGeneratorVariant}
      initial="hidden"
      animate="show"
      close="close"
      custom={props}
      onAnimationComplete={handleFontChange}
    >
      {props.children}
    </TextWrapper>
  );
};

const Gradient = withGradient(GradientText);
