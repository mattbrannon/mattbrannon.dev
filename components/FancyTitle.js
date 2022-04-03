import styled from 'styled-components';
import { H2 } from './Headings';
import { m as motion, LazyMotion } from 'framer-motion';
import { loadFeatures } from '@utils/helpers';
import { useRef } from 'react';
import ClientOnly from './ClientOnly';

const checkForCookie = () => {
  try {
    return typeof document !== 'undefined' && !!document.cookie.length;
  } catch {
    return false;
  }
};

function makeVariant() {
  let hasCookie;
  return function getVariant(delay) {
    return {
      hidden: () => {
        hasCookie = checkForCookie();
        return {
          opacity: 0,
          clipPath: typeof delay === 'number' || hasCookie ? 'var(--center)' : 'var(--left)',
          letterSpacing: '0.2em',
        };
      },
      show: ({ showTitle }) => {
        hasCookie = checkForCookie();
        return {
          opacity: 1,
          clipPath: 'var(--visible)',
          letterSpacing: '0.0195em',
          transition: {
            duration: hasCookie ? 1 : 1.5,
            delay: hasCookie || showTitle ? 0 : typeof delay === 'number' ? delay : 3.7,
          },
        };
      },
    };
  };
}

export default function FancyTitle({ showTitle, children, ...props }) {
  const gradient = props.gradient || 'var(--app-name-gradient)';
  const shadow = props.shadow || 'var(--app-name-shadow)';
  const strokeWidth = props.strokeWidth || 'var(--strokeWidth)';
  const strokeColor = props.strokeColor || 'var(--strokeColor)';
  const letterSpacing = props.letterSpacing || undefined;
  const container = useRef();
  const delay = props.delay ?? undefined;

  const getVariant = makeVariant();
  const variant = getVariant(delay);

  console.log(props);

  return (
    <ClientOnly>
      <LazyMotion features={loadFeatures} strict>
        <motion.div
          variants={variant}
          initial="hidden"
          animate="show"
          custom={{ showTitle }}
          style={{ padding: 'inherit' }}
        >
          <Heading
            ref={container}
            id="main-content"
            tabIndex={-1}
            style={{
              '--gradient': gradient,
              '--shadow': shadow,
              '--strokeWidth': strokeWidth,
              '--strokeColor': strokeColor,
              '--letterSpacing': letterSpacing,
            }}
          >
            {children.split(' ').map((word, i, collection) => {
              const space = i < collection.length - 1;
              return (
                <Word space={space} key={i}>
                  {word}
                </Word>
              );
            })}
          </Heading>
        </motion.div>
      </LazyMotion>
    </ClientOnly>
  );
}

const Span = styled.span`
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive4);
  position: relative;
  display: inline-block;
  width: max-content;

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-family: var(--fontFamily);
  ${'' /* font-size: var(--fontSize); */}
  font-variation-settings: var(--fontVariationSettings);
  background-image: var(--gradient);

  white-space: nowrap;
  transition: background-image 0.2s ease;

  &::after {
    content: "${(p) => p.children}";
    -webkit-text-stroke: 0.055em black;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    text-shadow: var(--shadow);
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);

    transition: text-shadow 0.2s ease;
  }
`;

const Heading = styled(H2)`
  ${'' /* font-size: clamp(var(--size21), 10vw, var(--size48)); */}
  font-size: clamp(48px, 4vw, 60px);

  margin-bottom: 0;
  margin-top: 0;

  letter-spacing: var(--letterSpacing);
`;

const Word = ({ children, ...props }) => {
  if (props.space) {
    return <Span {...props}>{children}&nbsp;</Span>;
  }
  else {
    return <Span {...props}>{children}</Span>;
  }
};
