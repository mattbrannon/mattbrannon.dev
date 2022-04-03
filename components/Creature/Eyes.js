/* eslint-disable react/display-name */
import { lookAround, lookAround2 } from '@animations/index';
import { useEye } from '@hooks/useEye';
import styled from 'styled-components';

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  gap: max(16px, 7%);
`;

const ContainerWrapper = styled.div`
  --unit: 16px;
  --double: calc(var(--unit) * 2);
  --half: calc(var(--unit) * 0.5);
  --more: calc(var(--unit) * 1.5);
  --borderRadius: var(--double) var(--double) var(--half) var(--half);
  --padding: calc(((var(--cube-width) / 6) + (var(--cube-height) / 6)) / 2);
  margin-bottom: var(--eye-margin);
`;

const Template = styled.div`
  padding: 3.2rem;
  box-shadow: 0 0 0 1px black;
  overflow: hidden;
  isolation: isolate;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--borderRadius);
  padding: var(--padding, 16px);

  transition: all var(--speed) linear;
`;

export const Eye = styled(Template)`
  background: whitesmoke;
  position: relative;
`;

export const Eyeball = ({ ...props }) => {
  return (
    <ContainerWrapper {...props}>
      <Eye {...props}>{props.children}</Eye>
    </ContainerWrapper>
  );
};

export const Cornea = styled(Template)`
  background: var(--background);

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

export const Pupil = styled(Cornea)`
  background: black;
  height: 40%;
  width: 40%;
  transition: all 10s linear;
`;

export const EyelidWrapper = styled(Template)`
  background: var(--eyelidColor, tan);
  z-index: 999;
  position: absolute;
  margin-top: var(--eyelid, 60%);
  width: 200%;
  transition: margin-top 70ms linear;
`;

export const Eyelid = ({ ...props }) => {
  return <EyelidWrapper {...props} style={{ '--eyelid': `${props.margin}%` }} />;
};

export const HalfOpen = styled(Eyelid).attrs((props) => {
  const amount = props.style['--eyelid'].match(/\d+/g).join('');
  const marginTop = amount > 0 ? -120 : 0;
  return {
    style: {
      '--eyelid': `${marginTop}%`,
    },
  };
})`
  margin-top: var(--eyelid);
  transition: --eyelid var(--speed) linear;
`;

export const EyelidClosed = styled(Eyelid)`
  margin-top: 0;
`;

export const Color = ({ ...props }) => {
  const color = props.hue ?? props.color ?? `hsl(210, 35%, 65%)`;
  const background = typeof color === 'number' ? `hsl(${color}, 35%, 65%)` : color;

  return (
    <Cornea style={{ '--background': background }} {...props}>
      <Pupil />
    </Cornea>
  );
};

export const AwkwardEyes = styled(Color)`
  background: hsl(195deg, 35%, 65%);
  animation: ${lookAround} 30000ms ease-in 6000ms infinite alternate;
`;

export const AwkwardEyes2 = styled(Color)`
  animation: ${lookAround2} 30000ms ease-in 6000ms infinite alternate;
`;

const withEyes = (Component) => (props) => {
  const margin = useEye(props);
  return (
    <TopRow>
      <Eyeball>
        <Component {...props} />
        <Eyelid margin={margin} />
      </Eyeball>
      <Eyeball>
        <Component {...props} />
        <Eyelid margin={margin} />
      </Eyeball>
    </TopRow>
  );
};

export default withEyes;

// const Eyeball = ({ ...props }) => {
//   return (
//     <Eye>
//       <BlueEye {...props} />
//       <Eyelid {...props} style={{ '--eyelid': `${55}px` }} />
//     </Eye>
//   );
// };

// function withEyeballs(OuterEye) {
//   return function withInnerEye(InnerEye) {
//     return function enhancedEye(props) {
//       return (
//         <Container>
//           <OuterEye>
//             <InnerEye {...props} />
//             <Eyelid {...props} />
//           </OuterEye>
//           <OuterEye>
//             <InnerEye {...props} />
//             <Eyelid {...props} />
//           </OuterEye>
//         </Container>
//       );
//     };
//   };
// }

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

// const ShockedEyes = styled(Eye)`
//   animation: ${eyesWide} 4000ms linear 4000ms both;
// `;

// const RedEye = styled(Eye)`
//   background: hsl(0deg, 15%, 75%, 1);
// `;

// const Eyeball = ({ ...props }) => {
//   return (
//     <Eye>
//       <Cornea {...props}>
//         <Pupil />
//       </Cornea>
//       <Eyelid {...props} style={{ '--eyelid': `${props.margin}%` }} />
//     </Eye>
//   );
// };

// function HOF(Component) {
//   return function EyeComponent(props) {
//     <Eye>
//       <Component>
//         <Pupil />
//       </Component>
//       <Eyelid {...props} style={{ '--eyelid': `${props.margin}%` }} />
//     </Eye>;
//   };
// }

// const NormalEyes = HOF();

// const Eyes = (props) => {
//   const margin = useEye(props);
//   return (
//     <Container {...props}>
//       <Eyeball margin={margin} {...props} />
//       <Eyeball margin={margin} {...props} />
//     </Container>
//   );
// };

// const withEyes = (White) => {
//   return function (Blue) {
//     return function (Overlay = Eyelid) {
//       return function (props) {
//         const margin = useEye(props);
//         return (
//           <Container>
//             <White>
//               <Blue {...props} />
//               <Overlay {...props} style={{ '--eyelid': `${margin}%` }} />
//             </White>
//             <White>
//               <Blue {...props} />
//               <Overlay {...props} style={{ '--eyelid': `${margin}%` }} />
//             </White>
//           </Container>
//         );
//       };
//     };
//   };
// };

// export const Wide = withEyes(ShockedEyes)(BlueEye)
// export const Normal = withEyes(BlueEye);
// export const Shifty = withEyes(AwkwardEyes);
// export const Shifty2 = withEyes(AwkwardEyes2);
// export const Blink = withEyes(BlinkEyes)(BlueEye)();
// export const Closed = withEyes(Eye)(BlueEye);
// export const Closed = withEyes(Eye)(BlueEye)(EyelidClosed);
// export const Baked = withEyes(RedEye)(BlueEye)(HalfOpen);
