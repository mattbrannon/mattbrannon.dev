import { Anchor } from './Anchor';
import Link from 'next/link';
import styled from 'styled-components/macro';

export const ExternalLink = ({ href, children }) => {
  return (
    <Link passHref href={href}>
      <A newTab href={href}>
        {children}
      </A>
    </Link>
  );
};

export const InternalLink = ({ href, children }) => {
  return (
    <Link passHref href={href}>
      <A href={href}>{children}</A>
    </Link>
  );
};

const A = styled(Anchor)`
  --link-color: deeppink;
  font-weight: 700;
  color: var(--link-color);

  &:hover {
    --link-color: var(--pinkShadow);
  }

  @media (prefers-color-scheme: dark) {
    --link-color: var(--blue1);
    &:hover {
      color: var(--blue2);
    }
  }
`;
