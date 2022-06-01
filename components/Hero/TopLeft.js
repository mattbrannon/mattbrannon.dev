import styled from 'styled-components';
import { ForwardedCube as Cube } from '@components/Shapes/Cube';
import { breakpoints } from '@constants/breakpoints';
import { useState, useEffect } from 'react';
import { useRandom } from '@hooks/useRandom';

const random = (n) => Math.floor(Math.random() * (n + 1));

export default function DropDeadFred() {
  const randomTimeout = useRandom(3, 8);
  const randomAngle = useRandom(6, 35);
  const [ direction, setDirection ] = useState(1);

  useEffect(() => {
    const direction = random(1) ? 1 : -1;
    setDirection(direction);
  }, [ randomAngle, randomTimeout ]);

  return (
    <Scene randomAngle={randomAngle * direction}>
      <CubeWrapper>
        <Cube
          style={{
            '--cube-width': 'inherit',
            '--cube-height': 'inherit',
          }}
        />
      </CubeWrapper>
    </Scene>
  );
}

const Scene = styled.div`
  --rotateY: ${(p) => p.randomAngle}deg;
  transform: rotateY(var(--rotateY));
  transform-style: preserve-3d;
  transition: transform 0.4s linear;
`;

const CubeWrapper = styled.div`
  transform-style: preserve-3d;
  padding-left: 12px;
  transform-origin: 80px;
  --cube-height: 125px;
  --cube-width: 125px;

  @media (max-width: ${breakpoints.mobile}px) {
    padding-left: 0;
  }
`;
