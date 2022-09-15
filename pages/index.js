import styled, { ThemeContext } from 'styled-components';
import Hero from '@components/Hero';
import FancyTitle from '@components/FancyTitle';
import Head from '@components/Head';
import { Main } from '@components/Layout';
import { useContext } from 'react';
import { breakpoints } from '@constants/breakpoints';

const homePageVariant = {
  hidden: {
    opacity: 0,
    clipPath: 'var(--left)',
    letterSpacing: '0.2em',
  },
  show: ({ hasRun }) => {
    return {
      opacity: 1,
      clipPath: 'var(--visible)',
      letterSpacing: '0.0195em',
      transition: {
        duration: 1.5,
        delay: hasRun ? 0 : 2,
      },
    };
  },
};

export default function HomePage() {
  const context = useContext(ThemeContext);
  return (
    <Container id="main-content">
      <Head description="Matt Brannon's slice of the internet" title="Matt Brannon" />
      <TopRow>
        <TitleWrapper>
          <FancyTitle
            style={{
              '--gradient': 'var(--app-name-gradient)',
              '--shadow': 'var(--app-name-shadow)',
            }}
            variants={homePageVariant}
            initial="hidden"
            animate="show"
            custom={{ hasRun: context.hasRun }}
          >
            Welcome to my site!
          </FancyTitle>
        </TitleWrapper>
      </TopRow>

      <Hero />
    </Container>
  );
}

const Container = styled(Main)`
  display: grid;
  align-content: start;
  gap: 16px;

  height: 100%;
  --fontFamily: Recursive;
  --fontSize: clamp(24px, 8vw, 64px);
  --fontVariationSettings: 'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0;
  --strokeWidth: 0.021875em;
  --strokeColor: #000000;

  padding-bottom: 16px;

  @media (max-width: ${breakpoints.mobile}px) {
    padding-bottom: 0;
  }
`;

const TitleWrapper = styled.div`
  top: 64px;
  left: 0;
  right: 0;
  width: 100%;
  white-space: nowrap;
  margin: 0 auto;
  text-align: center;
  margin-top: var(--marginTop);
`;

const TopRow = styled.div`
  width: 100%;
  margin-top: 96px;
  transition: margin-top, 0.2s linear;

  @media (max-width: ${breakpoints.tablet}px) {
    margin-top: 16px;
  }
`;
