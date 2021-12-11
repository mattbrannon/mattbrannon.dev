import { animations } from '@animations';
import { useHasMounted } from '@hooks/useHasMounted';
import { useWindowSize } from '@hooks/useWindowSize';
import { useContext, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes, ThemeContext } from 'styled-components/macro';
import Buttons from './Buttons';
import HeroImage from './Image';
import SlidingText from './SlidingText';

export default function Hero(props) {
  console.log('hero props', props);
  const context = useContext(ThemeContext);
  console.log(context);
  const ref = useRef();
  const hasMounted = useHasMounted();
  const windowSize = useWindowSize();
  const [ cardDimensions, setCardDimensions ] = useState();

  useEffect(() => {
    if (hasMounted) {
      const rect = ref.current.getBoundingClientRect();
      setCardDimensions(rect);
    }
  }, [ windowSize.width, windowSize.height, hasMounted ]);

  return (
    <Container>
      <CardWrapper ref={ref}>
        <div>
          <HeroImage round width={160} src="/images/hero/hero1.png" alt="father of lies" />
          <Heading>Matt Brannon</Heading>
          <SlidingText>
            Hey there! My name is Matt. I'm a web developer and musician. I enjoy building solutions
            to modern problems with code. Thanks for stopping by my little corner of the web.
          </SlidingText>
        </div>
        <div>
          <Buttons cardDimensions={cardDimensions} />
        </div>
      </CardWrapper>
    </Container>
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
`;

const darkCard = (props) => {
  const animation = css`
    ${animations.raiseCardDark} 1500ms ease 3300ms forwards;
  `;
  return props.theme.hasPlayed ? undefined : animation;
};

const lightCard = (props) => {
  const animation = css`
    ${animations.raiseCardLight} 2000ms ease 3500ms forwards
  `;
  return props.theme.hasPlayed ? undefined : animation;
};

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 655px;
  padding: 16px;
  margin: auto;
  overflow: hidden;
  ${'' /* --shadow-color: 208 10% 35%; */}
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  box-shadow: ${(p) => (p.theme.hasPlayed ? 'var(--card-shadow)' : undefined)};
  background: ${(p) => (p.theme.hasPlayed ? 'var(--card-background)' : undefined)};
  ${'' /* transform: ${(p) => (p.theme.hasPlayed ? 'var(--hero-card-transform)' : undefined)}; */}

  animation: ${(p) => lightCard(p)};

  @media (prefers-color-scheme: dark) {
    animation: ${(p) => darkCard(p)};
    ${'' /* animation: ${animations.raiseCardDark} 1500ms ease 4000ms forwards; */}
  }

  @media (max-width: 555px) {
  }
`;

const fadeHeading = keyframes`
  from {
    color: var(--accent-color);
    opacity: 0;
    font-variation-settings: 'wdth' 100, 'wght' 300;
    ${
      '' /* font-variation-settings: "MONO" 0.5, "CASL" 1, 'wdth' 75, "wght" 300, "slnt" -6, "CRSV" 0; */
    }
  }
  to {
    color: var(--heading-color);
    opacity: 1;
    font-variation-settings: 'wdth' 75, 'wght' 700;

    ${
      '' /* font-variation-settings: "MONO" 0.5, "CASL" 1, 'wdth' 75, 'wght' 700, "slnt" -6, "CRSV" 0; */
    }
    ${'' /* font-variation-settings: "MONO" 0, "CASL" 0, "wght" 655, "slnt" -3, "CRSV" 0; */}
  }
`;

const animateHeading = (props) => {
  const animation = css`
    ${fadeHeading} 600ms ease-in 3400ms both;
  `;
  return props.theme.hasPlayed ? undefined : animation;
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

  @media (max-width: 564px) {
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    --heading-color: hsl(191 50% 65%);
    --accent-color: var(--blue-main-light);
  }
`;
