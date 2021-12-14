import AboutMePage from '@components/AboutMe';
import ShadowGradient from '@components/GradientText';
import DocumentHead from '@components/Head';
import Hero from '@components/Hero';
import Spacer from '@components/Spacer';
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
  delay: 500,
  fill: 'both',
};

export default function Home({ config }) {
  const context = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: 564 });
  const [ size, setSize ] = useState(32);
  const [ isFinished, setIsFinished ] = useState(false);
  // const [ isPlaying, setIsPlaying ] = useState(false);
  // const [ hasPlayed, setHasPlayed ] = useState(false);
  const [ started, setStarted ] = useState(null);
  const [ animationTiming, setAnimationTiming ] = useState(null);
  // const [ effect, setEffect ] = useState();
  context.heroConfig = config;
  const ref = useRef();
  const hasCookie = useCookie('animated');

  useEffect(() => (isMobile ? setSize(48) : setSize(80)), [ isMobile ]);

  useEffect(() => {
    console.log('inside use effect');
    if (!started) {
      console.log('inside !started');
      let animation;
      if (hasCookie !== null) {
        if (hasCookie) {
          animation = ref.current.animate(frames, timing);
        }
        if (!hasCookie) {
          animation = ref.current.animate(frames, { ...timing, delay: 3800 });
        }
        setStarted(true);
        setAnimationTiming(animation.effect.getComputedTiming());
        animation.finished.then(() => {
          setIsFinished(true);
        });
      }

      // setEffect(config);
    }
  }, [ started, isFinished, hasCookie ]);

  return (
    <Main>
      <DocumentHead title="Matt Brannon" desc="A brief introduction" />
      <Content>
        <Spacer axis="vertical" size={size} />
        <Hero config={config} />

        <BottomGroup ref={ref}>
          <ShadowGradient animationTiming={animationTiming} isFinished={isFinished}>
            About Me
          </ShadowGradient>
          <AboutMePage />
        </BottomGroup>
      </Content>
    </Main>
  );
}

const Main = styled.div`
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  height: 100%;

  justify-content: center;
  flex-direction: column;
`;

// const bringUp = keyframes`
//   0% {
//     opacity: 0;
//     transform: translate(0, 100px);
//   }

//   100% {
//     opacity: 1;
//     transform: translate(0, 0);
//   }
// `;

// const bringInText = (props) => {
//   return css`
//     ${bringUp} 1500ms ease-in-out 3600ms both;
//   `;
// };

const BottomGroup = styled.div`
  margin-top: -32px;
`;

export async function getStaticProps() {
  const config = await getImageConfig('hero');
  return {
    props: {
      config: config,
    },
  };
}

// useEffect(() => {
//   console.log(context.cookieExists);
//   if (!context.cookieExists && !isPlaying && !hasPlayed) {
//     // const delay = context.cookieExists ? 300 : 4000;
//     const timing = { duration: 1000, delay: 4000, easing: 'ease', fill: 'both' };
//     const animation = ref.current.animate(frames, timing);
//     setIsPlaying(true);
//     animation.finished.then(() => {
//       setIsFinished(true);
//       setIsPlaying(false);
//       setHasPlayed(true);
//     });
//   }
//   else if (!isPlaying && !hasPlayed) {
//     // const delay = context.cookieExists ? 300 : 4000;
//     const timing = { duration: 1000, delay: 300, easing: 'ease', fill: 'both' };
//     const animation = ref.current.animate(frames, timing);
//     setIsPlaying(true);
//     animation.finished.then(() => {
//       setIsFinished(true);
//       setIsPlaying(false);
//       setHasPlayed(true);
//     });
//   }
// }, [ context, isPlaying, hasPlayed ]);
