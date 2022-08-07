import styled from 'styled-components';
import Select from '@components/Select';
import { NormalButton, FancyButton } from '@components/Button';
import RangeSlider, { CustomInput } from './RangeSlider';
import ControlsLayout, { ControlsContainer } from './Layout';
import { useEffect, useRef } from 'react';
// import Checkbox from '@components/Checkbox';

export function FontControls({ ...props }) {
  const { state, font } = props;
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current) {
      const minWidth = getComputedStyle(ref.current).minWidth;
      return props.setControlWidth(minWidth);
    }
  }, [props, props.setControlWidth]);

  return (
    <ControlsLayout ref={ref}>
      <ControlsContainer>
        <FontSelection state={state} {...props} />
        <FontProperties state={state} font={font} {...props} />
        <FontColor {...props} />
        <ShadowProperties {...props} />
        <ShadowColor {...props} />
        <TextOutline {...props} />
        <Buttons state={state} {...props} />
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
  min-width: 0;
`;

const Heading = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--orange);
  margin: 0;
  margin-bottom: 0px;
  margin-top: 0;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonGroup = styled(Group)`
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const FontProperties = ({ state, font, ...props }) => {
  return (
    <Group>
      <Heading>Font Properties</Heading>
      <RangeSlider name="font size" min={4} max={10} value={state.fontSize} step={0.1} {...props} />
      {Object.keys(font).map((key, i) => {
        // console.log(key, font[key], state.settings);
        const [min, max] = font[key];

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
  );
};

const ShadowProperties = ({ ...props }) => {
  return (
    <Group>
      <Heading>Shadow Properties</Heading>
      <RangeSlider min={0} max={20} name="shadow layers" {...props} />
      <RangeSlider min={1} max={20} step={0.2} name="shadow gap" {...props} />
      <RangeSlider min={0} max={10} step={0.1} name="shadow blur" {...props} />
      <RangeSlider min={-10} max={10} step={0.2} name="shadow offset x" {...props} />
      <RangeSlider min={-10} max={10} step={0.2} name="shadow offset y" {...props} />
    </Group>
  );
};

const FontColor = ({ ...props }) => {
  // const handleShowBackground = (e) => {
  //   props.dispatch({ type: 'SHOW_BACKGROUND', value: e.target.checked });
  // };

  return (
    <Group>
      <Heading>Font Color</Heading>
      <ColorInput type="color" name="gradient color start" {...props} />
      <ColorInput type="color" name="gradient color end" {...props} />
      <RangeSlider min={0} max={360} step={1} name="gradient angle" {...props} />
      <RangeSlider min={0} max={100} step={1} name="gradient midpoint" {...props} />
      <RangeSlider min={0} max={100} step={1} name="gradient blend" {...props} />
      {/* <Checkbox onChange={handleShowBackground}>Show background</Checkbox> */}
    </Group>
  );
};

const ShadowColor = ({ ...props }) => {
  return (
    <Group>
      <Heading>Shadow Color</Heading>
      <ColorInput type="color" name="shadow color start" {...props} />
      <ColorInput type="color" name="shadow color end" {...props} />
    </Group>
  );
};

const TextOutline = ({ ...props }) => {
  return (
    <Group>
      <Heading>Text Outline</Heading>
      <RangeSlider name="text stroke width" min={0} max={3} step={0.1} {...props} />
      <ColorInput type="color" name="text stroke color" {...props} />
    </Group>
  );
};

const Buttons = ({ state, ...props }) => {
  const handleHelpButtonPressed = () => {
    if (state.toggleCode) {
      props.dispatch({ type: 'TOGGLE_CODE', value: false });
    }
    props.dispatch({ type: 'HELP', value: !state.help });
  };
  const handleGetCssButtonPressed = () => {
    if (state.help) {
      props.dispatch({ type: 'HELP', value: false });
    }
    props.dispatch({ type: 'TOGGLE_CODE', value: !state.toggleCode });
  };

  const handleReset = () => {
    props.dispatch({ type: 'RESET', prevState: state });
    props.dispatch({ type: 'IS_CHANGING_FONTS', value: true });
  };

  const toggleButtonText = state.toggleCode === true ? 'Back to Editor' : 'Get Css';
  const toggleHelpText = state.help ? 'Back to Editor' : 'Help';

  return (
    <ButtonGroup>
      <NormalButton onClick={handleHelpButtonPressed}>{toggleHelpText}</NormalButton>
      <NormalButton onClick={handleGetCssButtonPressed}>{toggleButtonText}</NormalButton>
      <FancyButton onClick={handleReset}>Reset</FancyButton>
    </ButtonGroup>
  );
};

const FontSelection = ({ state, ...props }) => {
  // console.log('font selection state', state);
  // console.log('font selection props', props);

  const handleFontSelection = (e) => {
    props.dispatch({ type: 'CHANGE_FONT', value: e.target.value });
    props.dispatch({ type: 'IS_CHANGING_FONTS', value: true });
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
    <Group>
      <Heading>Font Family</Heading>
      <Select value={state.font} onChange={handleFontSelection}>
        {displayOptions()}
      </Select>
    </Group>
  );
};

// import styled from "styled-components";
// import Select from "@components/Select";
// import { NormalButton, FancyButton } from "@components/Button";
// import RangeSlider, { CustomInput } from "./RangeSlider";
// import ControlsLayout, { ControlsContainer } from "./Layout";
// import { useEffect, useRef } from "react";
// import { m as motion, AnimatePresence } from "framer-motion";
// import Checkbox from "@components/Checkbox";
// // import { loadFeatures } from '@utils/helpers';

// export function FontControls({ ...props }) {
//   const { state, font } = props;
//   const ref = useRef();

//   const handleHelpButtonPressed = () => {
//     if (state.toggleCode) {
//       props.dispatch({ type: "TOGGLE_CODE", value: false });
//     }
//     props.dispatch({ type: "HELP", value: !state.help });
//   };
//   const handleGetCssButtonPressed = () => {
//     if (state.help) {
//       props.dispatch({ type: "HELP", value: false });
//     }
//     props.dispatch({ type: "TOGGLE_CODE", value: !state.toggleCode });
//   };

//   const handleFontSelection = (e) => {
//     props.dispatch({ type: "CHANGE_FONT", value: e.target.value });
//     props.dispatch({ type: "IS_CHANGING_FONTS", value: true });
//   };

//   const handleReset = () => {
//     props.dispatch({ type: "RESET" });
//     props.dispatch({ type: "IS_CHANGING_FONTS", value: true });
//   };

//   const handleShowBackground = (e) => {
//     props.dispatch({ type: "SHOW_BACKGROUND", value: e.target.checked });
//   };

//   const displayOptions = () => {
//     return state.fonts.map((font, i) => {
//       return (
//         <Option key={i} value={font.name} defaultValue={state.font}>
//           {font.name}
//         </Option>
//       );
//     });
//   };

//   useEffect(() => {
//     if (ref && ref.current) {
//       const minWidth = getComputedStyle(ref.current).minWidth;
//       return props.setControlWidth(minWidth);
//     }
//   }, [props, props.setControlWidth]);

//   const toggleButtonText = state.toggleCode === true ? "Back to Editor" : "Get Css";
//   const toggleHelpText = state.help ? "Back to Editor" : "Help";

//   return (
//     <AnimatePresence exitBeforeEnter>
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//         <ControlsLayout ref={ref}>
//           <ControlsContainer>
//             <Group>
//               <Heading>Font Family</Heading>
//               <Select value={state.font} onChange={handleFontSelection}>
//                 {displayOptions()}
//               </Select>
//             </Group>
//             <Group>
//               <Heading>Text Color</Heading>
//               <ColorInput type="color" name="gradient color start" {...props} />
//               <ColorInput type="color" name="gradient color end" {...props} />
//               <RangeSlider min={0} max={360} step={1} name="gradient angle" {...props} />
//               <RangeSlider min={0} max={100} step={1} name="gradient midpoint" {...props} />
//               <RangeSlider min={0} max={100} step={1} name="gradient blend" {...props} />
//               <Checkbox onChange={handleShowBackground}>Show background</Checkbox>
//             </Group>
//             <Group>
//               <Heading>Shadow Color</Heading>
//               <ColorInput type="color" name="shadow color start" {...props} />
//               <ColorInput type="color" name="shadow color end" {...props} />
//             </Group>
//             <Group>
//               <Heading>Shadow Properties</Heading>
//               <RangeSlider min={0} max={30} name="shadow layers" {...props} />
//               <RangeSlider min={1} max={20} step={0.2} name="shadow gap" {...props} />
//               <RangeSlider min={0} max={10} step={0.1} name="blur" {...props} />
//               <RangeSlider min={-10} max={10} step={0.2} name="offset x" {...props} />
//               <RangeSlider min={-10} max={10} step={0.2} name="offset y" {...props} />
//             </Group>
//             <Group>
//               <Heading>Text Outline</Heading>
//               <RangeSlider name="text stroke width" min={0} max={3} step={0.1} {...props} />
//               <ColorInput type="color" name="text stroke color" {...props} />
//             </Group>
//             <Group>
//               <Heading>Font Properties</Heading>
//               <RangeSlider
//                 name="font size"
//                 min={4}
//                 max={10}
//                 value={state.fontSize}
//                 step={0.1}
//                 {...props}
//               />
//               {Object.keys(font).map((key, i) => {
//                 const [min, max] = font[key];

//                 const step = max - min > 2 ? 1 : key === "CRSV" ? 0.5 : 0.01;
//                 return (
//                   <div key={i}>
//                     <label>{props.value}</label>
//                     <RangeSlider
//                       name={key}
//                       min={min}
//                       max={max}
//                       value={state.settings[key] || 0}
//                       step={step}
//                       {...props}
//                     />
//                   </div>
//                 );
//               })}
//             </Group>
//             <ButtonGroup>
//               <NormalButton onClick={handleHelpButtonPressed}>{toggleHelpText}</NormalButton>
//               <NormalButton onClick={handleGetCssButtonPressed}>{toggleButtonText}</NormalButton>
//               <FancyButton onClick={handleReset}>Reset</FancyButton>
//             </ButtonGroup>
//           </ControlsContainer>
//         </ControlsLayout>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// const Option = ({ ...props }) => {
//   return (
//     <option key={props.key} {...props}>
//       {props.children}
//     </option>
//   );
// };

// const ColorInput = styled(CustomInput)`
//   min-width: 0;
// `;

// const Heading = styled.h2`
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: var(--orange);
//   margin: 0;
//   margin-bottom: 0px;
//   margin-top: 0;
// `;

// const Group = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

// const ButtonGroup = styled(Group)`
//   gap: 8px;
//   align-items: center;
//   width: 100%;
// `;
