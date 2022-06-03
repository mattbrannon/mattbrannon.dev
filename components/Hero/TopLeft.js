import styled from 'styled-components';
import { SmirkingCube } from '@components/Creature';
import { breakpoints } from '@constants/breakpoints';
import { useState, useEffect } from 'react';
import { useRandom } from '@hooks/useRandom';
import { motion } from 'framer-motion';

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
    <>
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ rotateY: 9999 }}
        animate={{ rotateY: 0 }}
        transition={{ delay: 0, duration: 3, ease: [ 0.17, 0.67, 0.55, 1.1 ] }}
      >
        <Scene randomAngle={randomAngle * direction}>
          <CubeWrapper>
            <SmirkingCube
              style={{
                '--cube-width': 'inherit',
                '--cube-height': 'inherit',
              }}
            />
          </CubeWrapper>
        </Scene>
      </motion.div>
      <motion.div
        style={{ height: 170, width: 180, position: 'absolute', top: 0 }}
        initial={{ background: 'var(--basic-card-background)' }}
        animate={{ opacity: 0 }}
        transition={{ duration: 3, delay: 1 }}
      ></motion.div>
    </>
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
