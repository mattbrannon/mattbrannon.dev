import styled from 'styled-components';

export const MaxWidthWrapper = styled.div.attrs(({ max }) => ({
  style: {
    '--max-width': max || 'var(--max-page-width)',
  },
}))`
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--breathing-room);
  min-height: 100%;
  height: 100%;
`;

// export const MaxWidthWrapper = styled.div.attrs(({ max }) => ({
//   style: {
//     '--max-width': max || 'var(--max-page-width)',
//   },
// }))`
//   --total-padding: calc(var(--breathing-room) * 2);
//   --full-width: calc(100% - var(--total-padding));

//   max-width: var(--max-width);
//   width: 100%;
//   margin: 0 auto;
//   min-height: inherit;
//   height: inherit;

//   display: grid;
//   grid-template-columns: 1fr min(var(--max-width), var(--full-width)) 1fr;

//   & > * {
//     grid-column: 2;
//   }
// `;

export const FullWidth = styled.div`
  grid-column: 1 / -1;
`;
