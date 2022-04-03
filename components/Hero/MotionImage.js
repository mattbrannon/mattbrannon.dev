import { breakpoints } from '@constants/index';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';
import { forwardRef } from 'react';

const container = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

const image = {
  initial: ({ hasCookie }) => {
    return {
      clipPath: hasCookie ? 'circle(100%)' : 'circle(0%)',
    };
  },
  animate: ({ hasCookie }) => {
    return {
      clipPath: hasCookie ? 'circle(100%)' : 'circle(0%)',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    };
  },
};

const overlay = {
  initial: {
    background: '#000000',
  },
  animate: ({ hasCookie }) => {
    return {
      background: hasCookie ? '#00000000' : 'var(--tealBg)',
      transition: {
        duration: 0.5,
        delay: hasCookie ? 0.1 : 0,
        ease: 'easeOut',
      },
    };
  },
};

const MotionImage = forwardRef(({ hasCookie, ...props }, ref) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });

  return (
    <ImageContainer ref={ref} {...props}>
      <ImageWrapper variants={container} initial="initial" animate="animate">
        <OverlayWrapper
          variants={image}
          custom={{ hasCookie, isMobile }}
          initial="initial"
          animate="animate"
        >
          <Image {...props} alt="photo of me" />

          <ImageOverylay
            variants={overlay}
            custom={{ hasCookie, isMobile }}
            initial="initial"
            animate="animate"
          />
        </OverlayWrapper>
      </ImageWrapper>
    </ImageContainer>
  );
});

MotionImage.displayName = 'MotionImage';

const ImageContainer = styled(motion.div)`
  float: left;
  shape-outside: circle();
  margin-right: 32px;
  width: ${(p) => p.width}px;
  height: ${(p) => p.width}px;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  height: 0;
  width: 100%;
  padding-bottom: 100%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.mobile}px) {
    height: 100%;
    padding-bottom: 0;
    margin: unset;
  }
`;

export const OverlayWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;

  @media (max-width: ${breakpoints.mobile}px) {
    position: unset;
  }
`;

export const ImageOverylay = styled(motion.div)`
  position: absolute;
  background: var(--tealBg);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
  clip-path: circle(100% at 50% 50%);

  @media (max-width: ${breakpoints.mobile}px) {
    height: 100px;
    width: 100px;
    left: 50%;
    right: 50%;
    transform: translate(-50%);
  }
`;

export default MotionImage;
