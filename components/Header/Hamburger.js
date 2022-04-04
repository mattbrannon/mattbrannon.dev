import VisualyHidden from '@components/VisuallyHidden';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/index';

export default function HamburgerMenu() {
  const context = useContext(ThemeContext);
  const { isOpen, setIsOpen } = context;
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const action = isOpen ? 'close' : 'open';

  const handleClick = () => {
    const status = !isOpen;
    setIsOpen(status);
    context.isOpen = isOpen;
  };

  if (isMobile || isOpen) {
    return (
      <MenuButton onClick={handleClick}>
        <VisualyHidden>{action + ' navigation menu'}</VisualyHidden>
        <BurgerLine isOpen={isOpen}></BurgerLine>
      </MenuButton>
    );
  }
  return null;
}

const MenuButton = styled.button`
  --burger-width: var(--size32, 32px);
  --burger-height: var(--size24);
  --thickness: calc((var(--burger-height) - var(--burger-width)) * -0.5);
  --offset: calc((var(--burger-height) - var(--thickness)) * -0.5);
  --top: calc((var(--thickness) + var(--header-height) - var(--burger-height)) * 0.5);
  --zIndex: ${(p) => (p.isOpen ? -1 : 99)};

  display: grid;
  align-items: center;

  position: absolute;
  right: 32px;
  top: var(--top);
  width: var(--burger-width);
  height: var(--burger-height);

  border: none;
  background: none;
  z-index: 9999;

  @media (max-width: ${breakpoints.mobile}px) {
    --burger-width: var(--size24);
    --burger-height: var(--size18);
  }
`;

const BurgerLine = styled.div.attrs((props) => {
  const rotate = props.isOpen ? 45 : 0;
  return {
    style: {
      '--before': rotate * -1 + 'deg',
      '--after': rotate + 'deg',
      '--top': props.isOpen ? 0 : 'var(--offset)',
      '--background': props.isOpen ? 'transparent' : 'white',
      '--y': props.isOpen ? '-200%' : '-50%',
      '--delay': props.isOpen ? '100ms' : '200ms',
      '--radius': props.isOpen ? '12px' : '0px',
    },
  };
})`
  width: var(--burger-width);
  height: var(--thickness);
  background: var(--background);

  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  left: 0;
  right: 0;

  border-radius: var(--radius);

  transition: background var(--delay) linear;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    transform-origin: center;

    width: var(--burger-width);
    height: var(--thickness);

    border-radius: var(--radius);
    background: white;
    transition: all 0.2s ease;
  }

  &::before {
    top: var(--top);
    transform: rotate(var(--before));
  }

  &::after {
    bottom: var(--top);
    transform: rotate(var(--after));
  }
`;
