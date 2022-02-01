import { Cube, Sphere } from '@components/Creature/Cube';
import ShapeControls from '@components/Controls/ShapeControls';
import styled from 'styled-components';
import Layout from '@components/Layout';
import { useEffect, useReducer, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from '@components/Head';
// import { MyCube, MySide } from '@components/Creature/Cube';
// import { Cube } from '@components/Creature/Cube';

const randomColor = () =>
  '#' +
  Math.random()
    .toString(16)
    .substring(2, 8);

const initialState = {
  rotateX: 355,
  rotateY: 360,
  rotateZ: 360,
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
  start: '#00bfff',
  end: '#050c6b',
  color: '#9ba84a',
  opacity: 1,
  outline: true,
};

function reducer(state, action) {
  console.log({ state, action });
  switch (action.type) {
    case 'ROTATE_X':
      return { ...state, rotateX: action.value };
    case 'ROTATE_Y':
      return { ...state, rotateY: action.value };
    case 'ROTATE_Z':
      return { ...state, rotateZ: action.value };
    case 'TRANSLATE_X':
      return { ...state, translateX: action.value };
    case 'TRANSLATE_Y':
      return { ...state, translateY: action.value };
    case 'TRANSLATE_Z':
      return { ...state, translateZ: action.value };
    case 'WIDTH':
      return { ...state, width: action.value };
    case 'HEIGHT':
      return { ...state, height: action.value };
    case 'DEPTH':
      return { ...state, depth: action.value };
    case 'SET_SHAPE':
      return { ...state, shape: action.value };
    case 'SPEED':
      return { ...state, speed: action.value };
    case 'SIDES':
      return { ...state, sides: action.value };
    case 'OUTLINE':
      return { ...state, outline: action.value };
    case 'START':
      return { ...state, start: action.value };
    case 'END':
      return { ...state, end: action.value };
    case 'COLOR':
      return { ...state, color: action.value };
    case 'BACKGROUND_TYPE':
      return { ...state, backgroundType: action.value };
    case 'OPACITY':
      return { ...state, opacity: action.value };
    case 'RADIUS':
      return { ...state, radius: action.value };
    case 'PERSPECTIVE':
      return { ...state, perspective: action.value };
    case 'RESET':
      return {
        ...initialState,
        sides: state.sides,
        speed: state.speed,
        shape: state.shape,
        start: state.start,
        end: state.end,
        color: state.color,
        backgroundType: state.backgroundType,
        opacity: state.opacity,
        outline: state.outline,
      };
    default:
      return { ...state };
  }
}

// const transition = {
//   duration: 2.2,
//   easing: [ 0.4, 0.32, 0.78, 0.55 ],
// };

const shapeVariants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { staggerChildren: 0.5 } },
  close: { opacity: 0, x: -40 },
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

  const Component = state.shape === 'Cube' ? Cube : Sphere;

  const radius = Component === Cube ? 0 : 50;
  const width = controlWidth < 200 ? 200 : controlWidth;

  console.log(state.width, state.height);

  const m = (parseInt(state.width) + parseInt(state.height)) / 2;

  const lid = m * 0.1 * 2.5;
  console.log({ lid });

  return (
    <>
      <Head
        title="Experiments with a cube"
        description="A tool for visualizing 3d transforms"
      />

      <AnimatePresence exitBeforeEnter>
        <Grid style={{ '--controlWidth': `${width}px` }}>
          <Wrapper>
            <Component
              ref={ref}
              blink
              eyelid={lid}
              sides={state.sides}
              $backgroundDisplay={state.backgroundDisplay}
              start={state.start}
              end={state.end}
              color={state.color}
              $backgroundType={state.backgroundType}
              opacity={state.opacity}
              $outline={state.outline}
              width={state.width}
              height={state.height}
              speed={state.speed}
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
                '--transition': `transform ${state.speed}s linear`,
                '--speed': `${state.speed}s`,
                '--radius': `${radius}%`,
              }}
            />
          </Wrapper>
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
        </Grid>
      </AnimatePresence>
    </>
  );
}

const Grid = styled(Layout)`
  grid-template-columns: var(--controlWidth) 1fr;
  grid-template-rows: var(--header-height) 1fr;
  margin-bottom: 0;
  padding: 0;
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
  overflow: auto;
  height: 0;
`;
