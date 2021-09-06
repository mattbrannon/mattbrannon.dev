import styled from 'styled-components/macro';

const FancyText = styled.span`
  display: inline;
  font-family: 'Coming Soon';
  color: deeppink;
  @media (prefers-color-scheme: dark) {
    color: deepskyblue;
    font-weight: 700;
  }
`;

export default FancyText;
