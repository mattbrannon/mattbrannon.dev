import { face } from './Face';
import { forwardRef } from 'react';
import { Side } from './Sides';
import { Shape } from './Shape';

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

// const withCube = (FaceComponent) => {
//   return function CubeFace({ ...props }) {
//     return Array.from({ length: 7 }, (_, i) => {
//       const Component = i === 6 ? FaceComponent : Side;
//       return <Component {...props} i={i} key={i} />;
//     });
//   };
// };

// const Basic = withCube(Face.NormalFace);

// import Face from './Face';
// import { forwardRef } from 'react';
// import Side from '@components/Shapes/Sides';
// import { Shape } from '@components/Shapes/Shape';

// function withCreature(FaceComponent) {
//   return function CubeFace({ ...props }, ref) {
//     return (
//       <Shape ref={ref} {...props}>
//         {Array.from({ length: 7 }, (_, i) => {
//           const Component = i === 6 ? FaceComponent : Side;
//           return <Component {...props} i={i} key={i}></Component>;
//         })}
//       </Shape>
//     );
//   };
// }

// export const NormalCube = forwardRef(withCreature(Face.NormalFace));
// export const SmirkingCube = forwardRef(withCreature(Face.SmirkingFace));
