// import Eye from './Eye';
import styled from 'styled-components';
import { NormalEye, RedEye } from './Eye';
import { useEye } from '@hooks/useEye';
// import { lookAround } from '@animations/index.js';

function withEyes(Component) {
  return function MakeEyes({ ...props }) {
    const margin = useEye(props);
    props.eyelidMargin = margin;
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: max(16px, 7%);
`;
