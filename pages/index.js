import styled, { ThemeContext } from 'styled-components';
import Hero from '@components/Hero';
import FancyTitle from '@components/FancyTitle';
import Head from '@components/Head';

import { useState, useEffect, useContext } from 'react';

import { useMediaQuery } from '@hooks/useMediaQuery';
import { breakpoints } from '@constants/breakpoints';

export default function HomePage() {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const marginTop = isMobile ? 8 : 48;
  const context = useContext(ThemeContext);

  const [ shouldRemove, setShouldRemove ] = useState(true);

  return (
    <Container>
      <Head description="Personal website for Matt Brannon" title="Matt Brannon" />
      {!isMobile ? (
        <TopRow style={{ '--marginTop': `${marginTop}px` }}>
          <TitleWrapper>
            <FancyTitle
              showTitle={shouldRemove || context.hasRun}
              hasCookie={false}
              from="left"
              delay={4}
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

  height: 100%;
  --fontFamily: Recursive;
  --fontSize: clamp(24px, 8vw, 80px);
  --fontVariationSettings: 'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0;
  --strokeWidth: 0.021875em;
  --strokeColor: #000000;

  padding-bottom: 32px;

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
