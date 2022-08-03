import { Anchor } from '@components/Anchor';
import { FullBleed } from '@components/Layout';
import VisuallyHidden from '@components/VisuallyHidden';
import { breakpoints } from '@constants/index';
import FocusTrap from 'focus-trap-react';
import NextLink from 'next/link';
import { useContext, forwardRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
import HamburgerMenu from './Hamburger';
import MobileNav from './MobileNav';
import NavLinks from './NavLinks';
import { Overlay } from './Overlay';
import SkipLink from './SkipLink';
import s from './header.module.css';

const Header = forwardRef((props, ref) => {
  const theme = useContext(ThemeContext);

  const isOpen = theme.isOpen;
  const links = [ 'blog', 'apps', 'misc', 'contact' ];

  return (
    <header ref={ref} style={{ height: 'var(--header-height)' }}>
      <FullBleedWrapper className={props.isVisible ? s.visible : s.hidden}>
        <InnerWrapper>
          <Left>
            <SkipLink>Skip to main content</SkipLink>

            <NameWrapper>
              <NextLink passHref href="/" legacyBehavior>
                <A>
                  <>Matt Brannon</>
                </A>
              </NextLink>
            </NameWrapper>
          </Left>
          <HamburgerMenu />

          <Right>
            <VisuallyHidden>
              <h2>Internal Navigation Links</h2>
            </VisuallyHidden>
            <NavLinks links={links} />
            <ThemeButtonWrapper>
              <DarkModeToggle mode={props.mode} />
            </ThemeButtonWrapper>
          </Right>
        </InnerWrapper>
        <MobileMenu isOpen={isOpen} />
      </FullBleedWrapper>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;

export const MobileMenu = ({ isOpen }) => {
  return (
    <FocusTrap active={isOpen} focusTrapOptions={{ preventScroll: true }}>
      <div>
        {isOpen ? <HamburgerMenu /> : null}
        <Overlay />
        <MobileNav />
      </div>
    </FocusTrap>
  );
};

const FullBleedWrapper = styled(FullBleed)`
  --color-outline: var(--azure-light);

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

  max-width: var(--max-page-width);
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 var(--breathing-room);
`;

const NameWrapper = styled.h1`
  font-size: var(--size24);
  font-family: recursive;
  font-variation-settings: 'MONO' 0, 'CRSV' 0, 'CASL' 0.35, 'wght' 800, 'slnt' 0;
  /* var(--recursive4); */
  color: var(--myName);

  transition: all 70ms ease;
  outline: none;

  &:hover {
    color: var(--myNameHover);
    text-decoration: none;
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
  position: relative;
`;

const Right = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: var(--header-link-gap);
  color: white;
  /* position: relative; */
`;

const A = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`;

const ThemeButtonWrapper = styled.div`
  width: 32px;
  height: inherit;
`;
