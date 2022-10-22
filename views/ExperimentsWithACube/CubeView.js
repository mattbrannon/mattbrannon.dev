import { CubeScene } from './Scene';
import { Side } from './Sides';

export const CubeView = () => {
  return (
    <CubeScene>
      <div>blah</div>
    </CubeScene>
  );
};

const withCube = (FaceComponent) => {
  return function CubeFace({ ...props }) {
    return Array.from({ length: 7 }, (_, i) => {
      const Component = i === 6 ? FaceComponent : Side;
      return <Component {...props} i={i} key={i} />;
    });
  };
};
