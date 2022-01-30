import { FullBleed } from '@components/Layout';
import VisuallyHidden from '@components/VisuallyHidden';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { breakpoints } from '@constants/index';

export default function Footer() {
  return (
    <FooterContainer as="footer">
      <FooterWrapper>
        <MaxWidthFlexContainer>
          <InnerWrapper>
            <NavWrapper id="nav2">
              <Items className="items">
                <VisuallyHidden>
                  <h2>Social Media Links</h2>
                </VisuallyHidden>
                <Link passHref href="https://github.com/mattbrannon">
                  <LinkButton>
                    <ImageLink
                      src="/images/github/github.png"
                      alt="link to github"
                      width={30}
                      height={30}
                    />
                  </LinkButton>
                </Link>
                <Link passHref href="https://linkedin.com/in/mattbrannon1">
                  <LinkButton>
                    <ImageLink
                      width={30}
                      height={30}
                      src="/images/linkedin/linkedin.png"
                      alt="link to linkedin"
                    />
                  </LinkButton>
                </Link>
                <Link passHref href="https://twitter.com/_mattbrannon">
                  <LinkButton>
                    <ImageLink
                      width={30}
                      height={30}
                      src="/images/twitter/twitter.png"
                      alt="link to twitter"
                    />
                  </LinkButton>
                </Link>
              </Items>
            </NavWrapper>
            <CopyrightWrapper>
              <Notice>&copy;&nbsp;2021 Matt Brannon.</Notice>
              <Notice>All rights reserved</Notice>
            </CopyrightWrapper>
          </InnerWrapper>
        </MaxWidthFlexContainer>
      </FooterWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled(FullBleed)`
  display: grid;
  ${'' /* margin-top: 96px; */}
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  gap: 16px;
  padding: 32px 0;
`;

const CopyrightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Notice = styled.span`
  font-size: var(--size12);
  color: whitesmoke;
`;

const Items = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 0;
  margin: 0;
  padding: 0;
  gap: 32px;
`;

const ImageLink = styled(Image)`
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
