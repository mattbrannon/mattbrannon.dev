import { textAnimation as slideText } from '@animations';
import { springDown } from '@constants';
import styled, { css } from 'styled-components/macro';

const AnimatedWords = ({ children }) => {
  const words = children.split(' ');

  return words.map((word, i) => {
    return (
      <Span key={i} index={i + 1}>
        {word}&nbsp;
      </Span>
    );
  });
};

const SlidingText = ({ children }) => {
  return <p>{<AnimatedWords>{children}</AnimatedWords>}</p>;
};

const textAnimation = (props) => {
  const animation = css`
    ${slideText} ${props.duration} ease ${props.delay} both;
  `;
  return props.theme.hasPlayed ? undefined : animation;
};

const Span = styled.span.attrs(({ index }) => {
  const delay = 3300 + index * 15 + 'ms';
  const distance = 500 + index * 2 + 'px';
  const duration = 1200 + 'ms'; //1000 + Math.pow(index, 2) + 'ms';
  return {
    duration,
    delay,
    style: {
      '--delay': delay,
      '--distance': distance,
      '--duration': duration,
    },
  };
})`
  --curve: ${springDown};
  display: inline-block;
  ${'' /* transform: translate(var(--distance), 0); */}
  animation: ${(p) => textAnimation(p)};
`;

export default SlidingText;
