import styled from 'styled-components';
import { m as motion } from 'framer-motion';

export const Container = styled(motion.div)`
  font-family: var(--fontFamily);
  font-size: var(--fontSize);
  font-variation-settings: var(--fontVariationSettings);
  letter-spacing: var(--letterSpacing);

  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  position: relative;
`;

export const GradientSpan = styled.span`
  font: inherit;
  background: var(--gradient);
  background-clip: text;
  color: transparent;
  box-decoration-break: clone;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  margin: 0 -32px;
  padding-left: 32px;
  padding-right: 32px;
`;

export const OutlineText = styled.span`
  position: absolute;
  font: inherit;
  color: transparent;
  text-shadow: var(--shadow);
  z-index: -1;
  -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  left: 0;
  right: 0;
  top: 0;
`;
