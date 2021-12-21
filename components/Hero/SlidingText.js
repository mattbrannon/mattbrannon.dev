import { textAnimation as slideText } from '@animations';
import { springDown } from '@constants';
import { useCookie } from '@hooks/useCookie';
import { useMediaQuery } from '@hooks/useMediaQuery';
import styled, { css } from 'styled-components/macro';

const AnimatedWords = ({ children }) => {
  const hasCookie = useCookie('navigated')[0];
  const isMobile = useMediaQuery({ maxWidth: 546 });
  const isSmall = useMediaQuery({ maxWidth: 320 });
  const words = children.split(' ');
  const shouldLoadStatic = hasCookie || isMobile || isSmall;

  return (
    <P isMobile={isMobile} hasCookie={hasCookie}>
      {!shouldLoadStatic ? (
        words.map((word, i) => (
          <Span hasCookie={hasCookie} key={i} index={i + 1}>
            {word}&nbsp;
          </Span>
        ))
      ) : (
        <span>{children}</span>
      )}
    </P>
  );
};

const textSlide = (props) => {
  const animation = css`
    ${slideText} ${props.duration} ease ${props.delay} both;
  `;
  return animation;
};

const P = styled.p``;

const Span = styled.span.attrs(({ index, hasCookie }) => {
  const base = hasCookie ? 100 : 3300;
  const opacity = hasCookie ? 0 : 1;
  const delay = hasCookie ? 200 : base + index * 15 + 'ms';
  const distance = 500 + index * 2 + 'px';
  const duration = 1200 + 'ms'; //1000 + Math.pow(index, 2) + 'ms';
  return {
    duration,
    delay,
    style: {
      '--delay': delay,
      '--distance': distance,
      '--duration': duration,
      '--opacity': opacity,
    },
  };
})`
  --curve: ${springDown};
  display: inline-block;
  opacity: var(--opacity);
  animation: ${(p) => textSlide(p)};
`;

export default AnimatedWords;
