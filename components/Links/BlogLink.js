import styled from 'styled-components';
import { LinkIcon } from './LinkIcon';
// import NextLink from 'next/link';
// import { InternalLink } from './InternalLink';

export const BlogLink = ({ href, children, ...props }) => {
  return (
    <Container {...props}>
      {children}
      {/* <InternalLink {...props} scroll={false} shallow={true} href={href} passHref> */}
      <LinkIcon scroll={false} shallow={true} passHref {...props} href={href} />
      {/* </InternalLink> */}
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
