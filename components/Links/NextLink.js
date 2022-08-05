import styled from 'styled-components';
import NextLink from 'next/link';

export const UnstyledLink = styled(NextLink)`
  font: inherit;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
  /* &:focus {
    outline: none;
  } */
`;

export const Link = ({ children, ...props }) => {
  return (
    <UnstyledLink {...props} tabIndex={-1}>
      {children}
    </UnstyledLink>
  );
};
