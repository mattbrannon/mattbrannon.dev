// eslint-disable-next-line no-unused-vars
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const SyntaxHighlighter = ({ children, ...props }) => {
  const code = children.props.children;
  const language = props.language || children.props.className?.replace("language-", "").trim();
  const ref = useRef();
  const [buttonText, setButtonText] = useState("Copy Snippet");

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
        .then(() => setButtonText("Copied to clipboard!"))
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (buttonText === "Copied to clipboard!") {
      setTimeout(() => setButtonText("Copy Snippet"), 5000);
    }
  }, [buttonText, setButtonText]);

  return (
    <div style={{ margin: "0 0 32px 0" }}>
      <Container>
        <Highlight {...defaultProps} code={code} language={language} theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              <Button tabIndex={-1} handleButtonClick={handleButtonClick}>
                {buttonText}
              </Button>
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
  position: relative;
  --code-background: hsl(208, 86%, 8%);
`;

const CopyButton = styled.button`
  position: absolute;
  right: 0px;
  top: -10px;
  color: hsl(0, 0%, 60%);
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;

  font-size: var(--size18);

  &:hover {
    cursor: pointer;
    color: hsl(0, 0%, 80%);
  }

  &:focus {
    outline: 2px solid hsl(210, 100%, 75%, 1);
    border-radius: 12px;
    outline-offset: -12px;
  }

  transition: color 0.1s ease-in-out;
`;

export default SyntaxHighlighter;

async function copyText(selectedText) {
  try {
    await navigator.clipboard.writeText(selectedText);
  }
  catch (err) {
    //
  }
}

const Button = ({ children, ...props }) => {
  return (
    <CopyButton onClick={() => props.handleButtonClick()} {...props}>
      {children}
    </CopyButton>
  );
};

// Source: http://stackoverflow.com/a/11128179/2757940
