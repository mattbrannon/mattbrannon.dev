// import { useCssVariable } from 'hooks/useCssVariable';
// import { useWindowSize } from 'hooks/useWindowSize';
import styled from 'styled-components';
import { useEffect, forwardRef, useRef } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { breakpoints } from '@constants/index.js';
import { useCssVariable } from 'hooks/useCssVariable';

function VideoPlayer({ sources, ...props }) {
  const ref = useRef();
  const wrapperRef = useRef();
  const size = props.size ? `${props.size}px` : '644px';
  const radius = props.flat ? 0 : props.rounded ? '6px' : undefined;
  const margin = props.left
    ? '0 auto 0 0'
    : props.right
    ? '0 0 0 auto'
    : props.center
    ? '0 auto'
    : undefined;

  useCssVariable('--video-radius', radius, ref);
  // useCssVariable('--max-video-width', size, ref);
  useCssVariable('--video-margin', margin, wrapperRef);

  const toggleVideoPlayState = (e) => {
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
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });

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

// const VideoWrapper = styled.div.attrs((props) => {
//   const justify = props.left ? 'flex-start' : props.right ? 'flex-end' : 'center';
//   const radius = props.rounded ? 12 + 'px' : 0;
//   const playerWidth = props.playerWidth
//     ? Math.round(props.playerWidth) + 'px'
//     : undefined;

//   return {
//     style: {
//       '--player-width': playerWidth,
//       // '--justify': justify,
//       '--radius': radius,
//       '--margin':
//         props.right || props.placement === 'right'
//           ? '0 0 0 auto'
//           : props.left || props.placement === 'left'
//           ? '0 auto 0 0'
//           : props.center || props.placement === 'center'
//           ? '0 auto'
//           : undefined,
//     },
//   };
// })`
//   ${'' /* --max-video-size: calc((var(--size) + (var(--breathing-room) * 2)) * 0.5); */}
//   --shadow-color: 0deg 0% 8%;
//   --drop-shadow: none;
//   --shadow-elevation-high: 0.1px 0.1px 0.1px hsl(var(--shadow-color) / 0.46),
//     0.5px 0.4px 0.6px -0.4px hsl(var(--shadow-color) / 0.43),
//     0.9px 0.7px 1.1px -0.8px hsl(var(--shadow-color) / 0.4),
//     1.5px 1.2px 1.9px -1.3px hsl(var(--shadow-color) / 0.37),
//     2.4px 2px 3.1px -1.7px hsl(var(--shadow-color) / 0.35),
//     3.8px 3.2px 4.9px -2.1px hsl(var(--shadow-color) / 0.32),
//     5.9px 4.9px 7.6px -2.6px hsl(var(--shadow-color) / 0.29),
//     8.7px 7.2px 11.2px -3px hsl(var(--shadow-color) / 0.27),
//     12.5px 10.3px 16px -3.4px hsl(var(--shadow-color) / 0.24);

//   height: auto;
//   display: flex;
//   justify-content: var(--justify);
//   border-radius: var(--radius);
//   max-width: 644px;
//   margin: var(--margin);

//   @media (prefers-color-scheme: light) {
//     --shadow-elevation-high: none;
//     --drop-shadow: 2px 3px 8px hsl(var(--shadow-color) / 0.8);
//   }
// `;

// const FixedVideo = styled(Video)`
//   width: ${(p) => p.width + 'px' || '100%'};
//   height: ${(p) => p.height + 'px' || 'auto'};
// `;

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
  return (
    <BlogPlayerWrapper>
      <BlogPlayer {...props} autoPlay loop muted playsInline>
        {props.sources.map((src, i) => {
          const ext = src.slice(src.lastIndexOf('.') + 1);
          return <source src={src} type={`video/${ext}`} key={i} />;
        })}
      </BlogPlayer>
    </BlogPlayerWrapper>
  );
};

////////////////
//////////////////

const AppPlayerWrapper = styled.div`
  max-width: 644px;
  ${'' /* filter: drop-shadow(4px 2px 8px #333); */}
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
`;

export const FlatPlayer = styled.video`
  width: 100%;
  border-radius: 2px;
`;

export const FlatVideo = ({ ...props }) => {
  return (
    <FlatPlayerWrapper {...props}>
      <FlatPlayer autoPlay loop muted playsInline>
        {props.sources.map((src, i) => {
          const ext = src.slice(src.lastIndexOf('.') + 1);
          return <source src={src} type={`video/${ext}`} key={i} />;
        })}
      </FlatPlayer>
    </FlatPlayerWrapper>
  );
};
