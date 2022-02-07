// import { useRef } from 'react';
import styled from 'styled-components';
import Select from '@components/Select';
import Button, { InvertedButton } from '@components/Button';
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
        <Group>
          <Heading>Font Family</Heading>
          <Select value={state.font} onChange={handleFontSelection}>
            {displayOptions()}
          </Select>
        </Group>
        <Group>
          <Heading>Text Color</Heading>
          <ColorInput type="color" name="gradient color start" {...props} />
          <ColorInput type="color" name="gradient color end" {...props} />
          <RangeSlider min={0} max={100} step={1} name="gradient blend" {...props} />
          <RangeSlider min={0} max={100} step={1} name="gradient midpoint" {...props} />
          <RangeSlider min={0} max={360} step={1} name="gradient angle" {...props} />
        </Group>

        <Group>
          <Heading>Shadow Color</Heading>
          <ColorInput type="color" name="shadow color start" {...props} />
          <ColorInput type="color" name="shadow color end" {...props} />
        </Group>
        <Group>
          <Heading>Shadow Properties</Heading>
          <RangeSlider type="range" min={0} max={20} name="shadow layers" {...props} />
          <RangeSlider
            type="range"
            min={0}
            max={10}
            step={0.1}
            name="shadow offset"
            {...props}
          />
          <RangeSlider type="range" min={0} max={10} step={0.1} name="blur" {...props} />
          <RangeSlider type="range" min={-10} max={10} name="offset x" {...props} />
          <RangeSlider type="range" min={-10} max={10} name="offset y" {...props} />
        </Group>
        <Group>
          <Heading>Text Outline</Heading>
          <RangeSlider
            type="range"
            name="text stroke width"
            min={0}
            max={3}
            step={0.1}
            {...props}
          />
          <ColorInput type="color" name="text stroke color" {...props} />
        </Group>

        <Group>
          <Heading>Font Properties</Heading>
          <RangeSlider
            name="font size"
            min={4}
            max={20}
            value={state.fontSize}
            step={1}
            {...props}
          />
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
        </Group>

        <InvertedButton
          onClick={() =>
            props.dispatch({ type: 'TOGGLE_CODE', value: !state.toggleCode })
          }
        >
          {state.toggleCode === true ? 'Back to Editor' : 'Get Css'}
        </InvertedButton>

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

const Heading = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: var(--orange);
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;
