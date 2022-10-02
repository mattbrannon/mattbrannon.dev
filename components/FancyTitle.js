import styled from 'styled-components';
import { H1 } from './Headings';
import { m as motion } from 'framer-motion';
// import { loadFeatures } from '@utils/helpers.js';
import { useRef, useState, useEffect, Children } from 'react';
import ClientOnly from './ClientOnly';

export default function FancyTitle({ children, ...props }) {
  // const gradient = 'var(--app-name-gradient)';
  // const shadow = props.shadow || 'var(--app-name-shadow)';
  // const strokeWidth = props.strokeWidth || 'var(--strokeWidth)';
  // const strokeColor = props.strokeColor || 'var(--strokeColor)';
  // const letterSpacing = props.letterSpacing || undefined;
  // const fontFamily = props.fontFamily;
  // const fontSize = props.fontSize;
  const container = useRef();
  const [names, setNames] = useState({ previous: '', current: '' });
  // const [duration, setDuration] = useState('');
  // const delay = props.delay ?? undefined;

  // const getVariant = makeVariant();
  // const variant = getVariant(delay);

  // const handleStart = (name) => {
  //   console.log(name);
  //   if (names.current) {
  //     setNames({ previous: names.current, current: name });
  //   }
  //   else {
  //     setNames({ ...names, current: name });
  //   }
  // };

  // const variants = { ...props.variants, transition: { duration } } || {};

  // console.log(variants);

  return (
    <ClientOnly>
      <motion.div {...props}>
        <Heading {...props} ref={container} tabIndex={-1}>
          {Children.toArray(children).map((word, i, collection) => {
            const space = i < collection.length - 1 ? '\u{00a0}' : ' ';
            return (
              <Span key={i} {...props}>
                {word}
                {space}
              </Span>
            );
          })}
        </Heading>
      </motion.div>
    </ClientOnly>
  );
}

const Span = styled.span`
  position: relative;
  display: inline-block;
  width: max-content;
  padding: 0 4px;
  ${'' /* padding: 0 2px 0 0; */}

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-size: var(--fontSize);
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontVariationSettings);
  background-image: var(--gradient);

  white-space: nowrap;
  transition: background-image 0.2s ease;

  &:after {
    padding: 0 4px;

    content: '${(p) => p.children}';
    position: absolute;
    ${'' /* width: 100%; */}
    top: 0;
    left: 0;
    z-index: -1;
    text-shadow: var(--shadow);
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  }
`;

const Heading = styled(H1)`
  font-size: var(--fontSize);
  margin-bottom: 0;
  margin-top: 0;
  letter-spacing: var(--letterSpacing);
  margin: 0 auto;
`;

const Word = ({ children, ...props }) => {
  if (props.space) {
    return <Span {...props}>{children}&nbsp;</Span>;
  }
  else {
    return <Span {...props}>{children}</Span>;
  }
};
