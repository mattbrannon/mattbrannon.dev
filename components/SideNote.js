import styled from 'styled-components/macro';

export default function SideNote({ children }) {
  return <AsideWrapper>{children}</AsideWrapper>;
}

const AsideWrapper = styled.aside`
  background: palegoldenrod;
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-family: 'Roboto Flex';
  border-left: 6px solid gold;
  font-size: 1rem;

  @media (prefers-color-scheme: dark) {
    color: #333;
  }
`;
