import styled, { keyframes } from 'styled-components/macro';

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

const FancyText = styled.span`
  font-family: Recursive, 'Coming Soon', sans-serif;
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
`;

export default FancyText;
