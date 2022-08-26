import styled from 'styled-components';
import { FlatVideo } from '@components/VideoPlayer';
import { ExternalLink } from '@components/Links';
import { breakpoints } from '@constants/index.js';
import FancyTitle from '@components/FancyTitle';
import { memo } from 'react';
import { m as motion } from 'framer-motion';

export const AppTitle = memo(AppTitleComponent);

function AppTitleComponent({ title, sources, links, children, ...props }) {
  return (
    <Top>
      <FancyTitle
        style={{
          '--gradient': 'var(--app-name-gradient)',
          // '--shadow': 'var(--app-name-shadow)',
          '--strokeWidth': '0.05em',
          '--strokeColor': '#000000',
        }}
        initial="hidden"
        animate="show"
        variants={appTitleVariant}
      >
        {title}
      </FancyTitle>
      <Caption>{children}</Caption>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <FlatVideo center sources={sources} {...props} />
      </motion.div>
      <LinksWrapper>
        <ExternalLink href={links.liveSite}>Visit the live site</ExternalLink>
        <ExternalLink href={links.github}>See the code</ExternalLink>
      </LinksWrapper>
    </Top>
  );
}

const appTitleVariant = {
  hidden: {
    opacity: 0,
    // clipPath: 'var(--center)',
    // letterSpacing: '0.2em',
    '--fontSize': 'clamp(36px, 4vw, 54px)',
    // '--gradient': 'linear-gradient(0deg, white, black)',

    '--fontVariationSettings': "'wght' 300, 'slnt' 0, 'CASL' 0, 'CRSV' 0, 'MONO' 0",
  },
  show: {
    opacity: 1,
    // clipPath: 'var(--visible)',
    '--fontSize': 'clamp(36px, 4vw, 54px)',

    // fontSize:
    '--fontVariationSettings': "'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0",
    transition: {
      duration: 1.5,
    },
  },
};

const Top = styled.div`
  text-align: center;
  margin-bottom: 96px;
  margin-top: 64px;
  @media (max-width: ${breakpoints.mobile}px) {
    margin-top: 32px;
  }

  --fontFamily: Recursive;
  --fontVariationSettings: 'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0;
  --strokeWidth: 0.021875em;
  --strokeColor: #000000;
`;

const Caption = styled.div`
  margin-bottom: 8px;
  font-variation-settings: 'wdth' 80, 'wght' 575;

  @media (max-width: ${breakpoints.mobile}px) {
    font-size: 12px;
  }
`;

const LinksWrapper = styled.div`
  width: 100%;
  margin-top: 64px;
  display: flex;
  justify-content: space-around;
  @media (max-width: ${breakpoints.mobile}px) {
    margin-top: 16px;
    gap: 16px;
    flex-direction: column;
    align-items: center;
  }
`;
