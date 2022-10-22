// import Eye from './Eye';
import styled from 'styled-components';
import { NormalEye, RedEye, BigEye } from './Eye';
import { useEye } from '@hooks/useEye';
// import { m as motion } from 'framer-motion';
// import * as variants from './variants';
// import { lookAround } from '@animations/index.js';

function withEyes(Component) {
  return function MakeEyes({ ...props }) {
    props.eyelidTop = useEye(props);
    return (
      <Container>
        <Component {...props} />
        <Component {...props} />
      </Container>
    );
  };
}

export const NormalEyes = withEyes(NormalEye);
export const RedEyes = withEyes(RedEye);
export const BigEyes = withEyes(BigEye);

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: max(16px, 7%);
`;
