import styled from 'styled-components/macro';
import { motion, useAnimation } from 'framer-motion';
import { shocked, smile, frown, goofySmile } from '@animations/index';
import { makeFrames } from './utils';

export const Mouth = styled(motion.div)`
  --unit: 16px;

  width: 100%;
  min-width: calc(var(--cube-width) * 0.5);

  background: #191919;
  border-radius: var(--mouth-radius);
  padding: var(--mouth-padding);
  margin-bottom: var(--eye-margin);
  transition: all 1s linear;
`;

export const OpenMouth = styled(Mouth)`
  padding: 12px 0;
`;

const withMouth = (Component) => {
  return function Mouth({ ...props }) {
    return (
      <motion.div {...props}>
        <Component {...props}>{props.children}</Component>
      </motion.div>
    );
  };
};

export const InShock = styled(Mouth)`
  animation: ${smile} 400ms ease 0ms forwards,
    ${smile} 2000ms linear 2000ms reverse forwards,
    ${shocked} 400ms ease-in-out 4150ms forwards,
    ${shocked} 700ms ease 6000ms reverse forwards;
`;

export const Talking = ({ amount = 50 }) => {
  const controls = useAnimation();
  const times = Array.from({ length: amount }, (_, i) => i * 0.1);
  times.push(1);

  const open = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const closed = `polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)`;
  const goofy = 'polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%)';

  const mouth = {
    talk: {
      clipPath: makeFrames(amount),
      transition: { delay: 3, duration: amount / 10 },
    },
    smile: {
      clipPath: goofy,
      height: '24px',
      borderRadius: '6px 6px 24px 24px',
      transition: { delay: 1, duration: 2 },
    },
    closed: {
      clipPath: closed,
      height: '8px',
      borderRadius: '6px 6px 6px 6px',
      transition: { delay: 1, duration: 2 },
    },
    open: {
      clipPath: open,
      padding: '6px 0',
      borderRadius: '6px 6px 6px 6px',
      transition: { delay: 1, duration: 2 },
    },
    shocked: {
      clipPath: open,
      borderRadius: '18px 18px 14px 14px',
      padding: '8px 0px',
      width: '50%',
      transition: { delay: 1, duration: 2 },
    },
    finished: {
      clipPath: open,
      height: '4px',
    },
    transition: { transition: times },
  };

  controls
    .start('talk')
    .then(() => controls.start('open'))
    .then(() => controls.start('closed'))
    .then(() => controls.start('smile'))
    .then(() => controls.start('talk'))
    .then(() => controls.start('finished'));

  return <OpenMouth as={motion.div} initial={null} animate={controls} variants={mouth} />;
};

export const Shocking = () => {
  const controls = useAnimation();

  const open = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

  const mouth = {
    shocked: {
      clipPath: open,
      borderRadius: '18px 18px 14px 14px',
      padding: '8px 0px',
      width: '50%',
      transition: { delay: 4, duration: 2 },
    },
    finished: {
      clipPath: open,
      height: '4px',
    },
  };

  controls.start('shocked').then(() => controls.start('finished'));

  return <OpenMouth initial={null} animate={controls} variants={mouth} />;
};

export const Fidgeting = ({ amount = 50 }) => {
  const controls = useAnimation();
  const times = Array.from({ length: amount }, (_, i) => i * 0.1);
  times.push(1);

  const open = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const closed = `polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)`;
  const goofy = 'polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%)';
  const goofy2 = 'polygon(10% 34%, 95% 29%, 90% 65%, 3% 73%)';
  const goofy3 = 'polygon(7% 42%, 86% 39%, 84% 88%, 12% 65%)';
  const goofy4 = 'ellipse(25% 21% at 60% 30%)';
  const goofy5 = 'circle(12% at 30% 50%)';
  const goofy6 = 'circle(32% at 40% 50%)';
  const goofy7 = 'ellipse(31% 16% at 70% 60%)';

  const mouth = {
    fidget: {
      clipPath: [ closed, goofy2, goofy ],
      transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
    },
  };

  controls.start('fidget');

  return <OpenMouth as={motion.div} animate={controls} variants={mouth} />;
};

export const SlowMoving = ({ amount = 50 }) => {
  const controls = useAnimation();

  const open = 'polygon(0% 15%, 100% 15%, 100% 80%, 0% 80%)';
  const closed = `polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)`;
  const goofy = 'polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%)';
  const goofy2 = 'polygon(10% 34%, 95% 29%, 90% 65%, 3% 73%)';
  const goofy3 = 'polygon(7% 42%, 86% 39%, 84% 88%, 12% 65%)';

  const mouth = {
    move: {
      clipPath: [ closed, goofy2 ],
      borderRadius: [ 12, 8, 16 ],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 30,
      },
    },
    closed: {
      clipPath: closed,
    },
  };

  controls.start('move');

  return (
    <OpenMouth as={motion.div} initial="closed" animate={controls} variants={mouth} />
  );
};

// const Talking = styled(Mouth)`
//   padding: 12px 0;
//   animation: ${talk} 1000ms linear 2000ms both;
// `;

export const Smiling = styled(Mouth)`
  animation: ${smile} 1400ms ease 8000ms forwards;
`;

export const Frowning = styled(Mouth)`
  animation: ${frown} 1400ms ease 2000ms forwards;
`;

export const Goofy = styled(Mouth)`
  animation: ${goofySmile} 1200ms ease 4000ms forwards;
`;

export const Closed = withMouth(Mouth);
export const Shocked = withMouth(Shocking);
export const Talk = withMouth(Talking);
export const Smile = withMouth(Smiling);
export const Frown = withMouth(Frowning);
export const Smirk = withMouth(Goofy);
export const Fidget = withMouth(Fidgeting);
export const Slow = withMouth(SlowMoving);

export default withMouth;
