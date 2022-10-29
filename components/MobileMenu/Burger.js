import styled from 'styled-components';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { breakpoints } from '@constants/breakpoints';

export function Burger({ dialogIsOpen, setDialogIsOpen }) {
  const isTablet = useMediaQuery({ minWidth: breakpoints.tablet });

  return (
    <BurgerWrapper
      style={{ '--display': isTablet ? 'none' : 'flex' }}
      // style={{ '--display': isMobile || dialogIsOpen ? 'flex' : 'none' }}
      onClick={() => setDialogIsOpen(!dialogIsOpen)}
      aria-label="mobile navigation menu"
    >
      <Line dialogIsOpen={dialogIsOpen} />
    </BurgerWrapper>
  );
}

const BurgerWrapper = styled.button`
  /* --buttonHeight: 32px; */

  --burger-width: var(--size24);
  --burger-height: var(--size18);
  --thickness: calc((var(--burger-height) - var(--burger-width)) * -0.5);
  --offset: calc((var(--burger-height) - var(--thickness)) * -0.5);
  --top: calc((var(--thickness) + var(--header-height) - var(--burger-height)) * 0.5);
  --top: 18px;

  border: none;
  background: none;
  width: var(--burger-width);
  height: var(--burger-height);
  display: var(--display);
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  cursor: pointer;
  position: fixed;
  top: var(--top);
  right: 32px;
  z-index: 99999;

  @media (min-width: ${breakpoints.tablet}px) {
    --burger-width: var(--size32);
    --burger-height: var(--size24);
  }
`;

const Line = styled.span.attrs(({ dialogIsOpen }) => {
  const rotate = dialogIsOpen ? 45 : 0;
  return {
    style: {
      '--before': rotate * -1 + 'deg',
      '--after': rotate + 'deg',
      '--top': dialogIsOpen ? 0 : 'var(--offset)',
      '--background': dialogIsOpen ? 'transparent' : 'white',
      '--y': dialogIsOpen ? '-200%' : '-50%',
      '--delay': dialogIsOpen ? '100ms' : '200ms',
      '--radius': dialogIsOpen ? '12px' : '0px',
    },
  };
})`
  width: var(--burger-width);
  height: var(--thickness);
  background-color: var(--background);

  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  left: 0;
  right: 0;

  border-radius: var(--radius);

  transition: background-color var(--delay) linear;

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
