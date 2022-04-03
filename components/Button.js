import { breakpoints } from '@constants/index';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { loadFeatures } from '@utils/helpers';
import { forwardRef } from 'react';

const NormalButton = forwardRef((props, ref) => {
  return (
    <Wrapper ref={ref} {...props}>
      <Button>{props.children}</Button>
    </Wrapper>
  );
});

NormalButton.displayName = 'NormalButton';
export default NormalButton;

export function InvertedButton({ children, ...props }) {
  return (
    <InvertedWrapper {...props}>
      <Button {...props}>{children}</Button>
    </InvertedWrapper>
  );
}

export function PinkButton({ children, ...props }) {
  return (
    <FancyWrapper {...props}>
      <Button {...props}>{children}</Button>
    </FancyWrapper>
  );
}

const Wrapper = styled(motion.div)`
  ${'' /* min-width: min(200px, 100%); */}
  ${'' /* max-width: 220px; */}
  width: 100%;
  margin: 0 auto;
  border: none;
  box-shadow: 0 0 0 1px white;
  padding: 2px;
  margin: 0;
  border-radius: 6px;

  --innerBg: var(--tealBg);
  --innerHover: var(--tealHover);
  --innerFocus: var(--tealFocus);
  --innerShadow: var(--tealShadow);
  --outerShadow: var(--tealBg);

  --background-outer: transparent;
  --box-shadow-outer: none;

  background: var(--background-outer);
  box-shadow: var(--box-shadow-outer);

  &:active {
    --box-shadow-outer: 0 0 0 1px var(--color-outline-button);
    background: var(--innerBg);
  }
`;

const Button = styled.button`
  font-size: var(--size21);
  display: block;
  width: 100%;

  border: none;
  box-shadow: 0 0 0 1px white;
  padding: clamp(0.125rem, 0.175rem + 0.5vw, 0.5rem) clamp(0.25rem, 0.35rem + 1vw, 1rem);
  border-radius: 3px;
  color: var(--color-button, white);

  --defaultShadow: -0.025em -0.025em 0.025em black;

  font-weight: var(--weight-button, 600);
  font-size: clamp(0.75rem, 1rem + 1vw, 1.25rem);

  background: var(--innerBg);
  text-shadow: var(--shadow-button, var(--defaultShadow));

  &:hover {
    background: var(--innerShadow);
    cursor: pointer;
  }

  &:active {
    background: var(--innerHover);
  }

  &:focus-visible {
    outline: 2px solid var(--color-outline-button);
  }

  transition: text-shadow 1s linear var(--transition-delay), background 0s linear 0s,
    color 1s linear var(--transition-delay);

  @media (max-width: ${breakpoints.mobile}px) {
    user-select: none;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    user-select: none;
  }
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
