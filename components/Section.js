import styled from 'styled-components/macro';

export default function Section({ children }) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  isolation: isolate;
  margin: 16px 0;
`;
