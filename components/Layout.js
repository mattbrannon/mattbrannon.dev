import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr min(var(--max-page-width), 100%) 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'content'
    'footer';
  & > * {
    grid-column: 2;
    padding: 0 var(--breathing-room);
  }
  min-height: 100%;
`;

// export const Main = styled.main`
//   /* margin-top: var(--header-height); */
//   margin-bottom: 96px;
//   display: grid;
// `;

export const FullBleed = styled.div`
  grid-column: 1 / -1;
  padding: 0;
`;

export const Main = styled.main`
  margin: 64px 0 128px 0;
  width: 100%;
`;

// export const Main = styled.main`
//   grid-column: 2;
//   margin-bottom: 128px;
//   margin-top: 64px;

//   max-width: var(--max-page-width);
//   width: 100%;
//   margin: 0 auto;
//   padding: 32px;
//   @media (max-width: ${breakpoints.mobile}px) {
//     padding: 16px;
//   }
//   min-height: calc(100vh - var(--footer-height));
// `;

export default Layout;

export const BlogList = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr)); */
  grid-template-columns: auto;
  /* grid-template-rows: repeat(auto-fit, minmax(min(100px, 100%), 1fr)); */
  gap: 8px;
`;

// export const BlogList = styled.nav`
//   display: grid;
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
//   padding: 0;
//   list-style: none;

//   @media (min-width: ${breakpoints.mobile}px) {
//     margin-top: 32px;
//   }

//   @media (max-width: 500px) {
//     margin-bottom: 32px;
//     gap: 0px;
//   }

//   @media (max-width: 795px) {
//     display: flex;
//     flex-direction: column;
//     gap: 24px;
//     margin: 32px auto 0 auto;
//     max-width: 555px;
//   }

//   @media (max-width: ${breakpoints.mobile}px) {
//     margin-top: 16px;
//   }

//   @media (max-width: ${breakpoints.tablet}px) {
//   }
// `;

export const ToolsList = styled.nav`
  list-style: none;
  display: grid;
  gap: 18px;
  padding: 0;
`;
