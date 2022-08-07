import { InternalLink } from './InternalLink';
// import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Anchor } from './Anchor';
import { memo } from 'react';

// eslint-disable-next-line react/display-name
export const FancyLink = memo(({ children, ...props }) => {
  return (
    <LinkWrapper {...props}>
      <A {...props}>{children}</A>
      <Underline />
    </LinkWrapper>
  );
});

const LinkWrapper = styled.span`
  position: relative;
  background: transparent;
  border: none;
  font-family: Jost, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'OpenSans', 'Helvetica Neue', sans-serif;
  font-weight: 525;

  --maxWidth: ${(p) => (p.$isActive ? '100%' : '0%')};
  --color: ${(p) => (p.$isActive ? '#f6e9d5' : '#ffffff')};

  &:hover {
    --maxWidth: 100% !important;
  }
`;

const A = styled(InternalLink)`
  color: var(--color);

  letter-spacing: 0.8px;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: var(--off-white);
    cursor: pointer;
  }
  color: white;
  transition: color 0.15s ease;
`;

const Underline = styled.span`
  height: 2px;
  width: 100%;

  max-width: var(--maxWidth, var(--max));
  background: var(--fancy-link-underline);
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;

  transition: max-width 0.2s ease-in-out;
`;
