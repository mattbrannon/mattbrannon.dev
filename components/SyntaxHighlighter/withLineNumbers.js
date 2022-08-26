import { Pre, Line, LineNo, LineContent } from './styles';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { Button } from './CopyButton';
import { useRef, useState } from 'react';

async function copyText(selectedText) {
  try {
    await navigator.clipboard.writeText(selectedText);
  }
  catch (err) {
    //
  }
}

export const SyntaxHighlighter = ({ code, language, ...props }) => {
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
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <Button onClick={handleButtonClick}>{buttonText}</Button>
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent ref={ref}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        </>
      )}
    </Highlight>
  );
};
