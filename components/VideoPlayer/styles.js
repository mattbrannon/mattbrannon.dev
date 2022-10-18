import styled from 'styled-components';

export const VideoWrapper = styled.div`
  margin: ${(p) => (p.center ? '0 auto' : undefined)};
  position: relative;

  max-width: ${(p) => (p.width ? p.width + 'px' : '644px')};
  width: 100%;
  height: auto;
`;

export const Video = styled.video`
  display: block;
  max-width: 644px;
  width: 100%;
  height: ${(p) => `${p.height}px` || 'auto'};

  object-fit: cover;
  object-position: ${(p) => `${p.x}px ${p.y}px` || '0 0'};
  border-radius: ${(p) => (p.rounded ? '8px' : '2px')};
`;

export const Overlay = styled.div`
  position: absolute;
  max-width: ${(p) => p.width + 'px'};
  height: 100%;
  top: 0;
  left: 0;

  display: grid;
  place-items: center;
  border-radius: ${(p) => (p.rounded ? '8px' : '2px')};
  &:hover {
    background-color: hsl(0, 0%, 0%, 0.6);
  }
  transition: background-color 0.1s linear;
`;

export const ImageWrapper = styled.span`
  display: block;
  position: relative;
  max-height: 50px;
  max-width: 50px;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 50%;
  opacity: ${(p) => (p.isHovering ? 1 : 0)};
  transition: opacity 0.1s linear;
`;

export const PlayPauseButton = styled.button`
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
  position: absolute;
`;
