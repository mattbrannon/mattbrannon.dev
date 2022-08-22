import Select from '@components/Select';

export const FontSelect = ({ state, dispatch }) => {
  const fonts = state.fonts;
  const fontFamily = state.styles.fontFamily;
  // const { fontFamily } = font.find((font) => font.selected);
  // console.log(fonts, fontFamily);
  return (
    <Select
      value={fontFamily}
      onChange={(e) => dispatch({ type: 'FONT_FAMILY', value: e.target.value })}
    >
      {Object.keys(fonts).map((font) => {
        return (
          <Option value={font} key={font}>
            {font}
          </Option>
        );
      })}
    </Select>
  );
};

const Option = ({ ...props }) => {
  return (
    <option key={props.key} {...props}>
      {props.children}
    </option>
  );
};

// import Select from '@components/Select';
// import { fonts } from '@constants/fancyTextGenerator';

// const fontFamilies = fonts.map(({ name }) => name);

// export const FontSelect = ({ state, dispatch }) => {
//   // console.log(state);
//   // console.log(dispatch);
//   return (
//     <Select
//       value={state.fontFamily}
//       onChange={(e) => dispatch({ type: 'FONT_FAMILY', value: e.target.value })}
//     >
//       {fontFamilies.map((fontName) => {
//         return (
//           <Option value={fontName} key={fontName}>
//             {fontName}
//           </Option>
//         );
//       })}
//     </Select>
//   );
// };

// const Option = ({ ...props }) => {
//   return (
//     <option key={props.key} {...props}>
//       {props.children}
//     </option>
//   );
// };
