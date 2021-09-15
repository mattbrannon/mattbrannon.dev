import styled from 'styled-components/macro';

export default function VideoPlayer({ sources }) {
  return (
    <Video autoPlay loop muted playsInline>
      {sources.map((src, i) => {
        const ext = src.slice(src.lastIndexOf('.') + 1);
        return <source src={src} type={`video/${ext}`} key={i} />;
      })}
    </Video>
  );
}

const Video = styled.video`
  max-width: 480px;
  max-height: 270px;
  width: 100%;
  height: auto;

  object-fit: cover;
`;
