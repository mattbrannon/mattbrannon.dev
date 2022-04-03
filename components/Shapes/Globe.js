import { makeGradient } from '@utils/helpers.js';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { Shape } from './Shape';
// import { loadFeatures } from '@utils/helpers.js';

// export const getColors = (props, hue, i) => {
//   const { color, backgroundType, state } = props;

//   const h = state.sides * i;

//   const gradientColorStart = `hsl(${h}deg, 100%, 50%)`;
//   const gradientColorEnd = `hsl(${h + h}deg, 100%, 50%)`;

//   const gradient = makeGradient({ gradientColorStart, gradientColorEnd });

//   const solidColor = color;

//   const linearGradient = gradient;
//   // const repeatingLinearGradient = gradient;

//   //`repeating-linear-gradient(${gradientStart}, ${gradientStop})`;

//   const repeatingLinearGradient = `repeating-linear-gradient(
//     180deg,
//     ${gradientColorStart} 0%,
//     ${gradientColorStart} 2%,
//     ${gradientColorEnd} 2%,
//     ${gradientColorEnd} 4%
//   )`;

//   const radialGradient = `radial-gradient(
//     ellipse at 50% 50%,
//     ${gradientColorStart} 0%,
//     ${gradientColorStart} 2%,
//     ${gradientColorEnd} 2%,
//     ${gradientColorEnd} 4%
//   )`;

//   const repeatingRadialGradient = `repeating-radial-gradient(
//     ellipse at 50% 50%,
//     ${gradientColorStart} 0%,
//     ${gradientColorStart} 2%,
//     ${gradientColorEnd} 2%,
//     ${gradientColorEnd} 4%
//   )`;

//   const conicGradient = `conic-gradient(
//     from ${180}deg at 0% 100%,
//     ${gradientColorStart},
//     ${gradientColorEnd},
//     ${gradientColorStart},
//     ${gradientColorEnd},
//     ${gradientColorStart}
//   )`;

//   const rainbow = `hsl(${hue}deg, 100%, 50%)`;
//   const transparent = 'transparent';

//   const background =
//     backgroundType === 'solid'
//       ? solidColor
//       : backgroundType === 'transparent'
//       ? transparent
//       : backgroundType === 'linear-gradient'
//       ? linearGradient
//       : backgroundType === 'repeating-linear-gradient'
//       ? repeatingLinearGradient
//       : backgroundType === 'radial-gradient'
//       ? radialGradient
//       : backgroundType === 'repeating-radial-gradient'
//       ? repeatingRadialGradient
//       : backgroundType === 'conic-gradient'
//       ? conicGradient
//       : backgroundType === 'rainbow'
//       ? rainbow
//       : null;

//   return background;
// };

const sideVariant = {
  hidden: ({ i, state }) => {
    return {
      rotateX: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      background: '#00000000',
      '--outline': '0px solid transparent',
      boxShadow: '0 0 0 0 transparent',
    };
  },
  show: ({ rotateX, rotateY, rotateZ, i, state, opacity, background }) => {
    const speed = state.speed;
    const delay = (i + 1) / state.sides;
    return {
      opacity: 1,
      rotateX,
      rotateY,
      background,
      '--outline': '2px solid black',
      boxShadow: '0 0 0 2px black',

      transition: {
        background: {
          // delay: i * 0.1,
          // duration: i * 0.1,
          delay: delay,
          duration: speed,
        },
        boxShadow: {
          delay: delay,
          duration: speed,
        },
        rotateX: {
          delay: delay,
          duration: speed,
        },
        rotateY: {
          delay: delay,
          duration: speed,
        },
        opacity: {
          delay: delay,
          duration: speed,
        },
      },
    };
  },
  close: ({ rotateX, rotateY, rotateZ, i, state, opacity, background }) => {
    const delay = (i + 1) / state.sides;
    const speed = state.speed;
    return {
      rotateX: 0,
      rotateY: 0,
      // boxShadow: '0 0 0 0 #00000000',
      opacity: 0,
      // background: '#00000000',
      outline: 'none',
      transition: {
        rotateX: {
          delay: delay,
          duration: speed,
        },
        rotateY: {
          delay: delay,
          duration: speed,
        },

        opacity: {
          delay: delay + 4,
          duration: speed,
        },
        background: {
          delay: delay + 4,
          duration: speed,
        },
        boxShadow: {
          delay: delay + 4,
          duration: speed,
        },
      },
    };
  },
};

const Globe = forwardRef(({ ...props }, ref) => {
  const { style, state, sides } = props;
  return (
    <Container style={style}>
      <RoundShape {...props}>
        <AnimatePresence>
          {Array.from({ length: sides }, (_, i) => {
            const hue = (360 / sides) * i;

            const background = `hsl(${hue} 100% 50% / ${props.opacity})`;
            const { rotateX, rotateY } = getTransform({ i, sides });
            const custom = { rotateX, rotateY, hue, i, state, background };

            return (
              <GlobeSide
                ref={ref}
                initial="hidden"
                animate="show"
                exit="close"
                variants={sideVariant}
                custom={custom}
                key={i}
              ></GlobeSide>
            );
          })}
        </AnimatePresence>
      </RoundShape>
    </Container>
  );
});

Globe.displayName = 'Globe';
export default Globe;

export const Container = styled.div`
  font-size: 32px;
  font-weight: 700;
  transform-style: preserve-3d;
  --eye-margin: calc(var(--mouth-padding) * -1);
`;

export const getTransform = ({ i, sides }) => {
  const angle = (360 / sides / 2) * i;

  const rotateX = i % 2 === 0 ? angle : 0;
  const rotateY = i % 2 === 1 ? angle : 0;
  const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return { rotateX, rotateY, transform, angle };
};

const RoundShape = styled(Shape)`
  /* transform: rotateX(24deg) rotateY(32deg) rotateZ(0deg); */

  perspective: var(--perspective);
  transform: translateX(var(--translateX)) translateY(var(--translateY)) rotateX(var(--rotateX))
    rotateY(var(--rotateY)) rotateZ(var(--rotateZ)) translateZ(var(--translateZ));

  transform-style: preserve-3d;

  width: var(--cube-width);
  height: var(--cube-height);

  transition: all var(--speed) linear;
`;

const GlobeSide = styled(motion.div).attrs((props) => {
  // console.log({ globeSide: props });
  return {
    style: {
      '--opacity': props.custom.state.opacity,
    },
  };
})`
  transform: var(--transform);
  position: absolute;
  background: var(--background);
  height: var(--cube-height);
  width: var(--cube-width);
  outline: var(--outline);
  opacity: var(--opacity);
  border-radius: 50%;
  box-shadow: 0 0 0 1px black;
  transition: all 2s linear;
  transform-style: preserve-3d;
`;