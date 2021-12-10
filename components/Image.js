import styled from 'styled-components/macro';

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

const Image = styled.img`
  --radius: ${(p) => (p.rounded ? '50%' : undefined)};
  display: block;
  width: ${(p) => p.width + 'px' || '100%'};
  height: auto;
  object-fit: cover;
  border-radius: var(--radius);
`;

export default Picture;
