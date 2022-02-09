import VisuallyHidden from '@components/VisuallyHidden';
import { breakpoints } from '@constants/index';
import { useMediaQuery } from '@hooks/useMediaQuery';
import FocusTrap from 'focus-trap-react';
// import { useCssVariable } from 'hooks/useCssVariable';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext, keyframes, css } from 'styled-components';
import HamburgerMenu from './Hamburger';
import MobileNav from './MobileNav';
import NavLinks from './NavLinks';
import { Overlay } from './Overlay';
// import GradientText from '@components/GradientText';
import { FullBleed } from '@components/Layout';

// const arr = [ '--decovar-checkered', '--decovar-striped' ];

export default function Header({ headerPosition }) {
  const theme = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const [ clickedHome, setClickedHome ] = useState(false);
  const headerRef = useRef();
  // const countRef = useRef(0);

  const isOpen = theme.isOpen;
  // const showNothing = isOpen && isMobile;
  const Navigation = isMobile ? HamburgerMenu : NavLinks;

  return (
    <div>
      <FullBleedWrapper ref={headerRef} headerPosition={headerPosition}>
        <InnerWrapper>
          <Left>
            <Link passHref href="/">
              <NameWrapper tabIndex={0} onClick={() => setClickedHome(true)}>
                <Button>Matt Brannon</Button>
              </NameWrapper>
            </Link>
          </Left>

          <Right>
            <VisuallyHidden>
              <h2>Internal Navigation Links</h2>
            </VisuallyHidden>
            <Navigation setClickedHome={setClickedHome} clickedHome={clickedHome} />
          </Right>
        </InnerWrapper>
        <MobileMenu isOpen={isOpen} />
      </FullBleedWrapper>
    </div>
  );
}

export const MobileMenu = ({ isOpen }) => {
  return (
    <FocusTrap active={isOpen} focusTrapOptions={{ preventScroll: true }}>
      <div>
        {isOpen && <HamburgerMenu />}
        <Overlay />
        <MobileNav />
      </div>
    </FocusTrap>
  );
};

const FullBleedWrapper = styled(FullBleed).attrs({ as: 'header' })`
  ${'' /* grid-row: 1;
  grid-column: 1 / -1; */}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: var(--header-background);

  isolation: isolate;
  @media (max-width: ${breakpoints.mobile}px) {
    --header-height: 50px;
  }
`;

const InnerWrapper = styled.div`
  height: var(--header-height);
  grid-row: 1;
  grid-column: 1 / -1;
  background: var(--header-background);
  transform: var(--header-position);
  transition: transform 300ms ease-in-out;

  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 var(--breathing-room);
`;

const NameWrapper = styled.h1`
  font-size: var(--size24);
  font-family: recursive;
  font-variation-settings: 'MONO' 0, 'CRSV' 1, 'CASL' 0.65, 'wght' 875, 'slnt' -4;
  ${'' /* var(--recursive4); */}
  color: hsl(44deg, 100%, 55%);

  transition: all 140ms ease-in-out;
  outline: none;

  &:hover {
    color: hsl(50deg, 100%, 60%);
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.mobile}px) {
    font-size: var(--size36);
    --offset: 0.018em;
    --positive-offset: calc(var(--offset) * 1);
    --negative-offset: calc(var(--offset) * -1);

    --color: var(--header-background);
    --outline: hsl(210, 40%, 76%, 0.75);
    --hover: ;
  }

  @media (prefers-color-scheme: dark) {
    --outline: hsl(210, 40%, 76%, 0.75);
    --hover: #333444;
  }
`;

const Left = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  margin-right: var(--header-link-gap);
`;

const Right = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: var(--header-link-gap);
`;

const Button = styled.button`
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;

// const headerAnimation = keyframes`
//   0% {
//     opacity: 0;
//     font-variation-settings: var(--decovar-open);
//   }
//   50% {
//     opacity: 1;
//     font-variation-settings: var(--decovar-open);
//   }
//   100% {
//     opacity: 1;
//     font-variation-settings: var(--decovar-default);
//   }
// `;
