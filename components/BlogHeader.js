import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import { mobile, blogHeader, blogVariant } from '@constants/index';
import { withGradient, Text } from '@components/GradientText';

export default function BlogHeader({ children, ...props }) {
  return (
    <Wrapper style={{ '--fontSize': blogHeader.fontSize }}>
      <Title>
        <Gradient custom={blogHeader}>{children.title}</Gradient>
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
  font-family: Recursive;
  @media (max-width: ${mobile}px) {
    margin-top: 24px;
  }
`;

const Title = styled.h1`
  ${'' /* font-size: 64px; */}
  margin-bottom: 0rem;
  flex: 1 0 100%;
  @media (max-width: ${mobile}px) {
    font-size: var(--size40);
  }
`;

const Time = styled.div`
  white-space: nowrap;
  color: #777770;
  flex: 1;
  min-width: revert;
`;

const HeaderText = styled(Text)`
  padding: 0;
`;

const GradientText = (props) => {
  return (
    <HeaderText
      {...props}
      variants={blogVariant}
      initial="hidden"
      animate="show"
      exit="close"
    >
      {props.children}
    </HeaderText>
  );
};

const Gradient = withGradient(GradientText);
