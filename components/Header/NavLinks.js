import FancyLink from '@components/FancyLink';
import { useCookie } from '@hooks/useCookie';
import { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { breakpoints } from '@constants/breakpoints';

export default function NavLinks(props) {
  const { pathname } = useContext(ThemeContext);
  const [ activeLink, setActiveLink ] = useState(pathname);
  // const [ hasNavigated, setHasNavigated ] = useCookie('navigated');

  const handleLinkClick = (e) => {
    const activeLink = props.clickedHome
      ? ''
      : e.target.attributes.href.value.slice(1);
    setActiveLink(activeLink);
    // if (!hasNavigated) {
    //   setHasNavigated();
    // }
  };

  useEffect(() => {
    if (props.clickedHome) {
      setActiveLink('');
      props.setClickedHome(false);
    }
  }, [ props ]);

  useEffect(() => {
    if (pathname) {
      const activeLink = pathname.slice(1).split('/')[0];
      setActiveLink(activeLink);
    }
  }, [ pathname ]);

  return (
    <Container>
      {props.links.map((link, i) => (
        <LinkWrapper key={i}>
          <FancyLink
            activeLink={activeLink}
            onClick={handleLinkClick}
            href={`/${link}`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </FancyLink>
        </LinkWrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: var(--header-link-gap);

  @media (max-width: ${breakpoints.mobile}px) {
    display: none;
  }
`;

const LinkWrapper = styled.span`
  background: transparent;
  border: none;
  font-size: var(--size16);
  /* margin: 0 clamp(0.5rem, 1rem + 2vw, 4rem);
  min-height: 0vh;

  &:last-child {
    margin-right: 0;
  } */

  margin-bottom: -6px;

  &:hover {
    cursor: pointer;
  }
`;
