import { useContext, useEffect } from 'react';
import Link from 'next/link';
import styled, { keyframes, css, ThemeContext } from 'styled-components/macro';
import VisuallyHidden from '@components/VisuallyHidden';
/**
 *
 * * Mobile navigation menu
 *
 */

export default function MobileNav() {
  const context = useContext(ThemeContext);
  const labels = [ 'Home', 'Blog', 'Apps', 'Contact' ];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        context.setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <MobileNavWrapper
      style={{
        '--height': context.isOpen ? '80%' : '0px',
        '--width': context.isOpen ? 'auto' : '0px',
        '--zIndex': context.isOpen ? '4' : '-1',
        '--display': context.isOpen ? 'flex' : 'none',
      }}
    >
      <VisuallyHidden>
        <h2>Internal Navigation Links for Mobile Devices</h2>
      </VisuallyHidden>
      <>
        {labels.map((label, index) => {
          const href = index > 0 ? `/${labels[index].toLowerCase()}` : '/';
          return (
            <NavLink
              tabIndex={0}
              href={href}
              key={index}
              isOpen={context.isOpen}
              style={{
                '--index': index + 1,
              }}
            >
              {label}
            </NavLink>
          );
        })}
      </>
    </MobileNavWrapper>
  );
}

function NavLink({ children, ...props }) {
  const context = useContext(ThemeContext);
  const { setIsOpen } = context;
  const handleClick = () => setIsOpen(false);
  return (
    <Link passHref href={props.href}>
      <ButtonLink onClick={handleClick} {...props}>
        {children}
      </ButtonLink>
    </Link>
  );
}

// * Animations: mobile nav
const staggerIn = keyframes`
  from {
    transform: translateX(-200px);
    padding: 5vh 0;
  }

  to {
    /* transform: translateX(140px); */
    transform: translateX(200px);

    padding: 2vh 0;
  }
`;

const staggerOut = keyframes`
  0% {
    transform: translateX(140px);
    padding: 2vh 0;
    display: block;
  }
  
  99% {
    transform: translateX(-200px);
    padding: 5vh 0;
    display: block;
  }
  100% {
    transform: translateX(-200px);
    padding: 5vh 0;
    display: none;
  }
`;

const showMenu = css`
  animation: ${staggerIn} calc(300ms + var(--index) * 100ms) linear normal both 1;
`;

const hideMenu = css`
  animation: ${staggerOut} calc(300ms + var(--index) * 200ms) ease-in-out normal both 1;
`;

// * Components: mobile nav
const MobileNavWrapper = styled.nav`
  display: var(--display);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  position: fixed;
  transform: translateX(-100%);

  z-index: var(--zIndex);
  /* width: var(--width);
  height: var(--height); */

  top: 80px;
  gap: 24px;
`;

const ButtonLink = styled.button`
  /* width: 142px; */

  background: none;
  border: none;

  margin-left: 24px;
  transform: translateX(-150px);
  font-family: Recursive;
  font-variation-settings: var(--recursive8);
  font-size: var(--size24)
  font-weight: 600;
  text-shadow: -1px 0px 1px black;
  color: palegoldenrod;

  ${(p) => (p.isOpen ? showMenu : p.isOpen !== null ? hideMenu : null)};

  &:hover {
    text-decoration: underline;
    color: gold;
    transition: all 0.4s ease;
    cursor: pointer;
  }
`;
