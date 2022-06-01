import styled from 'styled-components';
// import HeroImage from './MotionImage';
import { breakpoints } from '@constants/index.js';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useEffect, forwardRef } from 'react';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';

const yVariant = {
  initial: { clipPath: 'circle(0%)', x: 0, y: 0 },
  animate: {
    clipPath: 'circle(16px)',
    y: [ 0, 90, -180 ],
    x: 0,
    // scale: y === -180 ? 0 : 1,
    transition: {
      clipPath: {
        duration: 0.25,
      },
      y: {
        // delay: 0.25,
        duration: 0.75,
        type: 'spring',
        bounce: 5,
        damping: 10,
        ease: [ 1, -0.35, 1, 0.95 ],
      },
      // scale: {
      //   duration: 0.25,
      // },
    },
  },
};

const circleVariant = {
  initial: { clipPath: 'circle(0%)', x: 0, y: 0 },

  animate: {
    clipPath: 'circle(16px)',

    y: -108,
    x: -236,
    transition: {
      clipPath: {
        duration: 1,
      },
      y: {
        delay: 2.25,
        duration: 0.75,
        type: 'spring',
        bounce: 5,
        damping: 10,
        ease: [ 1, -0.35, 1, 0.95 ],
      },
      x: {
        delay: 3.25,
        duration: 0.75,
        ease: [ 0.52, -0.51, 1, -0.09 ],
      },
    },
  },
  a: {
    width: 125,
    height: 125,
    transition: {
      duration: 5,
      width: {
        delay: 3,
      },
      height: {
        delay: 3,
      },
    },
  },
  b: {
    scale: 3,
    transition: { duration: 5 },
  },
  remove: {
    clipPath: 'circle(0%)',
    // height: 125,
    // width: 125,
    scale: 2,
    transition: {
      // width: {
      //   duration: 1,
      //   ease: 'linear',
      // },
      // height: {
      //   duration: 1,
      //   ease: 'linear',
      // },
      clipPath: {
        duration: 2,
      },
      scale: {
        duration: 2,
      },
    },
  },
};

const Circle = styled(motion.div)`
  height: 100%;
  width: 100%;
  ${'' /* opacity: var(--opacity); */}

  background: var(--tealBg);
  background: red;
  border-radius: 50%;
  position: absolute;

  padding: var(--padding);
  background: blue;

  @media (max-width: ${breakpoints.mobile}px) {
    display: none;
  }

  transition: opacity 1s linear, padding 1s linear;
`;

const CenterCircle = forwardRef(({ ...props }, ref) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const controls = useAnimation();

  useEffect(() => {
    const hasCookie = !!document.cookie.length;
    if (hasCookie) {
      controls.set('initial');
    }
    else {
      controls
        .start('animate')
        .then(() => controls.start('a'))
        .then(() => controls.start('b'));
    }
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <Circle
        variants={isMobile ? yVariant : circleVariant}
        initial="initial"
        animate={controls}
        exit="remove"
        onAnimationComplete={() => props.setCircleRun(true)}
        style={{
          // '--width': props.circleRun ? '0%' : '100%',
          // '--height': props.circleRun ? '0%' : '100%',
          // '--opacity': props.circleRun ? '0%' : '100%',
          // '--padding': props.circleRun ? '32px' : 0,
        }}
        ref={ref}
        {...props}
        key={props.circleRun}
      />
    </AnimatePresence>
  );
});

CenterCircle.displayName = 'CenterCircle';

export default CenterCircle;
