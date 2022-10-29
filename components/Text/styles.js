import styled from 'styled-components';
import Help from '@components/Help';
import { m as motion } from 'framer-motion';
import { headings } from '@components/Headings';
import { breakpoints } from '@constants/breakpoints';

export const Description = styled.p`
  font-family: OpenSans;
  font-variation-settings: 'wdth' 75, 'wght' 555;
  color: var(--color-text);
  margin-top: 0;
`;

export const Strong = styled.strong`
  color: var(--color-strong);

  ${Help} & {
    color: var(--sky);
  }
`;

export const Paragraph = styled.p`
  font-family: Inter;
  font-size: var(--size18);
  font-variation-settings: 'wdth' 100, 'wght' 555;
  color: var(--color-text);
`;

export const HelpText = styled.p`
  margin: 0 48px 16px 32px;
`;

export const FancyTextItalic = styled(motion.i)`
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive2);
  /* color: var(--fancy-text-color); */
  font-style: normal;
  font-weight: 700;
  font-size: var(--fontSize, inherit);

  display: block;

  table & {
    color: black;
  }

  @media (min-width: ${breakpoints.laptop}px) {
    display: unset;
  }
`;

export const FancyText = styled(FancyTextItalic)`
  font-variation-settings: 'MONO' 0.7, 'CASL' 0, 'wght' 700, 'slnt' 1, 'CRSV' 0;
  animation: none;
  font-size: var(--size18);
`;

export const Em = styled.em`
  color: var(--color-em);
`;
