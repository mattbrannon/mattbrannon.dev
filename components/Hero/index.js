import styled from 'styled-components/macro';
import Card from './Card';

export default function Hero(props) {
  return (
    <Wrapper>
      <Card {...props} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  isolation: isolate;
`;
