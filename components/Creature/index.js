import Face from './Face';
import { forwardRef } from 'react';
import Side from '@components/Shapes/Sides';
import { Shape } from '@components/Shapes/Shape';

function withCreature(FaceComponent) {
  return function CubeFace({ ...props }, ref) {
    return (
      <Shape ref={ref} {...props}>
        {Array.from({ length: 7 }, (_, i) => {
          const Component = i === 6 ? FaceComponent : Side;
          return <Component {...props} i={i} key={i}></Component>;
        })}
      </Shape>
    );
  };
}

export const NormalCube = forwardRef(withCreature(Face.NormalFace));
export const SmirkingCube = forwardRef(withCreature(Face.SmirkingFace));
