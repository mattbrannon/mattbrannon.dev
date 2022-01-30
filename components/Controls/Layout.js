import styled from 'styled-components/macro';
import { breakpoints } from '@constants/index';
import { forwardRef } from 'react';

// export default function ControlsLayout({ children }) {

//   return <Wrapper>{children}</Wrapper>;
// }

// eslint-disable-next-line react/display-name
const ControlsLayout = forwardRef((props, ref) => {
  return (
    <Wrapper {...props} ref={ref}>
      {props.children}
    </Wrapper>
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
  width: fit-content;
  min-width: 220px;
  height: calc(100% - var(--header-height));
  position: absolute;
  background: hsl(0, 0%, 3.5%, 1);
  top: var(--header-height);
  left: 0;
  border: 4px solid black;
  padding: 16px;
  overflow: auto;
  z-index: 1;
  isolation: isolate;

  @media (prefers-color-scheme: light) {
    color: white;
  }

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
  gap: 16px;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default ControlsLayout;
