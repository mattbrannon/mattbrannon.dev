/* eslint-disable react/display-name */
import styled from 'styled-components';
import { setVariables } from './utils';
import { motion, AnimatePresence } from 'framer-motion';
import Color from 'color-tools';
import { useEffect, forwardRef } from 'react';

const Side = styled(motion.div).attrs((props) => {
  return {
    style: setVariables(props),
  };
})`
  transform-style: preserve-3d;
  position: absolute;
  display: grid;
  place-content: center;
  top: var(--topLeft);
  left: var(--topLeft);
  width: var(--width);
  height: var(--height);
  transform: var(--transform);
  background: var(--background);
  box-shadow: var(--boxShadow);
  ${'' /* box-shadow: 0 0 0 1px hsl(45 95% 25% / 0.3); */}
  border-radius: var(--radius);
`;

const convertColor = (color, opacity) => {
  const { h, s, l } = new Color(color).hsl.object();
  return new Color({ h, s, l }).hsl.css();
};

const getColorSelection = (color1 = '#D2B48C', opacity = 1) => {
  const color = convertColor(color1, opacity);
  return color;
};

const getColors = (props) => {
  const { start, end, color, opacity, $backgroundType, sides, i } = props;
  const angle = (360 / sides / 2) * (i + 1);
  const startColor = getColorSelection(start, opacity);
  const endColor = getColorSelection(end, opacity);
  const mainColor = getColorSelection(color, opacity);
  // const j = i + 1;
  const hue = i % 2 === 0 ? 360 + angle : 360 - angle;
  // const hue = (360 / sides) * j;
  const conic = 180 / sides;

  const background =
    $backgroundType === 'solid'
      ? mainColor
      : $backgroundType === 'transparent'
      ? $backgroundType
      : $backgroundType === 'linear-gradient'
      ? `${$backgroundType}(${start}, ${end})`
      : $backgroundType === 'radial-gradient'
      ? `${$backgroundType}(circle at center, ${startColor}, ${endColor})`
      : $backgroundType === 'conic-gradient'
      ? `${$backgroundType}(from ${conic}deg at center, ${startColor}, ${endColor}, ${startColor}, ${endColor}, ${startColor})`
      : $backgroundType === 'rainbow'
      ? `hsl(${hue}deg, 100%, 50%, ${opacity})`
      : null;

  return background;
};

const getTransform = ({ i, sides }) => {
  const angle = (360 / sides / 2) * i;

  const rotateX = i % 2 === 0 ? angle : 0;
  const rotateY = i % 2 === 1 ? angle : 0;
  const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return { rotateX, rotateY, transform };
};

export const SphereSide = styled(Side).attrs((props) => {
  const background = getColors(props);
  const outline = props.$outline ? '2px solid black' : undefined;

  return {
    '--background': background,
  };
})`
  --hsl: var(--hue) 100% 50% / 0;
  transform-style: preserve-3d;
  background: var(--background);
  color: transparent;
  transition: all var(--speed) linear;
  outline: var(--outline);
`;

const sphereSide = {
  hidden: {
    opacity: 0,
    borderRadius: '50%',
    rotateX: 0,
    rotateY: 0,
    background: 'none',
  },
  show: ({ ...props }) => {
    const background = getColors(props);
    // console.log({ show: props });

    const { rotateX, rotateY } = getTransform(props);
    return {
      opacity: 1,
      borderRadius: '50%',
      rotateX,
      rotateY,
      background: background,
    };
  },
  close: (...props) => {
    console.log(props);
    return {
      rotateX: -360,
      rotateY: -360,
      borderRadius: 0,
      background: '#D2B48C',
    };
  },
};

export const CircleSide = forwardRef((props, ref) => {
  // const { rotateX, rotateY } = getTransform(props);
  // const background = getColors(props);

  // console.log(props);
  const state = props.state;
  const cloneState = { ...props, ...state };
  return (
    <SphereSide
      ref={ref}
      variants={sphereSide}
      initial="hidden"
      animate="show"
      exit="close"
      custom={cloneState}
      {...props}
    >
      {props.children}
    </SphereSide>
  );
});

const cubeSide = {
  hidden: {
    borderRadius: '50%',
    opacity: 0,
  },
  show: {
    borderRadius: 0,
    opacity: 1,
  },
};

export const CubeSide = forwardRef((props, ref) => {
  return (
    <Side
      ref={ref}
      variants={cubeSide}
      initial="hidden"
      animate="show"
      exit="close"
      index={props.i + 1}
      custom={props}
      {...props}
    >
      {props.children}
    </Side>
  );
});

export default Side;

// close: ({ width, depth, i }) => {
//   // const z = i % 2 === 0 ? depth / 2 : (depth / 2) * -1

//   const z = i === 2 ? depth / 2 : 0;
//   // const rotateY = i === 0 ? 90 : i === 1 ? -90 : 0;
//   const sideWidth = i === 0 ? depth : width;
//   // const rotateX = 0;

//   const angle = i === 4 || i === 6 ? -90 : 90;
//   // const rotate =
//   //   i === 3 || i === 4 ? `rotateY(${angle}deg)` : `rotateX(${angle}deg)`;

//   const rotateY = i === 3 || i === 4 ? angle : 0;
//   const rotateX = i !== 3 && i !== 4 ? angle : 0;

//   console.log({ sideWidth });

//   return {
// borderRadius: 0,
// background: '#D2B48C',
//     rotateX: rotateX,
//     rotateY: rotateY,
//     width: sideWidth,

//     opacity: 1,
//     z: `${z}px`,
//     transition: {
//       duration: 15,
//     },
//   };
// },
