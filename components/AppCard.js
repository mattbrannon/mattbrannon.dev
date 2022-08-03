import styled from 'styled-components';
import { Link } from '@components/Links';
import { CardImage } from '@components/Image';
import { breakpoints } from '@constants/index';
import { AppCardHeading } from '@components/Headings';
import { useRef } from 'react';

export default function AppCard({ ...props }) {
  const { href, title, description, src, alt, priority } = props.config;
  const ref = useRef();

  return (
    <Card>
      <Wrapper onClick={() => ref.current.click()}>
        <AppCardHeading before={title}>
          <Link passHref href={href}>
            <span ref={ref}>{title}</span>
          </Link>
        </AppCardHeading>
        <Small>{description}</Small>
        <CardImage {...props} priority={priority} src={src} alt={alt} />
      </Wrapper>
    </Card>
  );
}

const Card = styled.div`
  margin: 64px 0 64px 0;
  @media (max-width: ${breakpoints.mobile}px) {
    margin: 32px 0 32px 0;
  }
`;

const Wrapper = styled.div`
  @media (max-width: ${breakpoints.tablet}px) {
    text-align: center;
  }
`;

const Small = styled.small`
  margin-bottom: 23px;
  display: block;
  color: var(--color-text);
`;
