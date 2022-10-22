import Link from 'next/link';
import { useRef } from 'react';
import { Wrapper, Heading, ImageWrapper, Image, Small } from './styles';

export function AppCard({ config }) {
  const { title, description } = config;
  const ref = useRef();

  return (
    <Wrapper onClick={() => ref.current.click()}>
      <Link ref={ref} passHref {...config}>
        <Heading>{title}</Heading>
      </Link>
      <Small>{description}</Small>
      <ImageWrapper>
        <Image width={720} height={0} {...config} />
      </ImageWrapper>
    </Wrapper>
  );
}
