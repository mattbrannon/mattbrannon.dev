/* eslint-disable react/display-name */
import styled from 'styled-components';
import { setVariables } from './utils';
import { motion } from 'framer-motion';
import Color from 'color-tools';
import { useEffect, forwardRef } from 'react';

const Side = styled(motion.div).attrs(({ index }) => {
  return {
    style: setVariables(index),
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
  box-shadow: 0 0 0 1px hsl(45 95% 25% / 0.3);
  ${'' /* transition: var(--transition); */}
  border-radius: var(--radius);
`;

const convertColor = (color, opacity) => {
  const { h, s, l } = new Color(color).hsl.object();
  return new Color({ h, s, l, a: opacity }).hsl.css();
};

const getColorSelection = (color1, opacity = 1) => {
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
      ? `${$backgroundType}(120deg, ${startColor}, ${endColor})`
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
  // const { transform } = getTransform(props);
  const outline = props.$outline ? '2px solid black' : undefined;

  return {
    style: {
      // '--transform': transform,
      '--outline': outline,
      '--background': background,
    },
  };
})`
  --hsl: var(--hue) 100% 50% / 0;
  width: var(--cube-width);
  height: var(--cube-height);
  position: absolute;
  transform-style: preserve-3d;
  ${'' /* transform: var(--transform); */}
  background: var(--background);
  color: transparent;
  transition: all var(--speed) linear;
  outline: var(--outline);
`;

export const CircleSide = forwardRef((props, ref) => {
  const { rotateX, rotateY } = getTransform(props);
  return (
    <SphereSide
      ref={ref}
      initial={{
        opacity: 0,
        borderRadius: '0%',
        scale: 0,
        rotateX: 0,
        rotateY: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        borderRadius: '50%',
        rotateX,
        rotateY,
      }}
      exit={{ borderRadius: 0, scale: 0, opacity: 0 }}
      transition={{ delay: 0, duration: 0.5, type: 'spring' }}
      {...props}
    >
      {props.children}
    </SphereSide>
  );
});

export const CubeSide = forwardRef((props, ref) => {
  const style = setVariables(props.index);
  return (
    <Side
      ref={ref}
      initial={{
        opacity: 0,
        borderRadius: '50%',
      }}
      animate={{
        opacity: 1,
        borderRadius: 0,
      }}
      exit={{ borderRadius: '50%', scale: 0, opacity: 0 }}
      transition={{ delay: 0, duration: 1 }}
      {...props}
      style={style}
    >
      {props.children}
    </Side>
  );
});

export default Side;
