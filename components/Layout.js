import styled from 'styled-components/macro';

const Layout = styled.div`
  min-height: 100%;
  display: grid;
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
  padding-top: var(--breathing-room);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const TopRowLeftAligned = styled(TopRow)`
  align-items: flex-start;
`;

export const BottomRow = styled(TopRow)`
  margin-bottom: var(--breathing-room);
`;

const SectionTitleWrapper = styled.div`
  margin-top: 32px;
  width: fit-content;
`;

export const SectionTitle = ({ children }) => {
  return (
    <SectionTitleWrapper>
      <h3>{children}</h3>
      <hr />
    </SectionTitleWrapper>
  );
};

export default Layout;
