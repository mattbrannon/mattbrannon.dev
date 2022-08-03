import NextLink from 'next/link';
import styled from 'styled-components';
import { Anchor } from './Anchor';

export const ExternalLink = ({ href, children }) => {
  return (
    <NextLink passHref href={href} legacyBehavior>
      <External newTab href={href} rel="noopener">
        {children}
      </External>
    </NextLink>
  );
};

const External = styled(Anchor)`
  font-variation-settings: 'wght' 700;

  color: var(--external-link);
  &:hover {
    color: var(--external-link-hover);
  }
`;
