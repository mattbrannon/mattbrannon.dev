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

const NameWrapper = styled.span`
  display: block;
  font-family: recursive;
  font-variation-settings: 'MONO' 0, 'CRSV' 0, 'CASL' 0.35, 'wght' 800, 'slnt' 0;
  /* var(--recursive4); */
  color: var(--myName);

  margin: 0;
  transition: all 70ms ease;
  outline: none;

  &:hover {
    color: var(--myNameHover);
    text-decoration: none;
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.mobile}px) {
    font-size: var(--size36);
    --offset: 0.018em;
    --positive-offset: calc(var(--offset) * 1);
    --negative-offset: calc(var(--offset) * -1);

    --color: var(--header-background);
    --outline: hsl(210, 40%, 76%, 0.75);
    --hover: ;
  }

  @media (prefers-color-scheme: dark) {
    --outline: hsl(210, 40%, 76%, 0.75);
    --hover: #333444;
  }
`;

const Left = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: var(--header-link-gap);
  position: relative;
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
