import { breakpoints } from '@constants/index';
import styled from 'styled-components';
import { m as motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  width: 100%;
  margin: 0 auto;
  border: none;
  box-shadow: 0 0 0 1px white;
  padding: 2px;
  margin: 0;
  border-radius: 6px;
  box-shadow: none;

  &:active {
    box-shadow: 0 0 0 1px var(--color-outline-button);
    background: var(--innerBg);
  }
`;

export const Button = styled(motion.button)`
  --padding-top-bottom: clamp(0.125rem, 0.175rem + 0.5vw, 0.5rem);
  --padding-left-right: clamp(0.25rem, 0.35rem + 1vw, 1rem);
  --font-size: clamp(0.75rem, 1rem + 1vw, 1.25rem);
  padding: var(--padding-top-bottom) var(--padding-left-right);
  display: block;
  width: 100%;
  border: none;
  border-radius: 3px;
  background-color: var(--innerBg);
  color: inherit;
  text-shadow: inherit;
  font-weight: 600;
  font-size: var(--font-size);

  cursor: pointer;
  &:hover {
    background: var(--innerHover);
  }

  &:active {
    background: var(--innerFocus);
  }

  transition: text-shadow 1s linear var(--transition-delay), background-color 0s linear 0s,
    color 1s linear var(--transition-delay);

  @media (max-width: ${breakpoints.mobile}px) {
    user-select: none;
  }
`;

const TealWrapper = styled(Wrapper)`
  --innerBg: var(--tealBg);
  --innerHover: var(--tealHover);
  --innerFocus: var(--tealFocus);
  --innerShadow: var(--tealShadow);
  --outerShadow: var(--tealBg);
`;

const InvertedWrapper = styled(Wrapper)`
  --innerBg: var(--tealBg);
  --innerHover: var(--tealHover);
  --innerFocus: var(--tealFocus);
  --innerShadow: var(--tealShadow);
  --outerShadow: var(--tealBg);

  --outline: var(--color-outline-button);
  --innerBg: var(--orange-dark);
  --innerHover: var(--orange);
  --innerFocus: orange;
  --innerShadow: darkorange;
  --outerShadow: orange;

  transition: opacity 0.15s ease-in-out;
`;

const FancyWrapper = styled(Wrapper)`
  --pink-light: hsl(328, 100%, 74%);
  --pink-medium-light: hsl(328, 100%, 62%);
  --pink: hsl(328, 100%, 54%);
  --pink-medium-dark: hsl(328, 100%, 45%);
  --pink-dark: hsl(328, 100%, 37%);

  --innerBg: var(--pink-dark);
  --innerHover: var(--pink);
  --innerFocus: var(--pink-medium-light);
  --innerShadow: var(--pink-medium-dark);
  --outerShadow: var(--pink-dark);
`;

function withButton(Component, Wrapper) {
  return function Button(props) {
    return (
      <Wrapper {...props}>
        <Component>{props.children}</Component>
      </Wrapper>
    );
  };
}

export const FancyButton = withButton(Button, FancyWrapper);
export const InvertedButton = withButton(Button, InvertedWrapper);
export const NormalButton = withButton(Button, TealWrapper);
