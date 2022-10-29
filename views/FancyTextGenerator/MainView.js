import { useState } from 'react';
import { AnimatePresence, m as motion, useAnimation } from 'framer-motion';
import { textGeneratorVariant } from '@animations/variants';
import styled from 'styled-components';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { breakpoints } from '@constants/breakpoints';
import { MainContainer, MainWrapper, GradientSpan, TextAreaBox, MainViewWrapper } from './styles';

export const MainView = ({ state, dispatch, children, ...props }) => {
  const [duration, setDuration] = useState(1);
  const isLaptop = useMediaQuery({ minWidth: breakpoints.laptop });

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
    <MainViewWrapper>
      <AnimatePresence mode="wait">
        <MainContainer
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

          <MainWrapper state={state}>
            <TextAreaBox placeholder="edit me" onInput={handleChange} value={state.textContent} />
          </MainWrapper>
        </MainContainer>
      </AnimatePresence>
    </MainViewWrapper>
  );
};
