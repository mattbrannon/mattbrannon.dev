import styled from 'styled-components/macro';
import { useState } from 'react';
import Link from 'next/link';

export default function FancyLink({ href, children }) {
  const [ isHovering, setIsHovering ] = useState(false);

  return (
    <LinkWrapper
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link passHref href={href}>
        <Anchor href={href}>{children}</Anchor>
      </Link>

      <Underline
        style={{
          '--maxWidth': isHovering ? '100%' : '0%',
        }}
      />

      {/* <Underline isHovering={isHovering} /> */}
    </LinkWrapper>
  );
}

const LinkWrapper = styled.span`
  position: relative;
  background: transparent;
  border: none;
  font-family: futuraa, 'Roboto Flex';
  /* font-variation-settings: */
`;

export const Anchor = styled.a.attrs((props) => {
  return {
    href: props.href,
  };
})`
  color: whitesmoke;
  letter-spacing: 0.8px;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: hsl(328deg, 100%, 74%);
    cursor: pointer;
  }

  transition: color 0.15s ease;
`;

const Underline = styled.span`
  --maxWidth: ${(p) => (p.isHovering ? '100%' : '0%')};
  height: 2px;
  width: 100%;
  background: #ff7ac1;
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;

  max-width: var(--maxWidth);
  transition: max-width 0.2s ease-in-out;
`;
