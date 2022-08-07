import styled from 'styled-components';
import { breakpoints } from '@constants/index';
import { AppCardHeading } from '@components/Headings';
import Link from 'next/link';

import { Picture } from './Picture';

export function AppCard({ ...props }) {
  const { href, title, description, sources, alt, priority } = props.config;

  return (
    <Link passHref href={href}>
      <Wrapper>
        <AppCardHeading>{title}</AppCardHeading>
        <Small>{description}</Small>
        <PictureWrapper>
          <Picture sources={sources} alt={alt} priority={priority} />
        </PictureWrapper>
      </Wrapper>
    </Link>
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
  --shadow-color: #333;
  filter: drop-shadow(1px 3px 6px var(--shadow-color));
  &:hover {
    cursor: pointer;
  }
`;
