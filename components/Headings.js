import styled, { keyframes } from 'styled-components/macro';

const fadeIn = keyframes`
  from {
    font-variation-settings: var(--recursive5);
    transform: translate(-10%, 0);
    letter-spacing: -0.5em;
    opacity: 0;

  }
  to {
    font-variation-settings: var(--recursive4);
    transform: translate(0, 0);
    letter-spacing: 0.0125em;
    opacity: 1;
  }
`;

export const H1 = styled.h1`
  ${'' /* --settings: 'BLDA' 1000, 'TRMD' 0, 'TRMC' 0, 'SKLD' 1000, 'TRML' 0, 'SKLA' 0, 'TRMF' 0,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;

  --start: 'BLDA' 1000, 'TRMD' 0, 'TRMC' 0, 'SKLD' 1000, 'TRML' 0, 'SKLA' 0, 'TRMF' 0,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;

  --end: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 0, 'WMX2' 800, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 630, 'TRME' 0; */}

  --font: var(--jost-heavy);
  --start: var(--jost-hairline);
  --end: var(--jost-black);

  letter-spacing: 0.125em;
  font-family: 'Jost', sans-serif;
  font-variation-settings: var(--font);

  background-image: linear-gradient(var(--pinkShadow), var(--orange2) 60%, var(--orange3));
  color: var(--blue0);
  -webkit-text-fill-color: var(--blue0);

  background-clip: text;
  -webkit-background-clip: text;

  @media (prefers-color-scheme: dark) {
    background-image: linear-gradient(var(--pinkShadow), var(--blue2) 60%, var(--blue1));
    color: var(--blue0);
    -webkit-text-fill-color: var(--blue0);
  }

  animation: ${fadeIn} 1000ms ease 1000ms both;
`;
export const H2 = styled.h2``;
export const H3 = styled.h3``;

export const H4 = styled.h4`
  font-size: clamp(var(--size18), 7vw, var(--size32));

  margin: 48px 0 0 0;

  font-family: Recursive, sans-serif;

  font-variation-settings: var(--recursive4);

  ${'' /* animation: ${fadeIn} 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.875) 500ms both; */}

  transition: all 10ms;
  width: fit-content;

  @media (prefers-color-scheme: light) {
    color: var(--pinkBg);
    &:hover {
      color: var(--pinkHover);
      text-decoration: underline;
    }
    &:visited {
      color: green;
    }
  }

  @media (prefers-color-scheme: dark) {
    color: var(--orange-main);
    &:hover {
      color: var(--orange-hover);
      text-decoration: underline;
    }
  }
`;
export const H5 = styled.h5``;
export const H6 = styled.h6``;
