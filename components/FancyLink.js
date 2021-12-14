import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Anchor } from './Anchor';

export default function FancyLink({ children, ...props }) {
  const [ isHovering, setIsHovering ] = useState(false);
  const [ isSelected, setIsSelected ] = useState(false);

  useEffect(() => {
    setIsSelected(props.activeLink === props.href.slice(1));
  }, [ props.activeLink, props.href ]);

  return (
    <LinkWrapper
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link passHref {...props}>
        <A
          {...props}
          style={{
            '--color': isSelected ? 'var(--orange0)' : 'whitesmoke',
          }}
        >
          {children}
        </A>
      </Link>

      <Underline
        style={{
          '--maxWidth': isSelected || isHovering ? '100%' : '0%',
        }}
      />
    </LinkWrapper>
  );
}

const LinkWrapper = styled.span`
  position: relative;
  background: transparent;
  border: none;
  font-family: Jost, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 525;
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
  --color: var(--pinkUnderline);
  height: 2px;
  width: 100%;

  background: var(--color);
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;

  max-width: var(--maxWidth);
  transition: max-width 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    --color: var(--blueUnderline);
  }
`;
