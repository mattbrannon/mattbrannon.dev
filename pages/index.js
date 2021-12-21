import AboutMePage from '@components/AboutMe';
import ShadowGradient from '@components/GradientText';
import DocumentHead from '@components/Head';
import Hero from '@components/Hero';
import { breakpoints } from '@constants/';
import { useCookie } from '@hooks/useCookie';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { getImageConfig } from '@utils/images';
import { useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';

const frames = [
  { opacity: 0, transform: 'translate(0, 30px)' },
  { opacity: 1, transform: 'translate(0, 0)' },
];

const timing = {
  duration: 1200,
  easing: 'ease',
  delay: -100,
  fill: 'both',
};

export default function Home({ config }) {
  const context = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const [ isFinished, setIsFinished ] = useState(false);
  const [ started, setStarted ] = useState(null);
  const [ animationTiming, setAnimationTiming ] = useState(null);
  context.heroConfig = config;
  const ref = useRef();
  const hasCookie = useCookie('navigated')[0];

  useEffect(() => {
    if (!started && hasCookie !== null && ref.current) {
      setStarted(true);
      const options = hasCookie || isMobile ? timing : { ...timing, delay: 3800 };
      const animation = ref.current.animate(frames, options);
      const animationTiming = animation.effect.getComputedTiming();
      setAnimationTiming(animationTiming);
      animation.finished.then(() => {
        setIsFinished(true);
      });
    }
  }, [ started, hasCookie, isMobile ]);

  return (
    <Main>
      <DocumentHead title="Matt Brannon" desc="A brief introduction" />
      <Hero config={config} />

      <BottomGroup ref={ref} hasCookie={hasCookie}>
        <ShadowGradient isFinished={isFinished} animationTiming={animationTiming}>
          About Me
        </ShadowGradient>
        <AboutMePage />
      </BottomGroup>
    </Main>
  );
}

const Main = styled.div`
  height: 100%;
`;

const BottomGroup = styled.div`
  opacity: 0;
`;

export async function getStaticProps() {
  const config = await getImageConfig('hero');
  return {
    props: {
      config: config,
    },
  };
}
