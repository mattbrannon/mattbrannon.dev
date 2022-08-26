import { useRef, useState } from 'react';
import styled from 'styled-components';

export default function InputCheckbox({ children, ...props }) {
  const ref = useRef();
  const [isChecked, setIsChecked] = useState(props.isChecked || false);

  const id = Math.random().toString(16).slice(2, 5);

  const handleChange = (e) => {
    if (props.handleChange) {
      return props.handleChange(e);
    }
    return setIsChecked(!isChecked);
  };

  return (
    <Wrapper onChange={handleChange} tabIndex={0}>
      <Span>{children}</Span>
      <Label htmlFor={id} {...props}></Label>
      <Box isChecked={isChecked} ref={ref} />
      <Input id={id} {...props} checked={isChecked} />
    </Wrapper>
  );
}

const Span = styled.span`
  display: block;
  font-size: var(--size14);
  font-family: OpenSans;
  width: 72.44px;
  width: fit-content;
  margin-right: auto;
`;

const Wrapper = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  position: relative;
`;

const Input = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  display: none;
`;

export const Label = styled.div`
  display: block;
  position: relative;

  height: 32px;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--size14);
  user-select: none;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Box = styled.span`
  --background: ${(p) => (p.isChecked ? 'var(--pink-dark)' : '#ddd')};
  --color: ${(p) => (p.isChecked ? 'white' : 'transparent')};

  height: 32px;
  width: 32px;
  background: var(--background);
  border-radius: 6px;
  outline: 1px solid black;
  transform: scale(0.75);
  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 40%;
    left: 50%;
    width: 6px;
    height: 16px;
    border: solid var(--color);
    border-width: 0 4px 4px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  transition: all 0.15s linear;
`;
