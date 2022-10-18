import styled, { ThemeContext } from 'styled-components';
import { creature } from '@components/Creature';
import { breakpoints } from '@constants/breakpoints';
import { useState, useEffect, useContext } from 'react';
import { m as motion } from 'framer-motion';
import { useRandomInterval } from '@hooks/useRandomInterval';
import { useHasMounted } from '@hooks/useHasMounted';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useAnimation } from 'framer-motion';

const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const fred = {
  initial: ({ hasRun }) => {
    return {
      translateX: hasRun ? 0 : '-200%',
      rotateY: hasRun ? -12 : 60,
      rotateX: 0,
    };
  },
  animate: {
    translateX: 0,
    rotateY: 65,
    rotateX: [6, -6, 6, -6, 6, -6, 6, -6, 6, -6, 6, -6],
  },
  transition: {
    delay: 3.5,
    duration: 1.5,
  },
  // transition: {
  //   translateX: {
  //     ease: 'linear',
  //     // ease: [0.15, 0.95, 0.42, 1.24],
  //     delay: 0.2,
  //     duration: 1,
  //   },
  //   rotateY: {
  //     ease: 'linear',
  //     delay: 0.2,
  //     duration: 1,
  //   },
  //   rotateX: {
  //     ease: 'linear',
  //     delay: 0,
  //     duration: 1,
  //   },
  // },
};

const setRandomAngles = (callback) => {
  const direction = random(0, 1);
  const randomAngle = random(6, 35);
  const angle = direction ? randomAngle : randomAngle * -1;
  callback(angle);
};

export default function DropDeadFred() {
  const hasMounted = useHasMounted();
  const [angle, setAngle] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const cancel = useRandomInterval(() => setRandomAngles(setAngle), 1000, 10000);
  const context = useContext(ThemeContext);
  const controls = useAnimation();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (hasMounted && context.hasRun) {
      const direction = random(0, 1);
      const randomAngle = random(6, 35);
      const angle = direction ? randomAngle : randomAngle * -1;
      setAngle(angle);
    }
  }, [cancel, hasMounted, context.hasRun]);

  // useEffect(() => {
  //   if (context.bubblesDone) {
  //     controls.start({ ...fred.animate, transition: { ...fred.transition } }).then(() => context.setHasRun(true));
  //   }
  // }, [controls, isMobile, context]);

  useEffect(() => {
    if (!isRunning && !context.hasRun) {
      controls
        .start({ ...fred.initial({ hasRun: context.hasRun }) })
        .then(() => setIsRunning(true))
        .then(() => controls.start({ ...fred.animate, transition: { ...fred.transition } }))
        .then(() =>
          controls.start({ rotateY: -12, transition: { ease: [0.76, -0.51, 0.2, 1.45], duration: 0.8, delay: 0.8 } })
        )
        .then(() => context.setHasRun(true))
        .then(() => controls.stop());
    }
  }, [context, context.hasRun, controls, isRunning]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: context.hasRun ? 0 : 3, duration: 1 }}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        onAnimationComplete={(name) => console.log(name, 'done')}
        animate={controls}
        custom={{ hasRun: context.hasRun }}
        // animate={{
        //   translateX: 0,
        //   rotateY: 65,
        //   rotateX: [6, -6, 6, -6, 6, -6, 6, -6, 6, -6, 6, -6],
        // }}
        // initial={{
        //   translateX: '-200%',
        //   rotateY: 70,
        //   rotateX: 0,
        // }}
        // transition={{
        //   delay: 3,
        //   duration: 2,
        // }}
        // initial={{
        //   // rotateY: context.hasRun ? 0 : isMobile ? 444 : 555,
        //   rotateY: 65,
        //   translateX: context.hasRun ? 0 : '-200%',
        // }}
      >
        <Scene angle={angle}>
          <CubeWrapper>
            <creature.smirking
              style={{
                '--cube-width': 'inherit',
                '--cube-height': 'inherit',
              }}
            />
          </CubeWrapper>
        </Scene>
      </motion.div>
    </motion.div>
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
