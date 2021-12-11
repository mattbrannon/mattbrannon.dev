import { InvertedButton } from '@components/Button';
import { springDown, springUp } from '@constants';
import { useMediaQuery } from '@hooks/useMediaQuery';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';

const remove = keyframes`
  to {
    clip-path: circle(0% at 50% 50%);  
  }
`;

const drawCircle = keyframes`
  from {
    clip-path: circle(0% at 50% 50%);
  }
  to {
    clip-path: circle(16px at 50% 50%);
  }  
`;

const fadeInButton = keyframes`
  from {
    color: transparent;
    text-shadow: 1px 1px 2px transparent;
  }
  to {
    color: white;
    text-shadow: 1px 1px 2px black;
  }
`;

const shiftUp = keyframes`
  from {
    transform:  translate(0, 0);
  }
  to {
    transform:  translate(0, -250%);
  }
`;

const reveal = keyframes`
  from {
    clip-path: circle(16px at 50% 50%);
  }
  to {
    clip-path: circle(100% at 50% 50%);
  }
`;

const closeGap = keyframes`
  to {
    width: 4px;
  }
`;

export default function Buttons({ cardDimensions }) {
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const gap = 60;
  const [ firstPaint, setFirstPaint ] = useState(false);

  const [ position, setPosition ] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const isMobile = useMediaQuery({ maxWidth: 564 });
  const isSmall = useMediaQuery({ maxWidth: 503 });
  // const context = useContext(ThemeContext);

  const getPosition = (cardDimensions, bounds) => {
    const position = {
      x: bounds.x - cardDimensions.x,
      y: bounds.y - cardDimensions.y,
      width: bounds.width,
      height: bounds.height,
    };
    return position;
  };

  useEffect(() => {
    if (cardDimensions && !firstPaint) {
      setFirstPaint(true);
      const bounds = ref1.current.getBoundingClientRect();
      const position = getPosition(cardDimensions, bounds);
      setPosition(position);
    }
  }, [ cardDimensions, firstPaint ]);

  // useEffect(() => {
  //   if (!context.hasPlayed) {
  //     setTimeout(() => setGap(12), 3300);
  //     setTimeout(() => context.setHasPlayed(true), 9000);
  //   }
  // }, [ context.hasPlayed ]);

  return (
    <ButtonGroup>
      <ButtonContainer isSmall={isSmall} isMobile={isMobile} gap={gap} ref={ref0} index={0}>
        <Link passHref href="/contact">
          <ButtonWrapper index={0}>
            <Button index={0}>Contact Me</Button>
          </ButtonWrapper>
        </Link>
      </ButtonContainer>
      <CircleContainer
        isSmall={isSmall}
        isMobile={isMobile}
        position={position}
        ref={ref1}
        index={1}
      >
        <Circle position={position} isSmall={isSmall} isMobile={isMobile} gap={gap} />
      </CircleContainer>
      <ButtonContainer isSmall={isSmall} isMobile={isMobile} gap={gap} ref={ref2} index={2}>
        <Link passHref href="/apps">
          <ButtonWrapper index={2}>
            <Button index={2}>See my work</Button>
          </ButtonWrapper>
        </Link>
      </ButtonContainer>
    </ButtonGroup>
  );
}

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
  position: relative;
  isolation: isolate;
  justify-content: flex-end;

  @media (max-width: 564px) {
    justify-content: center;
    gap: 4px;
  }
  @media (max-width: 503px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
`;

const animateButtonContainer = (props) => {
  const x = props.index === 0 ? '-150%' : '150%';
  const y = 0;

  const moveCirclesHome = keyframes`
    from {
      transform: translate(var(--x), var(--y));
    }

    to {
      transform: translate(0, 0);
    }
  `;

  const moveInFromSides = keyframes`
    from {
      transform: translate(${x}, ${y});
    }
    to {
      transform: translate(0, 0);
    }
  `;

  const animation = css`
    ${moveCirclesHome} 1000ms  1000ms forwards;
  `;

  const mobileAnimation = css`
    ${moveInFromSides} 1000ms cubic-bezier(.04,.25,.19,.95) 1000ms forwards;
  `;

  return props.theme.hasPlayed ? undefined : props.isSmall ? mobileAnimation : animation;
};

const ButtonContainer = styled.div.attrs((props) => {
  const { isMobile, isSmall, index, gap } = props;
  const a = index === 0 ? 50 : -50;
  const b = index === 0 ? 3 : -3;
  const c = index === 0 ? gap / 2 : gap / -2;
  const xAxis = !isSmall
    ? isMobile
      ? `calc(${a}% + ${b}px)`
      : `calc(${a}% + ${c}px)`
    : index === 0
    ? '-200%'
    : '200%';

  // const xAxis = !isMobile
  //   ? `calc(${a}% + ${c}px)`
  //   : isMobile && !isSmall
  //   ? `calc(${a}% + ${b}px)`
  //   : isSmall
  //   ? index === 0
  //     ? '-150%'
  //     : '150%'
  //   : 0;

  const yAxis = !isSmall ? 0 : `calc(${a}% + ${b}px)`;

  return {
    style: {
      '--x': props.theme.hasPlayed ? 0 : xAxis,
      '--y': props.theme.hasPlayed ? 0 : yAxis,
    },
  };
})`
  position: relative;
  transform: translate(var(--x), var(--y));
  animation: ${(p) => animateButtonContainer(p)};
`;

const animateCircleContainer = (props) => {
  const position = props.position;
  const n = position ? position.x - (120 - position.width) : null;
  const j = position ? position.y - (120 - position.height) : null;
  const stopX = `${n * -1}px`;
  const stopY = `${j * -1}px`;

  const moveLeft = keyframes`
    to {
      transform: translateX(${stopX}); 
    }
  `;

  const moveUp = keyframes`

    to {
      transform: translate(-50%, ${stopY});
    }
  `;

  const animationLeft = css`
    ${moveLeft} 800ms cubic-bezier(.52,-0.51,1,-0.09) 2400ms forwards;
  `;

  const animationUp = css`
    ${'' /* ${bounce} 1800ms ${springUp} 2000ms forwards, */}
    ${moveUp} 800ms cubic-bezier(.52,-0.2, 0.8,-0.09) 2400ms forwards;
  `;

  return props.isMobile || props.isSmall ? animationUp : animationLeft;
};

const CircleContainer = styled.div`
  animation: ${(p) => animateCircleContainer(p)};
  @media (max-width: 564px) {
    position: relative;
  }
`;

const animateCircle = (props) => {
  // const position = props.position;
  // const n = position ? position.y - (120 - position.height) : null;

  const desktop = css`
    ${drawCircle} 800ms linear 0ms forwards,
    ${shiftUp} 800ms cubic-bezier(1, -1, 0.25, 2) 1500ms forwards,
    ${remove} 500ms ${springDown} 3300ms forwards,
    ${closeGap} 1000ms ease 3500ms forwards;
  `;

  const mobile = css`
    ${drawCircle} 800ms linear 0ms forwards,
    ${remove} 500ms ${springDown} 3300ms forwards,
    ${closeGap} 1000ms ease 3500ms forwards;

    ${
      '' /* ${sendUp} 800ms ${springUp} 1500ms forwards,
    ${sendDown} 500ms ease-in-out 2300ms forwards,
    ${upupup} 500ms ${springUp} 2800ms forwards,
    ${remove} 500ms ${springDown} 3300ms forwards; */
    }
  `;

  const small = css`
    ${drawCircle} 200ms linear 2000ms both,
    ${remove} 500ms ${springDown} 3300ms forwards,
    ${closeGap} 1000ms ease 3500ms forwards;


    ${
      '' /* ${sendUpSmall} 800ms ${springUp} 1000ms forwards,
    ${sendUpSmall} 500ms ${springDown} 2000ms forwards reverse,
    ${remove} 500ms ${springDown} 3300ms forwards; */
    }
    ${'' /* ${backUp} 800ms ${springUp} 4000ms forwards; */}
  `;

  return props.theme.hasPlayed
    ? undefined
    : props.isSmall
    ? small
    : props.isMobile
    ? mobile
    : desktop;
};

const Circle = styled.div`
  --circleSize: ${(p) => (p.theme.hasPlayed ? '0%' : '16px')};
  width: ${(p) => (p.theme.hasPlayed ? '12px' : p.gap + 'px')};
  height: 100%;
  background: var(--tealBg);
  clip-path: circle(0% at 50% 50%);

  animation: ${(p) => animateCircle(p)};
  transition: width 1000ms ease;

  @media (max-width: 564px) {
    position: absolute;
    transform: translate(-50%, 0);
  }

  @media (max-width: 503px) {
    position: absolute;
    width: 60px;
    height: 60px;

    transform: translate(-50%, calc(-100% + 3px));
  }
`;

const animateButton = (props) => {
  const animation = css`
    ${drawCircle} 1000ms linear 0ms forwards,
    ${reveal} 1000ms ${springUp} 3300ms forwards,
    ${fadeInButton} 2000ms ${springUp} 3300ms both;
  `;
  return props.theme.hasPlayed ? undefined : animation;
};

export const Button = styled(InvertedButton).attrs((props) => {
  const tabIndex = props.flag ? -1 : undefined;
  const textColor = props.theme.hasPlayed ? 'white' : 'transparent';
  const color = props.flag ? 'transparent' : textColor;
  const background = props.index === 0 ? 'red' : props.index === 1 ? 'blue' : 'green';
  return {
    tabIndex,
    style: {
      '--textColor': color,
      '--background': background,
    },
  };
})`
  --fluid-size: calc(2vw + 0.5rem);
  --button-font-size: clamp(var(--size12), 2vw + 0.5rem, var(--size20));
  --button-font-size: clamp(0.25rem, 6.7vw - 1rem, var(--size24));
  --button-font-size-fallback: max(var(--size12) min(var(--fluid-size), var(--size20)));

  font-size: var(--button-font-size);
  text-shadow: 1px 1px 2px black;
  color: white;

  animation: ${(p) => animateButton(p)};

  @supports not (font-size: var(--button-font-size)) {
    font-size: var(--button-font-size-fallback);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  min-width: 180px;
  position: relative;
`;
