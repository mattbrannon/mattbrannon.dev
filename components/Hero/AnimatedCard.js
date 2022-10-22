import styled from 'styled-components';
import { Card } from '@components/Card';

import CardBottom from './CardBottom';
import CardTop from './CardTop';

export default function AnimatedHero({ ...props }) {
  return (
    <Wrapper>
      <Card.Hero {...props}>
        <CardTop {...props} />
        <CardBottom {...props} />
      </Card.Hero>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* width: 100%; */
  margin: 0 auto;
  isolation: isolate;
  margin-bottom: -32px;
`;
