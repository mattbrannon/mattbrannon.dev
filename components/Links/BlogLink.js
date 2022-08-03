import styled from 'styled-components';
import { LinkIcon } from './LinkIcon';
import NextLink from 'next/link';

export const BlogLink = ({ href, children, ...props }) => {
  return (
    <Container {...props}>
      {children}
      <NextLink
        {...props}
        scroll={false}
        shallow={true}
        href={href}
        passHref
        legacyBehavior>
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
