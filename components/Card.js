import styled from 'styled-components';
import { motion } from 'framer-motion';

import { breakpoints } from '@constants/breakpoints';

import { useHasMounted } from '@hooks/useHasMounted';

export default function Card({ children, ...props }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <CardWrapper {...props}>
      <InnerWrappper>{children}</InnerWrappper>
    </CardWrapper>
  );
}

const CardWrapper = styled(motion.div)`
  background: var(--basic-card-background);
  box-shadow: var(--card-shadow);
  display: grid;
  padding: 16px clamp(0.5rem, 1rem + 1vw, 2rem);
  font-size: clamp(1rem, 0.65rem + 1vw, 1.125rem);
  border-radius: 6px;
  gap: 16px;

  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}px) {
    --card-shadow: none;
    --basic-card-background: none;
  }
`;

const InnerWrappper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  @media (max-width: ${breakpoints.mobile}px) {
    padding: 0;
    gap: 0;
  }
`;
