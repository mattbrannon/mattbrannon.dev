import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Shape = styled(motion.div)`
  position: relative;
  --cube-width: ${(p) => p.width + 'px' || 'var(--cube-width)'};
  --cube-height: ${(p) => p.height + 'px' || 'var(--cube-height)'};
  --cube-depth: 50px;
  transform-style: preserve-3d;

  transform: translateX(var(--translateX)) translateY(var(--translateY)) rotateX(var(--rotateX))
    rotateY(var(--rotateY)) rotateZ(var(--rotateZ)) translateZ(var(--translateZ));

  width: var(--cube-width);
  height: var(--cube-height);

  transition: transform var(--speed) linear;
`;