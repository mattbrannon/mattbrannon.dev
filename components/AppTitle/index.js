import styled from 'styled-components';
import { VideoPlayer } from '@components/VideoPlayer';
import { link } from '@components/Links';
import { breakpoints } from '@constants/breakpoints';
import { FancyTitle } from '@components/FancyTitle';
import { memo } from 'react';
import { m as motion } from 'framer-motion';

export const AppTitle = memo(AppTitleComponent);

function AppTitleComponent({ title, sources, links, children, ...props }) {
  return (
    <Top id="main-content">
      <FancyTitle
        style={{
          '--gradient': 'var(--app-name-gradient)',
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <VideoPlayer center sources={sources} {...props} />
      </motion.div>
      <LinksWrapper>
        <link.external href={links.liveSite}>Visit the live site</link.external>
        <link.external href={links.github}>See the code</link.external>
      </LinksWrapper>
    </Top>
  );
}

const appTitleVariant = {
  hidden: {
    opacity: 0,
    '--fontSize': 'clamp(36px, 4vw, 54px)',
    '--fontVariationSettings': "'wght' 300, 'slnt' 0, 'CASL' 0, 'CRSV' 0, 'MONO' 0",
  },
  show: {
    opacity: 1,
    '--fontSize': 'clamp(36px, 4vw, 54px)',
    '--fontVariationSettings': "'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0",
    transition: {
      duration: 1.5,
    },
  },
};

const Top = styled.div`
  text-align: center;
  margin-bottom: 96px;
  margin-top: 32px;
  @media (min-width: ${breakpoints.laptop}px) {
    margin-top: 64px;
  }

  --fontFamily: Recursive;
  --fontVariationSettings: 'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0;
  --strokeWidth: 0.021875em;
  --strokeColor: #000000;
`;

const Caption = styled.div`
  margin-bottom: 8px;
  font-variation-settings: 'wdth' 80, 'wght' 575;
  font-size: 12px;

  @media (min-width: ${breakpoints.laptop}px) {
    font-size: revert;
  }
`;

const LinksWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpoints.laptop}px) {
    margin-top: 64px;
    justify-content: space-around;
    flex-direction: row;
  }
`;
