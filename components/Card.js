import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';

import { breakpoints } from '@constants/breakpoints';

import { useHasMounted } from '@hooks/useHasMounted';
import { useContext, useEffect, useState } from 'react';

export default function Card({ children, ...props }) {
  const context = useContext(ThemeContext);
  const hasMounted = useHasMounted();
  const [ background, setBackground ] = useState('');
  const [ shadow, setShadow ] = useState('');

  useEffect(() => {
    if (hasMounted) {
      setBackground('var(--basic-card-background)');
      setShadow('var(--card-shadow)');
    }
  }, [ hasMounted ]);

  if (!hasMounted) {
    return null;
  }

  return (
    <CardWrapper
      style={{ '--background': background, '--boxShadow': shadow }}
      hasRun={context.hasRun}
      {...props}
    >
      <InnerWrappper>{children}</InnerWrappper>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  background: var(--background, var(--body-background));
  box-shadow: var(--boxShadow, var(--transparent-shadow));
  display: grid;
  padding: 16px clamp(0.5rem, 1rem + 1vw, 2rem);
  font-size: clamp(1rem, 0.65rem + 1vw, 1.125rem);
  border-radius: 6px;
  gap: 16px;

  overflow: hidden;

  transition: background-color 0.4s linear, box-shadow 0.8s linear;

  @media (max-width: ${breakpoints.mobile}px) {
    --card-shadow: none;
    --basic-card-background: none;
  }
`;

// const CardWrapper = styled(motion.div).attrs((props) => {
//   const { shouldExpand, hasRun } = props;
//   const background =
//     shouldExpand || hasRun ? 'var(--basic-card-background)' : 'var(--body-background)';
//   const boxShadow = shouldExpand || hasRun ? 'var(--card-shadow)' : 'var(--transparent-shadow)';
//   return {
//     style: {
//       '--background': background,
//       '--boxShadow': boxShadow,
//     },
//   };
// })`
//   background: var(--background);
//   box-shadow: var(--boxShadow);
//   display: grid;
//   padding: 16px clamp(0.5rem, 1rem + 1vw, 2rem);
//   font-size: clamp(1rem, 0.65rem + 1vw, 1.125rem);
//   border-radius: 6px;
//   gap: 16px;

//   overflow: hidden;

//   transition: background 0.4s linear, box-shadow 0.8s linear;

//   @media (max-width: ${breakpoints.mobile}px) {
//     --card-shadow: none;
//     --basic-card-background: none;
//   }
// `;

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
