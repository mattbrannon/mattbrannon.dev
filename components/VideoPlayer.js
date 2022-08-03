import { breakpoints } from '@constants/index.js';
import pause from '@public/images/pause.png';
import play from '@public/images/play.png';
import { useCssVariable } from 'hooks/useCssVariable';
import NextImage from 'next/future/image';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import VisuallyHidden from './VisuallyHidden';

function VideoPlayer({ sources, ...props }) {
  const ref = useRef();
  const wrapperRef = useRef();
  const radius = props.flat ? 0 : props.rounded ? '6px' : undefined;
  const margin = props.left
    ? '0 auto 0 0'
    : props.right
    ? '0 0 0 auto'
    : props.center
    ? '0 auto'
    : undefined;

  useCssVariable('--video-radius', radius, ref);
  useCssVariable('--video-margin', margin, wrapperRef);

  const toggleVideoPlayState = () => {
    if (ref.current.paused) {
      ref.current.play();
    }
    else {
      ref.current.pause();
    }
  };

  return (
    <>
      <VideoWrapper onClick={toggleVideoPlayState} ref={wrapperRef} {...props}>
        <Video ref={ref} autoPlay loop muted playsInline>
          {sources.map((src, i) => {
            const ext = src.slice(src.lastIndexOf('.') + 1);
            return <source src={src} type={`video/${ext}`} key={i} />;
          })}
        </Video>
      </VideoWrapper>
    </>
  );
}

export default VideoPlayer;

const VideoWrapper = styled.div`
  --shadow-color: 0deg 0% 8%;
  --drop-shadow: none;
  --box-shadow: 0.1px 0.1px 0.1px hsl(var(--shadow-color) / 0.46),
    0.5px 0.4px 0.6px -0.4px hsl(var(--shadow-color) / 0.43),
    0.9px 0.7px 1.1px -0.8px hsl(var(--shadow-color) / 0.4),
    1.5px 1.2px 1.9px -1.3px hsl(var(--shadow-color) / 0.37),
    2.4px 2px 3.1px -1.7px hsl(var(--shadow-color) / 0.35),
    3.8px 3.2px 4.9px -2.1px hsl(var(--shadow-color) / 0.32),
    5.9px 4.9px 7.6px -2.6px hsl(var(--shadow-color) / 0.29),
    8.7px 7.2px 11.2px -3px hsl(var(--shadow-color) / 0.27),
    12.5px 10.3px 16px -3.4px hsl(var(--shadow-color) / 0.24);

  height: auto;
  display: flex;
  justify-content: var(--justify);
  border-radius: var(--video-radius);
  max-width: 644px;
  margin: var(--video-margin);

  @media (prefers-color-scheme: light) {
    --box-shadow: 'none';
    --drop-shadow: 2px 3px 8px hsl(var(--shadow-color) / 0.8);
  }
`;

const SimpleWrapper = styled.div`
  @media (min-width: ${breakpoints.mobile}px) {
    max-width: fit-content;
  }
`;

const Video = styled.video`
  filter: ${(p) => (p.flat ? 'none' : 'var(--drop-shadow)')};
  box-shadow: ${(p) => (p.flat ? 'none' : 'var(--box-shadow)')};
  border-radius: var(--radius);
`;

export function SimpleVideo({ sources, ...props }) {
  return (
    <>
      <SimpleWrapper {...props}>
        <Video autoPlay loop muted playsInline>
          {sources.map((src, i) => {
            const ext = src.slice(src.lastIndexOf('.') + 1);
            return <source src={src} type={`video/${ext}`} key={i} />;
          })}
        </Video>
      </SimpleWrapper>
    </>
  );
}

const BlogPlayerWrapper = styled.div`
  max-width: 540px;
  filter: drop-shadow(4px 2px 8px #333);
  @media (max-width: 795px) {
    margin: auto;
  }
`;

export const BlogPlayer = styled.video`
  width: 100%;
  border-radius: ${(p) => (p.rounded ? '8px' : undefined)};
`;

export const BlogVideo = ({ ...props }) => {
  const ref = useRef();

  const toggleVideoPlayState = () => {
    if (ref.current.paused) {
      ref.current.play();
    }
    else {
      ref.current.pause();
    }
  };

  return (
    <BlogPlayerWrapper onClick={toggleVideoPlayState}>
      <BlogPlayer {...props} ref={ref} autoPlay loop muted playsInline>
        {props.sources.map((src, i) => {
          const ext = src.slice(src.lastIndexOf('.') + 1);
          return <source src={src} type={`video/${ext}`} key={i} />;
        })}
      </BlogPlayer>
    </BlogPlayerWrapper>
  );
};

const AppPlayerWrapper = styled.div`
  max-width: 644px;
  /* filter: drop-shadow(4px 2px 8px #333); */
  overflow: hidden;
  filter: drop-shadow(2px 4px 8px #111);
  margin: ${(p) => (p.center ? '0 auto' : undefined)};
`;

export const AppPlayer = styled.video`
  width: 100%;
  border-radius: 6px;
  transform: scale(1.01);
  object-position: 0 1px;
`;

export const AppVideo = ({ ...props }) => {
  const ref = useRef();

  const toggleVideoPlayState = () => {
    if (ref.current.paused) {
      ref.current.play();
    }
    else {
      ref.current.pause();
    }
  };

  return (
    <AppPlayerWrapper onClick={toggleVideoPlayState} {...props}>
      <AppPlayer ref={ref} autoPlay loop muted playsInline>
        {props.sources.map((src, i) => {
          const ext = src.slice(src.lastIndexOf('.') + 1);
          return <source src={src} type={`video/${ext}`} key={i} />;
        })}
      </AppPlayer>
    </AppPlayerWrapper>
  );
};

const FlatPlayerWrapper = styled.div`
  max-width: 644px;
  margin: ${(p) => (p.center ? '0 auto' : undefined)};
  position: relative;

  width: 100%;
  height: auto;
`;

export const FlatPlayer = styled.video`
  display: block;

  object-fit: cover;
  object-position: ${(p) => `${p.x}px ${p.y}px` || '0 0'};
  width: 100%;
  height: auto;
  max-width: 644px;
  /* max-height: 320px; */
  width: 100%;
  height: auto;
  height: ${(p) => `${p.height}px` || 'auto'};

  border-radius: 2px;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  ${'' /* color: ${(p) => (p.isPlaying ? 'transparent' : 'white')}; */}

  display: grid;
  place-items: center;

  &:hover {
    color: white;
    ${'' /* background: ${(p) => } */}
    background: ${(p) =>
      !p.wasPaused ? 'hsl(0, 0%, 0%, 0.6)' : !p.isPlaying ? ' hsl(0, 0%, 0%, 0.6)' : 'transparent'};
  }

  ${'' /* background: ${(p) => (p.isPlaying ? 'transparent' : 'hsl(0, 0%, 0%, 0.6)')}; */}

  transition: background 0.1s linear;
`;

const ImageWrapper = styled.span`
  display: block;
  position: relative;
  max-height: 50px;
  max-width: 50px;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 50%;
    opacity: ${(p) => (p.isHovering ? 1 : 0)};
  ${'' /* opacity: ${(p) => (p.isHovering || !p.isPlaying ? 1 : 0)}; */}
  ${'' /* opacity: ${(p) => (p.wasPaused ? 0 : p.isHovering && !p.wasPaused ? 1 : 0)}; */}

  ${'' /* opacity: ${(p) => (p.isHovering || !p.isPlaying ? 1 : 0)}; */}
  ${'' /* --delay: ${(p) => (p.isHovering ? '0s' : '0s')}; */}
  transition: opacity 0.1s linear;
`;

const UnstyledButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlatVideo = ({ ...props }) => {
  const ref = useRef();
  const [ buttonText, setButtonText ] = useState('Pause video');
  const [ isPlaying, setIsPlaying ] = useState(true);
  const [ image, setImage ] = useState(pause);
  const [ isHovering, setIsHovering ] = useState(false);
  const [ wasPaused, setWasPaused ] = useState(false);

  const playVideo = () => {
    ref.current.play();
    setIsPlaying(true);
    setButtonText('Pause video');
    setImage(pause);
  };

  const pauseVideo = () => {
    ref.current.pause();
    setButtonText('Play video');
    setIsPlaying(false);
    setImage(play);
  };

  const toggleVideoPlayState = () => {
    // return ref.current.paused ? playVideo() : pauseVideo();
    if (ref.current.paused) {
      setWasPaused(true);
      playVideo();
    }
    else {
      setWasPaused(false);
      pauseVideo();
    }
  };

  return (
    <FlatPlayerWrapper onClick={toggleVideoPlayState} {...props}>
      <FlatPlayer {...props} ref={ref} autoPlay loop muted playsInline>
        {props.sources.map((src, i) => {
          const ext = src.slice(src.lastIndexOf('.') + 1);
          return <source src={src} type={`video/${ext}`} key={i} />;
        })}
      </FlatPlayer>
      <Overlay
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        isPlaying={isPlaying}
      >
        <UnstyledButton tabIndex={-1}>
          <VisuallyHidden>{buttonText}</VisuallyHidden>
          <ImageWrapper wasPaused={wasPaused} isPlaying={isPlaying} isHovering={isHovering}>
            <NextImage alt="" layout="fill" src={image} />
          </ImageWrapper>
        </UnstyledButton>
      </Overlay>
    </FlatPlayerWrapper>
  );
};
