import styled from 'styled-components';
import { motion } from 'framer-motion';
import { breakpoints } from '@constants/breakpoints';
import { useHasMounted } from '@hooks/useHasMounted';
import { useEffect, useState } from 'react';

export default function Card({ children, ...props }) {
  const hasMounted = useHasMounted();
  const [ background, setBackground ] = useState('');
  const [ boxShadow, setBoxShadow ] = useState('');

  useEffect(() => {
    if (hasMounted) {
      setBackground('var(--basic-card-background)');
      setBoxShadow('var(--card-shadow)');
    }
  }, [ hasMounted ]);

  if (!hasMounted) {
    return null;
  }

  return (
    <CardWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 2 }}
      style={{ background, boxShadow }}
      {...props}
    >
      <InnerWrappper>{children}</InnerWrappper>
    </CardWrapper>
  );
}

const CardWrapper = styled(motion.div)`
  background-color: var(--background, var(--body-background));
  box-shadow: var(--boxShadow, var(--transparent-shadow));
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
  position: relative;

  @media (max-width: ${breakpoints.mobile}px) {
    padding: 0;
    gap: 0;
  }
`;
