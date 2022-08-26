// import Side from './Sides';
// import { Shape } from './Shape';
// // import withEyes, * as Eyes from '@components/Creature/Eyes';
// // import { RedEyes } from '@components/Creature/Eyes';
// // import { RedEyes, NormalEyes } from '@components/Creature/Eyes';
// import Mouth from '@components/Creature/Mouth';
// import Eyes from '@components/Creature/Eyes';

// import styled from 'styled-components';
// // import {} from 'framer-motion';
// // import { loadFeatures, compose, pipe } from '@utils/helpers';
// import { forwardRef } from 'react';
// // import Walking from './Walking';
// // import { useRef } from 'react';
// // import { makeFrames } from '@components/Creature/utils';
// // import { makeClipPath } from '@utils/helpers';

// function withFace(EyesComponent) {
//   return function makeFace(MouthComponent, mouthFeatures) {
//     return function wrapper({ ...props }) {
//       const extended = { ...props, ...mouthFeatures };
//       console.log({ withFace: props });
//       console.log({ withFace: mouthFeatures });
//       return (
//         <Wrapper {...props}>
//           <EyesComponent {...props} />
//           <MouthComponent {...extended} />
//         </Wrapper>
//       );
//     };
//   };
// }

// // const ShockedMouth = styled(Mouth)`
// //   /* padding: 16px; */
// //   border-radius: 4px;
// //   min-width: 16px;
// //   width: 48px;
// //   height: 2px;
// //   padding: 0;
// // `;

// // const EyeComponent = withEyes(Eyes.HalfOpen);
// // const MouthComponent = withMouth(Mouth);
// // const EyeComponent = Eyes.RedEyes;
// const Face = withFace(Eyes.RedEyes)(Mouth.Smirking);
// const NormalFace = withFace(Eyes.NormalEyes)(Mouth.Smirking);

// function Cube(props, ref) {
//   // console.log('cube', props);
//   return (
//     <Shape ref={ref} {...props}>
//       {Array.from({ length: 7 }, (_, i) => {
//         const Component = i === 6 ? Face : Side;
//         return (
//           <Component
//             style={{ transformStyle: 'preserve-3d' }}
//             // hue={220}
//             i={i}
//             {...props}
//             custom={{ amount: 50 }}
//             key={i}
//           ></Component>
//         );
//       })}
//     </Shape>
//   );
// }

// function BasicCube(props, ref) {
//   console.log({ basicCube: props });
//   return (
//     <Shape ref={ref} {...props}>
//       {Array.from({ length: 7 }, (_, i) => {
//         const Component = i === 6 ? NormalFace : Side;
//         return (
//           <Component
//             style={{ transformStyle: 'preserve-3d' }}
//             // hue={220}
//             i={i}
//             {...props}
//             custom={{ amount: 50 }}
//             key={i}
//           ></Component>
//         );
//       })}
//     </Shape>
//   );
// }

// export const ForwardedCube = forwardRef(Cube);
// export const NormalCube = forwardRef(BasicCube);

// // eslint-disable-next-line react/display-name
// // export const ForwardedCube = forwardRef((props, ref) => {
// //   const EyeComponent = withEyes(Eyes[props.eyes]);
// //   const MouthComponent = withMouth(Mouth[props.mouth]);
// //   const Face = withFace(EyeComponent)(MouthComponent);

// //   return function Cube() {
// //     console.log({ props });
// //     return (
// //       <Shape ref={ref} {...props}>
// //         {Array.from({ length: 7 }, (_, i) => {
// //           const Component = i === 6 ? Face : Side;
// //           return <Component hue={220} i={i} {...props} key={i}></Component>;
// //         })}
// //       </Shape>
// //     );
// //   };
// // });

// // ForwardedCube.displayName = 'ForwardedCube';

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   align-items: center;
//   justify-content: space-evenly;
//   transform: translateZ(calc(var(--cube-depth) * 0.5));

//   transition: all var(--speed) linear;
// `;

// // const Wrapper = styled.div.attrs((props) => {
// //   const { size } = props;
// //   return {
// //     width: size.width + 'px',
// //   };
// // })`
// //   display: flex;
// //   flex-direction: column;
// //   height: 100%;
// //   align-items: center;
// //   justify-content: space-evenly;
// //   transform: translateZ(calc(var(--cube-depth) * 0.5));

// //   transition: all var(--speed) linear;

// // `;

// // function withSubscription(WrappedComponent) {
// //   class WithSubscription extends React.Component {
// //     /* ... */
// //   }
// //   WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
// //   return WithSubscription;
// // }

// // function getDisplayName(WrappedComponent) {
// //   return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// // }

// // export default function Cube({ eyes = 'Shifty', mouth = 'Smile', ...props }) {
// //   const Face = withFace(Eyes[eyes])(Mouth[mouth]);

// //   return (
// //     <Container {...props}>
// //
// //         <Shape {...props}>
// //           {Array.from({ length: 7 }, (_, i) => {
// //             const Component = i === 6 ? Face : Side;
// //             const hue = i === 0 ? 44 : (360 / 6) * i;
// //             return <Component {...props} style={{ '--hue': hue }} key={i} />;
// //           })}
// //         </Shape>
// //
// //     </Container>
// //   );
// // }

// // const Face = withFace(Eyes.Shifty)(Mouth.Talk);

// // const WalkingCube = forwardRef((props, ref) => {
// //   const padding = makeFrames(50);
// //   const margin = padding.map((str) => {
// //     str = str.replace(/(\d+\.\d+%)/g, '-$1');
// //     return str;
// //   });

// //   return (
// //     <Container {...props}>
// //
// //         <Walking ref={ref} {...props}>
// //           {Array.from({ length: 7 }, (_, i) => {
// //             const Component = i === 6 ? Face : Side;
// //             return (
// //               <Component
// //                 padding={padding}
// //                 margin={margin}
// //                 i={i}
// //                 {...props}
// //                 key={i}
// //               ></Component>
// //             );
// //           })}
// //         </Walking>
// //
// //     </Container>
// //   );
// // });

// // export const StandingCube = forwardRef((props, ref) => {
// //   // const ref = useRef();
// //   const eyes = props.eyes || 'Shifty';
// //   const mouth = props.mouth || 'Closed';

// //   const Face = withFace(Eyes[eyes])(Mouth[mouth]);
// //   return (
// //     <Container {...props}>
// //
// //         <Shape ref={ref} {...props}>
// //           {Array.from({ length: 7 }, (_, i) => {
// //             const Component = i === 6 ? Face : Side;
// //             const hue = i === 0 ? 44 : (360 / 6) * i;
// //             return <Component {...props} style={{ '--hue': hue }} key={i} />;
// //           })}
// //         </Shape>
// //
// //     </Container>
// //   );
// // });

// // StandingCube.displayName = 'StandingCube';

// // WalkingCube.displayName = 'WalkingCube';
// // export default WalkingCube;

// // const Wrapper = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   height: 100%;
// //   gap: min(32px, 25%);
// //   justify-content: center;
// //   transform: translateZ(calc(var(--cube-depth) * 0.5));
// //   /* transition: all var(--speed, 1s) linear; */
// // `;
