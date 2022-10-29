import styled from 'styled-components';

export const MaxWidthWrapper = styled.div.attrs(({ max }) => {
  return {
    style: {
      '--max-width': max || 'var(--max-page-width)',
    },
  };
})`
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--breathing-room);
  min-height: 100%;
  height: 100%;
`;
