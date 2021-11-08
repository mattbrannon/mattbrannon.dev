import styled from 'styled-components/macro';

const Message = styled.p.attrs((props) => {
  return {
    style: {
      '--max': props.max - 16 + 'px',
    },
  };
})`
  position: absolute;
  left: 0;
  right: 0;
  --clamp: min(200px, var(--max));

  ${'' /* width: 100%; */}
  /* height: 100%; */

  text-align: center;

  white-space: nowrap;
  overflow: hidden;
  margin: 0 auto;

  /* font-size: clamp(1.8rem, 7vw, 3.6rem); */
  font-size: clamp(18px, 7vw, 48px);
  font-family: 'Decovar';
  font-variation-settings: var(--decovar-end);

  @media (max-width: 300px) {
    white-space: revert;
  }
`;

export const WelcomeGradient = styled(Message)`
  background-image: linear-gradient(var(--welcome-gradient));
  background-size: 100% 100%;
  background-clip: text;
  -webkit-background-clip: text;
`;

export const WelcomeShadow = styled(Message)`
  text-shadow: var(--welcome-shadow);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`;
