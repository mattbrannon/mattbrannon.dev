import Creature from '@components/Creature';
import DocumentHead from '@components/Head';
import { decovarValues } from '@constants';
import { useFontSize } from '@hooks/useFontSize';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components/macro';

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

const frames = walking(-600, 0, 42, -5, 62);

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

  useEffect(() => {
    if (ref.current) {
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
          fill: 'both',
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
        <Creature ref={ref} />
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

const P = styled(motion.p)`
  display: block;
  text-align: center;
  font-family: decovar;
  font-size: ${(p) => p.fontSize};

  &:hover {
    cursor: pointer;
    color: var(--dark-pink);
    @media (prefers-color-scheme: dark) {
      color: deepskyblue;
    }
  }
`;

// const randomFonts = Array.from({ length: 10 }, () => setRandomFontVariation(700));

// const getFontFrames = (totalFrames, minVariation, maxVariation) => {
//   // const first = { fontVariationSettings: decovarTemplate };
//   const frames = [ decovarTemplate ];
//   minVariation = minVariation || 100;
//   maxVariation = maxVariation || 600;
//   for (let i = 1; i <= totalFrames; i++) {
//     let variation =
//       i % (totalFrames / 2) === 0
//         ? minVariation
//         : i % 2 === 0
//         ? maxVariation / 2
//         : maxVariation;
//     const font = setRandomFontVariation(variation);
//     frames.push(font);
//   }
//   return frames;
// };

// console.log(setRandomValues());
// console.log(getFontFrames(12, 50, 700));

// useEffect(() => {
//   const frames = getFontFrames(8);
//   const config = {
//     duration: 20000,
//     easing: 'linear',
//     delay: 5000,
//     iterations: Infinity,
//     direction: 'alternate',
//     fill: 'forwards',
//   };
//   if (textRef.current) {
//     textRef.current.animate(frames, config);
//   }
// }, [ textRef ]);

// function isBelowLimit(s, max = 1500) {
//   const total = s
//     .split(',')
//     .filter((value) => {
//       return value.includes('SKLA') || value.includes('BLDA');
//     })
//     .map((value) => value.match(/\d+/g))
//     .flat()
//     .map(Number)
//     .reduce((a, b) => a + b);

//   return total < max;
// }

// const setRandomFontVariation = (max = 1000) => {
//   const template = decovarTemplate;
//   let variation = template.replace(/0/g, () => random(max));
//   while (!isBelowLimit(variation)) {
//     variation = template.replace(/0/g, () => random(max));
//   }

//   return variation;
// };

// const setRandomVariables = () => {
//   const copy = decovarVariables.slice();
//   const shuffled = [];
//   while (copy.length) {
//     let index = random(copy.length - 1);
//     let font = copy[index];
//     shuffled.push(font);
//     copy.splice(index, 1);
//   }
//   return shuffled;
// };
