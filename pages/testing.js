import Card from '@components/Card';
import { Button } from '@components/Button';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// background: var(--basic-card-background);
// box-shadow: var(--card-shadow);

const variants = {
  button: {
    initial: (custom) => {
      return {
        clipPath: 'circle(0px at 50% 50%)',
        color: 'transparent',
        textShadow: 'none',
        background: 'teal',
        x: custom?.left ? `calc(100% + 16px)` : custom?.right ? `calc(-100% - 16px)` : 0,
      };
    },
    animate: {
      clipPath: 'circle(16px at 50% 50%)',
      x: 0,
      transition: {
        x: {
          delay: 0.75,
          duration: 0.75,
          ease: [ 0.09, 0.78, 0.3, 1.5 ],
        },
        clipPath: {
          duration: 0.25,
        },
      },
    },
  },
  circle: {
    // initial: {
    //   clipPath: 'circle(0px at 50% 50%)',
    // },
    // animate: {
    //   clipPath: 'circle(16px at 50% 50%)',
    //   // y: -120,
    //   transition: {
    //     clipPath: {
    //       duration: 0.25,
    //     },
    //     y: {
    //       delay: 2.25,
    //       duration: 0.75,
    //       type: 'spring',
    //       bounce: 5,
    //       damping: 10,
    //       ease: [ 1, -0.35, 1, 0.95 ],
    //     },
    //   },
    // },
  },
};

export default function Page() {
  return (
    <article
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div>
        <ButtonContainer>
          <MotionButton
            custom={{ left: true }}
            variants={variants.button}
            initial="initial"
            animate="animate"
          >
            Who am I
          </MotionButton>
          <MotionButton variants={variants.button} initial="initial" animate="animate">
            View my work
          </MotionButton>
          <MotionCircle variants={variants.circle} initial="initial" animate="animate" />
          <MotionButton
            custom={{ right: true }}
            variants={variants.button}
            initial="initial"
            animate="animate"
          >
            Get in touch
          </MotionButton>
        </ButtonContainer>
      </div>
    </article>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const MotionButton = styled(Button).attrs(({ right, left, center }) => {})`
  ${'' /* transition: all 2s linear; */}
  background: teal;
`;

const MotionCircle = styled(MotionButton)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  transform: translate(0, -90px);
  clip-path: circle(16px at 50% 50%);

  background: red;
`;
