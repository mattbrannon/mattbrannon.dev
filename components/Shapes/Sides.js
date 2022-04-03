import styled from 'styled-components';
import { Hair150, Hair300 } from './Hair';

export default function Side({ ...props }) {
  const index = props.i;
  console.log({ props });

  const HairStyle = props.hair ? Hair300 : Hair150;

  return (
    <SVG>
      <Rect {...props}>{props.children}</Rect>
      {index < 4 ? <HairStyle /> : null}
    </SVG>
  );
}

const Rect = styled.rect`
  height: inherit;
  width: inherit;
  position: absolute;
  fill: var(--background, tan);
  fill: ${(p) => (p.i === 5 ? '#654321' : 'tan')};
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

  transition: width var(--speed) linear, height var(--speed) linear, transform var(--speed) linear;

  &:nth-of-type(1),
  &:nth-of-type(2) {
    height: var(--cube-height);
    width: var(--cube-width);

    --rotation: 0deg;
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
