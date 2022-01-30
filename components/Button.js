import { breakpoints } from '@constants/index';
import styled from 'styled-components';

export default function Button({ children, ...props }) {
  return (
    <Wrapper {...props}>
      <InnerButton {...props}>{children}</InnerButton>
    </Wrapper>
  );
}

export function InvertedButton({ children, ...props }) {
  return (
    <InvertedWrapper {...props}>
      <InnerButton {...props}>{children}</InnerButton>
    </InvertedWrapper>
  );
}

const Wrapper = styled.button`
  ${'' /* --innerBg: var(--pinkBg);
  --innerHover: var(--pinkHover);
  --innerFocus: var(--pinkFocus);
  --innerShadow: var(--pinkShadow);
  --outerShadow: var(--pinkBg);
  --outline: white; */}

  --innerBg: var(--medium-orange);
  --innerHover: var(--orange);
  --innerFocus: var(--yellow);
  --innerShadow: darkorange;
  --outerShadow: orange;
  padding: 3px 3px;
  border-radius: 10px;
  border: none;
  font-family: system-ui, sans-serif;
  color: white;
  background: transparent;
  outline: none;
  text-shadow: 1px 1px 2px black;
  &:focus,
  &:active {
    box-shadow: 0 0 0 1px var(--outerShadow);
    background: var(--outline);
  }
  &:hover {
    cursor: pointer;
  }
  @media (max-width: ${breakpoints.mobile}px) {
    user-select: none;
  }
`;

const InnerButton = styled.span`
  display: block;
  padding: 12px 24px;
  font-size: var(--size21);
  font-weight: 700;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 0 1px var(--innerShadow);
  background: var(--innerBg);
  &:hover {
    background: var(--innerHover);
  }
  &:focus,
  &:active {
    background: var(--innerFocus);
  }
  @media (max-width: ${breakpoints.mobile}px) {
    user-select: none;
    padding: 8px 16px;
    font-size: var(--size18);
  }
`;

const InvertedWrapper = styled(Wrapper)`
  --innerBg: var(--tealBg);
  --innerHover: var(--tealHover);
  --innerFocus: var(--tealFocus);
  --innerShadow: var(--tealShadow);
  --outerShadow: var(--tealBg);
  transition: opacity 0.15s ease-in-out;
`;
