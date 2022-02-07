import { FullBleed } from '@components/Layout';
import VisuallyHidden from '@components/VisuallyHidden';
import NextImage from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { breakpoints } from '@constants/index';

export default function Footer() {
  return (
    <Container as="footer">
      <NavWrapper>
        <Nav>
          <VisuallyHidden>
            <h2>Social Media Links</h2>
          </VisuallyHidden>
          <ImageLink
            href="https://github.com/mattbrannon"
            src="/images/github/github.png"
            alt="link to github"
          />
          <ImageLink
            href="https://linkedin.com/in/mattbrannon1"
            src="/images/linkedin/linkedin.png"
            alt="link to linkedin"
          />
          <ImageLink
            href="https://twitter.com/_mattbrannon"
            src="/images/twitter/twitter.png"
            alt="link to twitter"
          />
        </Nav>
      </NavWrapper>
      <Copyright>
        <Notice>&copy;&nbsp;2021 Matt Brannon.</Notice>
        <Notice>All rights reserved</Notice>
      </Copyright>
    </Container>
  );
}

const ImageLink = ({ href, src, alt, ...props }) => {
  return (
    <Link passHref {...props} href={href}>
      <LinkButton>
        <Image src={src} alt={alt} width={30} height={30} {...props} />
      </LinkButton>
    </Link>
  );
};

const Container = styled(FullBleed)`
  display: grid;
  min-height: var(--footer-height);
  height: 100%;
  background: var(--footer-background);

  grid-template-columns: 1fr;
  place-items: center;
  grid-row-gap: 21px;
  place-content: center;

  @media (prefers-color-scheme: dark) {
    background: #111;
    border-bottom: 1px solid black;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  background: var(--footer-background);

  @media (prefers-color-scheme: dark) {
    background: #111;
    border-bottom: 1px solid black;
  }
`;

const MaxWidthFlexContainer = styled.div`
  max-width: 80ch;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 clamp(0.25rem, 1rem + 3vw, 3rem);
  &:last-child {
    margin-right: 0;
  }
`;

const InnerWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  gap: 16px;
  padding: 32px 0;
`;

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Notice = styled.span`
  font-size: var(--size12);
  color: whitesmoke;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 0;
  margin: 0;
  padding: 0;
  gap: 32px;
`;

const Image = styled(NextImage)`
  width: 30px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const LinkButton = styled.button`
  background: transparent;
  border: none;
  @supports (-webkit-touch-callout: none) and (not (translate: none)) {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
  @media (max-width: ${breakpoints.mobile}px) {
    user-select: none;
  }
`;
