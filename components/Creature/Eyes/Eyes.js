// import Eye from './Eye';
import styled from 'styled-components';
import { NormalEye, RedEye } from './Eye';
import { useEye } from '@hooks/useEye';
// import { lookAround } from '@animations/index.js';

function withEyes(Component) {
  return function MakeEyes({ ...props }) {
    const margin = useEye(props);
    props.eyelidMargin = margin;
    return (
      <Container>
        <Component {...props} />
        <Component {...props} />
      </Container>
    );
  };
}

export const NormalEyes = withEyes(NormalEye);
export const RedEyes = withEyes(RedEye);

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: max(16px, 7%);
`;

// import { lookAround, lookAround2 } from '@animations/index';
// import { useEye } from '@hooks/useEye';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: max(16px, 7%);
// `;

// const EyeWrapper = styled.div`
//   --unit: 16px;
//   --double: calc(var(--unit) * 2);
//   --half: calc(var(--unit) * 0.5);
//   --more: calc(var(--unit) * 1.5);
//   --borderRadius: var(--double) var(--double) var(--half) var(--half);
//   --padding: calc(((var(--cube-width) / 6) + (var(--cube-height) / 6)) / 2);
//   /* margin-bottom: var(--eye-margin); */
// `;

// const EyeWhite = styled.div`
//   padding: 3.2rem;
//   box-shadow: 0 0 0 1px black;
//   overflow: hidden;
//   isolation: isolate;
//   justify-self: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   border-radius: var(--borderRadius);
//   padding: var(--padding, 16px);
//   background: whitesmoke;
//   position: relative;

//   transition: all var(--speed) linear;
// `;

// // const RedEye = styled(EyeWhite)`
// //   background: hsl(0deg, 15%, 75%, 1);
// // `;

// // export const Eyeball = ({ ...props }) => {
// //   // console.log({ eyeball: props });
// //   return (
// //     <EyeWrapper {...props}>
// //       <EyeWhite {...props}>{props.children}</EyeWhite>
// //     </EyeWrapper>
// //   );
// // };

// export const Cornea = styled(EyeWhite)`
//   background: var(--eyeColor);
//   position: absolute;
//   margin: auto;
//   border-radius: 50%;
//   padding: 10%;
//   max-height: 40%;
//   max-width: 40%;
//   height: 100%;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   aspect-ratio: 1 / 1;
// `;

// export const Pupil = styled(Cornea)`
//   background: black;
//   height: 40%;
//   width: 40%;
//   transition: all 10s linear;
// `;

// export const Eyelid = styled(EyeWhite)`
//   background: ${(p) => p.eyelidColor || 'tan'};
//   z-index: 999;
//   position: absolute;
//   margin-top: var(--eyelid, -250%);
//   width: 200%;
//   height: 200%;
//   transition: margin-top 70ms linear;
// `;

// // export const Color = ({ ...props }) => {
// //   const color = props.hue ?? props.color ?? `hsl(210, 35%, 65%)`;
// //   const background = typeof color === 'number' ? `hsl(${color}, 35%, 65%)` : color;
// //   return (
// //     <Cornea style={{ '--background': background }} {...props}>
// //       <Pupil />
// //     </Cornea>
// //   );
// // };

// // export const AwkwardEyes = styled(Color)`
// //   background: ${(p) => p.eyeColor || 'hsl(195deg, 35%, 65%)'};
// //   animation: ${lookAround} 30000ms ease-in 4000ms infinite alternate;
// // `;

// // export const AwkwardEyes2 = styled(Color)`
// //   background: ${(p) => p.eyeColor || 'hsl(195deg, 35%, 65%)'};
// //   animation: ${lookAround2} 30000ms ease-in 6000ms infinite alternate;
// // `;

// // const withEyes = (Component) => (props) => {
// //   console.log({ withEyes: props });
// //   const margin = useEye(props);
// //   // console.log({ eyes: props });
// //   return (
// //     <Container>
// //       <Eyeball>
// //         <Component {...props} />
// //         <Eyelid {...props} margin={margin} />
// //       </Eyeball>
// //       <Eyeball>
// //         <Component {...props} />
// //         <Eyelid {...props} margin={margin} />
// //       </Eyeball>
// //     </Container>
// //   );
// // };

// // export default withEyes;

// function withEye(color) {
//   return function Eye({ ...props }) {
//     const margin = useEye(props);

//     return (
//       <Container {...props}>
//         <EyeWrapper color={color} {...props}>
//           <EyeWhite>
//             <Cornea style={{ '--eyeColor': color }}>
//               <Pupil />
//             </Cornea>
//             <Eyelid {...props} style={{ '--eyelid': `${margin}%` }} />
//           </EyeWhite>
//         </EyeWrapper>

//         <EyeWrapper color={color} {...props}>
//           <EyeWhite>
//             <Cornea style={{ '--eyeColor': color }}>
//               <Pupil />
//             </Cornea>
//             <Eyelid {...props} style={{ '--eyelid': `${margin}%` }} />
//           </EyeWhite>
//         </EyeWrapper>
//       </Container>
//     );
//   };
// }

// export const BlueEyes = withEye();

// // export const RedEyes = withEye(AwkwardEyes, 'hsl(0deg, 15%, 75%)');

// // console.log({ eyes: props });

// // const Eyeball = ({ ...props }) => {
// //   return (
// //     <Eye>
// //       <BlueEye {...props} />
// //       <Eyelid {...props} style={{ '--eyelid': `${55}px` }} />
// //     </Eye>
// //   );
// // };

// // function withEyeballs(OuterEye) {
// //   return function withInnerEye(InnerEye) {
// //     return function enhancedEye(props) {
// //       return (
// //         <Container>
// //           <OuterEye>
// //             <InnerEye {...props} />
// //             <Eyelid {...props} />
// //           </OuterEye>
// //           <OuterEye>
// //             <InnerEye {...props} />
// //             <Eyelid {...props} />
// //           </OuterEye>
// //         </Container>
// //       );
// //     };
// //   };
// // }

// // function withEyes(OuterComponent) {
// //   return function OuterEye(InnerComponent) {
// //     return function InnerEye(props) {
// //       return (
// //         <Container {...props}>
// //           <OuterComponent {...props}>
// //             <InnerComponent {...props}>{props.children}</InnerComponent>
// //           </OuterComponent>
// //           <OuterComponent {...props}>
// //             <InnerComponent {...props}>{props.children}</InnerComponent>
// //           </OuterComponent>
// //         </Container>
// //       );
// //     };
// //   };
// // }

// // const ShockedEyes = styled(Eye)`
// //   animation: ${eyesWide} 4000ms linear 4000ms both;
// // `;

// // const RedEye = styled(Eye)`
// //   background: hsl(0deg, 15%, 75%, 1);
// // `;

// // const Eyeball = ({ ...props }) => {
// //   return (
// //     <Eye>
// //       <Cornea {...props}>
// //         <Pupil />
// //       </Cornea>
// //       <Eyelid {...props} style={{ '--eyelid': `${props.margin}%` }} />
// //     </Eye>
// //   );
// // };

// // function HOF(Component) {
// //   return function EyeComponent(props) {
// //     <Eye>
// //       <Component>
// //         <Pupil />
// //       </Component>
// //       <Eyelid {...props} style={{ '--eyelid': `${props.margin}%` }} />
// //     </Eye>;
// //   };
// // }

// // const NormalEyes = HOF();

// // const Eyes = (props) => {
// //   const margin = useEye(props);
// //   return (
// //     <Container {...props}>
// //       <Eyeball margin={margin} {...props} />
// //       <Eyeball margin={margin} {...props} />
// //     </Container>
// //   );
// // };

// // const withEyes = (White) => {
// //   return function (Blue) {
// //     return function (Overlay = Eyelid) {
// //       return function (props) {
// //         const margin = useEye(props);
// //         return (
// //           <Container>
// //             <White>
// //               <Blue {...props} />
// //               <Overlay {...props} style={{ '--eyelid': `${margin}%` }} />
// //             </White>
// //             <White>
// //               <Blue {...props} />
// //               <Overlay {...props} style={{ '--eyelid': `${margin}%` }} />
// //             </White>
// //           </Container>
// //         );
// //       };
// //     };
// //   };
// // };

// // export const Wide = withEyes(ShockedEyes)(BlueEye)
// // export const Normal = withEyes(BlueEye);
// // export const Shifty = withEyes(AwkwardEyes);
// // export const Shifty2 = withEyes(AwkwardEyes2);
// // export const Blink = withEyes(BlinkEyes)(BlueEye)();
// // export const Closed = withEyes(Eye)(BlueEye);
// // export const Closed = withEyes(Eye)(BlueEye)(EyelidClosed);
// // export const Baked = withEyes(RedEye)(HalfOpen);

// //  translateX(0%);
// //  translateX(0%);
// //  translateX(0%);

// // [ '0%', '45%', '0%', '0%', '-24%', '0%', '0%', '-37%', '0%', '0%', '0%', '0%' ],
// //   [
// //     0,
// //     0.03,
// //     0.04,
// //     0.09,
// //     0.1,
// //     0.16,
// //     0.22,
// //     0.29,
// //     0.3,
// //     0.36,
// //     0.37,
// //     0.45,
// //     0.55,
// //     0.6,
// //     0.61,
// //     0.68,
// //     0.69,
// //     0.74,
// //     0.89,
// //     0.96,
// //     0.98,
// //     0.99,
// //     1,
// //   ]

// // [(0.17, 0.21, 0.46, 0.54, 0.75, 0.79, 0.8, 0.83, 0.84, 0.88)];
