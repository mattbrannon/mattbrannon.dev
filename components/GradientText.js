import { getTextShadow } from '@utils/helpers';
import { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components/macro';

const recursiveAnimation = keyframes`
  from {
    opacity: 0;
    transform:translate(-10%, 0);
    font-variation-settings: var(--recursive7)
  }
  to {
    opacity: 1;
    transform:translate(0, 0);

    font-variation-settings: var(--recursive8)
  }
`;

const shadowAnimation = keyframes`
  from {
    text-shadow: none;
  }
  to {
    text-shadow: var(--welcome-shadow);
  }
`;

const gradientAnimation = keyframes`
  from {
    background-size: 100% 300%;
  }

  to {
    background-size: 100% 100%;
  }
`;

const Template = styled.div`
  --scale: 7vw;

  --font-size: clamp(var(--size18), var(--scale), var(--size48));
  --left: ${(p) => (p.centered ? 0 : undefined)};

  position: absolute;
  left: var(--left);
  right: var(--left);

  white-space: nowrap;
  margin: 0 auto;
  padding: 12px 4px;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;

  will-change: font-variation-settings;

  @media (max-width: 300px) {
    white-space: revert;
  }
`;

const Text = styled(Template)`
  font-size: var(--font-size);
  font-variation-settings: var(--recursive2);
  font-family: Recursive;
`;

const Gradient = styled(Text)`
  background-image: linear-gradient(var(--fancy-gradient));
  background-size: 100% 100%;
  animation: ${recursiveAnimation} 1000ms ease-out 5500ms both,
    ${gradientAnimation} 1500ms ease-in-out 5500ms both;
`;

const Shadow = styled(Text)`
  text-shadow: var(--welcome-shadow);
  animation: ${recursiveAnimation} 1000ms ease-out 5500ms both,
    ${shadowAnimation} 700ms ease-in-out 5800ms both;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  place-items: center;

  --shadow-hue: 40;
  --layers: 7;
  --em: 0.008;

  --fancy-shadow: ${getTextShadow(7, 'var(--shadow-hue)', 0.008)};
  --fancy-gradient: var(--welcome-gradient);
`;

const TextGradient = forwardRef((props, ref) => {
  return (
    <>
      <Gradient {...props} ref={ref}>
        {props.children}
      </Gradient>
    </>
  );
});

const TextShadow = forwardRef((props, ref) => {
  return (
    <>
      <Shadow {...props} ref={ref}>
        {props.children}
      </Shadow>
    </>
  );
});

const ShadowGradient = ({ children }) => {
  return (
    <Wrapper>
      <Shadow>{children}</Shadow>
      <Gradient>{children}</Gradient>
    </Wrapper>
  );
};

TextGradient.displayName = 'TextGradient';
TextShadow.displayName = 'TextShadow';

export default ShadowGradient;
