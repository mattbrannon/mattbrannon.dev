import styled from 'styled-components';
import { Burger } from './Burger';
import { Portal } from '@components/Portal';
import { InternalLink } from '@components/Links';
import FocusTrap from 'focus-trap-react';

const links = [
  { href: '/', text: 'Home' },
  { href: '/blog', text: 'Blog' },
  { href: '/apps', text: 'Apps' },
  { href: '/misc', text: 'Misc' },
  { href: '/contact', text: 'Contact' },
];

export function MobileMenu({ ...props }) {
  const { dialogIsOpen } = props;
  return (
    <Portal>
      <FocusTrap active={dialogIsOpen}>
        <div>
          <Burger {...props} />
          <Overlay {...props}>
            <NavContainer {...props}>
              <Navigation {...props} />
            </NavContainer>
          </Overlay>
        </div>
      </FocusTrap>
    </Portal>
  );
}

function Navigation({ ...props }) {
  const handleClick = () => {
    props.setDialogIsOpen(false);
  };
  return (
    <List>
      {links.map(({ href, text }, i) => {
        props = { ...props, i };
        return (
          <ListItem key={href} onClick={handleClick} {...props}>
            <ButtonLink href={href}>{text}</ButtonLink>
          </ListItem>
        );
      })}
    </List>
  );
}

const getOverlayStyles = ({ dialogIsOpen }) => {
  return {
    timeout: dialogIsOpen ? '0.1s' : '0.5s',
    opacity: dialogIsOpen ? 1 : 0,
    delay: dialogIsOpen ? 0 : '1.5s',
    zIndex: dialogIsOpen ? 999 : -1,
    left: dialogIsOpen ? 0 : '-100%',
    display: dialogIsOpen ? 'block' : 'none',
    visibility: dialogIsOpen ? 'visible' : 'hidden',
    blur: dialogIsOpen ? 'blur(8px)' : 'blur(0px)',
    background: dialogIsOpen ? 'hsl(220, 35%, 6%, 0.93)' : 'hsl(220, 35%, 6%, 0)',
  };
};

const Overlay = styled.div`
  --delay: ${(p) => getOverlayStyles(p).delay};
  --zIndex: ${(p) => getOverlayStyles(p).zIndex};
  --left: ${(p) => getOverlayStyles(p).left};
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;

  left: var(--left);
  z-index: var(--zIndex);

  transition: left 0.2s ease-in var(--delay), z-index 0.2s linear var(--delay);
`;

const List = styled.ul`
  display: grid;
  place-content: center;
  text-align: center;
  gap: 32px;
  list-style: none;
  padding: 0;
  height: inherit;
`;

const ListItem = styled.li`
  --transform: ${({ dialogIsOpen }) => (dialogIsOpen ? 'translate(0)' : 'translate(-500px)')};

  --delay: ${({ i }) => i * 100}ms;

  transform: var(--transform);
  transition: all 0.5s ease-in-out var(--delay);
  font-size: 1.225rem;
  font-weight: 700;
`;

// ${({ dialogIsOpen }) => (dialogIsOpen ? '0.1s' : '0.5s')};

const NavContainer = styled.div`
  --opacity: ${(p) => getOverlayStyles(p).opacity};
  /* --delay: ${(p) => getOverlayStyles(p).delay}; */
  --timeout: ${(p) => getOverlayStyles(p).timeout};

  --visibility: ${(p) => getOverlayStyles(p).visibility};
  --background: ${(p) => getOverlayStyles(p).background};
  visibility: var(--visibility);
  background-color: var(--background);
  opacity: var(--opacity);

  place-content: center;
  place-items: center;
  height: 100%;
  width: 100%;

  /* background: hsl(200, 14%, 90%, 0.6); */
  transition: opacity 0.5s ease-out var(--timeout), background-color 0.5s ease-out var(--timeout),
    visibility 0.5s linear var(--timeout);
`;

const ButtonLink = styled(InternalLink)`
  background: none;
  border: none;
  font-family: Recursive;
  font-variation-settings: var(--recursive8);
  font-size: var(--size24);
  font-weight: 600;
  text-shadow: -1px 0px 1px black;
  color: palegoldenrod;
  transform: translateX(-500px);

  &:hover {
    text-decoration: underline;
    color: gold;
    transition: all 0.4s ease;
    cursor: pointer;
  }
`;
