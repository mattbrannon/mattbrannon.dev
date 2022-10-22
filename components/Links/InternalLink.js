import NextLink from 'next/link';
import styled from 'styled-components';
import { Anchor } from './Anchor';
import { forwardRef } from 'react';

function Link({ href, children, ...props }, ref) {
  return (
    <NextLink {...props} passHref href={href} legacyBehavior>
      <Internal ref={ref} {...props}>
        {children}
      </Internal>
    </NextLink>
  );
}

export const InternalLink = forwardRef(Link);

const Internal = styled(Anchor)`
  color: var(--internal-link);
  /* font-weight: 700; */
  font: inherit;
  /* font-variation-settings: 'wght' 750; */

  &:hover {
    color: var(--internal-link-hover);
  }
`;
