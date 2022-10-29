import styled, { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
// import Link from 'next/link';
import { link } from '@components/Links';
import { button } from '@components/Button';
import { m as motion, useAnimation } from 'framer-motion';
import { useState, useReducer, useEffect, useContext } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';

const bubble = {
  hidden: {
    desktop: {
      clipPath: 'circle(0px at center)',
      right: { transform: 'translateX(calc(-100% - 8px))' },
      left: { transform: 'translateX(calc(100% + 8px))' },
      center: { transform: 'translateX(0)' },
    },
    mobile: {
      clipPath: 'circle(0px at center)',
      right: { transform: 'translateY(calc(-100% - 8px))' },
      left: { transform: 'translateY(calc(100% + 8px))' },
      center: { transform: 'translateY(0)' },
    },
  },

  circle: { clipPath: 'circle(20px at center)' },
  rest: {
    desktop: { clipPath: 'circle(20px at center)', transform: 'translateX(0%)' },
    mobile: { clipPath: 'circle(20px at center)', transform: 'translateY(0%)' },
  },
  expand: { clipPath: 'circle(400% at center)', transform: 'translateX(0%)' },
  transition: {
    rest: {
      clipPath: { delay: 0, duration: 0.5 },
      transform: { duration: 1, delay: 1, ease: [0.09, 0.78, 0.3, 1.5] },
    },
    expand: {
      transform: { duration: 1, delay: 1, ease: [0.09, 0.78, 0.3, 1.5] },
      clipPath: { delay: 0, duration: 0.5 },
    },
    circle: {
      clipPath: { duration: 1, delay: 0 },
    },
  },
};

const text = {
  hidden: { opacity: 0, color: 'transparent', textShadow: '0 0 0 transparent' },
  visible: { opacity: 1, color: 'white', textShadow: '-0.0325em -0.0225em 0.025em black' },
  transition: { color: { delay: 3.5, duration: 1 }, textShadow: { delay: 3.5, duration: 1 } },
};

export default function CardBottom({ ...props }) {
  const context = useContext(ThemeContext);
  const controls = useAnimation();

  useEffect(() => {
    if (!context.hasStarted) {
      controls.start({ ...text.visible, transition: { ...text.transition } });
    }
  }, [controls, context]);

  return (
    <Container initial={context.hasStarted ? text.visible : text.hidden} animate={controls}>
      <Bubble side="left">
        <link.next href="/blog/about-me">
          <button.teal {...props}>Who am I?</button.teal>
        </link.next>
      </Bubble>
      <Bubble side="center">
        <link.next href="/apps">
          <button.teal {...props}>View my work</button.teal>
        </link.next>
      </Bubble>
      <Bubble side="right">
        <link.next href="/contact">
          <button.teal {...props}>Get in touch</button.teal>
        </link.next>
      </Bubble>
    </Container>
  );
}

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  position: relative;
  margin-top: 16px;
  transition: all 1s linear;
  @media (min-width: ${breakpoints.laptop}px) {
    margin: 16px 0;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Bubble = ({ side, children }) => {
  const controls = useAnimation();
  const context = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.tablet });

  useEffect(() => {
    const env = isMobile ? 'mobile' : 'desktop';
    if (!context.hasStarted) {
      context.setHasStarted(true);
      if (context.hasRun || context.bubblesDone) {
        controls.start({ ...bubble.expand, transition: { ...bubble.transition.expand } });
      }
      else {
        controls
          .start({ clipPath: bubble.hidden[env].clipPath, ...bubble.hidden[env][side] })
          .then(() => controls.start({ ...bubble.circle, transition: bubble.transition.circle }))
          .then(() => controls.start({ ...bubble.rest[env], transition: { ...bubble.transition.rest } }))
          .then(() => context.setBubblesDone(true))

          .then(() => controls.start({ ...bubble.expand, transition: { ...bubble.transition.expand } }));
      }
    }
  }, [controls, side, context, isMobile]);

  return <motion.div animate={controls}>{children}</motion.div>;
};
