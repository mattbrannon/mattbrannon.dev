import styled, { ThemeContext } from 'styled-components/macro';
import FancyLink from '../FancyLink';
import { useEffect, useState, useContext } from 'react';

export default function NavLinks({ clickedHome, setClickedHome }) {
  const { pathname } = useContext(ThemeContext);
  const [ activeLink, setActiveLink ] = useState(pathname);

  const handleLinkClick = (e) => {
    const activeLink = clickedHome ? '' : e.target.attributes.href.value.slice(1);
    setActiveLink(activeLink);
  };

  useEffect(() => {
    if (clickedHome) {
      setActiveLink('');
      setClickedHome(false);
    }
  }, [ clickedHome ]);

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
  font-size: 1rem;
  margin: 0 clamp(0.5rem, 1rem + 2vw, 4rem);
  min-height: 0vh;

  &:last-child {
    margin-right: 0;
  }
  margin-bottom: -6px;
`;
