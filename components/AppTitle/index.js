import styled from 'styled-components';
import VideoPlayer, { AppVideo } from '@components/VideoPlayer';
import { ExternalLink } from '@components/ExternalLink';
import { useHasMounted } from '@hooks/useHasMounted';
import { useEffect, useRef, useState } from 'react';
import { breakpoints } from '@constants/index.js';
import { H1 } from '@components/Headings';

export default function AppTitle({ title, sources, links, children, ...props }) {
  return (
    <Top>
      <Heading>{title}</Heading>
      <Caption>{children}</Caption>
      <AppVideo center sources={sources} {...props} />
      <LinksWrapper>
        <ExternalLink href={links.liveSite}>Visit the live site</ExternalLink>
        <ExternalLink href={links.github}>See the code</ExternalLink>
      </LinksWrapper>
    </Top>
  );
}

const Heading = styled(H1)`
  font-size: clamp(var(--size21), 10vw, var(--size48));
  ${'' /* margin: 32px 0 0 0; */}
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive4);

  @media (prefers-color-scheme: light) {
    color: var(--pinkBg);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--orange);
    text-shadow: -0.025em -0.0125em 0.075em black;
  }
`;

const Top = styled.div`
  text-align: center;
  margin-bottom: 64px;
  ${'' /* @media (max-width: ${breakpoints.mobile}px) {
    margin-bottom: px;
  } */}
`;

const Caption = styled.div`
  ${'' /* margin-top: -8px;
  margin-bottom: 32px; */}
  margin-bottom: 8px;
  font-variation-settings: 'wdth' 80, 'wght' 575;
  ${'' /* font-size: clamp(var(--size14), 2.5vw, var(--size20)); */}

  @media (max-width: ${breakpoints.mobile}px) {
    font-size: 12px;
  }
`;

const LinksWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  justify-content: space-around;
  @media (max-width: ${breakpoints.mobile}px) {
    gap: 32px;
    flex-direction: column;
    align-items: center;
  }
`;
