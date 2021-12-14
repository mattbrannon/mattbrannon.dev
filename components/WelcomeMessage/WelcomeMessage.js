import styled, { css, keyframes } from 'styled-components/macro';

const gradientAnimation = keyframes`
  0% {
    background-size: 100% 400%;
    font-variation-settings: var(--recursive7);
    opacity: 0;
  }

  100% {
    background-size: 100% 100%;
    font-variation-settings: var(--recursive8);
    opacity: 1;
  }
`;

const shadowAnimation = keyframes`
  0%{
    font-variation-settings: var(--recursive7);
    textShadow: var(--no-shadow);
    opacity: 0;
  }

  100%{
    font-variation-settings: var(--recursive8);
    textShadow: var(--welcome-shadow);
    opacity: 1;
  }
`;

const animateGradient = () => {
  // const delay = props.theme.cookieExists ? 100 : 4200;
  return css`
    ${gradientAnimation} 600ms ease-in-out both 4200ms;
  `;
};

const animateShadow = () => {
  // const delay = props.theme.cookieExists ? 200 : 4400;
  return css`
    ${shadowAnimation} 500ms ease-in-out both 4200ms;
  `;
};

const Message = styled.div.attrs((props) => {
  return {
    style: {
      '--left': props.centered ? 0 : undefined,
      '--right': props.centered ? 0 : undefined,
    },
  };
})`
  --scale: 10vw;
  position: absolute;
  left: var(--left);
  right: var(--right);

  white-space: nowrap;
  margin: 0 auto;
  padding: 12px 4px;
  font-size: clamp(var(--size18), var(--scale), var(--size48));

  font-family: Recursive;

  @media (max-width: 300px) {
    white-space: revert;
  }
`;

export const WelcomeGradient = styled(Message)`
  background-image: linear-gradient(var(--welcome-gradient));
  background-size: 100% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: ${(p) => animateGradient(p)};
`;

export const WelcomeShadow = styled(Message)`
  text-shadow: var(--welcome-shadow);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: ${(p) => animateShadow(p)};
`;
