import VisuallyHidden from '@components/VisuallyHidden';
import { useMediaQuery } from '@hooks/useMediaQuery';
import FocusTrap from 'focus-trap-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import HamburgerMenu from './Hamburger';
import MobileNav from './MobileNav';
import NavLinks from './NavLinks';
import { Overlay } from './Overlay';

export default function Header() {
  const theme = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: 564 });
  const Navigation = isMobile ? HamburgerMenu : NavLinks;
  const [ clickedHome, setClickedHome ] = useState(false);
  const [ clickedBurger, setClickedBurger ] = useState(false);

  const isOpen = theme.isOpen;
  theme.clickedBurger = clickedBurger;
  theme.setClickedBurger = setClickedBurger;

  return (
    <>
      <FullBleedWrapper>
        <InnerWrapper>
          <MaxWidthWrapper>
            <Left>
              <Link passHref href="/">
                <BrandLogoWrapper onClick={() => setClickedHome(true)}>
                  Matt Brannon
                </BrandLogoWrapper>
              </Link>
            </Left>

            <Right>
              <VisuallyHidden>
                <h2>Internal Navigation Links</h2>
              </VisuallyHidden>
              <Navigation setClickedHome={setClickedHome} clickedHome={clickedHome} />
            </Right>
          </MaxWidthWrapper>

          <FocusTrap active={isOpen}>
            <div tabIndex={-1}>
              {isOpen && <HamburgerMenu />}
              <Overlay />
              {/* <Overlay clickedBurger={clickedBurger} /> */}
              <MobileNav />
            </div>
          </FocusTrap>
        </InnerWrapper>
      </FullBleedWrapper>
      {/* <Spacer axis="vertical" size={80} /> */}
    </>
  );
}

const MaxWidth = styled.div`
  max-width: 80ch;
  width: 100%;
  margin: 0 auto;
  background: orange;
  padding: 0 100px;
`;

const FullBleedWrapper = styled.div`
  height: var(--header-height);
  ${'' /* background-color: var(--header-background); */}
  background: red;
  grid-row: 1;
  grid-column: 1 / -1;
  ${'' /* padding: 0 var(--breathing-room); */}
  ${'' /* position: sticky; */}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  isolation: isolate;
`;

const InnerWrapper = styled.div`
  height: var(--header-height);
  grid-row: 1;
  grid-column: 1 / -1;
  background: var(--header-background);
`;

const MaxWidthWrapper = styled.div`
  max-width: var(--max-width);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const BrandLogoWrapper = styled.h1.attrs({
  tabIndex: 0,
})`
  font-size: var(--size28);
  color: white;
  color: var(--orange5);
  font-family: 'Open Sans', system-ui, sans-serif;
  font-variation-settings: 'wdth' 75, 'wght' 700;

  transition: all 140ms ease-in-out;

  &:hover {
    cursor: pointer;
    text-decoration: none;
    color: var(--orange0);
  }
`;

const Left = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
`;

const Right = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;
