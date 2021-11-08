import { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import NavLinks from './NavLinks';
import { Overlay } from './Overlay';
import HamburgerMenu from './Hamburger';
import MobileNav from './MobileNav';
import FocusTrap from 'focus-trap-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Link from 'next/link';
import { FullBleed } from '../Layout';

export default function Header() {
  const { isOpen } = useContext(ThemeContext);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const Navigation = isMobile ? HamburgerMenu : NavLinks;
  const [ clickedHome, setClickedHome ] = useState(false);

  return (
    <>
      <FullBleedWrapper>
        <MaxWidthFlexContainer>
          <Left>
            <Link href="/">
              <BrandLogoWrapper onClick={() => setClickedHome(true)}>Matt Brannon</BrandLogoWrapper>
            </Link>
          </Left>
          <Right>
            <Navigation setClickedHome={setClickedHome} clickedHome={clickedHome} />
          </Right>
        </MaxWidthFlexContainer>

        <FocusTrap active={isOpen}>
          <div tabIndex={-1}>
            <HamburgerMenu isOpen={isOpen} />
            <Overlay />
            <Overlay />
            <MobileNav />
          </div>
        </FocusTrap>
      </FullBleedWrapper>
      {/* <Spacer axis="vertical" size={80} /> */}
    </>
  );
}

// export default function Header() {
//   const { isOpen } = useContext(ThemeContext);
//   const scrollWidth = useScrollWidth();
//   const isMobile = useMediaQuery({ maxWidth: 600 });
//   const Navigation = isMobile ? HamburgerMenu : NavLinks;
//   const [ clickedHome, setClickedHome ] = useState(false);
//   return (
//     <StickyWrapper>
//       <MaxWidthFlexContainer>
//         <Left>
//           <Link href="/">
//             <BrandLogoWrapper onClick={() => setClickedHome(true)}>
//               Matt Brannon
//             </BrandLogoWrapper>
//           </Link>
//         </Left>
//         <Right>
//           <Navigation setClickedHome={setClickedHome} clickedHome={clickedHome} />
//         </Right>
//       </MaxWidthFlexContainer>
//     </StickyWrapper>
//   );
// }

const FullBleedWrapper = styled(FullBleed)`
  height: 80px;
  ${'' /* width: 100%; */}
  background-color: var(--header-background);
  grid-row: 1;
  grid-column: 1 / -1;
  padding: 0 var(--breathing-room);
  position: sticky;
  top: 0;
  z-index: 1;
`;

const MaxWidthFlexContainer = styled.div`
  max-width: var(--max-width);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

// const HeaderWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: ${(p) => p.scrollWidth}px;
//   isolation: isolate;
//   grid-area: header;
//   height: 80px;
//   ${'' /* background: var(--header-background); */}
//   width: 100%;
//   ${'' /* padding: 0 var(--breathing-room); */}
//   z-index: 1;

//   @media (prefers-color-scheme: dark) {
//     border-bottom: 1px solid black;
//   }
// `;

const BrandLogoWrapper = styled.a.attrs({
  tabIndex: 0,
})`
  font-size: 1.8rem;
  color: white;
  color: var(--orange5);
  font-family: 'Roboto Flex';

  /* --wght: 'wght' 320;
  --wdth: 'wdth' 82;
  --opsz: 'opsz' 12;
  --slnt: 'slnt' 15;
  --GRAD: 'GRAD' 85;
  --XTRA: 'XTRA' 0; */

  font-variation-settings: 'wght' 320, 'wdth' 42, 'opsz' 44;
  /* font-variation-settings: var(--wght), var(--wdth), var(--opsz), var(--slnt), var(--GRAD), */
  /* var(--XTRA); */

  transition: all 140ms ease-in-out;

  &:hover {
    --wght: 'wght' 120;
    --wdth: 'wdth' 882;
    --opsz: 'opsz' 184;
    --slnt: 'slnt' -2;
    --GRAD: 'GRAD' 765;
    --XTRA: 'XTRA' 372;
    cursor: pointer;
    text-decoration: none;
    color: var(--orange0);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--orange5);
    &:hover {
      color: var(--orange1);
    }
  }
`;

const Left = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
`;

const Right = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;
