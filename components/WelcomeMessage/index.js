import { useMediaQuery } from '@hooks/useMediaQuery';
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { WelcomeGradient, WelcomeShadow } from './WelcomeMessage';

export default function WelcomeMessage({ ...props }) {
  const shadowRef = useRef();
  const gradientRef = useRef();
  const context = useContext(ThemeContext);
  const prefersReducedMotion = useMediaQuery({ prefersReducedMotion: 'reduce' });
  const [ reduceMotion, setReduceMotion ] = useState(null);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion);
  }, [ prefersReducedMotion ]);

  return (
    <Wrapper>
      <MessageShadow
        prefersReducedMotion={reduceMotion}
        context={context}
        ref={shadowRef}
        {...props}
      >
        {props.children}
      </MessageShadow>
      <MessageGradient
        prefersReducedMotion={reduceMotion}
        context={context}
        ref={gradientRef}
        {...props}
      >
        {props.children}
      </MessageGradient>
    </Wrapper>
  );
}

const MessageShadow = forwardRef((props, ref) => {
  const context = props.context;
  const shouldAnimate = props.animate;
  const prefersReducedMotion = props.prefersReducedMotion;

  useEffect(() => {
    if (!context.hasRun && shouldAnimate && !prefersReducedMotion) {
      // const animation = ref.current.animate(shadowFrames, options);
      // console.log(animation);
      context.setHasRun(true);
    }
  }, [ context, shouldAnimate, prefersReducedMotion ]);

  return (
    <>
      <WelcomeShadow {...props} ref={ref}>
        {props.children}
      </WelcomeShadow>
    </>
  );
});

const MessageGradient = forwardRef((props, ref) => {
  const context = props.context;
  const shouldAnimate = props.animate;
  const prefersReducedMotion = props.prefersReducedMotion;

  useEffect(() => {
    if (!context.hasRun && shouldAnimate && !prefersReducedMotion) {
      // const animation = ref.current.animate(gradientFrames, options);
      // console.log(animation);
      context.setHasRun(true);
    }
  }, [ context, shouldAnimate, prefersReducedMotion ]);

  return (
    <>
      <WelcomeGradient {...props} ref={ref}>
        {props.children}
      </WelcomeGradient>
    </>
  );
});

const Wrapper = styled.div`
  color: transparent;
  text-align: center;
  align-self: start;
  padding-bottom: calc(var(--breathing-room) * 2);
`;

MessageShadow.displayName = 'MessageShadow';
MessageGradient.displayName = 'MessageGradient';
