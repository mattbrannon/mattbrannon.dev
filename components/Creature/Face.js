import { lookAround } from '@animations';
import { motion, useTime, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styled, { keyframes } from 'styled-components/macro';

const shocked = keyframes`
  from {
    border-radius: 4px 4px 6px 6px;
    padding: 0px 0;
    margin: -6px 0;
    width: 70%;
  }
  to {
    border-radius: 18px 18px 14px 14px;
    padding: 12px 0;
    margin: -12px 0;
    width: 50%;
  }
`;

const smile = keyframes`
  from {
    border-radius: 4px 4px 6px 6px;
    padding: 0px 0;
    margin: -6px 0;
    width: 70%;
  }
  to {
    border-radius: 4px 4px 24px 24px;
    padding: 6px 0;
    margin: -6px 0;
    width: 70%;
  }
`;

export default function Face({ ...props }) {
  const ref = useRef();
  // const padding = useMotionValue('28px');
  // const x = useMotionValue(0);
  // const input = [ -200, 0, 200 ];
  // const output = [ 0, 1, 0 ];
  // const opacity = useTransform(x, input, output);
  // const time = useTime();
  // const padding = useTransform(
  //   time,
  //   [ 4100, 4200, 9100, 9250 ], // milliseconds
  //   [ '22px', '28px', '28px', '22px' ]
  // );

  const useGetAnimation = (milliseconds, values) => {
    const time = useTime();
    const padding = useTransform(time, milliseconds, values);
    return padding;
  };

  const padding = useGetAnimation(
    [ 4300, 4400, 9100, 9250 ],
    [ '22px', '27px', '27px', '22px' ]
  );

  return (
    <FaceContainer {...props}>
      <EyeContainer>
        <White style={{ padding }} {...props}>
          <Blue {...props}>
            <Pupil />
          </Blue>
        </White>
        <White style={{ padding }} {...props}>
          <Blue {...props}>
            <Pupil />
          </Blue>
        </White>
      </EyeContainer>
      <Mouth ref={ref} />
    </FaceContainer>
  );
}

const FaceBox = styled(motion.div)`
  padding: 3.2rem;
  box-shadow: 0 0 0 1px black;
  background: hsla(240deg 35% 65% / 1);
`;

const FaceContainer = styled.div`
  --depth: ${(p) => p.depth / 2}px;
  width: 100%;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: transparent;

  transform: rotateY(0deg) translateZ(var(--depth));
`;

const EyeContainer = styled(motion.div)`
  display: flex;
  gap: clamp(16px, 2vw, 92px);
  width: 100%;
  justify-content: center;
  ${'' /* transform-style: preserve-3d; */}
`;

const White = styled(FaceBox)`
  background: whitesmoke;
  position: relative;

  border-radius: 32px;
  border-top-left-radius: -8px;
  border-top-right-radius: -8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  top: 0;
  padding: 22px;
  margin-top: -4px;
  margin-bottom: 24px;

  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  ${'' /* animation: ${eyesWide} 5000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 4100ms; */}
`;

const Blue = styled(FaceBox)`
  background: hsla(240deg 35% 65% / 1);

  position: absolute;
  margin: auto;
  border-radius: 50%;

  padding: 10%;
  max-height: 40%;
  max-width: 40%;
  height: 100%;
  width: 100%;

  animation: ${lookAround} 30000ms ease-in 6000ms infinite alternate;
  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1 / 1;
`;

const Pupil = styled(Blue)`
  background: black;
  height: 40%;
  width: 40%;
`;

const Mouth = styled.div`
  width: 70%;
  min-height: 2px;
  max-height: 12px;
  background: #191919;
  border-radius: 8px 8px 24px 24px;
  padding: 0;

  --y1: 40%;
  --y2: 75%;

  --x1: 0%;
  --x2: 100%;

  --talking-start: polygon(
    var(--x1) var(--y1),
    var(--x2) var(--y1),
    var(--x2) var(--y2),
    var(--x1) var(--y2)
  );

  --y3: 10%;
  --y4: 45%;

  --talking-end: polygon(
    var(--x1) var(--y3),
    var(--x2) var(--y3),
    var(--x2) var(--y4),
    var(--x1) var(--y4)
  );

  animation: ${smile} 400ms ease 0ms forwards,
    ${smile} 2000ms linear 2000ms reverse forwards,
    ${shocked} 400ms ease-in-out 4150ms forwards,
    ${shocked} 700ms ease 6000ms reverse forwards;
`;

// .attrs((props) => {
//   return {
//     style: {
//       '--width': props.width + 'px',
//       '--height': props.height + 'px',
//     },
//   };
// })
