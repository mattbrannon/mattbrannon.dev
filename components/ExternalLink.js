import { Anchor } from './Anchor';
import Link from 'next/link';

export const ExternalLink = ({ href, children }) => {
  return (
    <Link passHref href={href}>
      <Anchor newTab href={href}>
        {children}
      </Anchor>
    </Link>
  );
};
