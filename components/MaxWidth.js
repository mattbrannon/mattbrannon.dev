import styled from 'styled-components/macro';

export function MaxWidthWrapper({ children }) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  max-width: 80ch;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
`;
