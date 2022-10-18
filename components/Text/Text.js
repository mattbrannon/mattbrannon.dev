import styled from 'styled-components';
import { Blockquote } from '../SideNote';
import { Color } from '@mattbrannon/color-tools';
import { fonts } from '@constants/index';
import Help from '@components/Help';

export const P = styled.p`
  font-family: Inter;
  font-size: var(--size18);
  font-variation-settings: 'wdth' 100, 'wght' 555;
  color: var(--color-text);
`;

// const Paragraph = styled(P)`
//   margin: 0;
//   @media (prefers-color-scheme: dark) {
//     color: var(--fontColor);
//     font-weight: var(--fontWeight);
//     font-style: var(--fontStyle);
//     font-size: var(--fontSize);
//     font-family: var(--fontFamily);
//     font-variation-settings: 'wght' 900;
//   }
// `;

// const reduceStyles = (style) => {
//   return Object.keys(style)
//     .filter((key) => style[key])
//     .reduce((acc, val) => {
//       const key = '--' + val;
//       acc[key] = style[val];
//       return acc;
//     }, {});
// };

// const getFontStyle = (props) => {
//   const { families } = fonts;

//   const colorName = Reflect.ownKeys(props)
//     .filter((key) => Color.isNamedColor(key))
//     .slice(0, 1)
//     .join('');

//   const family = Reflect.ownKeys(props)
//     .filter((key) => families.map((fontName) => fontName.toLowerCase()).includes(key))
//     .join('');

//   const fontFamily = family.length ? family : 'inherit';
//   const fontColor = colorName ? colorName : props.color;
//   const fontWeight = props.bold ? 'bold' : props.bolder ? 'bolder' : 'normal';
//   const fontSize = props.size ? `${props.size / 16}rem` : 'inherit';
//   const fontStyle = props.italic ? 'italic' : props.oblique ? 'oblique' : 'inherit';

//   const style = { fontFamily, fontColor, fontWeight, fontSize, fontStyle };
//   return reduceStyles(style);
// };

// export const ColorText = (props) => {
//   const style = getFontStyle(props);
//   return (
//     <Paragraph style={style} {...props}>
//       {props.children}
//     </Paragraph>
//   );
// };

// export const ColorSpan = (props) => {
//   const style = getFontStyle(props);
//   return (
//     <Span style={style} {...props}>
//       {props.children}
//     </Span>
//   );
// };

// const Span = styled.span`
//   color: var(--fontColor);
//   font-weight: var(--fontWeight);
//   font-style: var(--fontStyle);
//   font-size: var(--fontSize);
//   font-family: var(--fontFamily);
// `;

// export const StrongEm = ({ children }) => {
//   return (
//     <Strong>
//       <EmText>{children}</EmText>
//     </Strong>
//   );
// };

// const EmText = styled.em`
//   /* font-style: normal; */
//   color: var(--color-em);
//   /* font-weight: inherit; */
// `;

// export const Strong = styled.strong`
//   color: var(--color-strong);

//   ${Help} & {
//     color: var(--sky);
//   }
// `;
