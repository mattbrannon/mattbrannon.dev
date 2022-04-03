import NextLink from 'next/link';
import styled from 'styled-components';
import { Anchor } from './Anchor';
import LinkIcon from '@components/LinkIcon';
import { AppCardHeading } from './Headings';

export const ExternalLink = ({ href, children }) => {
  return (
    <NextLink passHref href={href}>
      <External newTab href={href} rel="noopener">
        {children}
      </External>
    </NextLink>
  );
};

export const Link = ({ href, children, ...props }) => {
  return (
    <NextLink {...props} passHref href={href}>
      <Internal {...props}>{children}</Internal>
    </NextLink>
  );
};

export const BlogLink = ({ href, children, ...props }) => {
  return (
    <Container {...props}>
      {children}
      <NextLink {...props} scroll={false} shallow={true} href={href} passHref>
        <LinkIcon as="a" {...props} href={href} />
      </NextLink>
    </Container>
  );
};

const Container = styled.div`
  --opacity: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding-top: 32px;

  &:hover {
    --opacity: 1;
  }
`;

const A = styled(Anchor)`
  display: flex;
  align-items: center;
  gap: 8px;

  &:focus-within {
    outline: revert;
    --opacity: 1;
  }
`;

const External = styled(Anchor)`
  font-variation-settings: 'wght' 700;

  color: var(--external-link);
  &:hover {
    color: var(--external-link-hover);
  }
`;

const Internal = styled(Anchor)`
  color: var(--internal-link);
  font-weight: 700;

  ${AppCardHeading} & {
    color: var(--color-app-card);
    &:hover {
      color: var(--color-app-card-hover);
    }
  }

  &:hover {
    color: var(--internal-link-hover);
  }
`;
