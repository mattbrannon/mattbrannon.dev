import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import { breakpoints } from '@constants/index';
import GradientText from '@components/GradientText';
import { H1 } from '@components/Headings';
import { makeGradient } from '@utils/helpers';
import { useFontSize } from '@hooks/useFontSize';

export default function BlogHeader({ children, ...props }) {
  const gradient = makeGradient('#a9fab3', '#88394a', 12);
  const fontSize = useFontSize(32, 64, breakpoints.mobile, breakpoints.desktop);
  // console.log(gradient);
  console.log({ fontSize });

  return (
    <Wrapper>
      <Title style={{ '--fontSize': fontSize }}>
        <GradientText gradient={gradient}>{children.title}</GradientText>
      </Title>
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
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin-top: 48px;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.mobile}px) {
    margin-top: 0;
  }
`;

const Title = styled.h1`
  font-size: 64px;
  margin-bottom: 0rem;
  flex: 1 0 100%;
  ${'' /* font-size: var(--fontSize); */}
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size40);
  }
`;

const Time = styled.div`
  white-space: nowrap;
  color: #777770;
  flex: 1;
  min-width: revert;
`;
