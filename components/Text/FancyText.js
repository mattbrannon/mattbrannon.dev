import { m as motion } from 'framer-motion';
import styled from 'styled-components';
import { P } from './P';
// import { P } from '@components/Text/P';
// import { Blockquote } from '../SideNote';

// const slantText = keyframes
//   from {
//     color: var(--color-text);
//     font-variation-settings: var(--recursive6);
//   }
//   to {
//     color: var(--fancy-text-color);
//     font-variation-settings: var(--recursive2);
//   }
//;

const FancyTextItalic = styled(motion.i)`
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive2);
  /* color: var(--fancy-text-color); */
  font-style: normal;
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
