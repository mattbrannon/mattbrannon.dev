import { makeShadow, pxToEm } from '@utils/helpers';
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
    ${'' /* background-image: none; */}
    text-shadow: var(--shadow);
    position: absolute;
    transform: translateX(-100%);
    z-index: -1;
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
    transition: text-shadow 1s linear var(--delay), -webkit-text-stroke 1s linear var(--delay);
  }
`;

const gradient = {
  hidden: {
    '--gradient': 'none',
    '--shadow': 'none',
    '--delay': '1s',
    '--strokeColor': 'none',
    '--strokeWidth': 0,
    opacity: 0,
  },
  show: ({ startColor, endColor, shadow, strokeColor, strokeWidth }) => {
    const gradient = `linear-gradient(${startColor}, ${endColor})`;

    return {
      '--gradient': gradient,
      '--shadow': shadow,
      '--delay': '0s',
      '--strokeColor': strokeColor,
      '--strokeWidth': pxToEm(strokeWidth) + 'em',
      '--strokeDelay': '0s',
      opacity: 1,
    };
  },
  exit: {
    '--gradient': 'var(--gradient-transparent)',
    '--shadow': 'none',
  },
};

const GradientText = forwardRef((props, ref) => {
  const startColor = props.startColor;
  const endColor = props.endColor;
  const shadow = props.shadow;
  const strokeColor = props.strokeColor;
  const strokeWidth = props.strokeWidth;

  return (
    <Wrapper {...props} initial="hidden" animate="show">
      <AnimatePresence>
        <Gradient
          ref={ref}
          key="shadow"
          {...props}
          variants={gradient}
          initial="hidden"
          animate="show"
          exit="exit"
          custom={{ startColor, endColor, shadow, strokeColor, strokeWidth }}
        >
          {props.children}
        </Gradient>
      </AnimatePresence>
    </Wrapper>
  );
});

GradientText.displayName = 'GradientText';

export default GradientText;

// {/* <Gradient
//   key="gradient"
//   {...props}
//   variants={gradient}
//   initial="hidden"
//   animate="show"
//   exit="exit"
// >
//   {props.children}
// </Gradient> */}
