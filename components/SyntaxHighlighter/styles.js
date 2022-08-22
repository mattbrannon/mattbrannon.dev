import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

export const Pre = styled.pre`
  text-align: left;
  /* margin: 1em 0; */
  padding: 0.5em;
  height: 100%;
  /* overflow: scroll; */

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
  margin: 0;
`;

export const Line = styled.div`
  display: table-row;
`;

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: table-cell;
`;

export const Container = styled.div`
  position: relative;
  margin: '0 0 32px 0';
  height: 100%;
  --code-background: hsl(208, 86%, 8%);
`;

export const CopyButton = styled.button`
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
