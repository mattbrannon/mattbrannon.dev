import { keyframes } from 'styled-components';

export const fadein = keyframes`
0% {
  width: 0%;
  font-variation-settings: 'wght' 100, 'wdth' 80, 'opsz' 72;
}

40% {
  font-variation-settings: 'wght' 500, 'wdth' 80, 'opsz' 72;
}

100% {
  width: 94%;
  font-variation-settings: 'wght' 440, 'wdth' 80, 'opsz' 72;
}
`;
