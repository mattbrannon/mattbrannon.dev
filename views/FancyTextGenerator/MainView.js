import { useState } from 'react';
import { AnimatePresence, m as motion, useAnimation } from 'framer-motion';
import { textGeneratorVariant } from '@animations/variants';
import styled from 'styled-components';

export const MainView = ({ state, dispatch, children, ...props }) => {
  const [duration, setDuration] = useState(2);

  const handleAnimationStart = (name) => {
    if (name === 'close') {
      setDuration(1);
    }
    else {
      setDuration(0);
    }
  };

  const handleAnimationComplete = (name) => {
    if (state.reset) {
      dispatch({ type: 'reset', value: false });
      setDuration(5);
    }
  };

  const handleChange = (e) => {
    dispatch({
      type: 'TEXT_CONTENT',
      value: e.target.value.replace(/\s+/g, ' ').replace(/'/g, '\u{2019}'),
    });
  };

  return (
    <div style={{ padding: '64px' }}>
      <AnimatePresence exitBeforeEnter>
        <Container
          id="main-content"
          state={state}
          initial="hidden"
          animate="show"
          exit="close"
          variants={textGeneratorVariant}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          key={state.styles.fontFamily}
          custom={{ duration, state }}
        >
          <GradientSpan state={state}>{state.textContent}</GradientSpan>

          <Wrapper state={state}>
            <TextAreaBox placeholder="edit me" onInput={handleChange} value={state.textContent} />
          </Wrapper>
        </Container>
      </AnimatePresence>
    </div>
  );
};

const Container = styled(motion.div).attrs(({ state }) => {
  return {
    style: {
      '--fontFamily': state.styles.fontFamily,
      '--fontSize': state.styles.fontSize + 'px',
      '--fontVariationSettings': state.styles.fontVariationSettings,
      '--gradient': state.styles.gradient,
      '--shadow': state.styles.shadow,
      '--strokeWidth': state.styles.strokeWidth + 'em',
      '--strokeColor': state.styles.strokeColor,
      '--letterSpacing': state.styles.letterSpacing + 'em',
    },
  };
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

const GradientSpan = styled.span`
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

const Wrapper = styled(motion.div)`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::after {
    content: '${(p) => p.state.textContent} \u{00a0}';
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

const TextAreaBox = styled.textarea.attrs({ rows: 1, spellCheck: false })`
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
    text-shadow: -0.0125em -0.0125em 0em #777, -0.025em -0.025em 0em #555,
      -0.0375em -0.0375em 0em #333, -0.05em -0.05em 0em #111;
  }
`;
