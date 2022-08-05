import styled, { ThemeContext } from 'styled-components';
import { SmirkingCube } from '@components/Creature';
import { breakpoints } from '@constants/breakpoints';
import { useState, useEffect, useContext } from 'react';
import { m as motion } from 'framer-motion';
import { useRandomInterval } from '@hooks/useRandomInterval';
import { useHasMounted } from '@hooks/useHasMounted';
import { useMediaQuery } from '@hooks/useMediaQuery';

const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function DropDeadFred() {
  const hasMounted = useHasMounted();
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const repeat = useRandomInterval(1000, 10000);
  const context = useContext(ThemeContext);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (hasMounted) {
      const direction = random(0, 1);
      const randomAngle = random(6, 35);
      const angle = direction ? randomAngle : randomAngle * -1;
      setAngle(angle);
      // console.log({ angle });
    }
  }, [repeat, hasMounted]);

  return (
    <>
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ rotateY: context.hasRun ? 0 : isMobile ? 2222 : 9999 }}
        animate={{ rotateY: 0 }}
        transition={{ delay: 0, duration: 3, ease: [0.17, 0.67, 0.55, 1.1]}}
      >
        <Scene angle={angle}>
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
  --rotateY: ${(p) => p.angle}deg;
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
