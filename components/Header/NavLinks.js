import { link } from '@components/Links';
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
  const isTablet = useMediaQuery({ minWidth: breakpoints.tablet });
  const hasMounted = useHasMounted();

  if (!isTablet || !hasMounted) {
    return null;
  }
  return links.map((page) => {
    const isActive = route.split('/').filter((v) => v)[0] === page;
    return (
      <link.fancy key={page} isActive={isActive} href={`/${page}`}>
        {page.charAt(0).toUpperCase() + page.slice(1)}
      </link.fancy>
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
  min-height: 100%;
`;

const Container = styled.div`
  display: flex;

  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: var(--header-link-gap);

  @media (min-width: ${breakpoints.tablet}px) {
    margin-bottom: -6px;
  }
`;

const LinkWrapper = styled.span`
  background: transparent;
  border: none;
  font-size: var(--size16);

  &:hover {
    cursor: pointer;
  }
`;

const NameWrapper = styled.div`
  display: block;

  font-family: decovar;
  font-variation-settings: 'TRMA' 1000;
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
  /* margin-bottom: -8px; */

  @media (max-width: ${breakpoints.mobile}px) {
    margin-bottom: 0;
  }
`;

const NameLink = styled(link.next)`
  color: var(--myName);
  font-size: clamp(var(--size20), 1rem - -1vw, var(--size28));
  &:hover {
    text-decoration: none;
  }
`;
