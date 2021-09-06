import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import VisualyHidden from '../VisuallyHidden';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function HamburgerMenu() {
  const { isOpen, setIsOpen } = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const action = isOpen ? 'close' : 'open';

  if (isMobile || isOpen) {
    return (
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <VisualyHidden>{action + ' navigation menu'}</VisualyHidden>
        <LineWrapper>
          <BurgerLine isOpen={isOpen}></BurgerLine>
        </LineWrapper>
      </MenuButton>
    );
  }
  return null;
}

const MenuButton = styled.button`
  /*
  * For a fluid hamburger icon, uncomment the values below
  * However, in hindsight, this probably isn't a good idea.
  * At least not with these current values. The growth / shrink
  * rate is such that resizing the browswer window causes a
  * herky jerky effect. TLDR - Bad user experience
    TODO - Experiment with values that scale more gradually
    * Aspect ratio = 4:3

    --width: clamp(32px, 4vw, 48px);
    --height: clamp(24px, 3vw, 36px);
  */

  // * parent dimensions
  --width: 32px;
  --height: 24px;

  // * child dimensions
  --thickness: calc((var(--height) - var(--width)) * -0.5);

  // * child placement
  --beforeLineTop: calc((var(--height) - var(--thickness)) * -0.5);
  --afterLineBottom: calc((var(--height) - var(--thickness)) * -0.5);

  display: grid;
  align-items: center;

  position: fixed;
  right: 32px;
  top: calc((var(--thickness) + 80px - var(--height)) / 2);
  width: var(--width);
  height: var(--height);
  min-height: 0vh;

  /* top: calc((80px - var(--height)) / 2); */

  border: none;
  background: none;

  //! Has no effect when header is positioned fixed
  // * solution - move element outside it's container
  z-index: 3;

  &:focus {
    outline: 3px solid deepskyblue;
    outline-offset: 4px;
  }
`;

const LineWrapper = styled.div`
  position: relative;
  /* height: 100%; */
`;

const BurgerLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translatey(-50%);

  width: var(--width);
  height: var(--thickness);

  background: ${(p) => (p.isOpen ? 'transparent' : 'white')};

  &::before,
  &::after {
    content: '';

    display: block;
    position: absolute;
    transform-origin: center center;

    width: var(--width);
    height: var(--thickness);

    background: white;
    transition: all 0.2s ease;
  }

  &::before {
    top: ${(p) => (p.isOpen ? 0 : 'var(--beforeLineTop)')};
    transform: ${(p) => p.isOpen && 'rotate(-45deg)'};
  }

  &::after {
    bottom: ${(p) => (p.isOpen ? 0 : 'var(--afterLineBottom)')};
    transform: ${(p) => p.isOpen && 'rotate(45deg)'};
  }

  transition: all 0.2s ease;
`;
