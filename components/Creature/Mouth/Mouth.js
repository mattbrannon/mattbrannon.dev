import { motion } from 'framer-motion';
import styled from 'styled-components';
import * as variants from './variants';

export const Mouth = styled(motion.div)`
  --mouth-padding: 2px;
  --mouth-margin: calc(var(--mouth-padding) * -2);
  width: calc(var(--cube-width) * 0.5);
  background: #191919;
  border-radius: var(--mouth-radius);
  padding: var(--mouth-padding) 0;
`;

const withMouthVariant = (variants) => {
  return function Component({ ...props }) {
    return (
      <Mouth {...props} variants={variants} initial="initial" animate="animate">
        {props.children}
      </Mouth>
    );
  };
};

export const Smirking = withMouthVariant(variants.smirking);
export const Talking = withMouthVariant(variants.talking);
export const Smiling = withMouthVariant(variants.smiling);
export const Frowning = withMouthVariant(variants.frowning);
export const Open = withMouthVariant(variants.open);
export const Closed = withMouthVariant(variants.closed);
export const Shocked = withMouthVariant(variants.shocked);
