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
        <Menu>{props.children}</Menu>
      </Wrapper>
    </AnimatePresence>
  );
});

const Wrapper = styled(motion.aside).attrs(({ theme }) => {
  return {
    style: {
      '--offsetHeight': theme.headerSize + 'px',
    },
  };
})`
  /* height: calc(100% - var(--header-height)); */

  background: hsl(0, 0%, 3.5%, 1);

  border: 4px solid black;
  padding: 16px;

  isolation: isolate;
  color: white;
  min-width: 100%;

  scrollbar-width: thin;
  overflow: auto;

  @media (min-width: ${breakpoints.laptop}px) {
    width: 336px;
    height: calc(100vh - var(--offsetHeight));
  }

  &::-webkit-scrollbar {
    width: 2px;
  }
`;

const Menu = styled.menu`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background: inherit;
`;

export const Group = styled.hgroup`
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
