import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Anchor } from './Anchor';

export default function FancyLink({ children, ...props }) {
  const [ isSelected, setIsSelected ] = useState(false);

  useEffect(() => {
    setIsSelected(props.activeLink === props.href.slice(1));
  }, [ props.activeLink, props.href ]);

  return (
    <LinkWrapper
      onClick={() => setIsSelected(true)}
      style={{
        '--maxWidth': isSelected ? '100%' : '0%',
        '--color': isSelected ? 'var(--orange0)' : 'white',
      }}
    >
      <Link passHref {...props} legacyBehavior>
        <A {...props}>{children}</A>
      </Link>

      <Underline />
    </LinkWrapper>
  );
}

const LinkWrapper = styled.span`
  position: relative;
  background: transparent;
  border: none;
  font-family: Jost, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'OpenSans', 'Helvetica Neue', sans-serif;
  font-weight: 525;

  --maxWidth: 0%;

  &:hover {
    --maxWidth: 100% !important;
  }
`;

const A = styled(Anchor)`
  color: var(--color);

  letter-spacing: 0.8px;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: var(--orange0);
    cursor: pointer;
  }
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
