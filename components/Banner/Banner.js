import { ThemeContext } from 'styled-components';
import { MaxWidthWrapper } from 'components/MaxWidthWrapper';
// import { NavLinks } from './NavLinks'
import { forwardRef, memo, useContext } from 'react';
import { breakpoints } from '@constants/breakpoints';
import { link } from '@components/Links';
import SkipLink from './SkipLink';

import { useRouter } from 'next/router';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { DarkModeToggle } from './DarkModeToggle';
import { useHasMounted } from '@hooks/useHasMounted';
import { Header, Left, Right, NameWrapper, NameLink, Nav, LinkWrapper } from './styles';

function ForwardBanner({ ...props }, ref) {
  return (
    <Header ref={ref} {...props}>
      <MaxWidthWrapper>
        <Nav>
          <Left>
            <SkipLink>Skip to main content</SkipLink>

            <NameWrapper>
              <NameLink href="/">Matt Brannon</NameLink>
            </NameWrapper>
          </Left>
          <Right>
            <Navigation />
            <DarkModeToggle />
          </Right>
        </Nav>
      </MaxWidthWrapper>
    </Header>
  );
}

export const Banner = memo(forwardRef(ForwardBanner));

const Navigation = () => {
  const links = ['blog', 'apps', 'misc', 'contact'];
  const { route } = useRouter();
  const isMobile = useMediaQuery({ maxWidth: breakpoints.tablet });
  const hasMounted = useHasMounted();
  const context = useContext(ThemeContext);

  if (isMobile || !hasMounted) {
    return null;
  }

  const onClick = () => {
    context.setHasRun(true);
    setTimeout(() => context.setBubblesDone(true), 1000);
  };

  return links.map((pageLink) => {
    const isActive = route.split('/').filter((v) => v)[0] === pageLink;

    return (
      <LinkWrapper onClick={onClick} key={pageLink}>
        <link.fancy legacyBehavior={false} $isActive={isActive} href={`/${pageLink}`}>
          {pageLink.charAt(0).toUpperCase() + pageLink.slice(1)}
        </link.fancy>
      </LinkWrapper>
    );
  });
};
