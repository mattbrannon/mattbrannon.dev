import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';
import styled from 'styled-components';
// import { loadFeatures } from '@utils/helpers';

const MotionGradientWrapper = styled(motion.div)`
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
  font-size: var(--fontSize);

  background-clip: ${(p) => (p.state && p.state.showBackground ? undefined : 'text')};
  -webkit-background-clip: ${(p) => (p.state && p.state.showBackground ? undefined : 'text')};

  position: relative;
  width: 100%;
  place-self: end;

  will-change: font-variation-settings;
`;

export const Text = styled(motion.span)`
  display: block;
  font-size: var(--fontSize);

  margin: 0 auto;
  -webkit-background-clip: inherit;
  background-clip: inherit;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-variation-settings: var(--fontVariationSettings);
  background-image: var(--gradient);


  @media (max-width: 300px) {
    white-space: revert;
  }


  &:before {
    content: '${(p) => p.children}';
    text-shadow: var(--shadow);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);

  }


`;

export const TextGradient = styled(Text)`
  background-image: var(--gradient);
  font-variation-settings: var(--fontVariationSettings);
  /* word-break: break-word; */

  font-size: var(--fontSize);

  &:before {
    /* word-break: break-word; */
    content: '${(p) => p.children}';
    text-shadow: var(--shadow);
    /* position: absolute; */



    z-index: -1;
    -webkit-text-stroke-width: var(--strokeWidth);
    -webkit-text-stroke-color: var(--strokeColor);


  }
`;

export const gradientVariant = {
  hidden: (props) => {
    return {
      '--fontSize': props.fontSize,
      '--gradient': 'transparent',
      '--fontVariationSettings': 'none',
      '--strokeDelay': 4,
      opacity: 0,
    };
  },
  show: (props) => {
    return {
      '--delay': '0s',
      '--strokeDelay': '0s',
      '--strokeColor': props.strokeColor,
      '--strokeWidth': props.strokeWidth,
      '--shadow': props.shadow,
      '--gradient': props.gradient,
      '--shadowDelay': 4,
      '--fontVariationSettings': props.fontVariationSettings,
      opacity: 1,
    };
  },
  close: (props) => {
    const initialSettings = props.initialSettings;
    return {
      '--fontVariationSettings': initialSettings,
      opacity: 0,
    };
  },
};

export const withGradient = (Gradient) => {
  const forwarded = forwardRef((props, ref) => {
    return (
      <AnimatePresence exitBeforeEnter>
        <MotionGradientWrapper key={props} {...props}>
          <Gradient ref={ref} key={props} {...props}>
            {props.children}
          </Gradient>
        </MotionGradientWrapper>
      </AnimatePresence>
    );
  });
  forwarded.displayName = 'withGradient';
  return forwarded;
};
