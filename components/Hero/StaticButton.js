import styled from '@styled-components';
import Link from 'next/link';
// export default function Buttons({ cardDimensions, ...props }) {
//   const [ hasCookie, setCookie ] = useCookie('navigated');

//   // const hasNavigated = useCookie('navigated');

//   console.log('button props', props);

//   if (hasCookie) {
//     return (
//       <Container>
//         <ButtonWrapper>
//           <Button>Contact me</Button>
//         </ButtonWrapper>
//         <ButtonWrapper>
//           <Button>See my work</Button>
//         </ButtonWrapper>
//       </Container>
//     );
//   }
//   else {
//     const MotionButtons = dynamic(() => import('./MotionButtons'));
//     return <MotionButtons setCookie={setCookie} cardDimensions={cardDimensions} />;
//   }
// }

// const Container = styled.div`
//   --circle-size: 40px;
//   --half-circle: calc(var(--circle-size) * 0.5);
//   --left-x: calc(50% + var(--half-circle));
//   --right-x: calc(-50% - var(--half-circle));

//   --left-translate: var(--left-x), 0;
//   --right-translate: var(--right-x), 0;

//   display: flex;
//   gap: 8px;
//   flex-wrap: wrap;

//   justify-content: center;
//   @media (min-width: 564px) {
//     justify-content: flex-end;
//   }
// `;

export const ButtonWrapper = styled.div`
  ${'' /* width: 140px;
  height: 40px;
  padding: 4px;
  position: relative;
  display: grid;
  placeitems: center;
  margin-right: 8px;
  margin-left: 8px; */}

  ${'' /* display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 4 35%; */}

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  background: var(--tealBg);
  border-radius: 6px;
  padding: 12px 0;
`;

export const Button = styled.button`
  background: var(--tealBg);
  color: white;

  font-size: clamp(var(--size16), 2vw + 1rem, var(--size21));
  font-family: 'Open Sans';
  font-variation-settings: 'wdth' 85, 'wght' 655;
  text-shadow: 0.05em 0.05em 0.1em black;
  border: none;

  height: 100%;
  white-space: nowrap;

  background: var(--tealBg);
  transition: all 0.2s linear;

  border-radius: 6px;
`;

function StaticButton({ children }) {
  const href = children.toLowerCase() === 'view my work' ? '/apps' : '/contact';
  return (
    <Link passHref href={href}>
      <ButtonWrapper>
        <Button>{children}</Button>
      </ButtonWrapper>
    </Link>
  );
}

export default StaticButton;

// ${'' /* background: var(--tealBg);
// color: white;
// padding: 3px;
// font-size: clamp(var(--size12), 2vw + 0.5rem, var(--size21));
// font-family: 'Open Sans';
// font-variation-settings: 'wdth' 85, 'wght' 655;
// text-shadow: 0.05em 0.05em 0.1em black;
// border: none;
// border-radius: 4px;
// min-width: 140px;
// opacity: 100%;
// background: var(--tealBg); */}
