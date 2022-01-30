import { makeShadow } from '@utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  @supports (background-image: paint(something)) {
    @property --gradPoint {
      syntax: '<percentage>';
      inherits: false;
      initial-value: 40%;
    }
  }

  --center: polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%);
  --left: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  --right: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
  --top: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  --bottom: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  --visible: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);

  --gradPoint: 25%;

  font-variation-settings: var(--fontVariationSettings);
  font-family: var(--fontFamily);

  position: relative;
  width: 100%;
  place-self: end;
  transition: --gradPoint 0.2s linear;

  will-change: font-variation-settings;
`;

// ${'' /* --scale: 3vw; */}
// ${'' /* --font-size: clamp(var(--size18), var(--scale), var(--size32)); */}

const Text = styled(motion.div)`
  --left: ${(p) => (p.centered ? 0 : undefined)};

  ${'' /* position: absolute; */}
  left: var(--left);
  right: var(--left);
  top: 0;

  margin: 0 auto;
  padding: 12px 4px;

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-size: inherit;

  transition: all 500ms linear;

  @media (max-width: 300px) {
    white-space: revert;
  }
`;

const Gradient = styled(Text)`
  background-image: var(--gradient);
  &:after {
    content: '${(p) => p.children}';
    background-image: none;
    text-shadow: var(--shadow);
    position: absolute;
    transform: translate(-100%);
    z-index: -1;
    transition: text-shadow 1s linear var(--delay);
  }
`;

// const Gradient = styled(Text)`
//   background-image: linear-gradient(var(--startColor), var(--endColor));
//   background-size: 100% 100%;
// `;

// const Shadow = styled(Text)`
//   text-shadow: var(--shadow);
//   -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
//   position: static;
// `;

// const container = {
//   hidden: { clipPath: 'var(--center)', opacity: 0 },
//   show: {
//     clipPath: 'var(--visible)',
//     opacity: 1,
//     transition: {
//       delay: 0,
//       duration: 1,
//     },
//   },
// };

// const gradient = {
//   hidden: {
//     // fontVariationSettings: 'var(--recursive7)',
//     // backgroundSize: '400% 100%',
//     // backgroundPosition: '-100% 0%',
//     backgroundImage: 'none',
//   },
//   show: {
//     // fontVariationSettings: 'var(--recursive8)',
//     // backgroundSize: '100% 100%',
//     // backgroundPosition: '0% 0%',
//     backgroundImage: 'var(--gradient)',
//     transition: {
//       delay: 0,
//       duration: 2,
//     },
//   },
// };

const gradient = {
  hidden: {
    '--gradient': 'none',
    '--shadow': 'none',
    '--delay': '1s',
    opacity: 0,
  },
  show: {
    '--gradient': 'var(--gradient-dark)',
    '--shadow': 'var(--shadow-after)',
    '--delay': '0s',
    opacity: 1,
    transition: {
      delay: 0,
      duration: 1,
      opacity: {
        duration: 0.5,
      },
      '--delay': {
        delay: 2,
      },
    },
  },
  exit: {
    '--gradient': 'var(--gradient-transparent)',
    '--shadow': 'none',
  },
};

// const shadow = {
//   hidden: {
//     textShadow: 'none',
//   },
//   show: {
//     textShadow: 'var(--shadow)',
//     transition: {
//       delay: 0,
//       duration: 2,
//     },
//   },
//   exit: {
//     textShadow: 'none',
//   },
// };

const GradientText = forwardRef((props, ref) => {
  return (
    <Wrapper {...props} initial="hidden" animate="show">
      <AnimatePresence>
        <Gradient
          key="shadow"
          {...props}
          variants={gradient}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {props.children}
        </Gradient>
        {/* <Gradient
          key="gradient"
          {...props}
          variants={gradient}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {props.children}
        </Gradient> */}
      </AnimatePresence>
    </Wrapper>
  );
});

GradientText.displayName = 'GradientText';

export default GradientText;
