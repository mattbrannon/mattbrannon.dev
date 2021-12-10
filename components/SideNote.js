import styled from 'styled-components/macro';

export default function SideNote({ children }) {
  return <AsideWrapper>{children}</AsideWrapper>;
}

const AsideWrapper = styled.aside`
  display: block;
  margin: 1em 0;
  background: palegoldenrod;
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-family: 'Open Sans', system-ui, sans-serif;
  border-left: 6px solid gold;
  font-size: var(--size16);

  @media (prefers-color-scheme: dark) {
    color: #333;
  }
`;
