import FancyLink from '@components/FancyLink';
import { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';

export default function NavLinks({ clickedHome, setClickedHome }) {
  const { pathname } = useContext(ThemeContext);
  const [ activeLink, setActiveLink ] = useState(pathname);

  const handleLinkClick = (e) => {
    // setTimeout(() => {
    //   setHasPlayed(true);
    // }, 1000);
    const activeLink = clickedHome ? '' : e.target.attributes.href.value.slice(1);
    setActiveLink(activeLink);
  };

  useEffect(() => {
    if (clickedHome) {
      setActiveLink('');
      setClickedHome(false);
    }
  }, [ setClickedHome, clickedHome ]);

  useEffect(() => {
    if (pathname) {
      const activeLink = pathname.slice(1).split('/')[0];
      setActiveLink(activeLink);
    }
  }, [ pathname ]);

  const links = [ 'blog', 'apps', 'contact' ];

  return (
    <>
      {links.map((link, i) => (
        <LinkWrapper key={i}>
          <FancyLink activeLink={activeLink} onClick={handleLinkClick} href={`/${link}`}>
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </FancyLink>
        </LinkWrapper>
      ))}
    </>
  );
}

const LinkWrapper = styled.span`
  background: transparent;
  border: none;
  font-size: var(--size16);
  margin: 0 clamp(0.5rem, 1rem + 2vw, 4rem);
  min-height: 0vh;

  &:last-child {
    margin-right: 0;
  }
  margin-bottom: -6px;
`;
