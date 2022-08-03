import VisuallyHidden from '@components/VisuallyHidden';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
/**
 *
 * * Mobile navigation menu
 *
 */

export default function MobileNav() {
  const context = useContext(ThemeContext);
  const labels = [ 'Home', 'Blog', 'Apps', 'Misc', 'Contact' ];
  const [ isFirstPaint, setIsFirstPaint ] = useState(true);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        context.setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  useEffect(() => {
    if (isFirstPaint) {
      context.setIsOpen(null);
      setIsFirstPaint(false);
    }
  }, [ context, isFirstPaint ]);

  return (
    <MobileNavWrapper
      isOpen={context.isOpen}
      ref={ref}
      style={{
        '--zIndex': context.isOpen ? '999994' : '-10',
      }}
    >
      <VisuallyHidden>
        <h2>Internal Navigation Links for Mobile Devices</h2>
      </VisuallyHidden>
      <>
        {labels.map((label, index) => {
          const href = index > 0 ? `/${labels[index].toLowerCase()}` : '/';
          return (
            <NavLink tabIndex={0} href={href} key={index} i={index + 1} isOpen={context.isOpen}>
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
  const ref = useRef();

  useEffect(() => {
    const frames = [
      { transform: 'translateX(-500px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ];

    const options = {
      duration: 800,
      delay: props.i * 100 + 25,
      easing: 'cubic-bezier(.55,.36,.51,1.41)',
      fill: 'forwards',
    };

    const animation = ref.current.animate(frames, options);
    animation.pause();

    if (context.isOpen !== null) {
      if (context.isOpen) {
        ref.current.style.setProperty('display', 'grid');
        animation.play();
      }
      else {
        const closing = ref.current.animate(frames.reverse(), {
          ...options,
          delay: props.i * 50,
          duration: options.duration / 2,
        });
        closing.finished.then(() => {
          animation.finished.then(() => {
            ref.current.style.setProperty('display', 'none');
          });
        });
      }
    }
  }, [ context, props.i ]);

  return (
    <Link passHref href={props.href} legacyBehavior>
      <ButtonLink ref={ref} onClick={() => context.setIsOpen(false)} {...props}>
        {children}
      </ButtonLink>
    </Link>
  );
}

const MobileNavWrapper = styled.nav`
  display: ${(p) => (p.theme.isOpen ? 'grid' : 'none')};
  justify-items: baseline;
  justify-content: center;
  align-items: baseline;
  align-content: space-between;
  height: 30vh;

  flex: 1;
  position: absolute;
  left: 0;
  width: 100%;

  z-index: var(--zIndex);
  top: calc(var(--header-height) + 64px);
  gap: 24px;
  ${'' /* transition: ${(p) => setTransition(p)}; */}
`;

const ButtonLink = styled.button`
  background: none;
  border: none;
  font-family: Recursive;
  font-variation-settings: var(--recursive8);
  font-size: var(--size24);
  font-weight: 600;
  text-shadow: -1px 0px 1px black;
  color: palegoldenrod;
  transform: translateX(-500px); 
  opacity: 0

  &:hover {
    text-decoration: underline;
    color: gold;
    transition: all 0.4s ease;
    cursor: pointer;
  }
`;
