import { Pre, Container, CopyButton } from './styles';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { useRef, useState } from 'react';

async function copyText(selectedText) {
  try {
    await navigator.clipboard.writeText(selectedText);
  }
  catch (err) {
    //
  }
}

export const Basic = ({ code, language, ...props }) => {
  const ref = useRef();
  const [buttonText, setButtonText] = useState('Copy Snippet');

  const handleButtonClick = () => {
    if (document.body.createTextRange) {
      // ms
      const range = document.body.createTextRange();
      range.moveToElementText(ref.current);
      range.select();
    }
    else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      selection.removeAllRanges();
      selection.addRange(range);
      copyText(selection.toString())
        .then(selection.removeAllRanges())
        .then(() => setButtonText('Copied to clipboard!'))
        .catch(console.error);
    }
  };

  return (
    // <div style={{ margin: '0 0 32px 0', height: '100%', background: 'red' }}>
    <Container>
      <CopyButton onClick={handleButtonClick}>{buttonText}</CopyButton>
      <Highlight {...defaultProps} theme={theme} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre ref={ref} className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        )}
      </Highlight>
    </Container>
    // </div>
  );
};
