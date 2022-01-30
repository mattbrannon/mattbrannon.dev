import styled, { keyframes } from 'styled-components';

const slantText = keyframes`
  from {
    color: var(--original);
    font-variation-settings: var(--recursive6);
  }
  to {
    color: var(--color);
    font-variation-settings: var(--recursive2);
  }
`;

const FancyTextItalic = styled.span`
  display: inline-block;
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive2);
  --original: black;
  --color: var(--pinkBg);
  color: var(--color);
  animation: ${slantText} 1000ms ease both 300ms;
  @media (prefers-color-scheme: dark) {
    --original: beige;
    --color: var(--blue-main);
    color: var(--color);
    font-weight: 700;
  }

  table & {
    color: black;
  }
`;

export const FancyText = styled(FancyTextItalic)`
  font-variation-settings: 'MONO' 0.7, 'CASL' 0, 'wght' 700, 'slnt' 1, 'CRSV' 0;
  animation: none;
  font-size: var(--size18);
  @media (prefers-color-scheme: dark) {
    color: var(--blue-main-light);
  }
`;

export const StrongText = styled(FancyTextItalic)`
  font-family: recursive;
  font-variation-settings: var(--recursive8);
  animation: none;
  color: var(--dark-pink);
  @media (prefers-color-scheme: dark) {
    color: var(--blue-main-light);
  }
`;

export default FancyTextItalic;
