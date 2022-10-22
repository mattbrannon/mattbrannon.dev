import styled, { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import { forwardRef, useContext } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';

const controlVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// eslint-disable-next-line react/display-name
export const Layout = forwardRef((props, ref) => {
  const context = useContext(ThemeContext);

  return (
    <AnimatePresence>
      <Wrapper
        isOpen={context.isOpen}
        key={props.children}
        variants={controlVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        tabIndex={-1}
        ref={ref}
        {...props}
      >
        <Section>{props.children}</Section>
      </Wrapper>
    </AnimatePresence>
  );
});

const Wrapper = styled(motion.div)`
  height: calc(100% - var(--header-height));
  position: absolute;
  background: hsl(0, 0%, 3.5%, 1);
  left: 0;
  border: 4px solid black;
  padding: 16px;
  overflow: auto;
  z-index: ${(p) => (p.isOpen ? 0 : 1)};
  isolation: isolate;
  color: white;
  min-width: 336px;
  top: var(--header-height);

  scrollbar-width: thin;

  @media (max-width: ${breakpoints.tablet}px) {
    top: 50%;
    min-width: 100%;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Group = styled.section`
  display: grid;
`;

export const SectionHeading = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--orange);
  margin: 0;
  margin-bottom: 0px;
  margin-top: 0;
  margin: 16px 0 0px 0;
`;
