import { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import { useEffect, Children, useContext, useState } from 'react';
import styled from 'styled-components';

export default function AnimatedWords({ children }) {
  const context = useContext(ThemeContext);
  const [start, setStart] = useState(context.hasRun);
  const words = children.split(' ');

  useEffect(() => {
    if (!context.hasRun) {
      setTimeout(() => {
        setStart(true);
      }, 2000);
    }
  }, [context.hasRun]);

  return (
    <Container>
      {Children.toArray(words).map((word, i) => (
        <Word
          onTransitionEnd={() => {
            if (i === words.length - 1) {
              context.setHasRun(true);
            }
          }}
          hasRun={context.hasRun}
          $start={start}
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
  const translateX = props.$start ? 0 : props.index * 2 + 700 + 'px';
  const delay = props.hasRun ? 0 : (props.index + 1) / 100;
  const duration = props.hasRun ? 0 : (props.index + 100) / 100;
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
