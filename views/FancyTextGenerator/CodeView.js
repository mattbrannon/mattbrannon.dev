import { Basic } from '@components/SyntaxHighlighter';
import { ViewWrapper } from './styles';
import { fonts } from '@constants/fonts';

const formatDecovar = (str) => {
  const arr = str.split(',').map((s) => s.trim());
  const container = [];
  let sub = [];
  let i = 0;
  while (arr.length) {
    sub.push(arr.pop());
    if (i % 4 === 2) {
      container.push(sub);
      sub = [];
    }
    i++;
  }
  const formatted = container.map((sub) => sub.join(', ')).join(',\n    ');

  return formatted;
};

const getCss = ({ styles }) => {
  console.log(styles);
  const strokeWidth = styles.strokeWidth;
  const strokeColor = styles.strokeColor;
  const gradient = styles.gradient;
  const shadow = styles.shadow;
  const letterSpacing = styles.letterSpacing;
  const fontSize = styles.fontSize;
  const fontFamily = styles.fontFamily;
  // const fontSettings = props.css;

  const fontSettings = fontFamily === 'Decovar' ? formatDecovar(styles.current) : styles.current;

  // console.log(fontSettings.split(','));

  const staticCSS = `
.fancy-text {
  --fontFamily: ${fontFamily};
  --fontSize: ${fontSize};
  --fontVariationSettings: ${fontSettings};
  
  --letterSpacing: ${letterSpacing};
  --strokeWidth: ${strokeWidth};
  --strokeColor: ${strokeColor};

  --gradient: ${gradient};

  --shadow: ${shadow};

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-family: var(--fontFamily);
  font-size: var(--fontSize);
  font-variation-settings: var(--fontSettings);
  letter-spacing: var(--letterSpacing);
  background-image: var(--gradient);
}

.fancy-text:before {
  content: attr(data-content);
  position: absolute;
  z-index: -1;

  text-shadow: var(--shadow);
  -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
}
`;

  return staticCSS;
};

export const CodeView = ({ styles }) => {
  console.log(styles);
  return (
    <ViewWrapper
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ width: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, ease: 'anticipate' }}
    >
      <Basic language="css" code={getCss({ styles })} />
    </ViewWrapper>
  );
};
