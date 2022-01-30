import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCssVariable } from '@hooks/useCssVariable';

export default function InputCheckbox({ children, ...props }) {
  const ref = useRef();
  const [ isChecked, setIsChecked ] = useState(props.isChecked || false);

  const id = Math.random()
    .toString(16)
    .slice(2, 5);

  const handleChange = (e) => {
    if (props.handleChange) {
      return props.handleChange(e);
    }
    return setIsChecked(!isChecked);
  };

  return (
    <Wrapper onChange={handleChange} tabIndex={0}>
      <Span>{children}</Span>
      <Label htmlFor={id} {...props}>
        <Checkbox isChecked={isChecked} ref={ref} />
      </Label>
      <Input id={id} {...props} checked={isChecked} />
    </Wrapper>
  );
}

const Span = styled.span`
  display: block;
  font-size: var(--size14);
  font-family: OpenSans;
  width: 72.44px;
`;

const Wrapper = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  width: fit-content;
`;

const Input = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  display: none;
`;

const Label = styled.div`
  display: block;
  position: relative;

  height: 32px;
  ${'' /* margin-bottom: 12px; */}
  cursor: pointer;
  font-family: inherit;
  font-size: var(--size14);
  user-select: none;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Checkbox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, 0);
  --background: ${(p) => (p.isChecked ? 'var(--dark-pink)' : '#ddd')};
  --color: ${(p) => (p.isChecked ? 'white' : 'transparent')};

  height: 32px;
  width: 32px;
  background: var(--background);
  border-radius: 6px;
  outline: 1px solid black;
  transform: scale(0.7);
  &:after {
    content: '';
    position: relative;
    display: block;
    left: 12px;
    top: 4px;
    width: 6px;
    height: 16px;
    border: solid var(--color);
    border-width: 0 4px 4px 0;
    transform: rotate(45deg);
  }

  transition: all 0.15s linear;
`;
