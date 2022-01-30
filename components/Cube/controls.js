import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import Checkbox from '@components/Checkbox';
import { motion } from 'framer-motion';
import { breakpoints } from '@constants/index';
import { useWindowSize } from '@hooks/useWindowSize';
import Select from '@components/Select';
import Button from '@components/Button';

export default function ShapeControls({ ...props }) {
  const [ maxX, setMaxX ] = useState(0);
  const [ maxY, setMaxY ] = useState(0);
  const windowSize = useWindowSize();
  const [ selectedValue, setSelectedValue ] = useState(props.state.shape);
  const ref = useRef();

  const maxSize = selectedValue === 'Cube' ? 150 : 300;

  const [ controlWidth, setControlWidth ] = useState(0);

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
    setSelectedValue(e.target.value);
    props.dispatch({ type: 'SET_SHAPE', value: e.target.value });
  };

  return (
    <Wrapper ref={ref}>
      <Container>
        <Section>
          <Group>
            <Heading>Translate</Heading>
            <RangeSlider name="translate X" min={maxX * -1} max={maxX} {...props} />
            <RangeSlider name="translate Y" min={maxY * -1} max={maxY} {...props} />
            <RangeSlider name="translate Z" min={-200} max={200} {...props} />
          </Group>

          <Group>
            <Heading>Rotate</Heading>
            <RangeSlider name="rotate X" min={-180} max={360} {...props} />
            <RangeSlider name="rotate Y" min={-180} max={360} {...props} />
            <RangeSlider name="rotate Z" min={-180} max={360} {...props} />
          </Group>
          <Group>
            <Heading>Dimensions</Heading>
            <RangeSlider name="width" min={100} max={maxSize} {...props} />
            <RangeSlider name="height" min={100} max={maxSize} {...props} />
            <RangeSlider name="depth" min={50} max={100} {...props} />
          </Group>
          <Group>
            <Heading>Transition</Heading>
            <RangeSlider name="speed" reverse min={0} max={10} {...props} />
          </Group>
          {/* <Group>
            <Heading>Radius</Heading>
            <RangeSlider name="radius" min={0} max={50} {...props} />
          </Group> */}
          {/* <Group>
            <Heading>Perspective</Heading>
            <RangeSlider name="perspective" min={-100} max={3600} {...props} />
          </Group> */}
        </Section>
      </Container>
      <Container>
        <Section>
          <Select selectedValue={selectedValue} onChange={handleShapeChange}>
            <option value="Cube">Cube</option>
            <option value="Sphere">Sphere</option>
          </Select>
          <RangeSlider name="sides" type="number" {...props} />
          <Button onClick={() => props.dispatch({ type: 'RESET' })}>reset</Button>
        </Section>
      </Container>
    </Wrapper>
  );
}

export function FontControls({ ...props }) {
  const ref = useRef();
  const { state, font } = props;

  // const keys = Object.keys(font);

  // if (!('range' in font)) {
  //   for (let key in font) {

  //   }
  // }

  return (
    <Wrapper ref={ref}>
      <Container>
        <Section>
          <Select
            selectedValue={state.font}
            onChange={(e) =>
              props.dispatch({ type: 'CHANGE_FONT', value: e.target.value })
            }
          >
            <option value="Decovar">Decovar</option>
            <option value="Recursive">Recursive</option>
            <option value="OpenSans">Open Sans</option>
            <option value="Jost">Jost</option>
          </Select>

          <CustomInput type="color" name="start color" {...props} />
          <CustomInput type="color" name="end color" {...props} />

          <CustomInput type="color" name="shadow color start" {...props} />
          <CustomInput type="color" name="shadow color end" {...props} />

          <CustomInput type="number" name="shadow layers" {...props} />
          <CustomInput type="number" name="shadow offset" {...props} />

          <CustomInput type="number" name="text stroke width" {...props} />
          <CustomInput type="color" name="text stroke color" {...props} />

          {Object.keys(font).map((key, i) => {
            const [ min, max ] = font[key];
            const step = max - min > 2 ? 1 : key === 'CRSV' ? 0.5 : 0.01;
            return (
              <>
                <label>{props.value}</label>
                <RangeSlider
                  key={i}
                  name={key}
                  min={min}
                  max={max}
                  value={state.settings[key] || 0}
                  step={step}
                  {...props}
                />
              </>
            );
          })}
          <Button onClick={() => props.dispatch({ type: 'RESET' })}>Reset</Button>
        </Section>
      </Container>
    </Wrapper>
  );
}

// const ColorWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const ColorInput = ({ ...props }) => {
//   const handleColorChange = (e) => {
//     if (props.start) {
//       props.dispatch({ type: 'START_COLOR', value: e.target.value });
//     }
//     else if (props.end) {
//       props.dispatch({ type: 'END_COLOR', value: e.target.value });
//     }
//   };

//   return (
//     <div style={{ display: 'grid' }}>
//       <label htmlFor="">Color</label>
//       <input onChange={handleColorChange} type="color" value={props.color} {...props} />
//     </div>
//   );
// };

function toCamelCase(str) {
  const transform = (v, i) => {
    return i === 0 ? v : v.charAt(0).toUpperCase() + v.slice(1);
  };

  return str
    .split(' ')
    .map(transform)
    .join('');
}

function RangeSlider({ ...props }) {
  const { name, state, dispatch } = props;
  const label = props.name.replace(/update|cube /g, '');
  const key = toCamelCase(name);

  const dispatchAction = (e) => {
    const type = name
      .split(' ')
      .map((v) => v.toUpperCase())
      .join('_');

    const value = e.target.value;

    return dispatch({ type, value });
  };

  return (
    <li>
      <Slider>
        <Label htmlFor={name}>{label}:</Label>
        <Input
          onChange={dispatchAction}
          type={props.type || 'range'}
          id={name}
          value={state[key]}
          {...props}
        />
      </Slider>
    </li>
  );
}

const CustomInput = ({ ...props }) => {
  const { name, state, dispatch } = props;
  const label = props.name.replace(/update|cube /g, '');
  const key = toCamelCase(name);

  const dispatchAction = (e) => {
    const type = name
      .split(' ')
      .map((v) => v.toUpperCase())
      .join('_');

    const value = e.target.value;

    return dispatch({ type, value });
  };

  return (
    <>
      <Label {...props}>{label}:</Label>
      <Input
        onChange={dispatchAction}
        type={props.type || 'range'}
        id={name}
        value={state[key]}
        {...props}
      />
    </>
  );
};

// const NumberInput = ({ ...props }) => {
//   const { name, state, dispatch } = props;
//   const label = props.name.replace(/update|cube /g, '');
//   const key = toCamelCase(name);

//   const dispatchAction = (e) => {
//     const type = name
//       .split(' ')
//       .map((v) => v.toUpperCase())
//       .join('_');

//     const value = e.target.value;

//     return dispatch({ type, value });
//   };

//   return (
//     <>
//       <Label {...props}>{label}:</Label>
//       <Input
//         onChange={dispatchAction}
//         type="number"
//         id={name}
//         value={state[key]}
//         {...props}
//       />
//     </>
//   );
// };

const Heading = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--orange);
`;

const Input = styled.input`
  display: block;
  max-width: 100px;
  min-width: 100px;

  justify-self: flex-start;

  direction: ${(p) => (p.reverse ? 'rtl' : undefined)};
`;

const Wrapper = styled(motion.div)`
  width: fit-content;
  min-width: 200px;
  height: calc(100% - var(--header-height));
  position: absolute;
  background: hsl(0, 0%, 0%, 0.7);
  top: var(--header-height);
  left: 0;
  border: 4px solid black;
  padding: 16px;
  overflow: auto;

  @media (prefers-color-scheme: light) {
    color: white;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    top: 50px;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }
`;

const Container = styled.div`
  &:last-child {
    margin: 16px 0 0 0;
  }
`;

const Section = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-right: auto;
  flex: 1;
`;
const Slider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
