import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, m as motion, useAnimation } from 'framer-motion';
import { textGeneratorVariant } from '@animations/variants';
import { FancyText, FancyInput, FancyGradient, ContentEditable, Span } from './styles';

export const FancyAnimatedGradient = ({ state, children, ...props }) => {
  const [duration, setDuration] = useState(2);

  const handleAnimationStart = (name) => {
    if (name === 'close') {
      setDuration(2);
    }
    else {
      setDuration(0);
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={state.styles.fontFamily}
        transition={{ duration: 1 }}
        state={state}
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
        <FancyGradient
          initial="hidden"
          animate="show"
          exit="close"
          variants={textGeneratorVariant}
          onAnimationStart={handleAnimationStart}
          custom={{ duration, ...state }}
        >
          Click to edit
        </FancyGradient>
      </motion.div>
    </AnimatePresence>
  );
};
