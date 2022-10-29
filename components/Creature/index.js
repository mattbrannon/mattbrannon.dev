import { face } from './Face';
import { forwardRef } from 'react';
import { Side } from './Sides';
import { Shape } from './Shape';
import styled from 'styled-components';

function withCreature(FaceComponent) {
  return function CubeFace({ ...props }, ref) {
    return (
      <Shape ref={ref} {...props}>
        <Scene {...props}>
          {Array.from({ length: 7 }, (_, i) => {
            const Component = i === 6 ? FaceComponent : Side;
            return <Component {...props} i={i} key={i}></Component>;
          })}
        </Scene>
      </Shape>
    );
  };
}

export const normal = forwardRef(withCreature(face.NormalFace));
export const smirking = forwardRef(withCreature(face.SmirkingFace));
export const talking = forwardRef(withCreature(face.TalkingFace));
export const shocked = forwardRef(withCreature(face.ShockedFace));

export const creature = {
  normal,
  smirking,
  talking,
  shocked,
};

const Scene = styled.div`
  transform-style: preserve-3d;
  transform-origin: 80px;

  --cube-height: 125px;
  --cube-width: 125px;
`;
