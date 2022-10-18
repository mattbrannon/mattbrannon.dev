import styled from 'styled-components';
import { H1 } from '@components/Headings';
import { m as motion } from 'framer-motion';

export const Container = styled(motion.div).attrs((props) => {
  console.log(props);
  // return {
  //   style: {
  //     '--fontFamily': state.styles.fontFamily,
  //     '--fontSize': state.styles.fontSize + 'px',
  //     '--fontVariationSettings': state.styles.fontVariationSettings,
  //     '--gradient': state.styles.gradient,
  //     '--shadow': state.styles.shadow,
  //     '--strokeWidth': state.styles.strokeWidth + 'em',
  //     '--strokeColor': state.styles.strokeColor,
  //     '--letterSpacing': state.styles.letterSpacing + 'em',
  //   },
  // };
})`
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

export const Wrapper = styled(motion.div)`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::after {
    /* content: '${(p) => p.value} \u{00a0}'; */
    white-space: pre-wrap;
    border: none;
    font: inherit;
    color: transparent;
    text-shadow: var(--shadow);
    z-index: -1;
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;

export const TextAreaBox = styled.div.attrs({ rows: 1, spellCheck: false })`
  resize: none;
  overflow: hidden;
  border: none;
  font: inherit;
  background: none;
  color: transparent;
  -webkit-text-fill-color: transparent;
  caret-color: var(--fancyCaretColor);
  letter-spacing: var(--letterSpacing);

  margin: -32px;
  padding: 32px;

  &::placeholder {
    -webkit-text-fill-color: hsl(0, 0%, 97%, 0.7);
    /* -webkit-text-stroke: 0.0125em black; */
    text-shadow: -0.0125em -0.0125em 0em #777, -0.025em -0.025em 0em #555, -0.0375em -0.0375em 0em #333,
      -0.05em -0.05em 0em #111;
  }
`;

export const Span = styled.span`
  position: relative;
  /* display: inline-block; */
  /* width: max-content; */
  padding: 0 4px;

  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-size: var(--fontSize);
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontVariationSettings);
  background-image: var(--gradient);

  /* white-space: nowrap; */

  /* font: inherit; */
  background: var(--gradient);
  background-clip: text;
  color: transparent;
  box-decoration-break: clone;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  /* margin: 0 -32px;
  padding-left: 32px;
  padding-right: 32px; */

  transition: background-image 0.2s ease;

  &:after {
    /* padding: 0 4px; */

    content: '${(p) => p.children}';
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    text-shadow: var(--shadow);
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  }
`;

export const Heading = styled(H1)`
  font-size: var(--fontSize);
  margin-bottom: 0;
  margin-top: 0;
  letter-spacing: var(--letterSpacing);
  margin: 0 auto;
`;
