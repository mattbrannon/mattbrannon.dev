import styled from 'styled-components/macro';
import Link from 'next/link';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <MaxWidthFlexContainer>
          <InnerWrapper>
            <NavWrapper>
              <Items className="items">
                <Link passHref href="https://github.com/mattbrannon">
                  <img
                    src="/images/github2/GitHub-Mark-Light-120px-plus.png"
                    width="40"
                    height="40"
                    alt="link to github"
                  />
                </Link>
                <Link passHref href="https://linkedin.com/in/mattbrannon1">
                  <img
                    src="/images/twitter/linkedin-dark2.webp"
                    width="40"
                    height="40"
                    alt="link to linkedin"
                  />
                </Link>
                <Link passHref href="https://twitter.com/_mattbrannon">
                  <img
                    src="/images/twitter/twitter-white.webp"
                    width="40"
                    height="40"
                    alt="link to twitter"
                  />
                </Link>
              </Items>
            </NavWrapper>

            <Notice className="notice">
              &copy;&nbsp;2021 Matt Brannon. All rights reserved
            </Notice>
          </InnerWrapper>
        </MaxWidthFlexContainer>
      </FooterWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  grid-area: footer;
`;

const FooterWrapper = styled.div`
  background: #333;
  height: 100px;
  width: 100%;
  z-index: 1;

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
  padding: 0 0;

  display: flex;
  align-items: center;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 clamp(0.25rem, 1rem + 3vw, 3rem);

  &:last-child {
    margin-right: 0;
  }
  grid-area: ${(p) => p.id};
`;

const InnerWrapper = styled.div`
  height: 100%;
  /* background: #111; */
  width: 100%;
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  padding-top: 16px;
  display: grid;
  grid-template-areas:
    'nav1 nav2 nav3'
    '. copyright .';

  grid-template-columns: 1fr 1fr 1fr;
  /* grid-template-rows: 164px 40px; */
  justify-items: center;
  align-items: flex-start;
`;

const Notice = styled.p`
  font-size: 12px;
  color: whitesmoke;
  white-space: nowrap;
  grid-area: copyright;
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
