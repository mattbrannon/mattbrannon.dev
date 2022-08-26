// // import { fontSize } from '@constants/blog';
// import { spaceToCamelCase } from '@utils/helpers';
// import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
// import styled from 'styled-components';
// import { useDebounce, useAnimationFrame } from '@hooks/useDebounce';
// import { HexAlphaColorPicker } from 'react-colorful';
// import { useThrottle } from '@hooks/useThrottle';

// const labels = {
//   wght: 'weight',
//   slnt: 'slant',
//   ital: 'italic',
//   wdth: 'width',
//   CASL: 'casual',
//   CRSV: 'cursive',
//   MONO: 'monospace',
//   BLDA: 'inline',
//   BLDB: 'worm',
//   SKLA: 'inline skeleton',
//   SKLB: 'worm skeleton',
//   SKLD: 'stripes',
//   TRMA: 'rounded',
//   TRMB: 'flared',
//   TRMC: 'rounded slab',
//   TRMD: 'sheared',
//   TRME: 'bifurcated',
//   TRMF: 'open terminal',
//   TRMG: 'slab',
//   TRMK: 'inline terminal',
//   TRML: 'worm terminal',
//   WMX2: 'weight',
// };

// const kebabToLabel = (name) => {
//   return name
//     .split('-')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

// const kebabToCamel = (name) => {
//   return name
//     .split(/-|\s/)
//     .map((word, i) => (i > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
//     .join('');
// };

// const makeLabel = (name) => {
//   const label1 = kebabToLabel(name)
//     .split(' ')
//     .slice(1)
//     .map((word) => word[0].toUpperCase() + word.slice(1))
//     .join(' ');

//   const label = label1 || labels[name].charAt(0).toUpperCase() + labels[name].slice(1);

//   return label;
// };

// // const BasicInput = ({ name, ...props }) => {
// //   // const [value, setValue] = useState('');

// //   useEffect(() => {
// //     const key = kebabToCamel(name);
// //     const value = props.state?.[key];
// //     props.value = value;
// //     // setValue(props.state?.[key]);
// //     // console.log(props);
// //   }, [props.state, name, props]);

// //   // useEffect(() => {
// //   //   console.log(props);
// //   // }, [props]);

// //   return (
// //     <div
// //       style={{
// //         position: 'relative',
// //         display: 'grid',
// //         alignItems: 'center',
// //         gridTemplateColumns: '110px 40px auto',
// //       }}
// //     >
// //       <Label htmlFor={name}>{makeLabel(name)}</Label>
// //       <ValueDisplay>{props.state?.[kebabToCamel(name)]}</ValueDisplay>

// //       {props.children}
// //     </div>
// //   );
// // };

// // function withInputType(Component) {
// //   return function InputComponent({ ...props }) {
// //     return (
// //       <BasicInput {...props}>
// //         <Component {...props} />
// //       </BasicInput>
// //     );
// //   };
// // }

// const getColorValue = ({ name, ...props }) => {
//   const colorSettings = Object.entries({
//     ...props.state.gradientState,
//     ...props.state.shadowState,
//   })
//     .filter(([key]) => key.includes('Color'))
//     .reduce((acc, [key, value]) => {
//       acc[key] = value;
//       return acc;
//     }, {});

//   const key = kebabToCamel(name);
//   const value = colorSettings[key];

//   return value;
// };

// // const style = {
// //   position: 'absolute',
// //   height: '100%',
// //   top: '0',
// //   right: '0',
// //   background: 'none',
// //   border: '1px solid white',
// //   // boxShadow: '0 0 0 2px white',
// //   // borderRadius: '50%',
// //   // overflow: 'hidden',
// //   // transform: 'scale(1.5)',
// //   // clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
// // };

// // const handleColorChange = useThrottle((e) => {
// //   setColor(e.target.value);
// //   props.onInput(e);
// // }, 1);

// // const handleColorChange = useAnimationFrame(
// //   useThrottle((e) => {
// //     setColor(e.target.value);
// //     props.onInput(e);
// //   }, 1)
// // );

// export const ColorInputElement = ({ handleChange, ...props }) => {
//   const ref = useRef();
//   useEffect(() => {
//     const domNode = ref.current;

//     if (domNode) {
//       domNode.addEventListener('change', handleChange);
//       domNode.addEventListener('input', handleChange);
//     }

//     return () => {
//       domNode.removeEventListener('change', handleChange);
//       domNode.removeEventListener('input', handleChange);
//     };
//   }, [handleChange]);

//   return <ColorPicker defaultValue={props.color} {...props} type="color" ref={ref} />;
// };

// // const state = {
// //   ...props.state.gradientState,
// //   ...props.state.shadowState,
// //   ...props.state.strokeState,
// // };

// // const [color, setColor] = useState('#ff00ff');

// // const currentProp = spaceToCamelCase(name);
// // const value = state[currentProp];

// // const handleChange = (e) => {
// //   console.log('firing change event', e.target.value);
// //   setColor(e.target.value);
// // };

// // const handleInput = (e) => {
// //   console.log('firing input event', e.target.value);
// //   setColor(e.target.value);
// // };

// // const [color, setColor] = useState(state[currentProp]);
// // const value = useMemo(() => getColorValue({ name, ...props }), [name, props]);

// // const value = useDebounce(state[currentProp], 1);

// export const ColorInput = ({ name, ...props }) => {
//   const state = {
//     ...props.state.gradientState,
//     ...props.state.shadowState,
//     ...props.state.strokeState,
//   };

//   // const id = spaceToCamelCase(name);
//   const value = state[spaceToCamelCase(name)];

//   // const [color, setColor] = useState(value);

//   const handleChange = useAnimationFrame((e) => {
//     // setColor(e.target.value);
//     props.onInput(e);
//   });

//   return (
//     <FontRangeWrapper>
//       <Label htmlFor={name}>{name}</Label>
//       <ValueDisplay>{value}</ValueDisplay>
//       <ColorInputElement color={value} handleChange={handleChange} name={name} {...props} />
//       {/* <ColorPicker defaultValue={state[currentProp]} name={name} {...props} /> */}
//     </FontRangeWrapper>
//   );
// };

// const mapState = (props) => {
//   // console.log(props);

//   const savedState = props.state.font.savedStates.find(
//     (savedState) => savedState.name === props.state.font.fontName
//   );

//   const { gradientState, shadowState, strokeState, font } = props.state;

//   // console.log(savedState);

//   const state = {
//     ...gradientState,
//     ...shadowState,
//     ...font,
//     ...savedState.current,
//     ...strokeState,
//   };

//   return state;
// };

// export const RangeInput = ({ name, ...props }) => {
//   const state = mapState(props);
//   const currentProp = spaceToCamelCase(name);
//   return (
//     <FontRangeWrapper>
//       <Label htmlFor={name}>{makeLabel(name)}</Label>
//       <ValueDisplay>{state[currentProp]}</ValueDisplay>
//       <Input defaultValue={state[currentProp]} name={name} {...props} />
//     </FontRangeWrapper>
//   );
// };

// // export const RangeInput = ({ name, ...props }) => {
// //   return (
// //     <FontRangeWrapper>
// //       <Label htmlFor={name}>{makeLabel(name)}</Label>
// //       <ValueDisplay>{''}</ValueDisplay>
// //       <ColorPicker value={''} name={name} {...props} />
// //     </FontRangeWrapper>
// //   );
// // };

// const FontRangeWrapper = styled.div`
//   position: relative;
//   display: grid;
//   align-items: center;
//   grid-template-columns: repeat(3, auto);
//   gap: 8px;
// `;

// const Wrapper = styled.div`
//   display: flex;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   /* margin-right: auto; */
//   padding: 8px 0;
//   white-space: nowrap;
// `;

// const ValueDisplay = styled.span`
//   display: block;
//   font-size: 14px;
//   /* margin-right: 16px; */
//   font-family: Recursive;
//   font-variation-settings: 'MONO' 1, 'CASL' 0, 'CRSV' 0;
//   justify-self: center;
//   margin: 0 auto;
// `;

// const getMaxWidth = (props) => {
//   const type = props.type;
//   const maxWidth = type === 'number' || type === 'color' ? 60 : 100;

//   return `${maxWidth}px`;
// };

// export const Input = styled.input.attrs((props) => {
//   const maxWidth = getMaxWidth(props);
//   return {
//     type: 'range',
//     style: {
//       '--maxWidth': maxWidth,
//     },
//   };
// })`
//   display: block;
//   max-width: var(--maxWidth);
//   width: 100%;
//   border: none;

//   justify-self: flex-end;
//   margin-left: 16px;

//   direction: ${(p) => (p.reverse ? 'rtl' : undefined)};
// `;

// const ColorPicker = styled(Input).attrs((props) => {
//   return {
//     type: 'color',
//   };
// })`
//   width: 100%;
//   position: absolute;
//   height: 100%;
//   width: 100%;
//   top: 0;
//   right: 0;
//   background: transparent;
// `;

// // export const RangeInput = ({ name, state, ...props }) => {
// //   const [value, setValue] = useState('');

// //   useEffect(() => {
// //     const key = kebabToCamel(name);
// //     setValue(state[key]);
// //   }, [state, name]);

// //   return (
// //     <div
// //       style={{ display: 'grid', gridTemplateColumns: '180px min-content', alignItems: 'center' }}
// //     >
// //       <label style={{ whiteSpace: 'nowrap', fontSize: '14px' }} htmlFor={name}>
// //         {kebabToLabel(name)}
// //       </label>
// //       <input type="range" name={name} id={name} {...props} value={value} />
// //     </div>
// //   );
// // };

// // export const ColorInput = ({ name, state, ...props }) => {
// //   const [value, setValue] = useState('');

// //   // if (name === 'shadow-layers') {
// //   //   console.log(state);
// //   // }

// //   useEffect(() => {
// //     const key = kebabToCamel(name);
// //     setValue(state[key]);
// //   }, [state, name]);

// //   return (
// //     <div style={{ display: 'grid', gridTemplateColumns: '200px 400px' }}>
// //       <label style={{ marginRight: '32px' }} htmlFor={name}>
// //         {kebabToLabel(name)}
// //       </label>
// //       <input type="color" name={name} id={name} {...props} value={value} />
// //     </div>
// //   );
// // };

// // export const ColorInput = withInputType(ColorPicker);
// // export const RangeInput = withInputType(Input);
