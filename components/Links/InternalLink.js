import NextLink from 'next/link';
import styled from 'styled-components';
import { Anchor } from './Anchor';
import { AppCardHeading } from '@components/Headings';

export const InternalLink = ({ href, children, ...props }) => {
  return (
    <NextLink {...props} passHref href={href} legacyBehavior>
      <Internal {...props}>{children}</Internal>
    </NextLink>
  );
};

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
