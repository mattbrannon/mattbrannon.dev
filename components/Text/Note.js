import styled from 'styled-components';
import { Blockquote } from '@components/SideNote';

export const Note = styled.p`
  margin: 0;
  font-size: clamp(var(--size16), 0.2vw + 1rem, var(--size20));
  line-height: 1.7;

  color: var(--color-text);

  ${Blockquote} & {
    background: palegoldenrod;
    color: #222;
    border-left: 8px solid gold;
    padding: 8px 16px;
    ${'' /* padding-left: 16px; */}
    border-radius: 0 6px 6px 0;
    line-height: 1.5;
    font-size: var(--size18);
    font-family: 'OpenSans';
    font-variation-settings: 'wdth' 75, 'wght' 555;
    width: 90%;
  }
`;
