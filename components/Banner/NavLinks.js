import { FancyLink, Link } from '@components/Links';
import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@hooks/useMediaQuery';
import SkipLink from './SkipLink';
import { DarkModeToggle } from './DarkModeToggle';
import { useHasMounted } from '@hooks/useHasMounted';

export function NavLinks() {
  return (
    <Nav>
      <NameBanner />
      <Container>
        <Navigation />
        <DarkModeToggle />
      </Container>
    </Nav>
  );
}

const Navigation = () => {
  const links = ['blog', 'apps', 'misc', 'contact'];
  const { route } = useRouter();
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const hasMounted = useHasMounted();

  if (isMobile || !hasMounted) {
    return null;
  }
  return links.map((link) => {
    const isActive = route.split('/').filter((v) => v)[0] === link;
    return (
      <LinkWrapper key={link}>
        <FancyLink $isActive={isActive} href={`/${link}`}>
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </FancyLink>
      </LinkWrapper>
    );
  });
};

const NameBanner = () => {
  return (
    <Left>
      <SkipLink>Skip to main content</SkipLink>

      <NameWrapper>
        <NameLink href="/">Matt Brannon</NameLink>
      </NameWrapper>
    </Left>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;

  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: var(--header-link-gap);
`;

const LinkWrapper = styled.span`
  background: transparent;
  border: none;
  font-size: var(--size16);

  margin-bottom: -6px;

  &:hover {
    cursor: pointer;
  }
`;

const NameWrapper = styled.div`
  display: block;
  font-family: recursive;
  font-variation-settings: 'MONO' 0, 'CRSV' 0, 'CASL' 0.35, 'wght' 800, 'slnt' 0;
  /* var(--recursive4); */
  color: var(--myName);

  transition: all 70ms ease;
  outline: none;

  &:hover {
    color: var(--myNameHover);
    text-decoration: none;
    cursor: pointer;
  }
`;

const Left = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: var(--header-link-gap);
  position: relative;
  margin-bottom: -8px;

  @media (max-width: ${breakpoints.mobile}px) {
    margin-bottom: 0;
  }
`;

const NameLink = styled(Link)`
  color: var(--myName);
  font-size: var(--size28);
  &:hover {
    text-decoration: none;
  }
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size24);
  }
`;
