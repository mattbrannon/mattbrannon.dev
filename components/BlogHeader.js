import { format, parseISO } from 'date-fns';
import styled from 'styled-components';

export default function BlogHeader({ children }) {
  return (
    <Wrapper>
      <Title>{children.title}</Title>
      <Date date={children.date} />
    </Wrapper>
  );
}

function Date({ date }) {
  if (date) {
    const dateString = parseISO(date);
    const formatted = format(dateString, 'LLLL d, yyyy');
    return <Time>{formatted}</Time>;
  }
  return null;
}

const Wrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`;

const Title = styled.h1`
  margin-bottom: 0rem;
  white-space: nowrap;
  flex: 1;
  flex-basis: 50%;
`;

const Time = styled.div`
  /* font-size: 0.9rem; */
  white-space: nowrap;
  color: #777770;
  flex: 1;
`;
