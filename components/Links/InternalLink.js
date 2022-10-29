import NextLink from 'next/link';
import styled from 'styled-components';

export const InternalLink = styled(NextLink)`
  color: var(--internal-link);
  font: inherit;

  &:hover {
    color: var(--internal-link-hover);
  }
`;
