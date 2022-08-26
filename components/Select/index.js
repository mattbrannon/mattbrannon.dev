import React from 'react';
import styled from 'styled-components';

export function getDisplayedValue({ value, children }) {
  return React.Children.toArray(children).find((child) => {
    return child.props.value === value || child.props.children === value;
  });
}

const Select = ({ ...props }) => {
  const displayedValue = getDisplayedValue({ ...props });
  return (
    <Wrapper>
      <NativeSelect {...props} />
      <FancySelect>
        <TextWrapper>{displayedValue}</TextWrapper>
        <IconWrapper>
          <Icon />
        </IconWrapper>
      </FancySelect>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin: 8px 0 12px 0;
`;

const NativeSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin-left: 10px;
  margin-top: 10px;
  /* Allow the select to span the full height in Safari */
  -webkit-appearance: none;
`;

const FancySelect = styled.div`
  color: hsl(0, 0%, 95%);
  font-family: Jost;

  background-color: var(--pink-dark);
  font-size: var(--size16);
  padding: 2px 8px;

  border-radius: 2px;

  display: flex;
  justify-content: space-between;

  ${NativeSelect}:focus + & {
    outline-offset: 2px;
    outline: 2px solid white;
    /* outline-offset: 4px; */
  }

  ${NativeSelect}:hover + & {
    color: white;
    background: var(--pink-medium-dark);
  }
`;

const TextWrapper = styled.div`
  width: 100%;
`;

const Icon = styled.div`
  height: 18px;
  width: 18px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  transform: rotate(135deg);
  border-radius: 4px 4px 4px 0;
  border: 4px solid hsl(0, 0%, 95%);
  background: transparent;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  width: 28px;
  height: 28px;
  pointer-events: none;
`;

export default Select;
