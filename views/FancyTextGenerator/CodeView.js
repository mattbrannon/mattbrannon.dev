import { Basic } from '@components/SyntaxHighlighter';
import { ViewWrapper } from './styles';
import { fonts } from '@constants/fancyTextGenerator';
import { AnimatePresence } from 'framer-motion';

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

const getFontLink = (fontFamily) => {
  const currentFont = fonts.find((font) => font.name === fontFamily);
  return {
    github: currentFont.github,
    homepage: currentFont.homepage,
  };
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

  const { homepage, github } = getFontLink(fontFamily);

  const fontSettings =
    fontFamily === 'Decovar'
      ? formatDecovar(styles.fontVariationSettings)
      : styles.fontVariationSettings;

  // console.log(fontSettings.split(','));

  const staticCSS = `

  /*

  ${fontFamily}
    homepage: ${homepage}
    github: ${github}
  
  */


  .fancy-text {
    --fontFamily: ${fontFamily};
    --fontSize: ${fontSize}px;
    --fontVariationSettings: ${fontSettings};
    
    --letterSpacing: ${letterSpacing}em;
    --strokeWidth: ${strokeWidth}em;
    --strokeColor: ${strokeColor};

    --gradient: ${gradient};

    --shadow: ${shadow};

    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;

    font-family: var(--fontFamily);
    font-size: var(--fontSize);
    font-variation-settings: var(--fontVariationSettings);
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
    <AnimatePresence exitBeforeEnter>
      <ViewWrapper
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        exit={{ width: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.8, ease: 'anticipate' }}
        key={styles.fontFamily}
      >
        <Basic language="css" code={getCss({ styles })} />
      </ViewWrapper>
    </AnimatePresence>
  );
};
