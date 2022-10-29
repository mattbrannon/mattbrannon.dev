import { ShapeControls } from '@components/Controls/ShapeControls';
// import { Cube } from '@components/Creature/Cube';
import { creature } from '@components/Creature';
import Head from '@components/Head';
// import { Globe } from '@components/Shapes';
import { GlobeView } from './GlobeView';
import { snakeToCamel, toSnakeUpperCase } from '@utils/helpers.js';
import { lighten } from '@utils/colors.js';
import { AnimatePresence, m as motion } from 'framer-motion';
import { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { useResizeObserver } from '@hooks/useResizeObserver';
import { initialShapeState } from '@constants/geometry';
import { shapeReducer } from '@utils/reducers';

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
  const [controlWidth, setControlWidth] = useState(0);
  const shapeRef = useRef();
  const controlRef = useRef();
  // const size = useResizeObserver(shapeRef);

  const Component = state.shape === 'Cube' ? creature.normal : GlobeView;

  const radius = Component === creature.normal ? 0 : 50;
  const width = controlWidth < 200 ? 200 : controlWidth;

  const onChange = (e) => {
    const type = toSnakeUpperCase(e.target.name);
    dispatch({ type, value: e.target.value });
  };

  return (
    <>
      <Head title="Experiments with a cube" description="A tool for visualizing 3d transforms" />
      <Grid style={{ '--controlWidth': `${width}px` }}>
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
          <AnimatePresence mode="wait">
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
                sides={state.sides}
                size={{ width: state.cubeWidth, height: state.cubeHeight }}
                speed={state.speed}
                shape={state.shape}
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
      </Grid>
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

const Grid = styled.main`
  display: grid;
  height: calc(100vh - (var(--header-height) + var(--footer-height)));
`;
