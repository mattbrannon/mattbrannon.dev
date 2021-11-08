import styled from 'styled-components/macro';

export default function VideoPlayer({ sources, size }) {
  return (
    <Video size={size} autoPlay loop muted playsInline>
      {sources.map((src, i) => {
        const ext = src.slice(src.lastIndexOf('.') + 1);
        return <source src={src} type={`video/${ext}`} key={i} />;
      })}
    </Video>
  );
}

const Video = styled.video`
  width: ${(p) => (p.size ? '' : '100%')};
  height: ${(p) => p.size + 'px' || 'auto'};

  filter: drop-shadow(4px 8px 8px #222);
  border-radius: 6px;
`;
