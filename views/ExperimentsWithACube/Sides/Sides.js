import styled from 'styled-components';
import { Hair150, Hair300 } from './Hair';

export function Side({ ...props }) {
  const HairStyle = props.hair ? Hair300 : Hair150;

  return (
    <SVG>
      <Rect {...props}>{props.children}</Rect>
      {props.i < 4 ? <HairStyle {...props} /> : null}
    </SVG>
  );
}

const getFill = (props) => {
  const { i, background, hairColor } = props;
  return i === 5 ? hairColor || '#654321' : background || 'hsl(34, 44%, 69%)';
};

const Rect = styled.rect.attrs((props) => {
  const fill = getFill(props);
  return {
    style: {
      fill,
      opacity: 'var(--opacity)',
    },
  };
})`
  height: inherit;
  width: inherit;
  position: absolute;
  transition: opacity var(--speed, 0.2s) linear;
`;

export const SVG = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;

  display: grid;
  place-items: center;
  transform: var(--transform);

  color: black;
  font-size: 32px;
  font-weight: 800;
  opacity: var(--opacity);
  box-shadow: 0 0 0 0.025em hsl(30, 51%, 26%, 0.2);

  transition: width var(--speed, 0.2s) linear, height var(--speed, 0.2s) linear,
    transform var(--speed, 0.2s) linear, opacity var(--speed, 0.2s) linear;

  &:nth-of-type(1) {
    --rotation: 0deg;
    height: var(--cube-height);
    width: var(--cube-width);
    /* set to 0.49999 because Safari is stupid */
    --transform: translate(-50%, -50%) rotateY(var(--rotation))
      translateZ(calc(var(--cube-depth) * 0.49999));
    fill: red !important;
  }

  /* &:nth-of-type(1), */
  &:nth-of-type(2) {
    height: var(--cube-height);
    width: var(--cube-width);

    --rotation: 180deg;
    --transform: translate(-50%, -50%) rotateY(var(--rotation))
      translateZ(calc(var(--cube-depth) * 0.5));
  }

  &:nth-of-type(3),
  &:nth-of-type(4) {
    height: var(--cube-height);
    width: var(--cube-depth);
    --rotation: -90deg;
    --transform: translate(-50%, -50%) rotateY(var(--rotation))
      translateZ(calc(var(--cube-width) * 0.5));
  }

  &:nth-of-type(5),
  &:nth-of-type(6) {
    height: var(--cube-depth);
    width: var(--cube-width);
    --rotation: -90deg;
    --transform: translate(-50%, -50%) rotateX(var(--rotation))
      translateZ(calc(var(--cube-height) * 0.5));
  }

  &:nth-of-type(2) {
    --rotation: 180deg;
  }

  &:nth-of-type(4),
  &:nth-of-type(6) {
    --rotation: 90deg;
  }

  &:nth-of-type(6) {
    background: #654321;
  }
`;
