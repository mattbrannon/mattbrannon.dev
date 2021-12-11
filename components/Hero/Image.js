import { animations } from '@animations';
import Picture from '@components/Image';
import { springUp } from '@constants';
import { getFluidSizes } from '@utils/helpers';
import { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';

const HeroImage = ({ ...props }) => {
  const { hasPlayed, heroConfig } = useContext(ThemeContext);
  console.log(heroConfig);

  return (
    <ImageContainer {...props}>
      <ImageWrapper>
        <OverlayWrapper>
          <Image src="/images/hero/hero.png" alt="a very handsome man" sources={heroConfig.hero} />
          {!hasPlayed ? <ImageOverylay /> : null}
        </OverlayWrapper>
      </ImageWrapper>
    </ImageContainer>
  );
};

const expand = (props) => {
  const animation = css`
    ${animations.expand} 1000ms ${springUp} 3300ms forwards;
  `;
  return props.theme.hasPlayed ? undefined : animation;
};

const fadeOut = (props) => {
  const animation = css`
    ${animations.fadeOut} 300ms ${springUp} 3500ms both;
  `;
  return props.theme.hasPlayed ? undefined : animation;
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
  ${'' /* width: var(--clamp); */}
  ${'' /* visibility: hidden; */}

  ${'' /* @supports not (width: var(--clamp)) {
    ${'' /* width: ; */}
  } */}

  @media (max-width: 564px) {
    float: none;
    margin: 0 auto;
  }
  

  ${'' /* animation: ${imageAnimation} 1000ms ease-out 2000ms both; */}
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 100%;
  margin: 0 auto;
`;

const Image = styled(Picture)`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  object-position: 30% 0px;
  ${'' /* z-index: -2; */}
`;

export const OverlayWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 1;
  clip-path: ${(p) => (p.theme.hasPlayed ? undefined : ' circle(0% at 50% 50%)')};
  animation: ${(p) => expand(p)};
`;

export const ImageOverylay = styled.div`
  position: absolute;
  background: var(--tealBg);
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  clip-path: circle(100% at 50% 50%);
  animation: ${(p) => fadeOut(p)};
`;

export default HeroImage;

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