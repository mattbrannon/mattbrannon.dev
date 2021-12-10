import styled from 'styled-components/macro';

export default function VideoPlayer({ sources, size, ...props }) {
  return (
    <>
      <VideoWrapper {...props}>
        <Video size={size} autoPlay loop muted playsInline>
          {sources.map((src, i) => {
            const ext = src.slice(src.lastIndexOf('.') + 1);
            return <source src={src} type={`video/${ext}`} key={i} />;
          })}
        </Video>
      </VideoWrapper>
    </>
  );
}

const VideoWrapper = styled.div.attrs((props) => {
  const justify = props.left ? 'flex-start' : props.right ? 'flex-end' : 'center';
  const radius = props.rounded ? 12 + 'px' : 0;
  return {
    style: {
      '--justify': justify,
      '--radius': radius,
    },
  };
})`
  display: flex;
  justify-content: var(--justify);
  --shadow-color: 0deg 0% 8%;

  --shadow-elevation-high: 0.1px 0.1px 0.1px hsl(var(--shadow-color) / 0.46),
    0.5px 0.4px 0.6px -0.4px hsl(var(--shadow-color) / 0.43),
    0.9px 0.7px 1.1px -0.8px hsl(var(--shadow-color) / 0.4),
    1.5px 1.2px 1.9px -1.3px hsl(var(--shadow-color) / 0.37),
    2.4px 2px 3.1px -1.7px hsl(var(--shadow-color) / 0.35),
    3.8px 3.2px 4.9px -2.1px hsl(var(--shadow-color) / 0.32),
    5.9px 4.9px 7.6px -2.6px hsl(var(--shadow-color) / 0.29),
    8.7px 7.2px 11.2px -3px hsl(var(--shadow-color) / 0.27),
    12.5px 10.3px 16px -3.4px hsl(var(--shadow-color) / 0.24);
  --drop-shadow: none;

  @media (prefers-color-scheme: light) {
    --shadow-elevation-high: none;
    --drop-shadow: 2px 3px 8px hsl(var(--shadow-color) / 0.8);
  }
`;

const Video = styled.video`
  filter: drop-shadow(var(--drop-shadow));
  box-shadow: var(--shadow-elevation-high);
  width: 100%;
  height: auto;
  border-radius: var(--radius);
`;
