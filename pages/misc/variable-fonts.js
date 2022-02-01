// import Cube from '@components/Creature';
import { FontControls } from '@components/Controls/FontControls';
import styled from 'styled-components';
import Layout from '@components/Layout';
import { useEffect, useReducer, useRef, useState } from 'react';
import GradientText from '@components/GradientText';
import { makeShadow, snakeToCamel, pxToEm } from '@utils/helpers';
import Head from '@components/Head';

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
        CASL: 0.5,
        CRSV: 1,
        MONO: 0,
      },
      default: true,
    },

    {
      name: 'Decovar',
      settings: {
        BLDA: 1000,
        TRMD: 0,
        TRMC: 0,
        SKLD: 455,
        TRML: 0,
        SKLA: 384,
        TRMF: 405,
        TRMK: 0,
        BLDB: 0,
        WMX2: 176,
        TRMB: 0,
        TRMA: 0,
        SKLB: 0,
        TRMG: 491,
        TRME: 0,
      },
      default: false,
    },
    {
      name: 'Jost',
      settings: {
        wght: 600,
        ital: 1,
      },
      default: false,
    },
    {
      name: 'OpenSans',
      settings: {
        wght: 700,
        wdth: 95,
      },
      default: false,
    },
  ],
};

const getDefaultFont = () => {
  const { name, settings } = data.fonts.find((font) => font.default);
  return { name, settings };
};

//  #a8bb1b
//  #00612d
//  #147500
//  #081900
//  #143800

const initialState = {
  font: getDefaultFont().name,
  settings: getDefaultFont().settings,

  fonts: data.fonts,
  fontSize: 10,
  startColor: '#a8bb1b', //'hsl(67deg, 75%, 42%)',
  endColor: '#00612d', //'hsl(148deg 100% 19%)',
  shadowColorStart: '#147500', //'hsl(173deg 100% 67%)',
  shadowColorEnd: '#081900', //'hsl(227deg 100% 52%)',
  shadowLayers: 7,
  shadowOffset: 2,
  textStrokeColor: '#143800',
  textStrokeWidth: 0.5,
  offsetX: -5,
  offsetY: -5,
  blur: 1,
};

function reducer(state, action) {
  const actionType = snakeToCamel(action.type);

  switch (action.type) {
    case 'START_COLOR':
    case 'END_COLOR':
    case 'SHADOW_COLOR_START':
    case 'SHADOW_COLOR_END':
    case 'SHADOW_LAYERS':
    case 'SHADOW_OFFSET':
    case 'OFFSET_X':
    case 'OFFSET_Y':
    case 'BLUR':
    case 'TEXT_STROKE_COLOR':
    case 'TEXT_STROKE_WIDTH':
    case 'FONT_SIZE':
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
      return { ...state, settings: { ...settings, [action.type]: action.value } };
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
      const font = action.value;

      const settings = state.fonts
        .filter((obj) => obj.name === font)
        .map((obj) => obj.settings)[0];

      return { ...state, settings, font };
    }

    case 'GET_CSS': {
      console.log(state);

      return { ...state };
    }

    case 'RESET': {
      const settings = state.settings;
      for (const key in settings) {
        settings[key] = 0;
      }
      return { ...initialState, settings, font: state.font };
    }
    default:
      return { ...state };
  }
}

// const makeOutline = (color, size) => {
//   return `-${size}px -${size}px 0 ${color},
//   ${size}px -${size}px 0 ${color},
//   -${size}px ${size}px 0 ${color},
//   ${size}px ${size}px 0 ${color};`;
// };

const getShadowConfig = (state) => {
  const {
    shadowColorStart,
    shadowColorEnd,
    shadowLayers,
    shadowOffset,
    offsetX,
    offsetY,
    blur,
  } = state;

  return {
    x: offsetX,
    y: offsetY,
    blurAmount: blur,
    offsetAmount: shadowOffset,
    layers: shadowLayers,
    startColor: shadowColorStart,
    endColor: shadowColorEnd,
  };
};

export default function VariableFontPlayground() {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const [ controlWidth, setControlWidth ] = useState(0);
  const [ css, setCss ] = useState('');
  const [ shadow, setShadow ] = useState('');
  const ref = useRef();

  const width = controlWidth < 220 ? 220 : controlWidth;

  useEffect(() => {
    const parseSettings = () => {
      const settings = state.settings;
      return Object.keys(settings)
        .reduce((acc, prop) => {
          acc = acc.concat(`"${prop}" ${settings[prop]}`);
          return acc;
        }, [])
        .join(', ');
    };
    const css = parseSettings();
    setCss(css);
  }, [ state ]);

  useEffect(() => {
    const config = getShadowConfig(state);
    const shadow = makeShadow(config);
    setShadow(shadow);
  }, [ state, shadow ]);

  const getCss = () => {
    // const styles = window.getComputedStyle(ref.current);
    const styleProps = [
      'content',
      'position',
      'text-shadow',
      'transform',
      '-webkit-text-stroke-color',
      '-webkit-text-stroke-width',
      'z-index',
    ];
    const styles = getComputedStyle(ref.current, ':after');

    const obj = styleProps.reduce((acc, prop) => {
      let value = styles.getPropertyValue(prop);
      if (prop === '-webkit-text-stroke-width') {
        value = pxToEm(state.textStrokeWidth) + 'em';
      }
      if (prop === 'text-shadow') {
        value = shadow;
      }
      if (prop === 'transform') {
        value = 'translateX(-100%)';
      }
      acc[prop] = value;
      return acc;
    }, {});

    console.log(obj);
  };

  return (
    <>
      <Head
        title="Experiments with text"
        description="Variable font and text shadow generator"
      />

      <Grid style={{ '--controlWidth': `${width}px` }}>
        <Wrapper>
          <TextContent
            style={{
              '--fontSize': state.fontSize + 'vw',
              '--fontFamily': state.font,
              '--fontVariationSettings': css,
              '--startColor': state.startColor,
              '--endColor': state.endColor,
            }}
          >
            <GradientText
              ref={ref}
              shadow={shadow}
              strokeWidth={state.textStrokeWidth}
              strokeColor={state.textStrokeColor}
              startColor={state.startColor}
              endColor={state.endColor}
              style={{
                '--shadow': shadow,
              }}
            >
              Testing
            </GradientText>
          </TextContent>
        </Wrapper>
        <ControlWrapper>
          <FontControls
            getCss={getCss}
            state={state}
            font={fontProperties[state.font]}
            dispatch={dispatch}
            setControlWidth={setControlWidth}
          />
        </ControlWrapper>
      </Grid>
    </>
  );
}

const Grid = styled(Layout)`
  grid-template-columns: var(--controlWidth) 1fr;
  grid-template-rows: var(--header-height) 1fr;
  margin-bottom: 0;
  padding: 0;
`;

const TextContent = styled.h1`
  font-family: var(--fontFamily);
  font-size: var(--fontSize);
  ${'' /* font-variation-settings: var(--fontVariationSettings); */}
  transition: all 1s linear;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  grid-row: 1 / -1;
  grid-column: 2;
  display: flex;
  justify-content: center;
  overflow: hidden;

  align-self: center;
  display: grid;
  grid-template-columns: 100%;
  place-items: center;
`;

const ControlWrapper = styled.div`
  ${'' /* margin-bottom: -96px; */}
  overflow: auto;
  height: 0;
`;
