import { makeGradient, makeShadow } from '@utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';
import styled from 'styled-components';

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
  ${'' /* font-size: ${(p) => p.fontSize}; */}
  -webkit-background-clip: text;

  position: relative;
  width: 100%;
  place-self: end;
  transition: --gradPoint 0.2s linear;

  ${'' /* padding: 24px 0; */}

  will-change: font-variation-settings;
`;

export const Text = styled(motion.span)`
  display: block;
  font-size: var(--fontSize);

  margin: 0 auto;
  ${'' /* padding: 24px 0; */}
  ${'' /* font-size: var(--fontSize); */}

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-variation-settings: var(--fontVariationSettings);
  background-image: var(--gradient);

  transition: all 500ms linear;

  @media (max-width: 300px) {
    white-space: revert;
  }


  &:before {
    word-break: break-word;
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
  word-break: break-word;

  font-size: var(--fontSize);

  &:before {
    word-break: break-word;
    content: '${(p) => p.children}';
    text-shadow: var(--shadow);
    ${'' /* position: absolute; */}



    z-index: -1;
    -webkit-text-stroke-width: var(--strokeWidth);
    -webkit-text-stroke-color: var(--strokeColor);


  }
`;

// ${'' /* transition: -webkit-text-stroke 1s linear var(--strokeDelay); */}
// ${'' /* transition: all 20ms linear var(--delay); */}
// ${
//   '' /* transition: text-shadow 0.1s linear var(--delay), -webkit-text-stroke 0.1s linear var(--delay); */
// }

// ${'' /* transition: all 5s linear 500ms; */}

// ${'' /* -webkit-text-stroke: var(--strokeWidth) var(--strokeColor); */}
// ${'' /* transition: -webkit-text-stroke 1s linear var(--strokeDelay); */}
// ${'' /* transition:  20ms linear var(--delay); */}
// ${
//   '' /* transition: text-shadow 0.1s linear var(--delay), -webkit-text-stroke 0.1s linear var(--delay); */
// }
// const startColor = props.startColor;
// const endColor = props.endColor;
// const shadow = props.shadow;
// const gradient = props.gradient;
// const strokeColor = props.strokeColor;
// const strokeWidth = props.strokeWidth;
// const fontVariationSettings = props.fontVariationSettings;

export const gradientVariant = {
  hidden: (props) => {
    // const initialSettings = props.initialSettings;
    // console.log({ initialSettings });
    return {
      '--fontSize': props.fontSize,
      '--gradient': 'transparent',
      // '--shadow': 'none',
      '--fontVariationSettings': 'none',
      '--strokeDelay': 4,
      opacity: 0,
      // '--delay': '5s',
      transition: {
        duration: 2,
      },
    };
  },
  show: (props) => {
    console.log({ show: props });
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
      transition: {
        easing: 'linear',
        duration: 0.1,
      },
      // transition: {
      //   '--strokeWidth': {
      //     easing: 'linear',
      //   },
      //   '--strokeColor': {
      //     easing: 'linear',
      //   },
      //   '--gradient': {
      //     delay: 0,
      //     duration: 4,
      //   },
      //   '--shadow': {
      //     delay: 'var(--shadowDelay)',
      //     duration: 3,
      //     type: 'tween',
      //   },
      //   '--fontVariationSettings': {
      //     delay: 0,
      //     duration: 1,
      //   },
      // },
    };
  },
  close: (props) => {
    const initialSettings = props.initialSettings;
    // console.log({ initialSettings });
    return {
      '--fontVariationSettings': initialSettings,
      opacity: 0,
      transition: {
        duration: 2,
      },
    };
  },
};

// textShadow: props.shadow,
// backgroundImage: props.gradient,
// fontVariationSettings: props.fontVariationSettings,
// opacity: 1,

// transition: {
//   textShadow: {
//     delay: 2,
//   },
//   fontVariationSettings: {
//     delay: 1,
//   },
//   WebkitTextStrokeWidth: {
//     delay: 2,
//     duration: 3,
//   },
//   WebkitTextStrokeColor: {
//     delay: 2,
//     duration: 3,
//   },
//   backgroundImage: {
//     delay: 2,
//   },
// },

// const GradientText = forwardRef((props, ref) => {
//   // const style = { '--delay': '4s' };
//   return (
//     <Wrapper {...props} initial="hidden" animate="show">
//       <AnimatePresence exitBeforeEnter>
//         <TextGradient
//           ref={ref}
//           key={props}
//           {...props}
//           variants={gradientVariant}
//           initial="hidden"
//           animate="show"
//           exit="close"
//           custom={props}
//           // style={style}
//           // onAnimationComplete={() => (style['--delay'] = '0s')}
//         >
//           {props.children}
//         </TextGradient>
//       </AnimatePresence>
//     </Wrapper>
//   );
// });

export const withGradient = (Gradient) => {
  const forwarded = forwardRef((props, ref) => {
    return (
      <AnimatePresence exitBeforeEnter>
        <MotionGradientWrapper
          variant={props.variant}
          initial="hidden"
          animate="show"
          exit="close"
          key={props}
          {...props}
        >
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
