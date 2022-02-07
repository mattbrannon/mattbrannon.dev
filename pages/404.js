import { Creature404 } from '@components/Creature';
import DocumentHead from '@components/Head';
import { decovarValues } from '@constants/index.js';
import { useFontSize } from '@hooks/useFontSize';
import { motion } from 'framer-motion';
import { useHasMounted } from 'hooks/useHasMounted';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '@components/Layout';

const getTranslateXPoints = (start, end, divider) => {
  let total = Math.abs(start) + Math.abs(end);
  let multiplier = start < end ? 1 : -1;
  let steps = total / divider;
  let arr = [ start ];
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

const frames = walking(-800, 0, 42, -5, 62);

const setRandomValues = () => {
  const random = (n) => Math.floor(Math.random() * (n + 1));
  const removeKeys = (key) => key !== 'default' && key !== 'sheared';

  const keys = Object.keys(decovarValues);
  const shuffledKeys = [];
  while (keys.length) {
    let i = random(keys.length - 1);
    let key = keys[i];
    shuffledKeys.push(key);
    keys.splice(i, 1);
  }

  return shuffledKeys.filter(removeKeys).map((key) => decovarValues[key]);
};

export default function Error404() {
  const ref = useRef();
  const textRef = useRef();
  const fontSize = useFontSize(32, 7 * 16, 240, 1440);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (ref && ref.current) {
      const walk = ref.current.animate(frames, {
        duration: 2000,
        fill: 'both',
        easing: 'linear',
      });
      walk.finished.then(() => {
        const lastFrame = frames.pop();
        const spin = [ lastFrame, { transform: 'rotateY(-15deg)' } ];
        ref.current.animate(spin, {
          duration: 900,
          delay: 1400,
          easing: 'cubic-bezier(.79,-0.31,.05,1.4)',
          fill: 'forwards',
        });
      });
    }
  }, [ ref ]);

  const font = {
    animate: {
      fontVariationSettings: [ decovarValues.default, ...setRandomValues() ],

      transition: {
        delay: 9,
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 120,
      },
    },
  };

  return (
    <main>
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
        <Creature404 eyelid={50} blink ref={ref} />
        <Wrapper>
          <Link passHref href="/">
            <P
              variants={font}
              animate={font.animate}
              ref={textRef}
              fontSize={fontSize}
              href="/"
            >
              Go Back
            </P>
          </Link>
        </Wrapper>
      </Container>
    </main>
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
  display: grid;
  place-items: center;
  grid-template-rows: 200px 100px;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const Wrapper = styled(motion.div)`
  animation: ${fadeIn} 2s linear both 5s;
  ${'' /* margin-top: -200px;
  margin-bottom: -100px; */}
`;

const shadow = (color, size = 0.0125) =>
  `-${size}em -${size}em 0 ${color}, 
  ${size}em -${size}em 0 ${color}, 
  -${size}em ${size}em 0 ${color}, 
  ${size}em ${size}em 0 ${color};`;

const stroke = (color, size = 0.0125) => `${size}em ${color};`;

const P = styled(motion.p)`
  display: block;
  text-align: center;
  font-family: decovar;
  font-size: ${(p) => p.fontSize};
  color: black;
  text-shadow: ${() => shadow('purple')};
  -webkit-text-stroke: ${() => stroke('deepskyblue')};

  transition: all 200ms linear;

  @media (prefers-color-scheme: dark) {
    text-shadow: ${() => shadow('red')};
    -webkit-text-stroke: ${() => stroke('yellow')};
  }

  &:hover {
    cursor: pointer;
    color: var(--dark-pink);
    color: black;
    text-shadow: ${() => shadow('rebeccapurple')};
    -webkit-text-stroke: ${() => stroke('lime')};

    @media (prefers-color-scheme: dark) {
      text-shadow: ${() => shadow('yellow')};
      -webkit-text-stroke: ${() => stroke('deepskyblue')};
      color: black;
    }
  }
`;
