import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr min(var(--max-page-width), 100%) 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
  & > * {
    grid-column: 2;
    padding: 0 var(--breathing-room);
  }
  min-height: 100%;
`;

export const FullBleed = styled.div`
  grid-column: 1 / -1;
  padding: 0;
`;

export const Main = styled.main.attrs(({ theme }) => {
  const totalSize = `${theme.headerSize + theme.footerSize}px`;
  return {
    style: {
      '--offsetHeight': totalSize,
    },
  };
})`
  --fontFamily: Recursive;
  --fontSize: clamp(24px, 8vw, 64px);
  --fontVariationSettings: 'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0;
  --strokeWidth: 0.021875em;
  --strokeColor: #000000;

  min-height: calc(100vh - var(--offsetHeight));
  max-width: var(--max-page-width);
  margin: 0 auto;
  padding: var(--breathing-room);
`;

export default Layout;

export const BlogList = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr)); */
  grid-template-columns: auto;
  /* grid-template-rows: repeat(auto-fit, minmax(min(100px, 100%), 1fr)); */
  gap: 8px;
`;

export const ToolsList = styled.nav`
  list-style: none;
  display: grid;
  gap: 18px;
  padding: 0;
`;

export const MiscToolsLayout = styled.main`
  display: grid;
  min-height: 100%;
  /* grid-template-columns: ${(p) => p.controlWidth + 'px' + ' 1fr'}; */
  grid-template-rows: var(--header-height) 1fr auto;
  grid-template-areas:
    'header header'
    'aside main'
    'footer footer';
`;

const StackLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;
`;

const TwoPanelLayout = styled.main.attrs(({ controlWidth }) => {
  const column = controlWidth ? controlWidth + 'px' + ' 1fr' : 'auto 1fr';
  return {
    style: {
      '--columns': column,
    },
  };
})`
  display: grid;
  min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
  grid-template-columns: var(--columns);
  grid-template-rows: var(--header-height) 1fr auto;
  grid-template-areas:
    'header header'
    'aside main'
    'footer footer';
`;

const Home = styled.main.attrs(({ theme }) => {
  const headerFooterTotal = theme.headerSize + theme.footerSize;
  return {
    style: {
      '--offsetHeight': headerFooterTotal + 'px',
    },
  };
})`
  --fontFamily: Recursive;
  --fontSize: clamp(24px, 8vw, 64px);
  --fontVariationSettings: 'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0;
  --strokeWidth: 0.021875em;
  --strokeColor: #000000;
  --padding-top: 16px;

  min-height: calc(100vh - var(--offsetHeight));
  max-width: var(--max-page-width);
  margin: 0 auto;
  padding: var(--padding-top) var(--breathing-room);

  display: grid;
  grid-template-rows: min-content auto;
  gap: 16px;

  @media (min-width: ${breakpoints.laptop}px) {
    --padding-top: calc(var(--offsetHeight) * 0.5);
  }
`;

const Page = styled.main`
  --padding-top: calc(var(--header-height) * 1.15);
  min-height: calc(100% - (var(--header-height) + var(--footer-height)));
  max-width: var(--max-page-width);
  margin: var(--header-height) auto 128px;
  padding: 0 var(--breathing-room);

  /* padding: var(--padding-top) var(--breathing-room); */
`;

const BlogPage = styled(Page)`
  @media (max-width: ${breakpoints.laptop}px) {
    max-width: 540px;
  }
`;

const FancyTextGeneratorLayout = styled.main.attrs(({ theme, controlWidth }) => {
  const headerFooterTotal = theme.headerSize + theme.footerSize + 'px';

  return {
    style: {
      '--offsetHeight': headerFooterTotal,
      '--controlWidth': controlWidth + 'px',
    },
  };
})`
  display: flex;
  flex-direction: column-reverse;
  height: calc(100vh - var(--offsetHeight));

  @media (min-width: ${breakpoints.laptop}px) {
    display: grid;
    grid-template-columns: 336px auto;
  }
`;

// const FancyTextGeneratorLayout = styled.main.attrs(({ theme }) => {
//   const headerFooterTotal = theme.headerSize + theme.footerSize + 'px';
//   return {
//     style: {
//       '--offsetHeight': headerFooterTotal,
//     },
//   };
// })`
//   display: grid;
//   height: calc(100vh - var(--offsetHeight));
// `;

export const Layout404 = styled.main.attrs(({ theme }) => {
  const totalSize = `${theme.headerSize + theme.footerSize}px`;
  return {
    style: {
      '--offsetHeight': totalSize,
    },
  };
})`
  --fontFamily: Recursive;
  --fontSize: clamp(24px, 8vw, 64px);
  --fontVariationSettings: 'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0;
  --strokeWidth: 0.021875em;
  --strokeColor: #000000;

  min-height: calc(100vh - var(--offsetHeight));
  max-width: var(--max-page-width);
  margin: 0 auto;
  padding: var(--breathing-room);
`;

export const layout = {
  stack: StackLayout,
  twoPanel: TwoPanelLayout,
  home: Home,
  page: Page,
  fancyTextGenerator: FancyTextGeneratorLayout,
  notFound: Layout404,
  blog: BlogPage,
};
