import styled from 'styled-components';
import NextLink from 'next/link';

export const Link = ({ children, ...props }) => {
  return (
    <UnstyledLink {...props}>
      {children}
    </UnstyledLink>
  );
};

const UnstyledLink = styled(NextLink)`
  font: inherit;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;
