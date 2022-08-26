import styled from 'styled-components';
import { breakpoints } from '@constants/index';
import { H2 } from '@components/Headings';
import Link from 'next/link';
import { useRef } from 'react';

import { Picture } from './Picture';

export function AppCard({ ...props }) {
  const { href, title, description, sources, alt, priority } = props.config;
  const ref = useRef();

  return (
    <Wrapper onClick={() => ref.current.click()}>
      <AppLink ref={ref} passHref href={href}>
        <AppCardHeading>{title}</AppCardHeading>
      </AppLink>
      <Small>{description}</Small>
      <PictureWrapper>
        <Picture sources={sources} alt={alt} priority={priority} />
      </PictureWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  margin: 64px 0 64px 0;
  cursor: pointer;
  @media (max-width: ${breakpoints.tablet}px) {
    text-align: center;
    margin: 32px 0 32px 0;
  }
`;

const Small = styled.small`
  margin-bottom: 23px;
  display: block;
  color: var(--color-text);
`;

const PictureWrapper = styled.div`
  filter: drop-shadow(1px 3px 6px var(--app-card-shadow));
  &:hover {
    cursor: pointer;
  }
`;

const AppLink = styled(Link)`
  &:hover {
    color: var(--app-card-hover);
  }
`;

const AppCardHeading = styled(H2)`
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive4);
  width: fit-content;
  transition: all 10ms;
  /* font-size: clamp(var(--size32), 7vw, var(--size40)); */
  font-size: clamp(var(--size24), 7vw, var(--size36));
  /* color: var(--h2); */
  color: var(--app-card-color);

  &:hover {
    /* color: var(--h3); */
    color: var(--app-card-hover);
  }

  margin: 0;
  @media (max-width: ${breakpoints.tablet}px) {
    margin: auto;
  }

  &:focus-visible {
    outline: 2px solid var(--color-outline);
  }
`;
