import Image from 'next/future/image';

export function Picture({ sources, alt, priority }) {
  const fallback = sources[sources.length - 1];

  return (
    <picture>
      {sources.map(({ src, width, height }, i) => {
        const type = src.slice(src.lastIndexOf('.') + 1);
        return <source srcSet={src} width={width} height={height} type={`image/${type}`} key={i} />;
      })}
      <Image
        style={{ height: 'auto', width: '100%' }}
        src={fallback.src}
        width={fallback.width}
        height={fallback.height}
        alt={alt || ''}
        priority={!!priority}
      />
    </picture>
  );
}
