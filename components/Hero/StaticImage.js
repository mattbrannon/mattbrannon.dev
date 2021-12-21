import { breakpoints } from '@constants/';
import { getFluidSizes } from '@utils/helpers';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components/macro';

const StaticImage = ({ ...props }) => {
  return (
    <ImageContainer {...props}>
      <ImageWrapper>
        <OverlayWrapper>
          <Image {...props} alt="photo of me" />
          <ImageOverylay />
        </OverlayWrapper>
      </ImageWrapper>
    </ImageContainer>
  );
};

const imageFadeIn = keyframes`
  from {
    ${'' /* clip-path: circle(100% at 50% 50%); */}
    opacity: 0;
  }
  to {
    ${'' /* clip-path: circle(0% at 50% 50%); */}
    opacity: 1;
  }
`;

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
  animation: ${imageFadeIn} 1000ms ease -200ms both;
`;

const OverlayWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
`;

const ImageOverylay = styled.div`
  position: absolute;
  background: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
  ${'' /* clip-path: circle(% at 50% 50%); */}
  animation: ${imageFadeIn} 1000ms ease -100ms both;
`;

export default StaticImage;

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
