import { useCookie } from '@hooks/useCookie';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { LazyMotion, m as motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import StaticButton, { Button, ButtonWrapper } from './StaticButton';
const loadFeatures = () => import('@animations/features.js').then((res) => res.default);

export default function MotionButton({ x, showImage, ...props }) {
  const [ hasCookie, setCookie ] = useCookie('navigated');
  const isMobile = useMediaQuery({ maxWidth: 564 });
  const [ isFinished, setIsFinished ] = useState(false);

  // const side = props.left ? 'left' : props.right ? 'right' : null;
  // const amount = 85;
  // const xAmount = side === 'left' ? x : x * -1;
  // console.info(xAmount);

  const buttons = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        opacity: {
          duration: 1,
        },
      },
    },
  };

  const wrapper = {
    initial: { clipPath: 'circle(0%)', x: `${x}px` },
    animate: {
      clipPath: [
        'circle(0%)',
        'circle(16px)',
        'circle(16px)',
        'circle(100%)',
        'circle(100%)',
      ],
      x: 0,
      borderRadius: '6px',
      transition: {
        clipPath: {
          delay: 0,
          duration: 4.25,
          times: [ 0, 0.1, 0.9, 0.99, 1 ],
        },
        x: {
          delay: 1.25,
          duration: 0.75,
          type: 'spring',
          bounce: 5,
          damping: 10,
        },
      },
    },
  };

  const shouldLoadStatic = hasCookie || isFinished || isMobile;

  const href = props.children.toLowerCase() === 'view my work' ? '/apps' : '/contact';
  const handleButtonClick = () => {
    if (!hasCookie) {
      setCookie('navigated');
    }
  };

  const handleFinished = () => {
    setIsFinished(true);
    document.cookie = `navigated=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  };

  return (
    <LazyMotion features={loadFeatures}>
      {shouldLoadStatic ? (
        <StaticButton>{props.children}</StaticButton>
      ) : shouldLoadStatic !== null && !shouldLoadStatic ? (
        <ButtonWrapper
          as={motion.div}
          variants={wrapper}
          initial={!hasCookie && !isFinished && wrapper.initial}
          animate={!hasCookie && !isFinished && wrapper.animate}
        >
          <Link passHref href={href}>
            <Button
              as={motion.button}
              variants={buttons}
              initial={!hasCookie && !isFinished && { opacity: 0 }}
              animate={!hasCookie && showImage && !isFinished && buttons.animate}
              onClick={handleButtonClick}
              onAnimationComplete={handleFinished}
            >
              {props.children}
            </Button>
          </Link>
        </ButtonWrapper>
      ) : null}
    </LazyMotion>
  );
}

// const Wrapper = styled(motion.div)`
//   display: grid;
//   place-items: center;
//   background: var(--tealBg);
// `;

// const Button = styled(motion.button)`
//   background: var(--tealBg);
//   color: white;

//   font-size: clamp(var(--size12), 2vw + 0.5rem, var(--size21));
//   font-family: 'Open Sans';
//   font-variation-settings: 'wdth' 85, 'wght' 655;
//   text-shadow: 0.05em 0.05em 0.1em black;
//   border: none;
//   padding: 8px 4px;
//   width: clamp(8.75rem, 4.5vw + 7.2rem, 11.25rem);
//   height: 100%;
//   white-space: nowrap;

//   background: var(--tealBg);
//   border-radius: 6px;

//   transition: all 0.2s linear;
// `;
