import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useWindowSize } from '@hooks/useWindowSize';
import Select from '@components/Select';
import { NormalButton } from '@components/Button';
import RangeSlider, { CustomInput } from './RangeSlider';
import ControlsLayout from './Layout';

export default function ShapeControls({ ...props }) {
  const [ maxX, setMaxX ] = useState(0);
  const [ maxY, setMaxY ] = useState(0);
  const windowSize = useWindowSize();
  const [ currentSides, setCurrentSides ] = useState(props.state.sides);

  const ref = useRef();

  const [ controlWidth, setControlWidth ] = useState(0);

  const {
    state: { shape, sides },
  } = props;

  useEffect(() => {
    const currentSides = shape === 'Cube' ? 6 : sides;
    setCurrentSides(currentSides);
  }, [ shape, sides ]);

  useEffect(() => {
    if (ref && ref.current) {
      const controlWidth = ref.current.getBoundingClientRect().width;
      props.setControlWidth(controlWidth);
      setControlWidth(controlWidth);
    }
  }, [ props, ref ]);

  useEffect(() => {
    const cubeWidth = props.cubeWidth;
    const cubeHeight = props.cubeHeight;

    const maxX = windowSize.width / 2 - cubeWidth / 2 - controlWidth / 2;
    const maxY = windowSize.height / 2 - cubeHeight;

    setMaxX(Math.abs(maxX));
    setMaxY(Math.abs(maxY));
  }, [ props.cubeWidth, props.cubeHeight, windowSize, controlWidth ]);

  const handleShapeChange = (e) => {
    props.dispatch({ type: 'SHAPE', value: e.target.value });
  };

  const handleOpacityChange = (e) => {
    props.dispatch({ type: 'OPACITY', value: e.target.value });
  };

  return (
    <ControlsLayout ref={ref}>
      <Group>
        <Heading>Shape</Heading>
        <Select value={props.state.shape} onChange={handleShapeChange}>
          {[ 'Sphere', 'Cube' ].map((shape, i) => (
            <Option key={i} value={shape}>
              {shape}
            </Option>
          ))}
        </Select>

        {props.state.shape === 'Sphere' ? (
          <RangeSlider value={currentSides} min={1} step={1} max={12} name="sides" {...props} />
        ) : null}
      </Group>
      <Group>
        <Heading>Translate</Heading>
        <RangeSlider name="translate X" min={Math.round(maxX * -1)} max={maxX} {...props} />
        <RangeSlider name="translate Y" min={Math.round(maxY * -1)} max={maxY} {...props} />
        <RangeSlider name="translate Z" min={-200} max={200} {...props} />
      </Group>

      <Group>
        <Heading>Rotate</Heading>
        <RangeSlider name="rotate X" min={-45} max={360} {...props} />
        <RangeSlider name="rotate Y" min={-45} max={360} {...props} />
        <RangeSlider name="rotate Z" min={-45} max={360} {...props} />
      </Group>
      <Group>
        <Heading>Dimensions</Heading>
        <RangeSlider name="width" min={150} max={300} {...props} />
        <RangeSlider name="height" min={150} max={300} {...props} />
        {props.state.shape === 'Cube' && <RangeSlider name="depth" min={25} max={100} {...props} />}
      </Group>
      <Group>
        <Heading>Transition</Heading>
        <RangeSlider name="speed" reverse min={0} max={10} {...props} />
      </Group>

      {props.state.shape === 'Cube' ? (
        <Group>
          <Heading>Background</Heading>
          <RangeSlider
            onChange={handleOpacityChange}
            name="opacity"
            min={0}
            max={1}
            step={0.01}
            {...props}
          />

          <ColorGroup>
            <ColorInput name="background" type="color" {...props} />
            <ColorInput name="hair color" type="color" {...props} />
            <ColorInput name="eye color" type="color" {...props} />
          </ColorGroup>
        </Group>
      ) : null}

      <>
        {/* <Select value={props.state.backgroundType} onChange={changeBackgroundType}>
              {displayOptions()}
            </Select>

            {props.state.backgroundType === 'solid' ? (
              <ColorWrapper>
                <CustomInput type="color" name="color" {...props} />
              </ColorWrapper>
            ) : props.state.backgroundType.includes('gradient') ? (
              <ColorWrapper>
                <CustomInput type="color" name="gradient color start" {...props} />
                <CustomInput type="color" name="gradient color end" {...props} />
                <RangeSlider
                  min={0}
                  max={100}
                  step={1}
                  name="gradient blend"
                  {...props}
                />
                <RangeSlider
                  min={0}
                  max={100}
                  step={1}
                  name="gradient midpoint"
                  {...props}
                />
                <RangeSlider
                  min={0}
                  max={360}
                  step={1}
                  name="gradient angle"
                  {...props}
                />
              </ColorWrapper>
            ) : null} */}

        {/* {props.state.shape === 'Cube' ? (
              <CustomInput type="color" name="hair color" {...props} />
            ) : null} */}

        {/* <Checkbox isChecked={isChecked} onChange={handleOutlineToggle} name="outline">
              outline:
            </Checkbox> */}
      </>
      {/* )} */}
      {/* </ControlsContainer> */}

      {/* <ControlsContainer> */}
      <NormalButton onClick={() => props.dispatch({ type: 'RESET' })}>reset</NormalButton>
      {/* </ControlsContainer> */}
    </ControlsLayout>
  );
}

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorGroup = styled(Group)`
  gap: 16px;
  margin: 8px 0;
`;

const Heading = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: var(--orange);
  margin: 0;
`;

const Option = ({ ...props }) => {
  return (
    <option key={props.key} {...props}>
      {props.children}
    </option>
  );
};

const ColorInput = styled(CustomInput)`
  min-width: 0;
`;
