import { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import { useEffect, Children, useContext, useState } from 'react';
import styled from 'styled-components';

export default function AnimatedWords({ children }) {
  const context = useContext(ThemeContext);
  // const [start, setStart] = useState(context.bubblesDone);
  const words = children.split(' ');

  // useEffect(() => {
  //   if (!context.bubblesDone) {
  //     setTimeout(() => {
  //       setStart(true);
  //     }, 2000);
  //   }
  // }, [context.bubblesDone]);

  return (
    <Container>
      {Children.toArray(words).map((word, i) => (
        <Word
          onTransitionEnd={() => {
            if (i === words.length - 1) {
              context.setHasRun(true);
            }
          }}
          bubblesDone={context.bubblesDone}
          // $start={start}
          index={i + 1}
          key={i}
        >
          {word}&nbsp;
        </Word>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: -8px;
`;

const Word = styled.span.attrs((props) => {
  const translateX = props.bubblesDone ? 0 : props.index * 2 + 700 + 'px';
  const delay = props.bubblesDone ? (props.index + 1) / 100 : 0;
  const duration = props.bubblesDone ? (props.index + 100) / 100 : 0;
  return {
    style: {
      '--translateX': translateX,
      '--delay': delay + 's',
      '--duration': duration + 's',
    },
  };
})`
  display: inline-block;
  font-weight: 600;
  line-height: 1.85;

  transform: translateX(var(--translateX));

  transition: transform var(--duration) ease-in-out var(--delay);

  @media (max-width: ${breakpoints.mobile}px) {
    line-height: 1.25;
  }
`;
