import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import NavLinks from './NavLinks';
import { Overlay } from './Overlay';
import HamburgerMenu from './Hamburger';
import MobileNav from './MobileNav';
import { useScrollWidth } from '../../hooks/useScrollWidth';
import FocusTrap from 'focus-trap-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function Header() {
  const { isOpen } = useContext(ThemeContext);

  const scrollWidth = useScrollWidth();
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <HeaderContainer>
      <HeaderWrapper scrollWidth={scrollWidth}>
        <MaxWidthFlexContainer>
          <Left>
            <BrandLogoWrapper>Matt Brannon</BrandLogoWrapper>
          </Left>
          <Right>
            {isMobile ? (
              <HamburgerMenu isOpen={isOpen} />
            ) : (
              <NavLinks isMobile={isMobile} />
            )}
          </Right>
        </MaxWidthFlexContainer>
      </HeaderWrapper>

      <FocusTrap active={isOpen}>
        <div tabIndex={-1}>
          <HamburgerMenu isOpen={isOpen} />
          <Overlay />
          <Overlay />
          <MobileNav />
        </div>
      </FocusTrap>
    </HeaderContainer>
  );
}

const MaxWidthFlexContainer = styled.div`
  max-width: 80ch;
  width: 100%;
  height: 100%;

  margin: 0 auto;
  padding: 0 0;

  display: flex;
  align-items: center;
`;

const HeaderContainer = styled.header`
  grid-area: header;
`;

const HeaderWrapper = styled.div`
  // ! REQUIRED
  position: fixed;
  top: 0;
  left: 0;
  right: ${(p) => p.scrollWidth}px;
  isolation: isolate;
  grid-area: header;
  /* height: var(--headerHeight); */
  height: 80px;
  background: #333;
  /* background: hsl(208deg, 35%, 10%); */
  width: 100%;

  /* display: flex;
  align-items: center; */
  /* padding: 0 32px; */
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    background: #111;
    border-bottom: 1px solid black;
  }
`;

const BrandLogoWrapper = styled.h3`
  /* margin-bottom: -8px; */

  font-size: 1.8rem;
  color: white;
  font-family: 'Roboto Flex';
  font-variation-settings: 'wght' 320, 'wdth' 42, 'opsz' 44;
`;

const Left = styled.div`
  padding-left: 32px;
  white-space: nowrap;
  /* flex: 1; */

  display: flex;
  justify-content: flex-start;

  /* height:300px; */
`;

const Right = styled.nav`
  padding-right: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;
