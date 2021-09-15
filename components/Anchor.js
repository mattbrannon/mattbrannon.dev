import styled from 'styled-components/macro';

export const Anchor = styled.a.attrs((props) => {
  return {
    tabIndex: 0,
    target: props.newTab ? '_blank' : '_self',
  };
})`
  font-family: 'futura', system-ui, sans-serif;
  color: var(--medDarkPink);

  &:hover {
    color: var(--darkPink);
    cursor: pointer;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--darkModeLinkColor);
    &:hover {
      color: var(--lightPink);
    }
  }
`;
