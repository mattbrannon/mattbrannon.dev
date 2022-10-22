import styled, { keyframes } from 'styled-components';
import { P } from '@components/Text/Text';
// import { Blockquote } from '../SideNote';

const slantText = keyframes`
  from {
    color: var(--color-text);
    font-variation-settings: var(--recursive6);
  }
  to {
    color: var(--fancy-text-color);
    font-variation-settings: var(--recursive2);
  }
`;

const FancyTextItalic = styled.i`
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive2);
  /* color: var(--fancy-text-color); */
  font-style: normal;
  animation: ${slantText} 1000ms ease both 300ms;
  font-weight: 700;
  font-size: var(--fontSize);

  table & {
    color: black;
  }
`;

export const FancyText = styled(FancyTextItalic)`
  font-variation-settings: 'MONO' 0.7, 'CASL' 0, 'wght' 700, 'slnt' 1, 'CRSV' 0;
  animation: none;
  font-size: var(--size18);
`;

export const StrongText = styled(FancyTextItalic)`
  font-family: recursive;
  font-variation-settings: var(--recursive8);
  animation: none;
  /* color: var(--color-strong); */
`;

export default FancyTextItalic;
