import { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import { useEffect, Children, useContext, useState } from 'react';
import styled from 'styled-components';

export default function AnimatedWords({ children }) {
  const context = useContext(ThemeContext);
  // const [start, setStart] = useState(context.bubblesDone);
  const words = children.split(' ');

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
  // Words wait a short, still readable distance to the right, then glide into place one after another.
  const translateX = props.bubblesDone ? 0 : '20px';
  const delay = props.bubblesDone ? (props.index + 1) / 100 : 0;
  const duration = props.bubblesDone ? 0.5 : 0;
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

  transition: transform var(--duration) ease-out var(--delay);

  @media (max-width: ${breakpoints.mobile}px) {
    line-height: 1.25;
  }
`;
