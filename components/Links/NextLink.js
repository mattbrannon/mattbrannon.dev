import styled, { ThemeContext } from 'styled-components';
import NextLink from 'next/link';
import { useContext } from 'react';

export const Link = ({ children, ...props }) => {
  const context = useContext(ThemeContext);
  const setState = () => {
    context.setHasRun(true);
    context.setBubblesDone(true);
    context.setHasStarted(true);
  };

  return (
    <UnstyledLink onClick={setState} {...props} tabIndex={-1}>
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
