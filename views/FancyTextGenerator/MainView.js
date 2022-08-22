import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion, useAnimation } from 'framer-motion';
import { textGeneratorVariant } from '@animations/variants';
import { FancyText, FancyInput, FancyGradient, ContentEditable, Span } from './styles';

export const FancyAnimatedGradient = ({ state, children, ...props }) => {
  const [duration, setDuration] = useState(0);
  const [names, setNames] = useState({ previous: '', current: '' });

  const handleAnimationStart = (name) => {
    // console.log('starting', name);
    // setNames({ previous: names.current, current: name });
    // const current = name;
    // const previous = names.current;
    // console.log({ previous, current });
    console.log(name);
    if (name === 'close') {
      setDuration(2);
    }
    else {
      setDuration(0);
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Span
        key={state.styles.fontFamily}
        initial="hidden"
        animate="show"
        exit="close"
        variants={textGeneratorVariant}
        onAnimationStart={handleAnimationStart}
        custom={{ duration, ...state }}
        style={{
          '--fontFamily': state.styles.fontFamily,
          '--fontSize': state.styles.fontSize + 'px',
          '--fontSettings': state.styles.fontVariationSettings,
          '--gradient': state.styles.gradient,
          '--shadow': state.styles.shadow,
          '--strokeWidth': state.styles.strokeWidth + 'em',
          '--strokeColor': state.styles.strokeColor,
          '--letterSpacing': state.styles.letterSpacing + 'em',
        }}
      >
        fuck you
      </Span>
    </AnimatePresence>
  );
};

// const handleAnimationStart = (name) => {
//   console.log('starting', name);

//   if (name === 'show') {
//     setDuration(5);
//   }
//   else {
//     setDuration(0);
//   }
// };

// const handleAnimationComplete = (name) => {
//   console.log('finished', name);
//   if (name === 'close') {
//     animation.start('show');
//   }
// };

// useEffect(() => {
//   animation.set('hidden');
//   setTimeout(() => {
//     animation.start('show');
//   }, 500);
// }, []);

// useEffect(() => {
//   console.log(props.font.fontName);
//   animation.start('show');
// }, [props]);

// useEffect(() => {
//   animation.start('show');
// }, []);

// useEffect(() => {
//   const { animation } = props;
//   if (props.show.reset) {
//     console.log('resetting');
//     animation.start('reset');
//   }
// }, [props.show.reset]);

// import { useEffect, useState } from 'react';
// import { AnimatePresence, m as motion, useAnimation } from 'framer-motion';
// import { textGeneratorVariant } from '@animations/variants';
// import { makeGradient, makeShadow } from '@utils/helpers';
// import { FancyText } from './styles';

// export const FancyAnimatedGradient = ({ children, state }) => {
//   const [duration, setDuration] = useState(0);
//   const animation = useAnimation();

//   const handleAnimationStart = (name) => {
//     // console.log('starting', name);

//     if (name === 'show') {
//       setDuration(0);
//     }
//     else {
//       setDuration(2);
//     }
//   };

//   const handleAnimationComplete = (name) => {
//     // console.log('finished', name);
//     if (name === 'close') {
//       animation.start('show');
//     }
//   };

//   // useEffect(() => {
//   //   animation.set('hidden');
//   //   setTimeout(() => {
//   //     animation.start('show');
//   //   }, 500);
//   // }, []);

//   // useEffect(() => {
//   //   console.log(props.font.fontName);
//   //   animation.start('show');
//   // }, [props]);

//   // useEffect(() => {
//   //   animation.start('show');
//   // }, []);

//   // useEffect(() => {
//   //   const { animation } = props;
//   //   if (props.show.reset) {
//   //     console.log('resetting');
//   //     animation.start('reset');
//   //   }
//   // }, [props.show.reset]);

//   return (
//     <>
//       <AnimatePresence exitBeforeEnter>
//         <motion.div
//           key={state.fontFamily}
//           variants={textGeneratorVariant}
//           initial="hidden"
//           animate="show"
//           exit="close"
//           custom={{
//             duration,
//             makeGradient,
//             makeShadow,
//             state,
//           }}
//           onAnimationStart={handleAnimationStart}
//           // onAnimationComplete={handleAnimationComplete}
//         >
//           <FancyText
//           // style={{
//           //   '--fontSize': props.state.fontSize + 'vw',
//           //   '--gradient': props.state.gradient,
//           //   '--shadow': props.state.shadow,
//           //   '--fontSettings': props.state.fontSettings,
//           // }}
//           >
//             {children}
//           </FancyText>
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
// };
