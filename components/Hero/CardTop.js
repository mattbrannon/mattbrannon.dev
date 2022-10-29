import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import DropDeadFred from './TopLeft';
import TextComponent from './TopRight';

export default function CardTop({ ...props }) {
  return (
    <TopCardRow>
      <LeftTop>
        <DropDeadFred {...props} />
      </LeftTop>
      <RightTop>
        <TextComponent {...props} />
      </RightTop>
    </TopCardRow>
  );
}

const TopCardRow = styled.div`
  padding-top: 16px;

  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-items: center;

  @media (min-width: ${breakpoints.tablet}px) {
    display: grid;
    grid-template-columns: 180px 1fr;
    grid-template-areas: 'left right';
  }

  @media (min-width: ${breakpoints.laptop}px) {
    display: grid;
    grid-template-columns: 180px 1fr;
    grid-template-areas: 'left right';
  }
`;

const LeftTop = styled.div`
  grid-area: left;
`;

const RightTop = styled.div`
  grid-area: right;
`;
