import { labels, fonts } from '@constants/fancyTextGenerator';
import { Range } from './Input';

export const FontProperties = ({ dispatch, ...props }) => {
  const fontState = props.state.fonts;
  const fontFamily = props.state.styles.fontFamily;

  const { currentSettings, initialSettings } = fontState[fontFamily];

  const currentFont = fonts.find((font) => font.name === fontFamily);
  return Object.keys(currentFont.properties).map((key) => {
    const [min, max] = currentFont.properties[key];
    const step = max - min > 2 ? 1 : key === 'CRSV' ? 0.5 : 0.01;
    const n = Number(currentSettings[key]);
    const value = n < 1 && n > 0 && step < 1 ? n.toFixed(2) : n;

    // const value = Number(currentSettings[key]).toFixed(2);
    const label = labels[key];
    return (
      <Range
        onChange={(e) => dispatch({ type: key, value: e.target.value })}
        key={key}
        name={label}
        min={min}
        max={max}
        step={step}
        value={value}
      />
    );
  });
};

// import { labels, fonts } from '@constants/fancyTextGenerator';
// import { Range } from './Input';

// export const FontProperties = ({ state, dispatch }) => {
//   // console.log(state);
//   // const fontFamily = state.fontFamily;
//   const fontFamily = state.fontFamily;
//   const { properties } = fonts.find((font) => font.name === fontFamily);

//   return Object.keys(properties).map((key, i) => {
//     const [min, max] = properties[key];
//     const step = max - min > 2 ? 1 : key === 'CRSV' ? 0.5 : 0.01;
//     const currentSettings = state[fontFamily].currentSettings;
//     // const currentSettings = state.font[fontFamily].currentSettings;
//     const value = currentSettings[key];
//     const label = labels[key];
//     // console.log(label, value);
//     return (
//       <Range
//         onChange={(e) => dispatch({ type: key, value: e.target.value })}
//         key={key}
//         name={label}
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//       />
//     );
//   });
// };
