import { FullBleed } from '@components/Layout';
import { VisuallyHidden } from '@components/VisuallyHidden';
// import { breakpoints } from '@constants/index';
import NextImage from 'next/future/image';
// import Link from 'next/link';
import { InternalLink } from '@components/Links';
import styled from 'styled-components';

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
        <Notice>&copy;&nbsp;{new Date().getFullYear()} Matt Brannon.</Notice>
        <Notice>All rights reserved</Notice>
      </Copyright>
    </Container>
  );
}

const ImageLink = ({ ...props }) => {
  return (
    <InternalLink {...props}>
      <Image width={30} height={30} {...props} />
    </InternalLink>
  );
};

const Container = styled(FullBleed)`
  display: grid;
  min-height: var(--footer-height);
  height: 100%;
  background: var(--footer-background);
  --color-outline: var(--azure-light);

  grid-template-columns: 1fr;
  place-items: center;
  grid-row-gap: 21px;
  place-content: center;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 clamp(0.25rem, 1rem + 3vw, 3rem);
  &:last-child {
    margin-right: 0;
  }
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

// const LinkButton = styled.button`
//   background: transparent;
//   border: none;
//   @supports (-webkit-touch-callout: none) and (not (translate: none)) {
//     &:not(:last-child) {
//       margin-right: 32px;
//     }
//   }
//   @media (max-width: ${breakpoints.mobile}px) {
//     user-select: none;
//   }
// `;
