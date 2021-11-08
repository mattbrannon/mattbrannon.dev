import { forwardRef, useEffect, useContext, useRef, useState } from 'react';
import { gradientFrames, shadowFrames, options } from './animations';
import { WelcomeGradient, WelcomeShadow } from './WelcomeMessage';
import styled, { ThemeContext } from 'styled-components';
// import Spacer from '../Spacer';
// import { FullBleed } from '../Layout';
import { useWindowSize } from '../../hooks/useWindowSize';

export default function WelcomeMessage({ ...props }) {
  const shadowRef = useRef();
  const gradientRef = useRef();
  const context = useContext(ThemeContext);
  const windowSize = useWindowSize();
  const [ max, setMax ] = useState(0);

  useEffect(() => {
    setMax(windowSize.width);
  }, [ windowSize ]);

  return (
    <Wrapper>
      <MessageShadow max={max} context={context} ref={shadowRef} {...props}>
        {props.children}
      </MessageShadow>
      <MessageGradient max={max} context={context} ref={gradientRef} {...props}>
        {props.children}
      </MessageGradient>
    </Wrapper>
  );
}

const MessageShadow = forwardRef((props, ref) => {
  const context = props.context;

  useEffect(() => {
    if (!context.hasRun) {
      ref.current.animate(shadowFrames, options);
      // context.setHasRun(true);
    }
  }, [ context ]);

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

  useEffect(() => {
    if (!context.hasRun) {
      ref.current.animate(gradientFrames, options);
      // context.setHasRun(true);
    }
  }, [ context ]);

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
  padding-top: var(--breathing-room);
  ${'' /* margin: 0 auto; */}
`;

MessageShadow.displayName = 'MessageShadow';
MessageGradient.displayName = 'MessageGradient';
