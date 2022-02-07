// eslint-disable-next-line no-unused-vars
// import Prism from 'prismjs';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

const SyntaxHighlighter = ({ children, ...props }) => {
  const code = children.props.children;
  const language =
    props.language || children.props.className?.replace('language-', '').trim();
  const ref = useRef();
  const [ buttonText, setButtonText ] = useState('Copy Snippet');

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
        .catch(console.log);
    }
  };

  useEffect(() => {
    if (buttonText === 'Copied to clipboard!') {
      setTimeout(() => setButtonText('Copy Snippet'), 5000);
    }
  }, [ buttonText, setButtonText ]);

  return (
    <div style={{ margin: '0 0 32px 0' }}>
      <Container>
        <Highlight {...defaultProps} code={code} language={language} theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              <Button handleButtonClick={handleButtonClick}>{buttonText}</Button>
              <pre ref={ref} className={className} style={{ ...style, margin: 0 }}>
                {tokens.slice(0, -1).map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            </>
          )}
        </Highlight>
      </Container>
    </div>
  );
};

const Container = styled.div`
  ${'' /* margin-bottom: 32px; */}
  position: relative;
  --code-background: hsl(208, 86%, 8%);
  ${'' /* margin-bottom: 80px;
  margin-top: 48px; */}
  ${'' /* margin-bottom: 32px; */}
`;

const CopyButton = styled.button`
  position: absolute;
  right: 0px;
  top: -12px;
  color: hsl(0, 0%, 60%);
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: var(--size18);

  &:hover {
    cursor: pointer;
    color: hsl(0, 0%, 80%);
  }

  transition: color 0.1s ease-in-out;
`;

export default SyntaxHighlighter;

async function copyText(selectedText) {
  try {
    await navigator.clipboard.writeText(selectedText);
  } catch (err) {
    // console.error('Failed to copy: ', err);
  }
}

const Button = ({ children, ...props }) => {
  // useEffect(() => {});

  return (
    <CopyButton onClick={() => props.handleButtonClick()} {...props}>
      {children}
    </CopyButton>
  );
};

// Source: http://stackoverflow.com/a/11128179/2757940

// if (document.body.createTextRange) {
//   // ms
//   const range = document.body.createTextRange();
//   range.moveToElementText(env.element);
//   range.select();
// }
// else if (window.getSelection) {
//   // moz, opera, webkit
// const selection = window.getSelection();
// const range = document.createRange();
// range.selectNodeContents(env.element);
// selection.removeAllRanges();
// selection.addRange(range);
// copyText(selection.toString())
//   .then(selection.removeAllRanges())
//   .then(() => {
//     button.innerHTML = 'Snippet Copied to clipboard!';
//     button.style.color = 'white';
//     button.style.transition = 'all 0.3s ease';
//   })
//   .then(() =>
//     setTimeout(() => {
//       button.innerHTML = 'Copy snippet';
//     }, 2000)
//   )
//   .catch(console.log);
// }
