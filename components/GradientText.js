import { getTextShadow } from '@utils/helpers';
import { forwardRef, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';

// const recursiveAnimation = keyframes`
//   from {
//     opacity: 0;
//     transform:translate(-10%, 0);
//     font-variation-settings: var(--recursive7)
//   }
//   to {
//     opacity: 1;
//     transform:translate(0, 0);

//     font-variation-settings: var(--recursive8)
//   }
// `;

// const shadowAnimation = keyframes`
//   from {
//     text-shadow: none;
//   }
//   to {
//     text-shadow: var(--welcome-shadow);
//   }
// `;

// const gradientAnimation = keyframes`
//   from {
//     background-size: 100% 300%;
//   }

//   to {
//     background-size: 100% 100%;
//   }
// `;

const Template = styled.div`
  --scale: 7vw;

  --font-size: clamp(var(--size18), var(--scale), var(--size48));
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

// const Gradient = styled(Text)`
//   background-image: linear-gradient(var(--fancy-gradient));
//   background-size: 100% 100%;
//   animation: ${recursiveAnimation} 1000ms ease-out 5500ms both,
//     ${gradientAnimation} 1500ms ease-in-out 5500ms both;
// `;

// const Shadow = styled(Text)`
//   text-shadow: var(--welcome-shadow);
//   animation: ${recursiveAnimation} 1000ms ease-out 5500ms both,
//     ${shadowAnimation} 700ms ease-in-out 5800ms both;
// `;

const Gradient = styled(Text)`
  background-image: linear-gradient(var(--fancy-gradient));
  background-size: 100% 100%;
  opacity: 0;
`;

const Shadow = styled(Text)`
  text-shadow: var(--welcome-shadow);
  opacity: 0;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  ${'' /* display: grid;
  place-items: center; */}

  --shadow-hue: 40;
  --layers: 7;
  --em: 0.008;

  --fancy-shadow: ${getTextShadow(7, 'var(--shadow-hue)', 0.008)};
  --fancy-gradient: var(--welcome-gradient);
`;

// const TextGradient = forwardRef((props, ref) => {
//   return (
//     <>
//       <Gradient {...props} ref={ref}>
//         {props.children}
//       </Gradient>
//     </>
//   );
// });

// const TextShadow = forwardRef((props, ref) => {
//   return (
//     <>
//       <Shadow {...props} ref={ref}>
//         {props.children}
//       </Shadow>
//     </>
//   );
// });

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

const ShadowGradient = forwardRef((props, ref) => {
  const ref1 = useRef();
  const ref2 = useRef();
  // const context = useContext(ThemeContext);
  // const [ hasStarted, setHasStarted ] = useState(false);
  const isFinished = props.isFinished;

  useEffect(() => {
    if (props.animationTiming && !isFinished) {
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
  }, [ props, isFinished ]);

  // useEffect(() => {
  //   if (props.isFinished && !hasStarted) {
  //     setHasStarted(true);
  //     const delay = context.cookieExists ? 3300 : 4200;
  // ref1.current.animate(shadowAnimation, { ...timing });
  // ref2.current.animate(gradientAnimation, { ...timing });
  //   }
  // }, [ props, hasStarted, context.cookieExists ]);

  return (
    <Wrapper ref={ref}>
      <Shadow ref={ref1}>{props.children}</Shadow>
      <Gradient ref={ref2}>{props.children}</Gradient>
    </Wrapper>
  );
});

ShadowGradient.displayName = 'ShadowGradient';
// TextShadow.displayName = 'TextShadow';

export default ShadowGradient;
