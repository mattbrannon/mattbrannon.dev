import styled from 'styled-components';
import { card } from '@components/Card';

import CardBottom from './CardBottom';
import CardTop from './CardTop';

export default function AnimatedHero({ ...props }) {
  return (
    <Wrapper>
      <card.hero {...props}>
        <CardTop {...props} />
        <CardBottom {...props} />
      </card.hero>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* width: 100%; */
  margin: 0 auto;
  isolation: isolate;
  margin-bottom: -32px;
`;
