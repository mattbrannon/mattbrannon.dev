import styled from 'styled-components';
import { Blockquote } from '../SideNote';
import { Color } from '@mattbrannon/color-tools';
import { fonts } from '@constants/index';
import Help from '@components/Help';

export default function Text({ children }) {
  return <P>{children}</P>;
}

export const P = styled.p`
  margin: 0 0 32px 0;
  font-size: clamp(var(--size16), 0.2vw + 1rem, var(--size20));
  line-height: 1.7;

  color: var(--color-text);

  ${Blockquote} & {
    background: palegoldenrod;
    color: #222;
    border-left: 8px solid gold;
    padding: 8px 16px;
    ${'' /* padding-left: 16px; */}
    border-radius: 0 6px 6px 0;
    line-height: 1.5;
    font-size: var(--size18);
    font-family: 'OpenSans';
    font-variation-settings: 'wdth' 80, 'wght' 600;
    width: 90%;
  }
`;

const Paragraph = styled(P)`
  margin: 0;
  @media (prefers-color-scheme: dark) {
    color: var(--fontColor);
    font-weight: var(--fontWeight);
    font-style: var(--fontStyle);
    font-size: var(--fontSize);
    font-family: var(--fontFamily);
    font-variation-settings: 'wght' 900;
  }
`;

const reduceStyles = (style) => {
  return Object.keys(style)
    .filter((key) => style[key])
    .reduce((acc, val) => {
      const key = '--' + val;
      acc[key] = style[val];
      return acc;
    }, {});
};

const getFontStyle = (props) => {
  const { families } = fonts;

  const colorName = Reflect.ownKeys(props)
    .filter((key) => Color.isNamedColor(key))
    .slice(0, 1)
    .join('');

  const family = Reflect.ownKeys(props)
    .filter((key) => families.map((fontName) => fontName.toLowerCase()).includes(key))
    .join('');

  const fontFamily = family.length ? family : 'inherit';
  const fontColor = colorName ? colorName : props.color;
  const fontWeight = props.bold ? 'bold' : props.bolder ? 'bolder' : 'normal';
  const fontSize = props.size ? `${props.size / 16}rem` : 'inherit';
  const fontStyle = props.italic ? 'italic' : props.oblique ? 'oblique' : 'inherit';

  const style = { fontFamily, fontColor, fontWeight, fontSize, fontStyle };
  return reduceStyles(style);
};

export const ColorText = (props) => {
  const style = getFontStyle(props);
  return (
    <Paragraph style={style} {...props}>
      {props.children}
    </Paragraph>
  );
};

export const ColorSpan = (props) => {
  const style = getFontStyle(props);
  return (
    <Span style={style} {...props}>
      {props.children}
    </Span>
  );
};

const Span = styled.span`
  color: var(--fontColor);
  font-weight: var(--fontWeight);
  font-style: var(--fontStyle);
  font-size: var(--fontSize);
  font-family: var(--fontFamily);
`;

export const StrongEm = ({ children }) => {
  return (
    <Strong>
      <EmText>{children}</EmText>
    </Strong>
  );
};

const EmText = styled.em`
  /* font-style: normal; */
  color: var(--color-em);
  /* font-weight: inherit; */
`;

export const Strong = styled.strong`
  color: var(--color-strong);

  ${Help} & {
    color: var(--sky);
  }
`;
