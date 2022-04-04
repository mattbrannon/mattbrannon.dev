import { goofySmile } from '@animations/index';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeClipPath } from '../../unused/utils';
import { forwardRef } from 'react';
// import { loadFeatures } from '@utils/helpers';

export const Mouth = styled(motion.div)`
  --unit: 16px;
  min-height: 2px;
  width: 100%;
  min-width: calc(var(--cube-width) * 0.5);
  max-width: calc(var(--cube-width) * 0.5);
  margin: 0 auto;

  background: #191919;
  border-radius: var(--mouth-radius);
  padding: var(--mouth-padding);
  margin-bottom: var(--eye-margin);

  transition: all var(--speed) linear;
`;

const ForwardedMouth = forwardRef((props, ref) => {
  return <Mouth ref={ref} {...props} />;
});

ForwardedMouth.displayName = 'forwardedMouth';

export const OpenMouth = styled(ForwardedMouth)`
  padding: 5% 0;
  border-radius: 80px;
`;

export const ClosedMouth = styled(ForwardedMouth)`
  padding: 1%;
  border-radius: 80px;
`;

const withMouth = (Component) => {
  return function Mouth({ ...props }) {
    return <Component>{props.children}</Component>;
  };
};

const Smiling = () => {
  const smiling = {
    initial: {
      '--mouth-padding': '1%',
      borderRadius: '2px 2px 2px 2px',
      width: '100%',
    },
    animate: {
      '--mouth-padding': '6%',
      borderRadius: '4px 4px 24px 24px',
      width: '65%',
    },
  };
  return (
    <ForwardedMouth
      variants={smiling}
      initial="initial"
      animate="animate"
      transition={{
        delay: 1,
        duration: 0.6,
        repeat: 1,
        repeatType: 'mirror',
        repeatDelay: 3,
      }}
    />
  );
};

const Frowning = () => {
  const frowning = {
    initial: {
      '--mouth-padding': '1%',
      borderRadius: '2px 2px 2px 2px',
      width: '100%',
    },
    animate: {
      '--mouth-padding': '6%',
      borderRadius: '24px 24px 4px 4px',
      width: '65%',
    },
  };
  return (
    <ForwardedMouth
      variants={frowning}
      initial="initial"
      animate="animate"
      transition={{
        delay: 1,
        duration: 0.6,
        repeat: 1,
        repeatType: 'mirror',
        repeatDelay: 3,
      }}
    />
  );
};

const Smirking = () => {
  const smirking = {
    initial: {
      '--mouth-padding': '1%',
      borderRadius: '2px 2px 2px 2px',
      width: '100%',
      clipPath: 'polygon(0% 30%, 100% 30%, 100% 70%, 0% 70%)',
    },
    animate: {
      '--mouth-padding': '6%',
      borderRadius: '4px 4px 24px 24px',
      width: '65%',
      clipPath: 'polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%)',
    },
  };
  return (
    <ForwardedMouth
      variants={smirking}
      initial="initial"
      animate="animate"
      transition={{
        delay: 5,
        duration: 0.6,
        repeat: 1,
        repeatType: 'mirror',
        repeatDelay: 3,
      }}
    />
  );
};
const Talking = ({ amount = 50 }) => {
  const mouth = {
    closed: {
      clipPath: 'polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)',
      borderRadius: '1000px 1000px 1000px 1000px',
    },
    talk: {
      borderRadius: '1000px 1000px 1300px 1300px',
      clipPath: makeClipPath(amount),
      transition: { delay: 1, duration: amount / 8 },
    },
  };
  return <ForwardedMouth variants={mouth} initial="closed" animate="talk" />;
};

// export const Frowning = styled(Mouth)`
//   animation: ${frown} 1400ms ease 2000ms forwards;
// `;

export const Goofy = styled(Mouth)`
  animation: ${goofySmile} 1200ms ease 4000ms forwards;
`;

export const Closed = withMouth(ClosedMouth);
export const Open = withMouth(OpenMouth);
// export const Shocked = withMouth(Shocking);
export const Talk = withMouth(Talking);
export const Smile = withMouth(Smiling);
export const Frown = withMouth(Frowning);
export const Smirk = withMouth(Smirking);
// export const Fidget = withMouth(Fidgeting);
// export const Slow = withMouth(SlowMoving);

export default withMouth;

// export const InShock = styled(ForwardedMouth)`
//   animation: ${smile} 400ms ease 0ms forwards,
//     ${smile} 2000ms linear 2000ms reverse forwards,
//     ${shocked} 400ms ease-in-out 4150ms forwards,
//     ${shocked} 700ms ease 6000ms reverse forwards;
// `;

// export const Talking = ({ amount = 50 }) => {
//   const controls = useAnimation();
//   const times = Array.from({ length: amount }, (_, i) => i * 0.1);
//   times.push(1);

//   const open = 'polygon(0% 20%, 100% 20%, 100% 80%, 0% 80%)';
//   const closed = `polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)`;
//   const goofy = 'polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%)';
//   const whistle = `polygon(30% 25%, 70% 25%, 70% 75%, 30% 75%)`;
//   const circleSmall = 'circle(10% at 70% 50%)';

//   const mouth = {
//     talk: {
//       clipPath: makeFrames(amount),
//       transition: { delay: 1, duration: amount / 8 },
//     },
//     talk2: {
//       clipPath: makeFrames(amount),
//       transition: { delay: 0, duration: amount / 8 },
//     },
//     smile: {
//       clipPath: goofy,
//       transition: {
//         delay: 1,
//         duration: 2,
//         repeat: 1,
//         repeatType: 'mirror',
//         repeatDelay: 2,
//       },
//     },
//     closed: {
//       clipPath: closed,
//       // height: '8px',
//       // borderRadius: '6px 6px 6px 6px',
//       transition: { duration: 2 },
//     },
//     whistle: {
//       clipPath: whistle,
//       transition: {
//         delay: 3,
//         duration: 3,
//         repeat: 0,
//         repeatDelay: 0.4,
//         repeatType: 'mirror',
//       },
//     },
//     circle: {
//       clipPath: circleSmall,
//       transition: {
//         duration: 2,
//         delay: 1,
//         repeat: 1,
//         repeatDelay: 1,
//         repeatType: 'reverse',
//       },
//     },

//     open: {
//       clipPath: open,
//       // padding: '6px 0',
//       // borderRadius: '6px 6px 6px 6px',
//       transition: { duration: 0.4 },
//     },
//     finished: {
//       clipPath: open,
//       height: '4px',
//       padding: '8px 0',
//     },
//     transition: { transition: times },
//   };

//   const play = (key, delay) => {
//     return;
//   };

//   controls
//     .start('talk')
//     .then(() => controls.start('closed'))
//     .then(() => controls.start('smile'))
//     .then(() => controls.start('open'))
//     .then(() => controls.start('talk2'))
//     .then(() => controls.start('closed'))
//     .then(() => controls.start('whistle'))
//     .then(() => controls.start('circle'))
//     .then(() => controls.start('closed'));

//   return <OpenMouth initial={null} animate={controls} variants={mouth} />;
// };

// export const Shocking = () => {
//   const controls = useAnimation();

//   const open = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

//   const mouth = {
//     shocked: {
//       clipPath: open,
//       borderRadius: '18px 18px 14px 14px',
//       padding: '8px 0px',
//       width: '50%',
//       transition: { delay: 4, duration: 2 },
//     },
//     finished: {
//       clipPath: open,
//       height: '4px',
//     },
//   };

//   controls.start('shocked').then(() => controls.start('finished'));

//   return <OpenMouth initial={null} animate={controls} variants={mouth} />;
// };

// export const Fidgeting = ({ amount = 50 }) => {
//   const controls = useAnimation();
//   const times = Array.from({ length: amount }, (_, i) => i * 0.1);
//   times.push(1);

//   // const open = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
//   const closed = `polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)`;
//   const goofy = 'polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%)';
//   const goofy2 = 'polygon(10% 34%, 95% 29%, 90% 65%, 3% 73%)';
//   // const goofy3 = 'polygon(7% 42%, 86% 39%, 84% 88%, 12% 65%)';
//   // const goofy4 = 'ellipse(25% 21% at 60% 30%)';
//   // const goofy5 = 'circle(12% at 30% 50%)';
//   // const goofy6 = 'circle(32% at 40% 50%)';
//   // const goofy7 = 'ellipse(31% 16% at 70% 60%)';

//   const mouth = {
//     fidget: {
//       clipPath: [ closed, goofy2, goofy ],
//       transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
//     },
//   };

//   controls.start('fidget');

//   return <OpenMouth animate={controls} variants={mouth} />;
// };

// export const SlowMoving = () => {
//   const controls = useAnimation();

//   // const open = 'polygon(0% 15%, 100% 15%, 100% 80%, 0% 80%)';
//   const closed = `polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)`;
//   // const goofy = 'polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%)';
//   const goofy2 = 'polygon(10% 34%, 95% 29%, 90% 65%, 3% 73%)';
//   // const goofy3 = 'polygon(7% 42%, 86% 39%, 84% 88%, 12% 65%)';

//   const mouth = {
//     move: {
//       clipPath: [ closed, goofy2 ],
//       borderRadius: [ 12, 8, 16 ],
//       transition: {
//         duration: 1,
//         repeat: Infinity,
//         repeatType: 'reverse',
//         repeatDelay: 30,
//       },
//     },
//     closed: {
//       clipPath: closed,
//     },
//   };

//   controls.start('move');

//   return <OpenMouth initial="closed" animate={controls} variants={mouth} />;
// };
