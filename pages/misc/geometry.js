import ShapeControls from '@components/Controls/ShapeControls';
// import { Cube } from '@components/Creature/Cube';
import { ForwardedCube as Cube } from '@components/Shapes/Cube';
import Head from '@components/Head';
import Globe from '@components/Shapes/Globe';
import { snakeToCamel } from '@utils/helpers.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';

const initialState = {
  rotateX: 155,
  rotateY: 160,
  rotateZ: 160,
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  width: 300,
  height: 300,
  depth: 100,
  translateEyeX: 0,
  translateEyeY: 0,
  shape: 'Sphere',
  speed: 1,
  sides: 12,
  radius: 0,
  backgroundDisplay: true,
  backgroundType: 'linear-gradient',
  gradientColorStart: '#00bfff',
  gradientColorEnd: '#050c6b',
  color: '#9ba84a',
  hairColor: '#654321',
  opacity: 1,
  outline: true,
};

function reducer(state, action) {
  const actionType = snakeToCamel(action.type);

  switch (action.type) {
    case 'ROTATE_X':
    case 'ROTATE_Y':
    case 'ROTATE_Z':
    case 'TRANSLATE_X':
    case 'TRANSLATE_Y':
    case 'TRANSLATE_Z':
    case 'WIDTH':
    case 'HEIGHT':
    case 'DEPTH':
    case 'SHAPE':
    case 'SPEED':
    case 'SIDES':
    case 'OUTLINE':
    case 'GRADIENT_COLOR_START':
    case 'GRADIENT_COLOR_END':
    case 'GRADIENT_BLEND':
    case 'GRADIENT_MIDPOINT':
    case 'GRADIENT_ANGLE':
    case 'COLOR':
    case 'HAIR_COLOR':
    case 'BACKGROUND_TYPE':
    case 'OPACITY':
    case 'RADIUS':
    case 'PERSPECTIVE':
      return { ...state, [actionType]: action.value };
    case 'RESET': {
      return {
        ...initialState,
        sides: state.sides,
        speed: state.speed,
        shape: state.shape,
        start: state.gradientStart,
        // width: resetDimensions().width,
        // height: resetDimensions().height,
        // depth: resetDimensions().depth,
        // width: state.shape === 'Cube' ? state.width : initialState.width,
        // height: state.shape === 'Cube' ? state.height : initialState.height,
        // depth: state.shape === 'Cube' ? state.depth : initialState.depth,
        end: state.gradientEnd,
        color: state.color,
        backgroundType: state.backgroundType,
        opacity: state.opacity,
        outline: state.outline,
      };
    }
    default:
      return { ...state };
  }
}

const shapeVariants = {
  hidden: ({ speed }) => {
    // const scale = shape === 'Cube' ? 1 : 0;
    return {
      opacity: 0,
      scale: 0,
      transition: { duration: speed },
    };
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1 },
  },
  close: {
    opacity: 0,
    x: 700,
    transition: { duration: 1 },
  },
};

export default function Experiments() {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const [ cubeWidth, setCubeWidth ] = useState(0);
  const [ cubeHeight, setCubeHeight ] = useState(0);
  const [ controlWidth, setControlWidth ] = useState(0);

  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current) {
      const styles = window.getComputedStyle(ref.current);
      const width = styles.width.match(/\d+/g).join('');
      const height = styles.height.match(/\d+/g).join('');

      setCubeWidth(Number(width));
      setCubeHeight(Number(height));
    }
  }, [ ref ]);

  const Component = state.shape === 'Cube' ? Cube : Globe;

  const radius = Component === Cube ? 0 : 50;
  const width = controlWidth < 200 ? 200 : controlWidth;

  // const transitionProperties = state.shape === 'Sphere' ? 'all' : 'all';

  // const transition = `${transitionProperties} ${state.speed}s linear`;

  // const transition = '';
  // const m = (parseInt(state.width) + parseInt(state.height)) / 2;
  // const lid = m * 0.1 * 2.5;

  // console.log({ hair: state.hairColor });

  return (
    <>
      <Head title="Experiments with a cube" description="A tool for visualizing 3d transforms" />
      <div style={{ '--controlWidth': `${width}px` }}>
        <ControlWrapper>
          <ShapeControls
            cubeHeight={cubeHeight}
            cubeWidth={cubeWidth}
            visible
            state={state}
            dispatch={dispatch}
            setControlWidth={setControlWidth}
          />
        </ControlWrapper>

        <Main>
          <AnimatePresence exitBeforeEnter>
            <Wrapper
              key={state.shape}
              variants={shapeVariants}
              custom={state}
              initial="hidden"
              animate="show"
              exit="close"
            >
              <Component
                ref={ref}
                blink
                state={state}
                hair={
                  state.width === 300
                    ? 'huge'
                    : state.width < 300 && state.width >= 250
                    ? 'large'
                    : state.width < 250 && state.width >= 200
                    ? 'medium'
                    : state.width < 200 && state.width >= 150
                    ? 'small'
                    : 'long'
                }
                sides={state.sides}
                backgroundDisplay={state.backgroundDisplay}
                start={state.gradientStart}
                end={state.gradientEnd}
                color={state.color}
                hairColor={state.hairColor}
                backgroundType={state.backgroundType}
                opacity={state.opacity}
                outline={state.outline}
                width={state.width}
                height={state.height}
                size={{ width: state.width, height: state.height }}
                speed={state.speed}
                shape={state.shape}
                // transition={transition}
                style={{
                  '--rotateX': `${state.rotateX}deg`,
                  '--rotateY': `${state.rotateY}deg`,
                  '--rotateZ': `${state.rotateZ}deg`,
                  '--translateX': `${state.translateX}px`,
                  '--translateY': `${state.translateY}px`,
                  '--translateZ': `${state.translateZ}px`,
                  '--cube-width': `${state.width}px`,
                  '--cube-height': `${state.height}px`,
                  '--cube-depth': `${state.depth}px`,
                  '--perspective': `${state.perspective}px`,
                  '--translateEyeX': `${state.translateEyeX}px`,
                  '--translateEyeY': `${state.translateEyeY}px`,
                  // '--transition': transition,
                  '--speed': `${state.speed}s`,
                  '--radius': `${radius}%`,
                  '--outline': state.outline ? `1px solid black` : 'none',
                  '--opacity': state.opacity,
                  '--solidColor': state.color,
                  '--gradientColorStart': state.gradientColorStart,
                  '--gradientColorEnd': state.gradientColorEnd,

                  // '--background': background,
                }}
              />
            </Wrapper>
          </AnimatePresence>
        </Main>
      </div>
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

const Wrapper = styled(motion.div)`
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
  overflow: auto;
  height: 0;
`;

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
