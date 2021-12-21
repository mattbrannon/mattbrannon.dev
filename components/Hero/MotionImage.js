import { breakpoints } from '@constants/';
import { useCookie } from '@hooks/useCookie';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { getFluidSizes } from '@utils/helpers';
import { LazyMotion, m as motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components/macro';
import StaticImage from './StaticImage';

const loadFeatures = () => import('@animations/features.js').then((res) => res.default);

const MotionImage = ({ showImage, ...props }) => {
  const hasCookie = useCookie('navigated')[0];
  const isMobile = useMediaQuery({ maxWidth: 564 });
  const isSmall = useMediaQuery({ maxWidth: 320 });
  const shouldLoadStatic = hasCookie || isMobile || isSmall;

  const overlay = {
    initial: {
      background: 'var(--tealBg)',
    },
    animate: {
      background: 'var(--transparent)',
      transition: {
        duration: 0.75,
      },
    },
  };

  const wrapper = {
    initial: {
      clipPath: 'circle(0%)',
    },
    animate: {
      clipPath: 'circle(100%)',
      transition: {
        duration: 0.75,
      },
    },
  };

  if (shouldLoadStatic) {
    return <StaticImage {...props} />;
  }
  else {
    return (
      <LazyMotion features={loadFeatures}>
        <ImageContainer {...props}>
          <ImageWrapper>
            <OverlayWrapper
              variants={wrapper}
              initial={wrapper.initial}
              animate={showImage && wrapper.animate}
            >
              <Image {...props} alt="photo of me" />

              <ImageOverylay
                variants={overlay}
                initial={overlay.initial}
                animate={showImage && overlay.animate}
              />
            </OverlayWrapper>
          </ImageWrapper>
        </ImageContainer>
      </LazyMotion>
    );
  }
};

const ImageContainer = styled.div.attrs(({ width, round }) => ({
  style: {
    '--clamp': getFluidSizes(width).clamp,
    '--max': getFluidSizes(width).fallback,
    '--radius': round ? '50%' : undefined,
  },
}))`
  float: left;
  shape-outside: circle();
  margin-right: 16px;
  margin-top: 16px;
  width: ${(p) => p.width}px;
  height: ${(p) => p.width}px;

  @media (max-width: ${breakpoints.mobile}px) {
    float: none;
    margin: 0 auto;
    margin-right: 0;
    margin-top: 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 100%;
  margin: 0 auto;
`;

export const OverlayWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
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
`;

export default MotionImage;

// const Image = styled.img`
//   position: absolute;
//   transform: translate(180px, 0);
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   display: block;
//   border-radius: 50%;
//   aspect-ratio: 1 / 1;
//   object-position: -30px 0px;
//   object-fit: cover;
//   animation: ${imageAnimation} 1000ms ease 1000ms both;
// `;

// const Image = styled(Picture)`
//   position: absolute;
//   display: block;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border-radius: 50%;
//   object-position: 30% 0px;
// `;

// const expand = (props) => {
//   const delay = props.cookieExists ? 300 : 3300;
//   const animation = css`
//     ${animations.expand} 1000ms ${springUp} ${delay}ms forwards;
//   `;
//   return animation;
// };

// const fadeOut = (props) => {
//   const delay = props.cookieExists ? 500 : 3500;
//   const animation = css`
//     ${animations.fadeOut} 300ms ${springUp} ${delay}ms both;
//   `;
//   return animation;
// };

// ${'' /* animation: ${(p) => expand(p)}; */}

// ${'' /* animation: ${(p) => fadeOut(p)}; */}
