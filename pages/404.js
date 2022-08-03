import DocumentHead from '@components/Head';
import { decovarValues } from '@constants/index.js';
import { m as motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
// import { loadFeatures } from '@utils/helpers';
import { SmirkingCube } from '@components/Creature';

const getTranslateXPoints = (start, end, divider) => {
  let total = Math.abs(start) + Math.abs(end);
  let multiplier = start < end ? 1 : -1;
  let steps = total / divider;
  let arr = [start];
  for (let i = 0; i < steps; i++) {
    start += divider * multiplier;
    arr.push(start);
  }
  return arr;
};
const walking = (start, end, amount, xdeg, ydeg) => {
  return getTranslateXPoints(start, end, amount).map((frame, i) => {
    const rotateX = i % 2 === 0 ? xdeg : xdeg * -1;
    const rotateY = i % 2 === 0 ? ydeg : ydeg + 5;
    const translateX = frame + 'px';
    return {
      transform: `translateX(${translateX}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    };
  });
};

const random = (n) => Math.floor(Math.random() * (n + 1));

const shuffle = (array) => {
  const copy = [...array];
  const shuffledItems = [];
  while (copy.length) {
    let i = random(copy.length - 1);
    let key = copy[i];
    shuffledItems.push(key);
    copy.splice(i, 1);
  }
  return shuffledItems;
};

const setRandomValues = () => {
  const removeKeys = (key) => key !== 'default'; // || key !== 'sheared';

  const keys = Object.keys(decovarValues);
  const shuffledKeys = shuffle(keys);
  const shuffledSettings = shuffledKeys.filter(removeKeys).map((key) => decovarValues[key]);
  const fontSettings = [decovarValues.default, ...shuffledSettings];
  return fontSettings;
};

export default function Error404() {
  const ref = useRef();
  const textRef = useRef();
  const fontSize = 'clamp(var(--size21), 7vw, var(--size36))';

  useEffect(() => {
    if (ref && ref.current) {
      const frames = walking(-800, 0, 42, -5, 62);

      const walk = ref.current.animate(frames, {
        duration: 2000,
        fill: 'both',
        easing: 'linear',
      });
      walk.finished.then(() => {
        const lastFrame = frames.pop();
        const spin = [lastFrame, { transform: 'rotateY(-15deg)' }];
        ref.current.animate(spin, {
          duration: 900,
          delay: 1400,
          easing: 'cubic-bezier(.79,-0.31,.05,1.4)',
          fill: 'forwards',
        });
      });
    }
  }, [ref]);

  const font = {
    animate: {
      fontVariationSettings: setRandomValues(),
      transition: {
        delay: 0,
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 120,
      },
    },
  };

  return (
    <>
      <DocumentHead title="Whoops" desc="We must have taken a wrong turn at Albuquerque">
        <link
          rel="preload"
          href="/fonts/decovar.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
      </DocumentHead>

      <Container>
        <CubeWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <SmirkingCube width={125} height={125} ref={ref} />
        </CubeWrapper>
        <Wrapper>
          <Link passHref href="/" legacyBehavior>
            <P
              variants={font}
              initial="initial"
              animate="animate"
              ref={textRef}
              fontSize={fontSize}
              href="/"
            >
              Go Back
            </P>
          </Link>
        </Wrapper>
      </Container>
    </>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
`;

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const CubeWrapper = styled(motion.span)`
  transform-style: preserve-3d;
  margin-top: 64px;
`;

const Wrapper = styled.div`
  animation: ${fadeIn} 2s linear both 4s;
`;

const P = styled(motion.p)`
  display: block;
  text-align: center;
  font-family: decovar;
  font-size: ${(p) => p.fontSize};
  font-size: clamp(60px, 10vw, 128px);
  color: var(--color-404);
  margin: 0;

  text-shadow: -0.0125em -0.0125em 0 var(--shadow-404), 0.0125em -0.0125em 0 var(--shadow-404),
    -0.0125em 0.0125em 0 var(--shadow-404), 0.0125em 0.0125em 0 var(--shadow-404);

  -webkit-text-stroke: 0.0125em var(--stroke-404);

  transition: all 200ms linear;

  &:hover {
    cursor: pointer;

    text-shadow: -0.0125em -0.0125em 0 var(--shadow-404-hover),
      0.0125em -0.0125em 0 var(--shadow-404-hover), -0.0125em 0.0125em 0 var(--shadow-404-hover),
      0.0125em 0.0125em 0 var(--shadow-404-hover);

    -webkit-text-stroke: 0.0125em var(--stroke-404-hover);
  }
`;
