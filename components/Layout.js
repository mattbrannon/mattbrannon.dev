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

export const FullBleed = styled.div`
  grid-column: 1 / -1;
  padding: 0;
`;

export const Main = styled.main`
  margin: 92px 0 128px 0;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}px) {
    margin: 24px 0 128px 0;
  }
`;

export default Layout;

export const BlogList = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr)); */
  grid-template-columns: auto;
  /* grid-template-rows: repeat(auto-fit, minmax(min(100px, 100%), 1fr)); */
  gap: 8px;
`;

export const ToolsList = styled.nav`
  list-style: none;
  display: grid;
  gap: 18px;
  padding: 0;
`;
