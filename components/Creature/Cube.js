/* eslint-disable react/display-name */
import React, { useContext, useEffect, useRef, forwardRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { getWalkingAnimation } from './utils';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { breakpoints } from '@constants/index';

import { SmallHair, MediumHair, LargeHair, HugeHair, DumbHair } from './Svg';

import Side, { CircleSide, CubeSide, SphereSide } from './Side';

import * as Face from './Face';

const Cuboid = styled.div`
  --mouth-padding: 2px;
  --eye-margin: calc(var(--mouth-padding) * -1);
  --mouth-radius: '4px 4px 4px 4px';

  --x: ${(p) => p.x || 0}deg;
  --y: ${(p) => p.y || 0}deg;

  width: var(--cube-width);
  height: var(--cube-height);
  transform-style: preserve-3d;
  margin-bottom: clamp(-120px, 5vw, 0);

  position: relative;
  z-index: -99;
  perspective: var(--perspective);
  transform: translateX(var(--translateX)) translateY(var(--translateY))
    rotateX(var(--rotateX)) rotateY(var(--rotateY)) rotateZ(var(--rotateZ))
    translateZ(var(--translateZ));

  width: var(--cube-width);
  height: var(--cube-height);

  transition: var(--transition);
`;

const StaticCube = styled(Cuboid)`
  --cube-width: 150px;
  --cube-height: 150px;
  --cube-depth: 50px;
  transform: ${(p) =>
    p.theme.hasRun ? 'translateX(0px) rotateY(-15deg) rotateX(-3deg)' : undefined};
`;

const Globe = styled(Cuboid)`
  position: relative;
  z-index: -99;
  transform: translateX(var(--translateX)) translateY(var(--translateY))
    rotateX(var(--rotateX)) rotateY(var(--rotateY)) rotateZ(var(--rotateZ))
    translateZ(var(--translateZ));
  transition: all var(--speed) linear;
`;

const GlobeContainer = React.forwardRef((props, ref) => {
  return (
    <Globe ref={ref} {...props}>
      {props.children}
    </Globe>
  );
});

const animateCube = (ref, context, props, isMobile) => {
  if (ref && ref.current && !context.hasRun) {
    const elem = ref.current;
    // console.log({ start: props.startX, stop: props.stopX });
    const start = props.startX;
    const stop = isMobile ? 0 : props.stopX * -1 + 24;
    const duration = isMobile ? 4000 : 8000;

    const setStepAmount = getWalkingAnimation(start, stop, isMobile);
    const setAngles = setStepAmount(20);
    const transform = setAngles(5, -65);

    const animation = elem.animate({ transform }, { duration, fill: 'both' });

    animation.pause();
    animation.ready.then(() => animation.play());
    // animation.commitStyles();
    animation.onfinish = () => {
      // animation.currentTime = 0;
      animation.pause();

      context.setHasRun(true);
      if (props.repeat) {
        setTimeout(() => {
          animation.play();
        }, 400);
      }
    };
  }
};

const CuboidWalking = ({ ...props }) => {
  const ref = useRef();
  const context = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });

  useEffect(() => {
    animateCube(ref, context, props, isMobile);
  }, [ props, context, isMobile ]);

  return <StaticCube ref={ref}>{props.children}</StaticCube>;
};

// function withCube(Cuboid) {
//   return function getFace(Face) {
//     return function getHair(Hair) {
//       return forwardRef((props, ref) => {
//         return (
//           <Cuboid startX={props.startX} ref={ref} {...props}>
//             {Array.from({ length: 7 }, (_, i) => {
//               return i === 4 || i === 5 ? (
//                 <Side key={i} index={i + 1} />
//               ) : i === 6 ? (
//                 <Face key={i} {...props} />
//               ) : (
//                 <Hair {...props} key={i} index={i} />
//               );
//             })}
//           </Cuboid>
//         );
//       });
//     };
//   };
// }

const withCreature = (Container) => {
  return function getFace(Face) {
    return function getHair(Hair) {
      return React.forwardRef((props, ref) => {
        return (
          <Container ref={ref} {...props}>
            {Array.from({ length: 7 }, (_, i) => {
              return i === 4 || i === 5 ? (
                <Side key={i} index={i + 1} />
              ) : i === 6 ? (
                <Face {...props} key={i} />
              ) : (
                <Hair key={i} index={i} />
              );
            })}
          </Container>
        );
      });
    };
  };
};

const getTransform = (i, sides) => {
  const angle = (360 / sides / 2) * i;

  const rotateX = i % 2 === 0 ? angle : 0;
  const rotateY = i % 2 === 1 ? angle : 0;
  const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return { rotateX, rotateY, transform };
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay: 2, staggerChildren: 0 },
  },
  close: { opacity: 0 },
};

const side = {
  initial: { rotateX: 0, rotateY: 0 },
  animate: ({ i, s }) => {
    // i += 1;
    console.log(i, s);
    const angle = (720 / s) * i;
    // const hue = i % 2 === 0 ? 360 + angle : 360 - angle;
    const hue = (360 / s) * i;
    // const rotateX = i % 2 === 0 ? angle : 0;
    // const rotateY = i % 2 === 1 ? angle : 0;
    const rotateX = angle;
    const rotateY = angle;
    // const background = `hsl(${hue}deg, 100%, 50%)`;
    return {
      rotateX,
      rotateY,
      // background,
    };
  },

  exit: { rotateX: 0, rotateY: 0 },
};

// const withShape = (Container) => {
//   return function getSide(Side) {
//     return forwardRef(({ sides, ...props }, ref) => {
//       const length = Container === GlobeContainer ? sides : 6;
//       console.log({ length });
//       return (
//         <Container
//           variants={container}
//           initial="hidden"
//           animate="show"
//           exit="close"
//           {...props}
//           ref={ref}
//         >
//           {Array.from({ length }, (_, i) => {
//             return (
//               <Side variants={side} sides={sides} index={i + 1} {...props}>
//                 {i + 1}
//               </Side>
//             );
//           })}
//         </Container>
//       );
//     });
//   };
// };

export const Sphere = forwardRef((props, ref) => {
  return (
    <Cuboid
      ref={ref}
      variants={container}
      initial="hidden"
      animate="show"
      exit="close"
      {...props}
    >
      {Array.from({ length: props.sides }, (_, i) => {
        return (
          <CircleSide key={i} i={i} {...props}>
            {props.children}
          </CircleSide>
        );
      })}
    </Cuboid>
  );
});

export const Cube = withCreature(Cuboid)(Face.Shifty)(HugeHair);

// export const Sphere = withShape(Globe)(Side);

// hue={hue}
// i={i}
// key={i}
// index={i + 1}
// sides={sides}
// transform={transform}
// transition={{ duration: props.speed }}
// initial={{ opacity: 0, scale: 0, background: 'transparent' }}
// animate={{
//   rotateX,
//   rotateY,
//   background: `hsl(${hue}deg, 100%, 50%)`,
//   opacity: 1,
//   scale: 1,
//   transition: { delay: 0 },
// }}
// {...props}
// exit={{ background: 'transparent' }}

// export const walking = {
//   normal: withCube(CuboidWalking)(Face.Normal),
//   shifty: withCube(CuboidWalking)(Face.Shifty),
//   frowning: withCube(CuboidWalking)(Face.Frowning),
//   talking: withCube(CuboidWalking)(Face.Talking),
//   baked: withCube(CuboidWalking)(Face.HalfBaked),
//   smiling: withCube(CuboidWalking)(Face.Smiling),
//   smirking: withCube(CuboidWalking)(Face.Smirking),
//   ShiftySmirk: withCube(CuboidWalking)(Face.ShiftySmirking),
//   shocked: withCube(CuboidWalking)(Face.Shocked),
//   sleeping: withCube(CuboidWalking)(Face.Sleeping),
// };

// export const hiding = {
//   normal: withCube(CuboidHiding)(Face.Normal),
//   shifty: withCube(CuboidHiding)(Face.Shifty),
//   frowning: withCube(CuboidHiding)(Face.Frowning),
//   talking: withCube(CuboidHiding)(Face.Talking),
//   baked: withCube(CuboidHiding)(Face.HalfBaked),
//   smiling: withCube(CuboidHiding)(Face.Smiling),
//   smirking: withCube(CuboidHiding)(Face.Smirking),
//   shocked: withCube(CuboidHiding)(Face.Shocked),
//   sleeping: withCube(CuboidHiding)(Face.Sleeping),
// };

// export const Sphere = withShape(GlobeContainer)(CircleSide);
// export const Sphere = withShape(SphereShape);
// export const Cube = withShape(CubeShape);
// export const Cube = withCube(Cuboid)(Face.ShiftySmirking)(HugeHair);
export const Creature404 = withCreature(StaticCube)(Face.Shifty)(SmallHair);
export const CreatureHero = withCreature(CuboidWalking)(Face.ShiftySmirking)(SmallHair);

// export const shape = {
//   Sphere,
//   Cube,
// };

// export const standing = {
//   normal: withCube(StaticCube)(Face.Normal),
//   shifty: withCube(StaticCube)(Face.Shifty),
//   frowning: withCube(StaticCube)(Face.Frowning),
//   talking: withCube(StaticCube)(Face.Talking),
//   baked: withCube(StaticCube)(Face.HalfBaked),
//   smiling: withCube(StaticCube)(Face.Smiling),
//   smirking: withCube(StaticCube)(Face.Smirking),
//   shocked: withCube(StaticCube)(Face.Shocked),
//   sleeping: withCube(StaticCube)(Face.Sleeping),
//   // controls: withShape(CuboidControls)(Side),
//   slow: withCube(StaticCube)(Face.Slow),
// };

// export const WalkingCube = withCube(CuboidWalking)(Face.Shifty);
// export const HidingCube = withCube(CuboidHiding)(Face.Blinking);

// export const StaticCube = withCube(CuboidCentered)(Face.Normal);
// export const StonedCube = withCube(CuboidWalking)(Face.HalfBaked);
// export const Frameoid = withCube(Cuboid)(Face.Normal);
// export const NervousCube = withCube(CuboidCentered)(Face.Shifty);
