import styled from 'styled-components/macro';

const Layout = styled.div`
  min-height: 100%;
  display: grid;
  ${'' /* margin-top: var(--header-height); */}
  grid-template-columns: 1fr min(var(--max-width), 100%) 1fr;
  grid-template-rows: auto 1fr auto;
  padding-left: var(--breathing-room);
  padding-right: var(--breathing-room);

  & > * {
    grid-column: 2;
  }
`;

export const FullBleed = styled.div`
  grid-column: 1 / -1;
  margin-left: calc(var(--breathing-room) * -1);
  margin-right: calc(var(--breathing-room) * -1);
  height: fit-content;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;
  margin-top: 64px;
  ${'' /* align-items: center; */}
`;

export const TopRowLeftAligned = styled(TopRow)`
  align-items: flex-start;
`;

export const BottomRow = styled(TopRow)`
  margin-bottom: var(--breathing-room);
`;

export default Layout;
