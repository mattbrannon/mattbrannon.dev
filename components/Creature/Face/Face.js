import styled from 'styled-components';

import Mouth from '../Mouth';
import Eyes from '../Eyes';

function withFace(Eyes) {
  return function makeFace(Mouth) {
    return function wrapper({ ...props }) {
      return (
        <Wrapper {...props}>
          <Eyes {...props} />
          <Mouth {...props} />
        </Wrapper>
      );
    };
  };
}

export const SmirkingFace = withFace(Eyes.RedEyes)(Mouth.Smirking);
export const NormalFace = withFace(Eyes.NormalEyes)(Mouth.Smirking);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  transform: translateZ(calc(var(--cube-depth) * 0.5));
  transition: all var(--speed) linear;
`;
