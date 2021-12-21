import { getTextShadow } from '@utils/helpers';
import { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';

const Template = styled.div`
  --scale: 7vw;

  --font-size: clamp(var(--size32), var(--scale), var(--size48));
  --left: ${(p) => (p.centered ? 0 : undefined)};

  position: absolute;
  left: var(--left);
  right: var(--left);
  top: 0;

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
`;

const Shadow = styled(Text)`
  text-shadow: var(--welcome-shadow);
  position: static;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  --shadow-hue: 40;
  --layers: 7;
  --em: 0.008;

  --fancy-shadow: ${getTextShadow(7, 'var(--shadow-hue)', 0.008)};
  --fancy-gradient: var(--welcome-gradient);
`;

const gradientAnimation = [
  {
    opacity: 0,
    fontVariationSettings: 'var(--recursive7)',
    backgroundSize: '100% 400%',
  },

  {
    opacity: 1,
    fontVariationSettings: 'var(--recursive8)',
    backgroundSize: '100% 100%',
  },
];

const shadowAnimation = [
  {
    opacity: 0,
    fontVariationSettings: 'var(--recursive7)',
    textShadow: 'var(--no-shadow)',
  },

  {
    opacity: 1,
    fontVariationSettings: 'var(--recursive8)',
    textShadow: 'var(--welcome-shadow)',
  },
];

const timing = {
  duration: 2000,
  easing: 'cubic-bezier(0.5, 1.05, 0.25, 1.15)',
  fill: 'forwards',
};

const GradientText = forwardRef((props, ref) => {
  const ref1 = useRef();
  const ref2 = useRef();
  const [ hasStarted, setHasStarted ] = useState(false);
  const { isFinished, animationTiming } = props;

  useEffect(() => {
    if (animationTiming && !isFinished && !hasStarted) {
      setHasStarted(true);
      console.log(props.animationTiming);
      const {
        animationTiming: { endTime, duration },
      } = props;

      ref1.current.animate(shadowAnimation, {
        ...timing,
        delay: endTime - duration,
      });
      ref2.current.animate(gradientAnimation, {
        ...timing,
        delay: endTime - duration,
      });
    }
  }, [ props, isFinished, animationTiming, hasStarted ]);

  return (
    <Wrapper ref={ref}>
      <Shadow ref={ref1}>{props.children}</Shadow>
      <Gradient ref={ref2}>{props.children}</Gradient>
    </Wrapper>
  );
});

GradientText.displayName = 'GradientText';

export default GradientText;
