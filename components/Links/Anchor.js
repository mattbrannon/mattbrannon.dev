import styled from 'styled-components';

export const Anchor = styled.a.attrs((props) => {
  return {
    tabIndex: 0,
    target: props.newTab ? '_blank' : '_self',
  };
})`
  color: currentColor;
  transition: color 140ms ease-in;
  &:hover {
    cursor: pointer;
  }

  &:focus-visible {
    border-radius: 1px;
    outline-offset: 2px;
    outline: 2px solid var(--color-outline);
  }
`;
