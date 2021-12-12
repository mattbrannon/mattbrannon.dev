import AboutMePage from '@components/AboutMe';
import DocumentHead from '@components/Head';
import Hero from '@components/Hero';
import Spacer from '@components/Spacer';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { getImageConfig } from '@utils/images';
import { useContext, useEffect, useState } from 'react';
import styled, { css, keyframes, ThemeContext } from 'styled-components/macro';

export default function Home({ config }) {
  const context = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: 564 });
  const [ size, setSize ] = useState(32);
  context.heroConfig = config;

  useEffect(() => {
    const cookieExists = document.cookie
      .split(';')
      .some((item) => item.trim().startsWith('animated'));
    if (!cookieExists) {
      document.cookie = `animated=${Date.now()}`;
      // 'animated=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure';
    }
  });

  // useEffect(() => {
  //   context.setIsPlaying(true);
  //   setTimeout(() => {
  //     context.setIsPlaying(false);
  //     // context.setHasPlayed(true);
  //   }, 7200);
  // });

  useEffect(() => {
    const size = isMobile ? 48 : 80;
    setSize(size);
  }, [ isMobile ]);

  return (
    <Main>
      <DocumentHead title="Matt Brannon" desc="A brief introduction" />
      <Content>
        <Spacer axis="vertical" size={size} />
        <Hero config={config} />

        <BottomGroup>
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

const bringUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 100px);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const bringInText = (props) => {
  const delay = props.theme.hasPlayed ? 0 : 3600;
  const duration = props.theme.hasPlayed ? 0 : 1500;
  return css`
    ${bringUp} ${duration}ms ease-in-out ${delay}ms both;
  `;
};

const BottomGroup = styled.div`
  opacity: 0;

  transform: translate(0, 100px);
  animation: ${(p) => bringInText(p)};
`;

export async function getStaticProps() {
  const config = await getImageConfig('hero');
  return {
    props: {
      config: config,
    },
  };
}
