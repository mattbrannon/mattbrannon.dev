import NextLink from 'next/link';
import styled from 'styled-components';
import { Anchor } from './Anchor';

export const ExternalLink = ({ href, children }) => {
  return (
    <NextLink passHref href={href}>
      <A newTab href={href} rel="noopener">
        {children}
      </A>
    </NextLink>
  );
};

export const Link = ({ href, children, ...props }) => {
  return (
    <NextLink {...props} passHref href={href}>
      <A {...props} href={href}>
        {children}
      </A>
    </NextLink>
  );
};

const A = styled(Anchor)`
  --link-color: var(--dark-pink);
  font-weight: 700;
  color: var(--link-color);

  &:hover {
    --link-color: var(--pinkShadow);
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    --link-color: var(--blue1);
    &:hover {
      color: var(--blue2);
    }
  }
`;
