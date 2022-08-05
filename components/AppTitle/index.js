import styled from 'styled-components';
import { FlatVideo } from '@components/VideoPlayer';
import { ExternalLink } from '@components/Links';
import { breakpoints } from '@constants/index.js';
import FancyTitle from '@components/FancyTitle';

const appTitleVariant = {
  hidden: {
    opacity: 0,
    clipPath: 'var(--center)',
    letterSpacing: '0.2em',
  },
  show: {
    opacity: 1,
    clipPath: 'var(--visible)',
    letterSpacing: '0.0195em',
    transition: {
      duration: 1.5,
      delay: 0,
    },
  },
};

export default function AppTitle({ title, sources, links, children, ...props }) {
  return (
    <Top>
      <FancyTitle initial="hidden" animate="show" variants={appTitleVariant}>
        {title}
      </FancyTitle>
      <Caption>{children}</Caption>
      <FlatVideo center sources={sources} {...props} />
      <LinksWrapper>
        <ExternalLink href={links.liveSite}>Visit the live site</ExternalLink>
        <ExternalLink href={links.github}>See the code</ExternalLink>
      </LinksWrapper>
    </Top>
  );
}

const Top = styled.div`
  text-align: center;
  margin-bottom: 96px;
  margin-top: 64px;
  @media (max-width: ${breakpoints.mobile}px) {
    margin-top: 32px;
  }

  --fontFamily: Recursive;
  --fontSize: clamp(24px, 9vw, 80px);
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
