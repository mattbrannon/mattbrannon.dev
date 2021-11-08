import styled from 'styled-components/macro';

export function MaxWidthWrapper({ size = '80ch', children }) {
  const maxWidth = typeof size === 'number' ? size + 'px' : size;

  return (
    <>
      <Wrapper size={maxWidth}>{children}</Wrapper>
    </>
  );
}

export const Wrapper = styled.div`
  max-width: ${(p) => p.size};
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
`;
