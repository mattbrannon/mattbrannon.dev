import pause from '@public/images/pause.png';
import play from '@public/images/play.png';
import Image from 'next/future/image';
import { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
import { VisuallyHidden } from '../VisuallyHidden';
import { VideoWrapper, Video, Overlay, PlayPauseButton, ImageWrapper } from './styles';
import { Source } from './Source';

export const VideoPlayer = ({ ...props }) => {
  const ref = useRef();
  const [buttonText, setButtonText] = useState('Pause video');
  const [image, setImage] = useState(pause);
  const [isHovering, setIsHovering] = useState(false);
  const [overlayWidth, setOverlayWidth] = useState(0);

  const playVideo = () => {
    ref.current.play();
    setButtonText('Pause video');
    setImage(pause);
  };

  const pauseVideo = () => {
    ref.current.pause();
    setButtonText('Play video');
    setImage(play);
  };

  const toggleVideoPlayState = () => {
    return ref.current.paused ? playVideo() : pauseVideo();
  };

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      setOverlayWidth(width);
    }
  }, [ref]);

  return (
    <VideoWrapper onClick={toggleVideoPlayState} {...props}>
      <Video {...props} ref={ref} autoPlay loop muted playsInline>
        {props.sources.map((src, i) => (
          <Source src={src} key={i} />
        ))}
      </Video>
      <Overlay
        width={overlayWidth}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        {...props}
      >
        <PlayPauseButton tabIndex={-1}>
          <VisuallyHidden>{buttonText}</VisuallyHidden>
          <ImageWrapper isHovering={isHovering}>
            <Image alt="" layout="fill" src={image} />
          </ImageWrapper>
        </PlayPauseButton>
      </Overlay>
    </VideoWrapper>
  );
};
