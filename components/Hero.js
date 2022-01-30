import styled, { css, keyframes, ThemeContext } from 'styled-components';
// import heroImage from '/images/hero/hero.png';
import { ResponsiveImage, StaticImage } from './Image';
import { InvertedButton } from '@components/Button';
import { breakpoints } from '@constants/index';
import { animations } from '@animations/index';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@hooks/useMediaQuery';
import Link from 'next/link';
import { useContext, useEffect } from 'react';

export default function Hero({ ...props }) {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const width = isMobile ? 120 : 200;
  const height = width;

  return (
    <Container>
      <CardWrapper>
        <TopWrapper>
          <StaticImage width={width} height={height} {...props} />
          {/* <SlidingText>
            Hey there! My name is Matt. I'm a web developer and a musician. Welcome to my
            little corner of internet.
          </SlidingText> */}
        </TopWrapper>
        <BottomWrapper>
          <ButtonWrapper>
            <Button>Portfolio</Button>
            <Button>Contact</Button>
            <Button>Blog</Button>
          </ButtonWrapper>
        </BottomWrapper>
      </CardWrapper>
    </Container>
  );
}

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: ${4.4 / 16}rem;
`;

const SlidingText = ({ children }) => {
  const regex = /\w+\s|\w+[,.?!]\s|\w+[']\w+|\w+$/g;
  const re = /\w+([,.?!'])?(\s|\w+|\w+$)/g;

  const context = useContext(ThemeContext);

  const words = {
    hidden: context.hasRun ? null : (i) => ({ x: (i + 1) * 2 + 600 }),
    show: (i) => ({
      x: 0,
      transition: { ease: 'easeOut', duration: 1, delay: (i + 1) / 50 },
    }),
  };

  return (
    <div style={{ margin: '16px 0 0 0' }}>
      <Paragraph
        animate={{ opacity: 1, transition: { duration: 3 } }}
        onAnimationComplete={() => context.setHasRun(true)}
      >
        {children.match(re).map((word, index) => (
          <Word
            key={index}
            custom={index}
            animate="show"
            initial="hidden"
            variants={words}
          >
            {word + ' '}
          </Word>
        ))}
      </Paragraph>
    </div>
  );
};

const Paragraph = styled(motion.p)`
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size16);
  }
`;

// const Heading = styled.h2`
//   position: absolute;
//   z-index: 9999999;
//   top: 60px;
//   white-space: nowrap;
//   align-self: flex-end;
//   flex: 1;
//   font-family: recursive;
//   font-variation-settings: var(--recursive9);
//   font-size: clamp(var(--size24), 3vw + 0.5rem, var(--size32));

//   @media (max-width: ${breakpoints.mobile}px) {
//     align-self: center;
//     display: none;
//   }
// `;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-width: 0;
  justify-content: center;

  ${'' /* @media (max-width: ${breakpoints.mobile}px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } */}
`;

// const ButtonWrapper = styled.div`
//   display: flex;
//   gap: 8px;
//   justify-content: center;
//   flex: 1 50%;
//   flex-wrap: wrap;

// `;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const TopWrapper = styled.div`
  ${'' /* height: 120px;
  width: 120px; */}
`;

const Button = styled(InvertedButton)`
  min-width: 160px;
  max-width: 320px;
  flex: 1;
  align-self: center;
  transform: translateX(var(--x));
  @media (max-width: ${breakpoints.mobile}px) {
    width: 100%;
    min-width: 100px;
    max-width: 200px;
  }
`;

const Container = styled.div`
  ${'' /* position: relative; */}
  height: 100%;
  width: 100%;
  min-width: 0;

  isolation: isolate;
  --background-values: 223 35% 85%;
  --background-opacity: ${(p) => (p.hasPlayed ? 0 : 0.5)};
  --card-background: hsl(var(--background-values) / var(--background-opacity));

  --shadow-values: 210 5% 35%;
  --shadow-opacity: 0.1;
  --card-shadow: 2px 2px 4px hsl(var(--shadow-values) / var(--shadow-opacity)),
    3px 3px 6px hsl(var(--shadow-values) / var(--shadow-opacity)),
    4px 4px 8px hsl(var(--shadow-values) / var(--shadow-opacity)),
    5px 5px 10px hsl(var(--shadow-values) / var(--shadow-opacity)),
    6px 6px 12px hsl(var(--shadow-values) / var(--shadow-opacity)),
    7px 7px 14px hsl(var(--shadow-values) / var(--shadow-opacity)),
    8px 8px 16px hsl(var(--shadow-values) / var(--shadow-opacity)),
    9px 9px 18px hsl(var(--shadow-values) / var(--shadow-opacity));

  --box-shadow: ${(p) => (p.hasCookie ? 'var(--card-shadow)' : undefined)};
  --background: ${(p) => (p.hasCookie ? 'var(--card-background)' : undefined)};

  @media (prefers-color-scheme: dark) {
    --background-values: 223 5% 15%;
    --shadow-values: 210deg 5% 5%;
    --shadow-opacity: 0.3;
    --card-shadow: 2px 2px 4px hsl(var(--shadow-values) / var(--shadow-opacity)),
      3px 3px 6px hsl(var(--shadow-values) / var(--shadow-opacity)),
      4px 4px 8px hsl(var(--shadow-values) / var(--shadow-opacity)),
      5px 5px 10px hsl(var(--shadow-values) / var(--shadow-opacity)),
      6px 6px 12px hsl(var(--shadow-values) / var(--shadow-opacity));
  }

  @media (min-width: ${breakpoints.mobile}px) {
    margin-top: 48px;
    margin-bottom: -96px;
    padding-bottom: 96px;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    margin-top: -24px;
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  max-width: 655px;
  margin: auto;
  overflow: hidden;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${breakpoints.mobile}px) {
    padding: 24px;

    box-shadow: var(--box-shadow);
    background: var(--background);

    @media (prefers-color-scheme: light) {
      --background: ${(p) => (p.theme.hasRun ? 'hsl(223 35% 85% / 0.5)' : undefined)};

      --box-shadow: ${(p) =>
        p.theme.hasRun
          ? `2px 2px 4px hsl(210 5% 38% / 0.1), 3px 3px 6px hsl(210 5% 38% / 0.1),
      4px 4px 8px hsl(210 5% 38% / 0.1), 5px 5px 10px hsl(210 5% 38% / 0.1),
      6px 6px 12px hsl(210 5% 38% / 0.1), 7px 7px 14px hsl(210 5% 38% / 0.1),
      8px 8px 16px hsl(210 5% 38% / 0.1), 9px 9px 18px hsl(210 5% 38% / 0.1)`
          : undefined};

      animation: ${(p) => (p.theme.hasRun ? undefined : lightCard)};
    }

    @media (prefers-color-scheme: dark) {
      --background: ${(p) => (p.theme.hasRun ? '#292929' : undefined)};

      --box-shadow: ${(p) =>
        p.theme.hasRun
          ? `2px 2px 4px hsl(210 5% 5% / 0.3), 3px 3px 6px hsl(210 5% 5% / 0.3),
      4px 4px 8px hsl(210 5% 5% / 0.3), 5px 5px 10px hsl(210 5% 5% / 0.3),
      6px 6px 12px hsl(210 5% 5% / 0.3)`
          : undefined};
      animation: ${(p) => (p.theme.hasRun ? undefined : darkCard)};
    }
  }
`;

const fadeHeading = keyframes`
  from {
    color: var(--accent-color);
    opacity: 0;
    font-variation-settings: 'wdth' 100, 'wght' 300;
  }
  to {
    color: var(--heading-color);
    opacity: 1;
    font-variation-settings: 'wdth' 75, 'wght' 700;
  }
`;

const animateHeading = (props) => {
  const delay = props.hasCookie ? 400 : 3400;
  const animation = css`
    ${fadeHeading} 600ms ease-in ${delay}ms both;
  `;
  return animation;
};

const darkCard = () => {
  const animation = css`
    ${animations.raiseCardDark} 1500ms ease 300ms both;
  `;
  return animation;
};

const lightCard = () => {
  const animation = css`
    ${animations.raiseCardLight} 2000ms ease 300ms both
  `;
  return animation;
};
