import styled, { ThemeContext } from 'styled-components';
import Hero from '@components/Hero';
import FancyTitle from '@components/FancyTitle';
import Head from '@components/Head';
import { useState, useContext, useEffect } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
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
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const marginTop = isMobile ? 8 : 48;
  const context = useContext(ThemeContext);

  useEffect(() => {
    console.log(context);
  }, [context]);

  const [shouldRemove, setShouldRemove] = useState(true);

  return (
    <Container>
      <Head description="Personal website for Matt Brannon" title="Matt Brannon" />
      {!isMobile ? (
        <TopRow style={{ '--marginTop': `${marginTop}px` }}>
          <TitleWrapper>
            <FancyTitle
              variants={homePageVariant}
              initial="hidden"
              animate="show"
              custom={{ hasRun: context.hasRun }}
            >
              Welcome to my site!
            </FancyTitle>
          </TitleWrapper>
        </TopRow>
      ) : null}
      <Hero
        shouldRemove={shouldRemove}
        setShouldRemove={setShouldRemove}
        // setShowTitle={setShowTitle}
        // hasCookie={hasCookie}
        // setHasCookie={setHasCookie}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  row-gap: 8px;

  height: 100%;
  --fontFamily: Recursive;
  --fontSize: clamp(24px, 8vw, 80px);
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
  transition: margin-top, 0.2s linear;
`;
