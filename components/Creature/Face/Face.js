import styled from 'styled-components';

import { mouth } from '../Mouth';
import { eyes } from '../Eyes';

function withFace(Eyes) {
  return function makeFace(Mouth) {
    return function wrapper({ ...props }) {
      return (
        <Face {...props}>
          <Eyes {...props} />
          <Mouth {...props} />
        </Face>
      );
    };
  };
}

export const TalkingFace = withFace(eyes.RedEyes)(mouth.Talking);
export const SmirkingFace = withFace(eyes.NormalEyes)(mouth.Smirking);
export const NormalFace = withFace(eyes.NormalEyes)(mouth.Closed);
export const ShockedFace = withFace(eyes.NormalEyes)(mouth.Shocked);

const Face = styled.div`
  display: flex;
  flex-direction: column;
  height: var(--cube-height, 100%);

  align-items: center;
  justify-content: space-evenly;
  transform: translateZ(calc(var(--cube-depth) * 0.55));
  transition: all var(--speed) linear;
`;
