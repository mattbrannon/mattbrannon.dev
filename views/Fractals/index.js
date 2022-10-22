import styled from 'styled-components';
import { useRef, useEffect, useReducer, useState } from 'react';
import Head from '@components/Head';
import FractalControls from '@components/Controls/FractalControls';
import { snakeToCamel, toSnakeUpperCase } from '@utils/helpers.js';
import { m as motion } from 'framer-motion';

const initialState = {
  size: 85,
  sides: 8,
  maxDepth: 6,
  scale: 0.75,
  radians: -5.55, //2.35, //1.05,
  angle: 0,
  branches: 1,
  strokeStyle: 'yellow',
  lineWidth: 61.5,
  shadowColor: '#ffffff',
  shadowOffsetX: 0,
  shadowOffsetY: 1,
  shadowBlur: 0,
  xAxis: 763,
  yAxis: 416,
  limit: 20,
  composite: 'difference',
};

function reducer(state, action) {
  switch (action.type) {
    case 'COMPOSITE':
    case 'X_AXIS':
    case 'Y_AXIS':
    case 'LIMIT':
    case 'SIDES':
    case 'SIZE':
    case 'MAX_DEPTH':
    case 'SCALE':
    case 'RADIANS':
    case 'ANGLE':
    case 'BRANCHES':
    case 'LINE_WIDTH':
    case 'SHADOW_COLOR':
    case 'SHADOW_OFFSET_X':
    case 'SHADOW_OFFSET_Y':
    case 'SHADOW_BLUR': {
      const type = snakeToCamel(action.type);
      console.log(type, action.value);
      return { ...state, [type]: action.value };
    }
  }
}

export default function Fractals() {
  const canvasRef = useRef();
  const controlRef = useRef();
  const mainRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [controlWidth, setControlWidth] = useState(0);

  useEffect(() => {
    const { width } = controlRef.current.getBoundingClientRect();
    console.log(width);
    setControlWidth(width);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // const draw = makeDraw(ctx);
    const { size, sides, maxDepth, scale, radians, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor } = state;

    const { width, height } = mainRef.current.getBoundingClientRect();

    canvas.width = width; //window.innerWidth - controlWidth;
    canvas.height = height; //window.innerHeight;

    // const centerX = canvas.width / 2;
    // const centerY = canvas.height - 30;

    ctx.lineWidth = state.lineWidth;
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'round';
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;

    const gradient = ctx.createLinearGradient(0, 20, 90, 30);
    ctx.strokeStyle = gradient;

    // let size = state.size;
    // let sides = state.sides;
    // let maxDepth = state.maxDepth;
    // let scale = state.scale;
    // let radians = state.radians;

    function drawBranch(level = 0) {
      if (level > maxDepth) return;
      ctx.globalCompositeOperation = state.composite;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();

      ctx.save();

      ctx.translate(size, 0);
      ctx.rotate(radians);
      ctx.scale(scale, scale);
      // ctx.arc(size, size, size, size * Math.PI, 0, true);
      // ctx.stroke();
      drawBranch(level + 1);
      ctx.restore();

      ctx.save();

      ctx.translate(size, 0);
      ctx.rotate(-radians);
      ctx.scale(scale, scale);
      // ctx.arc(size, size, size, -size * Math.PI, 0, true);
      // ctx.stroke();
      drawBranch(level + 1);
      ctx.restore();
      // ctx.lineWidth *= 0.8;
      // }
    }

    function drawFractal() {
      ctx.save();
      ctx.translate(state.xAxis, state.yAxis);
      ctx.rotate(Math.PI * 1.5);
      // ctx.rotate(Math.cos(Math.PI * sides));
      // ctx.arc(size, size, size, -size * Math.PI, 0, true);

      const base = 320;
      for (let i = 0; i < sides; i++) {
        gradient.addColorStop(0.0, `hsl(${base}, 100%, 50%)`);
        gradient.addColorStop(0.25, `hsl(${base + 30}, 100%, 50%)`);
        gradient.addColorStop(0.5, `hsl(${base + 60}, 100%, 50%)`);
        gradient.addColorStop(0.75, `hsl(${base + 30}, 100%, 50%)`);
        gradient.addColorStop(1.0, `hsl(${base}, 100%, 50%)`);
        ctx.rotate((Math.PI * 2) / sides);
        drawBranch();
      }
      ctx.restore();
    }

    drawFractal();
  }, [state, controlWidth]);

  const onChange = (e) => {
    const actionType = e.target.name
      .split(' ')
      .slice(1)
      .map((s) => s.toUpperCase())
      .join('_');

    dispatch({ type: actionType, value: e.target.value });
  };

  // const onChange = (e) => {
  //   const type = toSnakeUpperCase(e.target.name);
  //   dispatch({ type, value: e.target.value });
  // };

  return (
    <>
      <Head title="Fractals" description="generative art" />
      <ControlWrapper>
        <FractalControls onChange={onChange} ref={controlRef} dispatch={dispatch} state={state} />
      </ControlWrapper>
      <Container>
        <Main ref={mainRef} left={controlWidth}>
          <Canvas ref={canvasRef}></Canvas>
        </Main>
      </Container>
    </>
  );
}

// gradient.addColorStop(0.0, 'yellow');
// gradient.addColorStop(0.25, 'purple');
// gradient.addColorStop(0.5, 'deepskyblue');
// gradient.addColorStop(1.0, 'black');

const Canvas = styled(motion.canvas)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const ControlWrapper = styled.div``;

const Main = styled.div`
  --control-width: ${(p) => p.left}px;
  top: var(--header-height);
  bottom: var(--footer-height);
  left: var(--control-width);
  right: 0;
  width: calc(100% - var(--control-width));

  height: calc(100% - (var(--header-height) + var(--footer-height)));

  position: absolute;
`;

const Container = styled.div`
  height: 100%;
`;
