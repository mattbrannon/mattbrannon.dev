import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '@hooks/useWindowSize';
import Select from '@components/Select';
import { NormalButton } from '@components/Button';
// import RangeSlider, { CustomInput } from './RangeSlider';
import ControlsLayout from './Layout';
// import { ColorInput } from './Input';
import { Color as ColorInput } from './FontControls/Input';
import { Range as RangeSlider } from './FontControls/Input';

export default function ShapeControls({ ...props }) {
  const [currentSides, setCurrentSides] = useState(props.state.sides);
  const [controlWidth, setControlWidth] = useState(0);
  const ref = useRef();

  const {
    state: { shape, sides },
  } = props;

  useEffect(() => {
    const currentSides = shape === 'Cube' ? 6 : sides;
    setCurrentSides(currentSides);
  }, [shape, sides]);

  useEffect(() => {
    if (ref && ref.current) {
      const controlWidth = ref.current.getBoundingClientRect().width;
      props.setControlWidth(controlWidth);
      setControlWidth(controlWidth);
    }
  }, [props, ref]);

  return (
    <ControlsLayout ref={ref}>
      <ShapeSelection currentSides={currentSides} {...props} />
      <Translate controlWidth={controlWidth} {...props} />
      <Rotate {...props} />
      <Dimensions {...props} />
      <Transition {...props} />
      <CubeColors {...props} />
      <NormalButton onClick={() => props.dispatch({ type: 'RESET' })}>reset</NormalButton>
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

// const ColorInput = styled(CustomInput)`
//   min-width: 0;
// `

const ShapeSelection = ({ ...props }) => {
  return (
    <Group>
      <Heading>Shape</Heading>
      <Selection {...props} />
      <SphereSides {...props} />
    </Group>
  );
};

const Selection = ({ ...props }) => {
  const handleShapeChange = (e) => {
    props.dispatch({ type: 'SHAPE', value: e.target.value });
  };

  return (
    <Select value={props.state.shape} onChange={handleShapeChange}>
      {['Sphere', 'Cube'].map((shape, i) => (
        <Option key={i} value={shape}>
          {shape}
        </Option>
      ))}
    </Select>
  );
};

const SphereSides = ({ ...props }) => {
  if (props.state.shape === 'Sphere') {
    return (
      <RangeSlider
        value={props.currentSides}
        min={1}
        step={1}
        max={12}
        name="shape sides"
        {...props}
      />
    );
  }
  return null;
};

const Translate = ({ ...props }) => {
  const [maxX, setMaxX] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    const cubeWidth = props.cubeWidth;
    const cubeHeight = props.cubeHeight;

    const maxX = windowSize.width / 2 - cubeWidth / 2 - props.controlWidth / 2;
    const maxY = windowSize.height / 2 - cubeHeight;

    setMaxX(Math.abs(maxX));
    setMaxY(Math.abs(maxY));
  }, [props.cubeWidth, props.cubeHeight, windowSize, props.controlWidth]);

  return (
    <Group>
      <Heading>Translate</Heading>
      <RangeSlider name="shape translate X" min={Math.round(maxX * -1)} max={maxX} {...props} />
      <RangeSlider name="shape translate Y" min={Math.round(maxY * -1)} max={maxY} {...props} />
      <RangeSlider name="shape translate Z" min={-200} max={200} {...props} />
    </Group>
  );
};

const Rotate = ({ ...props }) => {
  return (
    <Group>
      <Heading>Rotate</Heading>
      <RangeSlider name="shape rotate X" min={-45} max={360} {...props} />
      <RangeSlider name="shape rotate Y" min={-45} max={360} {...props} />
      <RangeSlider name="shape rotate Z" min={-45} max={360} {...props} />
    </Group>
  );
};

const Dimensions = ({ ...props }) => {
  return (
    <Group>
      <Heading>Dimensions</Heading>
      <RangeSlider name="shape width" min={150} max={300} {...props} />
      <RangeSlider name="shape height" min={150} max={300} {...props} />
      {props.state.shape === 'Cube' && (
        <RangeSlider name="shape depth" min={25} max={100} {...props} />
      )}
    </Group>
  );
};

const Transition = ({ ...props }) => {
  return (
    <Group>
      <Heading>Transition</Heading>
      <RangeSlider name="shape speed" reverse min={0} max={10} {...props} />
    </Group>
  );
};

const CubeColors = ({ state, dispatch, ...props }) => {
  const handleOpacityChange = (e) => {
    props.dispatch({ type: 'OPACITY', value: e.target.value });
  };

  useEffect(() => {
    // console.log(state.cubeHairColor);
  }, [state.cubeHairColor]);

  if (state.shape === 'Cube') {
    return (
      <Group>
        <Heading>Background</Heading>
        <RangeSlider
          onChange={(e) => dispatch({ type: 'CUBE_OPACITY', value: e.target.value })}
          name="shape cube opacity"
          min={0}
          max={1}
          step={0.01}
          {...props}
        />

        <ColorGroup>
          <ColorInput
            onChange={(e) => dispatch({ type: 'CUBE_BACKGROUND', value: e.target.value })}
            name="shape cube background"
            value={state.cubeBackground}
            {...props}
          />
          <ColorInput
            onChange={(e) => dispatch({ type: 'CUBE_HAIR_COLOR', value: e.target.value })}
            // onChange={(e) => props.setHairColor(e.target.value)}
            {...props}
            name="shape cube hair color"
            value={state.cubeHairColor}
          />
          {/* <ColorInput name="shape cube hair color" value={state.cubeHairColor} {...props} /> */}
          <ColorInput
            onChange={(e) => dispatch({ type: 'CUBE_EYE_COLOR', value: e.target.value })}
            name="shape cube eye color"
            value={state.cubeEyeColor}
            {...props}
          />
        </ColorGroup>
      </Group>
    );
  }

  return null;
};

// import { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// import { useWindowSize } from '@hooks/useWindowSize';
// import Select from '@components/Select';
// import { NormalButton } from '@components/Button';
// import RangeSlider, { CustomInput } from './RangeSlider';
// import ControlsLayout from './Layout';
// import { useDebounce } from '@hooks/useDebounce';
// import { toSnakeUpperCase } from '@utils/helpers';
// import { ColorInput } from './Input';

// const toCamelCase = (s) => {
//   return s
//     .split(/\s|-|_/g)
//     .map((word, i) => {
//       return i > 0 ? word.slice(0, 1).toUpperCase() + word.slice(1) : word;
//     })
//     .join('');
// };

// // const ColorInput = ({ ...props }) => {
// //   const currentProp = toCamelCase(props.name);
// //   const [color, setColor] = useState(props.state[currentProp]);

// //   const handleChange = (e) => {
// //     const value = e.target.value;
// //     setColor(value);
// //     props.onChange(e);
// //   };

// //   return (
// //     <Wrapper>
// //       <Label htmlFor={props.name} {...props}>
// //         {props.name}:
// //       </Label>
// //       <ValueDisplay>{props.state[currentProp]}</ValueDisplay>
// //       <input
// //         defaultValue={props.state[currentProp]}
// //         value={color}
// //         onChange={handleChange}
// //         type="color"
// //         {...props}
// //       />
// //     </Wrapper>
// //   );
// // };

// const Wrapper = styled.div`
//   display: flex;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   margin-right: auto;
// `;

// const Slider = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
// `;

// const ValueDisplay = styled.span`
//   display: block;
//   font-size: 14px;
//   margin-right: 16px;
//   font-family: Recursive;
//   font-variation-settings: 'MONO' 1, 'CASL' 0, 'CRSV' 0;
// `;

// export default function ShapeControls({ ...props }) {
//   const [maxX, setMaxX] = useState(0);
//   const [maxY, setMaxY] = useState(0);
//   const windowSize = useWindowSize();
//   const [currentSides, setCurrentSides] = useState(props.state.sides);

//   const ref = useRef();

//   const [controlWidth, setControlWidth] = useState(0);

//   const {
//     state: { shape, sides },
//   } = props;

//   useEffect(() => {
//     const currentSides = shape === 'Cube' ? 6 : sides;
//     setCurrentSides(currentSides);
//   }, [shape, sides]);

//   useEffect(() => {
//     if (ref && ref.current) {
//       const controlWidth = ref.current.getBoundingClientRect().width;
//       props.setControlWidth(controlWidth);
//       setControlWidth(controlWidth);
//     }
//   }, [props, ref]);

//   useEffect(() => {
//     const cubeWidth = props.cubeWidth;
//     const cubeHeight = props.cubeHeight;

//     const maxX = windowSize.width / 2 - cubeWidth / 2 - controlWidth / 2;
//     const maxY = windowSize.height / 2 - cubeHeight;

//     setMaxX(Math.abs(maxX));
//     setMaxY(Math.abs(maxY));
//   }, [props.cubeWidth, props.cubeHeight, windowSize, controlWidth]);

//   const handleShapeChange = (e) => {
//     props.dispatch({ type: 'SHAPE', value: e.target.value });
//   };

//   const handleOpacityChange = (e) => {
//     props.dispatch({ type: 'OPACITY', value: e.target.value });
//   };

//   const handleColorChange = (e) => {
//     props.dispatch({ type: toSnakeUpperCase(e.target.name), value: e.target.value });
//   };

//   return (
//     <ControlsLayout ref={ref}>
//       <Group>
//         <Heading>Shape</Heading>
//         <Select value={props.state.shape} onChange={handleShapeChange}>
//           {['Sphere', 'Cube'].map((shape, i) => (
//             <Option key={i} value={shape}>
//               {shape}
//             </Option>
//           ))}
//         </Select>

//         {props.state.shape === 'Sphere' ? (
//           <RangeSlider value={currentSides} min={1} step={1} max={12} name="shape sides" {...props} />
//         ) : null}
//       </Group>
//       <Group>
//         <Heading>Translate</Heading>
//         <RangeSlider name="shape translate X" min={Math.round(maxX * -1)} max={maxX} {...props} />
//         <RangeSlider name="shape translate Y" min={Math.round(maxY * -1)} max={maxY} {...props} />
//         <RangeSlider name="shape translate Z" min={-200} max={200} {...props} />
//       </Group>

//       <Group>
//         <Heading>Rotate</Heading>
//         <RangeSlider name="shape rotate X" min={-45} max={360} {...props} />
//         <RangeSlider name="shape rotate Y" min={-45} max={360} {...props} />
//         <RangeSlider name="shape rotate Z" min={-45} max={360} {...props} />
//       </Group>
//       <Group>
//         <Heading>Dimensions</Heading>
//         <RangeSlider name="shape width" min={150} max={300} {...props} />
//         <RangeSlider name="shape height" min={150} max={300} {...props} />
//         {props.state.shape === 'Cube' && <RangeSlider name="shape depth" min={25} max={100} {...props} />}
//       </Group>
//       <Group>
//         <Heading>Transition</Heading>
//         <RangeSlider name="shape speed" reverse min={0} max={10} {...props} />
//       </Group>

//       {props.state.shape === 'Cube' ? (
//         <Group>
//           <Heading>Background</Heading>
//           <RangeSlider
//             onChange={handleOpacityChange}
//             name="shape opacity"
//             min={0}
//             max={1}
//             step={0.01}
//             {...props}
//           />

//           <ColorGroup>
//             <ColorInput onInput={handleColorChange} name="shape background" type="color" {...props} />
//             <ColorInput onInput={handleColorChange} name="shape hair color" type="color" {...props} />
//             <ColorInput onInput={handleColorChange} name="shape eye color" type="color" {...props} />
//           </ColorGroup>
//         </Group>
//       ) : null}

//       <>
//         {/* <Select value={props.state.backgroundType} onChange={changeBackgroundType}>
//               {displayOptions()}
//             </Select>

//             {props.state.backgroundType === 'solid' ? (
//               <ColorWrapper>
//                 <CustomInput type="color" name="shape color" {...props} />
//               </ColorWrapper>
//             ) : props.state.backgroundType.includes('gradient') ? (
//               <ColorWrapper>
//                 <CustomInput type="color" name="shape gradient color start" {...props} />
//                 <CustomInput type="color" name="shape gradient color end" {...props} />
//                 <RangeSlider
//                   min={0}
//                   max={100}
//                   step={1}
//                   name="shape gradient blend"
//                   {...props}
//                 />
//                 <RangeSlider
//                   min={0}
//                   max={100}
//                   step={1}
//                   name="shape gradient midpoint"
//                   {...props}
//                 />
//                 <RangeSlider
//                   min={0}
//                   max={360}
//                   step={1}
//                   name="shape gradient angle"
//                   {...props}
//                 />
//               </ColorWrapper>
//             ) : null} */}

//         {/* {props.state.shape === 'Cube' ? (
//               <CustomInput type="color" name="shape hair color" {...props} />
//             ) : null} */}

//         {/* <Checkbox isChecked={isChecked} onChange={handleOutlineToggle} name="shape outline">
//               outline:
//             </Checkbox> */}
//       </>
//       {/* )} */}
//       {/* </ControlsContainer> */}

//       {/* <ControlsContainer> */}
//       <NormalButton onClick={() => props.dispatch({ type: 'RESET' })}>reset</NormalButton>
//       {/* </ControlsContainer> */}
//     </ControlsLayout>
//   );
// }

// const Group = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ColorGroup = styled(Group)`
//   gap: 16px;
//   margin: 8px 0;
// `;

// const Heading = styled.h2`
//   font-size: 1rem;
//   font-weight: 600;
//   color: var(--orange);
//   margin: 0;
// `;

// const Option = ({ ...props }) => {
//   return (
//     <option key={props.key} {...props}>
//       {props.children}
//     </option>
//   );
// };

// // const ColorInput = styled(CustomInput)`
// //   min-width: 0;
// // `;
