import styled from 'styled-components';

// const Layout = ({ children, ...props }) => {
//   return <Main {...props}>{children}</Main>;
// };

const Layout = styled.main`
  margin-top: var(--header-height);
  margin-bottom: var(--header-height);
  display: grid;
  grid-template-columns: auto min(var(--max-width), 100%) auto;
  & > * {
    grid-column: 2;
    padding: 0 var(--breathing-room);
  }

  @media (max-width: 180px) {
    --breathing-room: 0;
  }
`;

export const FullBleed = styled.div`
  grid-column: 1 / -1;
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
