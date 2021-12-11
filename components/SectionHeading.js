import styled from '@styled-components';

function SectionHeading({ children }) {
  return (
    <Wrapper>
      <Heading>{children}</Heading>
      <hr />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 32px;
  width: fit-content;
`;

const Heading = styled.h3`
  font-size: clamp(var(--size20), 1.5vw + 1rem, var(--size40));
`;

export default SectionHeading;
