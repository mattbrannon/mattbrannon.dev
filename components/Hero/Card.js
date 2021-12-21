import { animations } from '@animations';
import Spacer from '@components/Spacer';
import { breakpoints } from '@constants/';
import { useCookie } from '@hooks/useCookie';
import { useHasMounted } from '@hooks/useHasMounted';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { LayoutGroup, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes, ThemeContext } from 'styled-components/macro';
import { MotionButton } from './MotionButtons';
import HeroImage from './MotionImage';
import SlidingText from './SlidingText';
import s from './style.module.css';

const getPosition = (cardDimensions, bounds) => {
  const position = {
    x: bounds.x - cardDimensions.x,
    y: bounds.y - cardDimensions.y,
    width: bounds.width,
    height: bounds.height,
  };
  return position;
};

export default function Hero() {
  const card = useRef();
  const circle = useRef();
  const hasMounted = useHasMounted();
  const hasCookie = useCookie('navigated')[0];
  // const isMobile = useMediaQuery({ maxWidth: 480 });
  const [ stopAt, setStopAt ] = useState(0);
  // const size = 40;
  const theme = useContext(ThemeContext);
  const [ isComplete, setIsComplete ] = useState(false);
  const { mobile } = breakpoints;
  const isMobile = useMediaQuery({ maxWidth: mobile });
  const isSmall = useMediaQuery({ maxWidth: 320 });

  const [ showImage, setShowImage ] = useState(null);

  const [ spacerValues, setSpacerValues ] = useState({ axis: 'horizontal', size: 32 });

  const shouldLoadStatic = hasCookie || isSmall || isMobile;

  // const circleSize = 32;

  // const buttons = variants.buttons();

  useEffect(() => {
    const axis = isSmall ? 'vertical' : 'horizontal';
    const size = axis === 'vertical' ? 16 : 32;
    setSpacerValues({ axis, size });
  }, [ isSmall ]);

  useEffect(() => {
    if (hasMounted && card.current) {
      setShowImage(false);
      // alert(window.innerWidth);
      const cardRect = card.current.getBoundingClientRect();
      const circleRect = circle.current.getBoundingClientRect();
      const position = getPosition(cardRect, circleRect);
      const x = position ? position.x - (120 - position.width) : null;
      setStopAt(x * -1);
    }
  }, [ hasMounted ]);

  const variants = {
    initial: { clipPath: 'circle(0%)', x: 0 },
    animate: {
      clipPath: 'circle(100%)',
      y: -100,
      x: `${stopAt}px`,
      scale: 0,
      transition: {
        clipPath: {
          delay: 0,
          duration: 0.5,
        },
        y: {
          delay: 2.25,
          duration: 0.75,
          type: 'spring',
          bounce: 5,
          damping: 10,
        },
        x: {
          delay: 3.25,
          duration: 0.75,
          ease: [ 0.52, -0.51, 1, -0.09 ],
        },
        scale: {
          duration: 0.5,
          delay: 4,
        },
      },
    },
  };

  const handleUpdate = (latest) => {
    const diff = Math.abs(stopAt) - Math.abs(latest.x);
    if (diff <= 50 && !showImage && showImage !== null) {
      setShowImage(true);
    }
  };
  const handleAnimationComplete = () => {
    setIsComplete(true);
    theme.setHasRun(true);
  };

  const amount = 108;

  return (
    <LayoutGroup>
      <Container>
        <CardWrapper hasCookie={hasCookie} ref={card}>
          <TopSection>
            <HeroImage
              width={isMobile ? 100 : 160}
              height={isMobile ? 100 : 160}
              src="/images/hero/hero.png"
              alt="photo of me"
              className={isMobile ? s.mobile : s.center}
              priority={true}
              showImage={showImage}
            />
            {!isSmall && !isMobile && (
              <Heading hasCookie={hasCookie}>Matt Brannon</Heading>
            )}
            {!isSmall && !isMobile && (
              <SlidingText>
                Hey there! My name is Matt. I'm a web developer and musician. I enjoy
                building solutions to modern problems with code. Thanks for stopping by my
                little corner of the web.
              </SlidingText>
            )}
          </TopSection>
          <ButtonWrapper>
            <MotionButton x={amount} isComplete={isComplete} showImage={showImage} left>
              Contact me
            </MotionButton>
            {!shouldLoadStatic ? (
              <Circle
                variants={variants}
                initial={variants.initial}
                animate={variants.animate}
                ref={circle}
                onUpdate={handleUpdate}
                onAnimationComplete={handleAnimationComplete}
              />
            ) : (
              !isMobile && <Spacer axis={spacerValues.axis} size={spacerValues.size} />
            )}
            <MotionButton x={amount} isComplete={isComplete} showImage={showImage} right>
              View my work
            </MotionButton>
          </ButtonWrapper>
        </CardWrapper>
      </Container>
    </LayoutGroup>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

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
    margin-top: 96px;
    margin-bottom: -96px;
    padding-bottom: 96px;
  }
`;

const darkCard = (props) => {
  const delay = props.hasCookie ? 300 : 3300;

  const animation = css`
    ${animations.raiseCardDark} 1500ms ease ${delay}ms both;
  `;
  return animation;
};

const lightCard = (props) => {
  const delay = props.hasCookie ? 500 : 3500;

  const animation = css`
    ${animations.raiseCardLight} 2000ms ease ${delay}ms both
  `;
  return animation;
};

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 655px;
  padding: 24px;
  margin: auto;
  overflow: hidden;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.mobile}px) {
    box-shadow: var(--box-shadow);
    background: var(--background);
    animation: ${(p) => lightCard(p)};
    @media (prefers-color-scheme: dark) {
      animation: ${(p) => darkCard(p)};
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

const Heading = styled.h2`
  --heading-color: hsl(191 25% 25% / 1);
  --accent-color: var(--pinkBg);
  --size0: 0rem;

  position: relative;
  margin-left: 4px;
  margin-right: auto;
  white-space: nowrap;

  font-size: var(--size28);
  font-family: 'Open Sans', system-ui, sans-serif;
  font-variation-settings: 'wdth' 75, 'wght' 700;

  color: var(--heading-color);

  transform: translate(8px, 21px);

  animation: ${(p) => animateHeading(p)};

  @media (max-width: ${breakpoints.mobile}px) {
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    --heading-color: hsl(191 50% 65%);
    --accent-color: var(--blue-main-light);
  }
`;

// const ButtonWrapper = styled(motion.div).attrs(({ isComplete }) => {
//   const gap = isComplete ? 24 : 0;
//   const size = isComplete ? 0 : 32;
//   return {
//     style: {
//       gap: gap + 'px',
//       '--circle-size': size + 'px',
//     },
//   };
// })`
//   ${'' /* --circle-size: 32px; */}
//   --half-circle: calc(var(--circle-size) * 0.5);
//   --left-x: calc(50% + var(--half-circle));
//   --right-x: calc(-50% - var(--half-circle));

//   --left-translate: var(--left-x), 0;
//   --right-translate: var(--right-x), 0;

//   display: flex;
//   ${'' /* gap: ${(p) => (p.isComplete ? '24px' : '8px')}; */}
//   flex-wrap: wrap;
//   align-items: center;

//   transition: all 1.2s;
//   justify-content: flex-end;
//   ${'' /* @media (min-width: ${breakpoints.mobile}px) {
//     justify-content: flex-end;
//   } */}
// `;

const ButtonWrapper = styled(motion.div).attrs((props) => {
  console.info(props);
  const gap = props.theme.hasRun ? 8 : 0;
  const size = props.theme.hasRun ? 0 : 40;
  const marginRight = props.theme.hasRun ? 8 : 0;
  return {
    style: {
      '--gap': gap + 'px',
      '--circle-size': size + 'px',
      '--margin-right': marginRight + 'px',
    },
  };
})`
  --half-circle: calc(var(--circle-size) * 0.5);
  --left-x: calc(50% + var(--half-circle));
  --right-x: calc(-50% - var(--half-circle));

  --left-translate: var(--left-x), 0;
  --right-translate: var(--right-x), 0;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap);

  transition: all 1s;
  justify-content: center;

  gap: 8px;

  @media (max-width: ${breakpoints.mobile}px) {
    max-width: 200px;
    margin: 16px auto;
  }

  @media (min-width: ${breakpoints.mobile}px) {
    justify-content: flex-end;
    margin-right: var(--margin-right);
  }
`;

const Circle = styled(motion.div)`
  ${'' /* height: var(--circle-size); */}
  width:32px;
  height: 32px;
  background: var(--tealBg);
  border-radius: 50%;
`;

// const WrapButton = ({ isComplete, ...props }) => {
//   const dumbProps = Object.assign({}, props);
//   delete dumbProps.isComplete;
//   return (
//     <ButtonWrapper isComplete={isComplete} {...dumbProps}>
//       {props.children}
//     </ButtonWrapper>
//   );
// };

// // eslint-disable-next-line react/display-name
// const WithHOC = (Component) => (props) => {
//   return <Component {...props}>{props.children}</Component>;
// };

const TopSection = styled.div`
  @media (max-width: ${breakpoints.mobile}px) {
    margin: 0 auto;
  }
`;
