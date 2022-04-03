import styled from 'styled-components';

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

export const Main = styled.main`
  /* margin-top: var(--header-height); */
  margin-bottom: 96px;
`;

export const AltMain = styled(Main)`
  min-height: 100%;
  height: calc(100vh - var(--footer-height));
`;

export const FullBleed = styled.div`
  grid-column: 1 / -1;
  padding: 0;
`;

export default Layout;
