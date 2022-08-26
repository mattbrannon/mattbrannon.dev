import styled from 'styled-components';
import Help from '@components/Help';

export const Strong = styled.strong`
  color: var(--color-strong);

  ${Help} & {
    color: var(--sky);
  }
`;
