import { useCssVariable } from '@hooks/useCssVariable';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import InputCheckbox from '@components/Checkbox';
// import { loadFeatures } from '@utils/helpers';

export default function MiniGame() {
  const [ isCorrect, setIsCorrect ] = useState(null);

  return (
    <motion.div style={{ height: '180px' }}>
      <Inputs isCorrect={isCorrect} setIsCorrect={setIsCorrect} />
      {isCorrect !== null && <Results isCorrect={isCorrect} />}
    </motion.div>
  );
}

export function Inputs({ ...props }) {
  return (
    <InputsWrapper>
      <Checkbox correct {...props}>
        outer
      </Checkbox>
      <Checkbox {...props}>inner</Checkbox>
      <Checkbox {...props}>both</Checkbox>
    </InputsWrapper>
  );
}

export function Results({ isCorrect }) {
  const [ result, setResult ] = useState(null);
  const ref = useRef();
  const setColor = useCssVariable('--result-color', 'red', ref);

  useEffect(() => {
    const result = isCorrect !== null ? (isCorrect ? "That's right!" : 'Wrong!') : null;
    const color = isCorrect ? 'green' : 'red';

    setResult(result);
    setColor(color);
  }, [ isCorrect, setColor ]);

  return (
    <>
      <ResultWrapper ref={ref}>{result}</ResultWrapper>
      <P>
        If you think about it in terms of a parent / child relationship, a good way to remember this
        stuff to think - children inherit from their parents.
      </P>
    </>
  );
}

const ResultWrapper = styled.h2`
  color: var(--result-color);
  font-size: var(--size21);
`;

const InputsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: auto;
`;

const P = styled.p`
  font-size: var(--size16);
  color: black;

  @media (prefers-color-scheme: dark) {
    color: var(--dark-mode-text-color);
  }
`;

export function Checkbox({ children, ...props }) {
  const handleClick = () => {
    const isCorrect = props.correct ? true : false;
    props.setIsCorrect(isCorrect);
  };

  return (
    <CheckboxWrapper onClick={handleClick}>
      <InputCheckbox>{children}</InputCheckbox>
    </CheckboxWrapper>
  );
}

const CheckboxWrapper = styled.div`
  margin: 8px 48px 8px 0px;
`;
