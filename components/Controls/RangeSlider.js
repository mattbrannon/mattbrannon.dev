import styled from 'styled-components';
import { Color } from 'color-tools';

import { spaceToCamelCase as toCamelCase, toSnakeUpperCase, toFloat } from '@utils/helpers.js';
import { useState, useEffect, forwardRef } from 'react';
import { useDebounce } from '@hooks/useDebounce';

const createLabel = (name) => {
  const removeText = [ 'update', 'cube', 'shadow', 'gradient', 'text stroke' ];
  removeText.forEach((str) => {
    name = name.replace(str, '').trim();
  });
  return name;
};

const makeHex = (color) => {
  return new Color(color).hex.css();
};

const parseType = (type, value) => {
  return type === 'color' ? makeHex(value) : value;
};

const RangeSlider = forwardRef(({ ...props }, ref) => {
  const { name, state, dispatch } = props;
  const label = createLabel(name);
  const key = toCamelCase(name);

  // const defaultValue = state[key]
  //   ? state[key]
  //   : 'settings' in state && state.settings[key]
  //   ? state.settings[key]
  //   : 0;

  const defaultValue = state && key ? state?.[key] ?? state?.settings?.[key] : 0;

  const handleChange = (e) => {
    const number = parseFloat(e.target.value);

    dispatch({ type: toSnakeUpperCase(name), value: number });
  };

  return (
    <Slider>
      <Label htmlFor={name}>{label}:</Label>
      <ValueDisplay>{toFloat(defaultValue)}</ValueDisplay>
      <Input
        ref={ref}
        onChange={handleChange}
        type="range"
        id={name}
        value={defaultValue}
        {...props}
      />
    </Slider>
  );
});

RangeSlider.displayName = 'RangeSlider';
export default RangeSlider;

export const CustomInput = ({ ...props }) => {
  const { name, state, dispatch, type } = props;
  const key = toCamelCase(name);
  const label = createLabel(name);
  const value = parseType(type, state[key]);

  // console.log(name, state, dispatch, type)

  const [ colorValue, setColorValue ] = useState(value);

  const color = useDebounce(colorValue, 0);

  useEffect(() => {
    const type = toSnakeUpperCase(name);
    dispatch({ type, value: color });
  }, [ color, dispatch, name ]);

  return (
    <Wrapper>
      <Label {...props}>{label}:</Label>
      <ValueDisplay>{props.state[key]}</ValueDisplay>
      <Input
        onChange={(e) => setColorValue(e.target.value)}
        id={name}
        value={props.state[key]}
        {...props}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Label = styled.label`
  font-size: 14px;
  margin-right: auto;
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ValueDisplay = styled.span`
  display: block;
  font-size: 14px;
  margin-right: 16px;
  font-family: Recursive;
  font-variation-settings: 'MONO' 1, 'CASL' 0, 'CRSV' 0;
`;

const getMaxWidth = (props) => {
  const type = props.type;
  const maxWidth = type === 'number' || type === 'color' ? 60 : 100;
  return `${maxWidth}px`;
};

export const Input = styled.input.attrs((props) => {
  const maxWidth = getMaxWidth(props);
  return {
    style: {
      '--maxWidth': maxWidth,
    },
  };
})`
  display: block;
  max-width: var(--maxWidth);
  min-width: 0;
  width: 100%;

  justify-self: flex-start;

  direction: ${(p) => (p.reverse ? 'rtl' : undefined)};
`;
