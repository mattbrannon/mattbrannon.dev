import { MathJax, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';
import { useEffect } from 'react';

export default function Math({ children }) {
  useEffect(() => {
    document.querySelectorAll('.CtxtMenu_MenuFrame').forEach((node) => node.remove());
  }, []);

  return (
    <MathContainer tabIndex={-1}>
      <MathJaxContext tabIndex={-1} hideUntilTypeset="first">
        <MathJax tabIndex={-1}> {`\\(${children}\\)`}</MathJax>
      </MathJaxContext>
    </MathContainer>
  );
}

const MathContainer = styled.div`
  margin-top: -32px;
  margin-bottom: 16px;
  font-size: inherit;
  width: fit-content;
  padding: 0 8px;
`;
