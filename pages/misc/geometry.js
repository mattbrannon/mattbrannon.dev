import { ShapeControls } from '@components/Controls/ShapeControls';
// import { Cube } from '@components/Creature/Cube';
import { NormalCube as Cube } from '@components/Creature';
import Head from '@components/Head';
import { Globe } from '@components/Shapes';
import { snakeToCamel, toSnakeUpperCase } from '@utils/helpers.js';
import { lighten } from '@utils/colors.js';
import { AnimatePresence, m as motion } from 'framer-motion';
import { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { useResizeObserver } from '@hooks/useResizeObserver';
import { initialShapeState } from '@constants/geometry';
import { shapeReducer } from '@utils/reducers';

// const initialState = {
//   rotateX: 155,
//   rotateY: 160,
//   rotateZ: 160,
//   translateX: 0,
//   translateY: 0,
//   translateZ: 0,
//   width: 150,
//   height: 150,
//   depth: 100,
//   translateEyeX: 0,
//   translateEyeY: 0,
//   shape: 'Cube',
//   speed: 1,
//   sides: 12,
//   radius: 0,
//   backgroundDisplay: true,
//   backgroundType: 'linear-gradient',
//   gradientColorStart: '#00bfff',
//   gradientColorEnd: '#050c6b',
//   color: '#9ba84a',
//   outline: true,
//   cubeOpacity: 1,
//   cubeBackground: '#D2B48C',
//   cubeHairColor: '#654321',
//   cubeEyeColor: '#8cbecf',
// };

// function reducer(state, action) {
//   const actionType = snakeToCamel(action.type);

//   switch (action.type) {
//     case 'ROTATE_X':
//     case 'ROTATE_Y':
//     case 'ROTATE_Z':
//     case 'TRANSLATE_X':
//     case 'TRANSLATE_Y':
//     case 'TRANSLATE_Z':
//     case 'WIDTH':
//     case 'HEIGHT':
//     case 'DEPTH':
//     case 'SHAPE':
//     case 'SPEED':
//     case 'SIDES':
//     case 'OUTLINE':
//     case 'GRADIENT_COLOR_START':
//     case 'GRADIENT_COLOR_END':
//     case 'GRADIENT_BLEND':
//     case 'GRADIENT_MIDPOINT':
//     case 'GRADIENT_ANGLE':
//     case 'COLOR':
//     case 'CUBE_HAIR_COLOR':
//     case 'CUBE_EYE_COLOR':
//     case 'CUBE_BACKGROUND':
//     case 'CUBE_OPACITY':
//     case 'BACKGROUND_TYPE':
//     case 'RADIUS':
//     case 'PERSPECTIVE':
//       return { ...state, [actionType]: action.value };
//     case 'RESET': {
//       return {
//         ...initialState,
//         sides: state.sides,
//         speed: state.speed,
//         shape: state.shape,
//         start: state.gradientStart,
//         // width: resetDimensions().width,
//         // height: resetDimensions().height,
//         // depth: resetDimensions().depth,
//         // width: state.shape === 'Cube' ? state.width : initialState.width,
//         // height: state.shape === 'Cube' ? state.height : initialState.height,
//         // depth: state.shape === 'Cube' ? state.depth : initialState.depth,
//         end: state.gradientEnd,
//         color: state.color,
//         backgroundType: state.backgroundType,
//         opacity: state.opacity,
//         outline: state.outline,
//       };
//     }
//     default:
//       return { ...state };
//   }
// }

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
  const [state, dispatch] = useReducer(shapeReducer, initialShapeState);
  const [cubeWidth, setCubeWidth] = useState(0);
  const [cubeHeight, setCubeHeight] = useState(0);
  const [controlWidth, setControlWidth] = useState(0);
  const shapeRef = useRef();
  const controlRef = useRef();
  const size = useResizeObserver(shapeRef);

  // const [hairColor, setHairColor] = useState('#654321');

  useEffect(() => {
    if (shapeRef && shapeRef.current) {
      const width = size?.contentBoxSize?.inlineSize ?? 0;
      const height = size?.contentBoxSize?.blockSize ?? 0;

      setCubeWidth(width);
      setCubeHeight(height);
    }
  }, [size]);

  const Component = state.shape === 'Cube' ? Cube : Globe;

  const radius = Component === Cube ? 0 : 50;
  const width = controlWidth < 200 ? 200 : controlWidth;

  const onChange = (e) => {
    const type = toSnakeUpperCase(e.target.name);
    dispatch({ type, value: e.target.value });
  };

  return (
    <>
      <Head title="Experiments with a cube" description="A tool for visualizing 3d transforms" />
      <div style={{ '--controlWidth': `${width}px` }}>
        <ShapeControls
          ref={controlRef}
          cubeHeight={state.cubeHeight}
          cubeWidth={state.cubeWidth}
          shapeRef={shapeRef}
          visible
          state={state}
          onChange={onChange}
          dispatch={dispatch}
          setControlWidth={setControlWidth}
          controlWidth={controlWidth}
        />

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
                ref={shapeRef}
                blink
                state={state}
                hairColor={state.cubeHair}
                background={state.cubeMain}
                hair={
                  state.cubeWidth === 300
                    ? 'huge'
                    : state.cubeWidth < 300 && state.cubeWidth >= 250
                    ? 'large'
                    : state.cubeWidth < 250 && state.cubeWidth >= 200
                    ? 'medium'
                    : state.cubeWidth < 200 && state.cubeWidth >= 150
                    ? 'small'
                    : 'long'
                }
                // sides={state.sides}
                // size={{ width: state.cubeWidth, height: state.cubeHeight }}
                // speed={state.speed}
                // shape={state.shape}
                style={{
                  '--rotateX': `${state.rotateXAxis}deg`,
                  '--rotateY': `${state.rotateYAxis}deg`,
                  '--rotateZ': `${state.rotateZAxis}deg`,
                  '--translateX': `${state.translateXAxis}px`,
                  '--translateY': `${state.translateYAxis}px`,
                  '--translateZ': `${state.translateZAxis}px`,
                  '--cube-width': `${state.cubeWidth}px`,
                  '--cube-height': `${state.cubeHeight}px`,
                  '--cube-depth': `${state.cubeDepth}px`,
                  '--speed': `${state.speed}s`,
                  '--radius': `${radius}%`,
                  '--outline': state.outline ? '1px solid black' : 'none',
                  '--opacity': state.cubeOpacity,
                  '--eyeColor': state.cubeEyes,
                  '--eyelidColor': lighten(state.cubeMain, 24),
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
