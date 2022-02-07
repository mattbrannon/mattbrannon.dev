import styled from 'styled-components';

// const Layout = ({ children, ...props }) => {
//   return <Main {...props}>{children}</Main>;
// };

// const Layout = styled.main`
// margin-top: var(--header-height);
//   margin-bottom: var(--header-height);
//   display: grid;
//   grid-template-columns: auto min(var(--max-width), 100%) auto;
//   & > * {
//     grid-column: 2;
//     padding: 0 var(--breathing-room);
//   }

//   @media (max-width: 180px) {
//     --breathing-room: 0;
//   }
// `;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr min(var(--max-width), 100%) 1fr;
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

export const Main = styled.main`
  min-height: 100%;
  height: calc(100% - (var(--header-height) + var(--footer-height)));
  margin-top: var(--header-height);
  margin-bottom: var(--header-height);
`;

export const AltMain = styled(Main)`
  min-height: 100%;
  height: calc(100vh - var(--footer-height));
`;

export const FullBleed = styled.div`
  grid-column: 1 / -1;
  padding: 0;
`;

// export const BottomRow = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   margin-bottom: var(--breathing-room);

//   margin-top: 32px;
//   @media (min-width: 480px) {
//     margin-top: 64px;
//   }
// `;

export default Layout;
