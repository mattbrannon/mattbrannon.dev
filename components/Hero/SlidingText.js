import { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, Children, useContext } from 'react';

const wordVariant = {
  hidden: ({ i }) => {
    const index = i + 1;
    return {
      x: 700 + index * 2 + 'px',
      opacity: 0,
    };
  },
  show: ({ i }) => {
    return {
      opacity: 1,
      x: 0,
      transition: {
        x: {
          // delay: 4 + (i + 1) / 100,
          delay: (i + 1) / 100,
          duration: (i + 100) / 100,
          ease: 'easeInOut',
        },
      },
    };
  },
  static: {
    x: 0,
    opacity: 1,
    transition: { x: { duration: 0, delay: 0 }, opacity: { duration: 1.5 } },
  },
};

const container = {
  hidden: {
    x: 40,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
  static: {
    x: 0,
    opacity: 1,
    transition: { duration: 0, delay: 0 },
  },
};

const AnimatedWords = ({ showWords, children }) => {
  const wordControls = useAnimation();
  const containerControls = useAnimation();
  // const [ isRunning, setIsRunning ] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const context = useContext(ThemeContext);

  // console.log({ showWords, hasCookie: !!document.cookie.length, isRunning });

  useEffect(() => {
    if (showWords && !context.hasRun) {
      wordControls.start('show');
    }
    else if (context.hasRun) {
      containerControls.start('show');
      wordControls.start('static');
    }
  }, [ showWords, wordControls, containerControls, context.hasRun ]);

  // useEffect(() => {
  //   const hasCookie = !!document.cookie.length;
  //   if (!showWords && !hasCookie && !isRunning) {
  //     setIsRunning(true);
  //     wordControls.start('show');
  //   }
  //   else if (showWords && hasCookie && !isRunning) {
  //     containerControls.start('show');
  //     wordControls.start('static');
  //   }
  //   else {
  //     wordControls.start('static');
  //   }
  // }, [ showWords, wordControls, containerControls, isRunning ]);

  return (
    <motion.div variants={container} animate={containerControls} style={{ marginTop: -8 }}>
      {Children.toArray(children.split(' ')).map((word, i) => (
        <motion.span
          variants={wordVariant}
          initial="hidden"
          animate={wordControls}
          custom={{ i }}
          key={i}
          index={i + 1}
          // onAnimationComplete={() => {
          //   if (i === children.length - 1) {
          //     context.setHasRun(true);
          //   }
          // }}
          style={{
            display: 'inline-block',
            fontWeight: 600,
            lineHeight: isMobile ? 1.25 : 1.85,
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedWords;
