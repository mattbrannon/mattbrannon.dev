// import { useRef } from 'react';
import styled from 'styled-components/macro';
import Select from '@components/Select';
import Button from '@components/Button';
import RangeSlider, { CustomInput } from './RangeSlider';
import ControlsLayout, { ControlsContainer } from './Layout';

export function FontControls({ ...props }) {
  const { state, font } = props;

  const handleFontSelection = (e) => {
    return props.dispatch({ type: 'CHANGE_FONT', value: e.target.value });
  };

  const displayOptions = () => {
    return state.fonts.map((font, i) => {
      return (
        <Option key={i} value={font.name} defaultValue={state.font}>
          {font.name}
        </Option>
      );
    });
  };

  return (
    <ControlsLayout>
      <ControlsContainer>
        <Select value={state.font} onChange={handleFontSelection}>
          {displayOptions()}
        </Select>

        <ColorInput type="color" name="start color" {...props} />
        <ColorInput type="color" name="end color" {...props} />

        <ColorInput type="color" name="shadow color start" {...props} />
        <ColorInput type="color" name="shadow color end" {...props} />

        <RangeSlider type="range" min={0} max={20} name="shadow layers" {...props} />
        <RangeSlider type="range" min={0} max={20} name="shadow offset" {...props} />
        <RangeSlider type="range" min={0} max={20} name="blur" {...props} />
        <RangeSlider type="range" min={-10} max={10} name="offset x" {...props} />
        <RangeSlider type="range" min={-10} max={10} name="offset y" {...props} />

        <RangeSlider type="range" name="text stroke width" {...props} />
        <ColorInput type="color" name="text stroke color" {...props} />

        {Object.keys(font).map((key, i) => {
          const [ min, max ] = font[key];
          const step = max - min > 2 ? 1 : key === 'CRSV' ? 0.5 : 0.01;
          return (
            <div key={i}>
              <label>{props.value}</label>
              <RangeSlider
                name={key}
                min={min}
                max={max}
                value={state.settings[key] || 0}
                step={step}
                {...props}
              />
            </div>
          );
        })}
        <Button onClick={() => props.dispatch({ type: 'RESET' })}>Reset</Button>
      </ControlsContainer>
    </ControlsLayout>
  );
}

const Option = ({ ...props }) => {
  return (
    <option key={props.key} {...props}>
      {props.children}
    </option>
  );
};

const ColorInput = styled(CustomInput)`
  ${'' /* ${(p) => console.log(p)}; */}
  min-width: 0;
`;

const NumberInput = styled(CustomInput)`
  min-width: 0;
`;
