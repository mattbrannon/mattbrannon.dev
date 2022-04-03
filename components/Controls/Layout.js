import styled, { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/index';
import { forwardRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadFeatures } from '@utils/helpers';

const controlVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// eslint-disable-next-line react/display-name
const ControlsLayout = forwardRef((props, ref) => {
  const context = useContext(ThemeContext);
  const zIndex = context.isOpen ? 0 : 1;
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={props.children}
        variants={controlVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Wrapper
          style={{ '--zIndex': zIndex }}
          id="main-content"
          tabIndex={-1}
          {...props}
          ref={ref}
        >
          {props.children}
        </Wrapper>
      </motion.div>
    </AnimatePresence>
  );
});

export const ControlsContainer = ({ children }) => {
  return (
    <Container>
      <Section>{children}</Section>
    </Container>
  );
};

const Wrapper = styled.div`
  width: 280px;
  min-width: 280px;
  height: calc(100% - var(--header-height));
  position: absolute;
  background: hsl(0, 0%, 3.5%, 1);
  top: var(--header-height);
  left: 0;
  border: 4px solid black;
  padding: 16px;
  overflow: auto;
  z-index: var(--zIndex);
  isolation: isolate;

  color: white;

  @media (max-width: ${breakpoints.mobile}px) {
    top: 50px;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }
`;

const Container = styled.div`
  &:last-child {
    margin: 16px 0 0 0;
  }
`;

const Section = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: column;
`;

export default ControlsLayout;