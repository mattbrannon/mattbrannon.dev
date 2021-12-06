import styled from 'styled-components/macro';

export const Anchor = styled.a.attrs((props) => {
  return {
    tabIndex: 0,
    target: props.newTab ? '_blank' : '_self',
  };
})`
  transition: color 140ms ease-in;
  &:hover {
    cursor: pointer;
  }
`;
