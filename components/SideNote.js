import styled from 'styled-components';
import { CardHeading } from './Headings';
import Link from 'next/link';

// export default function SideNote({ children }) {
//   return <AsideWrapper>{children}</AsideWrapper>;
// }

// export const Aside = styled.blockquote`
//   display: block;
//   margin: 1em 0;
//   background: palegoldenrod;
//   padding: 16px;
//   padding-right: 64px;
//   border-top-right-radius: 8px;
//   border-bottom-right-radius: 8px;
//   font-family: 'OpenSans', system-ui, sans-serif;
//   font-variation-settings: 'wdth' 90, 'wght' 600;
//   border-left: 6px solid gold;

//   color: black;

//   @media (prefers-color-scheme: dark) {
//     color: #333;
//   }
// `;

// const Small = styled.small`
//   color: var(--off-white);
// `;

const BlockQuote = styled.blockquote`
  display: block;
  margin: 1em 0;
  background: palegoldenrod;
  padding: 16px;
  padding-right: 64px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-family: 'OpenSans', system-ui, sans-serif;
  font-variation-settings: 'wdth' 90, 'wght' 600;
  border-left: 6px solid gold;
  color: black;
  font-family: OpenSans;
  font-variation-settings: 'wdth' 75, 'wght' 555;
`;

export const SideNote = ({ children }) => {
  return (
    <BlockQuote>
      <>{children}</>
    </BlockQuote>
  );
};

// const P = styled.p`
//   font-family: OpenSans;
//   color: black;
//   font-family: OpenSans !important;
// font-variation-settings: 'wdth' 75, 'wght' 700;
// `;

// const CardWrapper = styled.div`
//   border: 1px solid black;
//   border-radius: 6px;
//   padding: 16px;
//   background: var(--basic-card-background);
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   min-height: 160px;
// `;

// const Card = ({ title, href, children }) => {
//   return (
//     <li>
//       <Link href={href}>
//         <CardWrapper>
//           <CardHeading>{title}</CardHeading>
//           <small>{children}</small>
//         </CardWrapper>
//       </Link>
//     </li>
//   );
// };

// export const CardLink = ({ title, href, children }) => {
//   return (
//     <Link href={href}>
//       <CardWrapper>
//         <CardHeading>{title}</CardHeading>
//         <small>{children}</small>
//       </CardWrapper>
//     </Link>
//   );
// };
