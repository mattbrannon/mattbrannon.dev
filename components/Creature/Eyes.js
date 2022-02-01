/* eslint-disable react/display-name */
import { lookAround, eyesWide, lookAround2 } from '@animations/index';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { useEye } from '@hooks/useEye';
import { makeLookAround } from './utils';

const Template = styled(motion.div)`
  padding: 3.2rem;
  box-shadow: 0 0 0 1px black;
`;

const Container = styled(motion.div)`
  --unit: 16px;
  --double: calc(var(--unit) * 2);
  --half: calc(var(--unit) * 0.5);
  --more: calc(var(--unit) * 1.5);

  display: flex;
  gap: var(--half);
  width: 100%;
  justify-content: center;

  margin-bottom: var(--eye-margin);
`;

const Eye = styled(Template)`
  background: whitesmoke;
  position: relative;

  border-radius: var(--double) var(--double) var(--half) var(--half);

  top: 0;
  padding: calc(((var(--cube-width) / 6) + (var(--cube-height) / 6)) / 2);
  margin-bottom: var(--more);

  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  ${'' /* transition: all 1s linear; */}
`;

const Cornea = styled(Template)`
  background: hsla(240deg 35% 65% / 1);

  position: absolute;
  margin: auto;
  border-radius: 50%;

  padding: 10%;
  max-height: 40%;
  max-width: 40%;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1 / 1;
`;

const Pupil = styled(Cornea)`
  background: black;
  height: 40%;
  width: 40%;
`;

// const Dilated = styled(Pupil)`
//   height: 60%;
//   width: 60%;
// `;

const Eyelid = styled(Eye)`
  background: tan;
  background: hsl(34, 40%, 60%);
  z-index: 999;
  position: absolute;
  margin-top: var(--eyelid);
  transition: all 40ms linear;
`;

const HalfOpen = styled(Eyelid).attrs((props) => {
  const amount = props.style['--eyelid'].match(/\d+/g).join('');
  const marginTop = amount > 0 ? -35 : 0;
  return {
    style: {
      '--eyelid': `${marginTop}px`,
    },
  };
})`
  margin-top: var(--eyelid);
`;

const EyelidClosed = styled(Eyelid)`
  margin-top: 0;
`;

const BlueEye = ({ ...props }) => {
  return (
    <>
      <Cornea {...props}>
        <Pupil />
      </Cornea>
    </>
  );
};

// function withEyes(OuterComponent) {
//   return function OuterEye(InnerComponent) {
//     return function InnerEye(props) {
//       return (
//         <Container {...props}>
//           <OuterComponent {...props}>
//             <InnerComponent {...props}>{props.children}</InnerComponent>
//           </OuterComponent>
//           <OuterComponent {...props}>
//             <InnerComponent {...props}>{props.children}</InnerComponent>
//           </OuterComponent>
//         </Container>
//       );
//     };
//   };
// }

const AwkwardEyes = styled(BlueEye)`
  animation: ${lookAround} 30000ms ease-in 6000ms infinite alternate;
`;

const AwkwardEyes2 = styled(BlueEye)`
  animation: ${lookAround2} 30000ms ease-in 6000ms infinite alternate;
`;

const ShockedEyes = styled(Eye)`
  animation: ${eyesWide} 4000ms linear 4000ms both;
`;

const RedEye = styled(Eye)`
  background: hsl(0deg, 15%, 75%, 1);
`;

const withEyes = (White) => {
  return function (Blue) {
    return function (Overlay = Eyelid) {
      return function (props) {
        const margin = useEye(props);
        return (
          <Container>
            <White>
              <Blue {...props} />
              <Overlay {...props} style={{ '--eyelid': `${margin}px` }} />
            </White>
            <White>
              <Blue {...props} />
              <Overlay {...props} style={{ '--eyelid': `${margin}px` }} />
            </White>
          </Container>
        );
      };
    };
  };
};

export const Wide = withEyes(ShockedEyes)(BlueEye)();
export const Normal = withEyes(Eye)(BlueEye)();
export const Shifty = withEyes(Eye)(AwkwardEyes)();
export const Shifty2 = withEyes(Eye)(AwkwardEyes2)();
// export const Blink = withEyes(BlinkEyes)(BlueEye)();
// export const Closed = withEyes(Eye)(BlueEye);
export const Closed = withEyes(Eye)(BlueEye)(EyelidClosed);
export const Baked = withEyes(RedEye)(BlueEye)(HalfOpen);

export default withEyes;
