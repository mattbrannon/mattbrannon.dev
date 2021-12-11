import styled from 'styled-components/macro';
import VideoPlayer from '@components/VideoPlayer';
import { ExternalLink } from '@components/ExternalLink';

export default function PageTitle({ title, sources, links, children }) {
  return (
    <Top>
      <Heading>{title}</Heading>
      <Caption>{children}</Caption>
      <VideoPlayer sources={sources} />
      <LinksWrapper>
        <ExternalLink href={links.liveSite}>Visit the live site</ExternalLink>
        <ExternalLink href={links.github}>See the code</ExternalLink>
      </LinksWrapper>
    </Top>
  );
}

const Heading = styled.h3`
  font-size: clamp(var(--size18), 7vw, var(--size48));
  margin: 32px 0 0 0;
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive4);

  @media (prefers-color-scheme: light) {
    color: var(--pinkBg);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--orange-main);
  }
`;

const Top = styled.div`
  ${'' /* background: #444; */}
  text-align: center;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const Caption = styled.div`
  margin-top: -8px;
  margin-bottom: 32px;
  font-size: clamp(var(--size14), 2.5vw, var(--size20));
`;

const LinksWrapper = styled.div`
  width: 100%;
  margin: 32px 0;
  padding-top: 32px;
  display: flex;
  justify-content: space-around;
  @media (max-width: 420px) {
    gap: 16px;
    flex-direction: column;
    align-items: center;
  }
`;
