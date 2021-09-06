import styled from 'styled-components/macro';
import FancyLink from '../FancyLink';

/**
 *
 ** NavLinks (desktop)
 *
 */

export default function NavLinks({ isMobile }) {
  if (!isMobile) {
    return (
      <>
        <LinkWrapper>
          <FancyLink href="/">Home</FancyLink>
        </LinkWrapper>
        <LinkWrapper>
          <FancyLink href="/blog">Blog</FancyLink>
        </LinkWrapper>
        <LinkWrapper>
          <FancyLink href="/apps">Apps</FancyLink>
        </LinkWrapper>
        <LinkWrapper>
          <FancyLink href="/contact">Contact</FancyLink>
        </LinkWrapper>
      </>
    );
  }
  return null;
}

const LinkWrapper = styled.span`
  background: transparent;
  border: none;
  font-size: 1rem;
  margin: 0 clamp(0.5rem, 1rem + 2vw, 4rem);
  min-height: 0vh;

  &:last-child {
    margin-right: 0;
  }
  margin-bottom: -6px;
`;
