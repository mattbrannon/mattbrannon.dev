import NextImage from 'next/image';
import styled, { keyframes, css } from 'styled-components';
import s from './image.module.css';
import { breakpoints } from '@constants/index';
import { getFluidSizes } from '@utils/helpers.js';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useCssVariable } from '@hooks/useCssVariable';
import { useEffect, useRef } from 'react';

function Picture({ sources, alt, ...props }) {
  const { sizes, types, name, folder } = sources;
  return (
    <picture>
      {types.map((type, i) => {
        const mediaType = `image/${type}`;
        const srcSet = sizes
          .map((size) => {
            return `${folder}/${name}-${size}.${type} ${size}w`;
          })
          .join(', ');
        return <source key={i} srcSet={srcSet} type={mediaType} />;
      })}
      <Image {...props} src={`${folder}/${name}.png`} alt={alt} />
    </picture>
  );
}

export const Image = styled.img`
  --radius: ${(p) => (p.rounded ? '50%' : undefined)};
  display: block;
  width: ${(p) => p.width + 'px' || '100%'};
  height: auto;
  object-fit: cover;
  border-radius: var(--radius);
  aspect-ratio: 1;
  object-position: -35px 0;

  @media (max-width: ${breakpoints.mobile}px) {
    object-position: -20px 0;
  }
`;

const ResponsiveContainer = styled.div`
  display: block;
  max-width: 200px;
  width: 200px;
  overflow: hidden;
  border-radius: 50%;
`;

export const ResponsiveImage = ({ ...props }) => {
  return (
    <ResponsiveContainer>
      <Image className={s.test} {...props} alt={props.alt} />
    </ResponsiveContainer>
  );
};

export const CardImage = ({ ...props }) => {
  return (
    <CardImageWrapper>
      <NextImage alt={props.alt} {...props} />
    </CardImageWrapper>
  );
};

const CardImageWrapper = styled.div`
  --shadow-color: #333;
  filter: drop-shadow(1px 3px 6px var(--shadow-color));
  &:hover {
    cursor: pointer;
  }
  @media (prefers-color-scheme: dark) {
    --shadow-color: #000;
  }
`;

export default Picture;

export const AnimatedImage = ({ ...props }) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const imageRef = useRef();
  const setPosition = useCssVariable('--object-position', '-35px 0', imageRef);

  useEffect(() => {
    if (isMobile) {
      setPosition('-20px 0');
    }
  }, [ isMobile, setPosition ]);

  const image = {
    initial: { clipPath: 'circle(0% at 50% 50%)', filter: 'blur(8px)' },
    animate: { clipPath: 'circle(100% at 50% 50%)', filter: 'blur(0px)' },
    transition: { delay: 0, duration: 1 },
  };

  const overlay = {
    initial: {
      clipPath: 'circle(50% at 50% 50%)',
      background: 'hsl(0, 0%, 16%, 1)',
      filter: 'blur(8px)',
    },
    animate: {
      clipPath: 'circle(0% at 50% 50%)',
      background: 'hsl(0, 0%, 16%, 0)',
      filter: 'blur(0px)',
    },
    transition: { delay: 0, duration: 1 },
  };

  return (
    <ImageContainer {...props}>
      <Wrapper>
        <ImageWrapper
          variants={image}
          initial={image.initial}
          animate={image.animate}
          transition={image.transition}
        >
          <Image src="/images/hero/hero.png" ref={imageRef} rounded {...props} alt="photo of me" />
          <ImageOverylay
            variants={overlay}
            initial={overlay.initial}
            animate={overlay.animate}
            transition={overlay.transition}
          />
        </ImageWrapper>
      </Wrapper>
    </ImageContainer>
  );
};

const animateFadeIn = () => {
  const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

  return css`
    ${fadeIn} 0.8s ease-in-out both 0.5s;
  `;
};

export function StaticImage({ ...props }) {
  return (
    <ImageContainer {...props}>
      <Wrapper>
        <ImageWrapper>
          <NextImage src="/images/hero/hero.png" alt="photo of me" className={s.image} {...props} />
        </ImageWrapper>
      </Wrapper>
    </ImageContainer>
  );
}

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
  margin-top: 10px;
  width: 200px;
  height: 200px;
  user-select: none;

  @media (max-width: ${breakpoints.mobile}px) {
    float: none;
    margin: 0 auto;
    margin-top: 0;
    width: 120px;
    height: 120px;
    margin-bottom: 16px;
  }

  animation: ${(p) => (p.theme.hasRun ? undefined : animateFadeIn)};
`;

const Wrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 100%;
  margin: 0 auto;
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  transition: all 0.4s ease-in-out;
`;

const ImageOverylay = styled(motion.div)`
  position: absolute;
  background: #292929;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  clip-path: circle(50% at 50% 50%);

  transition: all 0.4s ease-in-out;
`;
