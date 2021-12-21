import styled from 'styled-components/macro';
import { setVariables } from './utils';

const Side = styled.div.attrs(({ index }) => {
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
`;

export default Side;
