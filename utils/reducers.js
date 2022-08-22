import {
  makeGradient,
  makeShadow,
  makeGradient2,
  makeShadow2,
  parseFontSettings,
  snakeToCamel,
  toCamelCase,
} from './helpers';
import { fonts, fancyTextInitialState } from '@constants/fancyTextGenerator';

export const getPropName = (e) => {
  const propName = e.target.name
    .split(' ')
    .slice(1)
    .map((word, i) => {
      return i > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join('');

  return propName;
};

export const getPropFromAction = (actionType) => {
  const propName = actionType
    .toLowerCase()
    .split('_')
    .slice(1)
    .map((word, i) => {
      return i > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join('');

  return propName;
};

// export const initializeFontState = (fonts) => {
//   const font = fonts.find((font) => font.default);
//   const savedStates = fonts.map(({ name, settings, current }) => ({
//     name,
//     settings,
//     current,
//   }));
//   return {
//     savedStates,
//     fontName: font.name,
//     fontProperties: font.properties,
//     css: parseFontSettings(font.settings),
//   };
// };

export const initializeFontState = (fonts) => {
  return fonts.map((font, i) => {
    const fontFamily = font.name;
    const initialSettings = font.settings;
    const currentSettings = font.current;
    const initialCss = parseFontSettings(font.settings);
    const currentCss = parseFontSettings(font.current);
    const properties = font.properties;
    const selected = font.default;
    return {
      fontFamily,
      initialSettings,
      currentSettings,
      initialCss,
      currentCss,
      properties,
      selected,
    };
  });
};

// export const initializeFontState = (fonts) => {
//   const font = fonts.find((font) => font.default);
//   const savedStates = fonts.map(({ name, settings, current }) => ({
//     name,
//     settings,
//     current,
//   }));

//   return {
//     savedStates,
//     fontName: font.name,
//     fontProperties: font.properties,
//     initial: parseFontSettings(font.settings),
//     current: parseFontSettings(font.current),
//   };
// };

const setFontState = (state, action) => {
  // const { fontSettings } = state;
  const savedStates = state.savedStates.map((savedState) => {
    if (savedState.name === state.fontName) {
      if (!Object.keys(savedState.current).length) {
        return {
          name: savedState.name,
          settings: { ...savedState.settings },
          current: { ...savedState.settings, [action.type]: action.value },
        };
      }
      return {
        name: savedState.name,
        settings: { ...savedState.settings },
        current: { ...savedState.current, [action.type]: parseFloat(action.value) },
      };
    }
    else {
      return savedState;
    }
  });

  const currentFont = savedStates.find((savedState) => savedState.name === state.fontName);
  const css = parseFontSettings(currentFont.current);

  return {
    ...state,
    css,
    savedStates,
  };
};

export const fontReducer = (state, action) => {
  switch (action.type) {
    case 'MONO':
    case 'CRSV':
    case 'CASL':
    case 'BLDA':
    case 'TRMD':
    case 'TRMC':
    case 'SKLD':
    case 'TRML':
    case 'SKLA':
    case 'TRMF':
    case 'TRMK':
    case 'BLDB':
    case 'WMX2':
    case 'TRMB':
    case 'TRMA':
    case 'SKLB':
    case 'TRMG':
    case 'TRME':
    case 'wght':
    case 'slnt':
    case 'wdth':
    case 'ital': {
      const updatedState = state.map((font) => {
        const currentSettings = font.selected
          ? { ...font.currentSettings, [action.type]: action.value }
          : font.currentSettings;

        const currentCss = parseFontSettings(currentSettings);

        return {
          ...font,
          currentSettings,
          currentCss,
        };
      });
      return updatedState;
    }

    case 'FONT_CHANGE': {
      return handleFontChange(state, action);
    }
    case 'FONT_RESET': {
      // console.log(state.font);
      return { ...initializeFontState(fonts) };
    }
  }
};

// // const { fontSettings } = state;
// const savedStates = state.savedStates.map((savedState) => {
//   if (savedState.name === state.fontName) {
//     if (!Object.keys(savedState.current).length) {
//       return {
//         name: savedState.name,
//         settings: { ...savedState.settings },
//         current: { ...savedState.settings, [action.type]: action.value },
//       };
//     }
//     return {
//       name: savedState.name,
//       settings: { ...savedState.settings },
//       current: { ...savedState.current, [action.type]: parseFloat(action.value) },
//     };
//   }
//   else {
//     return savedState;
//   }
// });

// const currentFont = savedStates.find((savedState) => savedState.name === state.fontName);
// const current = parseFontSettings(currentFont.current);

// // const css = parseFontSettings({ ...fontSettings, [action.type]: action.value });

// return {
//   ...state,
//   current,
//   savedStates,
//   // fontSettings, //: { ...fontSettings, [action.type]: action.value },
// };

export const handleFontChange = (state, action) => {
  const fontFamily = action.value;
  const updatedState = state.map((font) => {
    return {
      ...font,
      selected: font.fontFamily === fontFamily,
    };
  });
  return updatedState;
};

// export const handleFontChange = (state, action) => {
//   const fontName = action.value;
//   const font = fonts.find((font) => font.name === fontName);
//   const savedState = state.savedStates.find((savedState) => savedState.name === fontName);
//   // console.log(action);
//   return {
//     ...state,
//     fontName,
//     fontProperties: { ...font.properties },
//     current: parseFontSettings(savedState.current) || parseFontSettings(savedState.settings),
//   };
// };

export const gradientReducer = (state, action) => {
  switch (action.type) {
    case 'COLOR_START':
    case 'COLOR_END':
    case 'ANGLE':
    case 'BLEND':
    case 'MID_POINT': {
      const property = snakeToCamel(action.type);
      const currentState = {
        ...state,
        [property]: action.value,
      };

      return { ...currentState, css: makeGradient2(currentState) };
    }
  }
};

export const shadowReducer = (state, action) => {
  switch (action.type) {
    case 'COLOR_START':
    case 'COLOR_END':
    case 'GAP':
    case 'LAYERS':
    case 'OFFSET_X':
    case 'OFFSET_Y':
    case 'BLUR': {
      const property = snakeToCamel(action.type);
      const currentState = {
        ...state,
        [property]: action.value,
      };

      return { ...currentState, css: makeShadow2(currentState) };
    }
  }
};

// export const fancyTextReducer = (state, action) => {
//   switch (action.type) {
//     case 'GRADIENT_COLOR_START':
//     case 'GRADIENT_COLOR_END':
//     case 'GRADIENT_ANGLE':
//     case 'GRADIENT_BLEND':
//     case 'GRADIENT_MIDPOINT': {
//       const property = snakeToCamel(action.type);
//       const currentState = {
//         ...state,
//         [property]: action.value,
//       };

//       console.log(currentState);

//       return { ...currentState, gradient: makeGradient(currentState) };
//     }
//     case 'SHADOW_COLOR_START':
//     case 'SHADOW_COLOR_END':
//     case 'SHADOW_GAP':
//     case 'SHADOW_LAYERS':
//     case 'SHADOW_OFFSET_X':
//     case 'SHADOW_OFFSET_Y':
//     case 'SHADOW_BLUR': {
//       const property = snakeToCamel(action.type);
//       const currentState = {
//         ...state,
//         [property]: action.value,
//       };

//       console.log(currentState);

//       return { ...currentState, shadow: makeShadow(currentState) };
//     }
//     case 'STROKE_WIDTH':
//     case 'STROKE_COLOR':
//     case 'FONT_SIZE':
//     case 'FONT_FAMILY':
//     case 'LETTER_SPACING':
//     case 'TEXT_CONTENT': {
//       const property = snakeToCamel(action.type);

//       console.log({ ...state, [property]: state });

//       return { ...state, [property]: action.value };
//     }
//     case 'FONT_CHANGE': {
//       return { ...state, fontFamily: action.value };
//     }
//     case 'MONO':
//     case 'CRSV':
//     case 'CASL':
//     case 'BLDA':
//     case 'TRMD':
//     case 'TRMC':
//     case 'SKLD':
//     case 'TRML':
//     case 'SKLA':
//     case 'TRMF':
//     case 'TRMK':
//     case 'BLDB':
//     case 'WMX2':
//     case 'TRMB':
//     case 'TRMA':
//     case 'SKLB':
//     case 'TRMG':
//     case 'TRME':
//     case 'wght':
//     case 'slnt':
//     case 'wdth':
//     case 'ital': {
//       const fontFamily = state.fontFamily;
//       const currentSettings = state[fontFamily].currentSettings;
//       const initialSettings = state[fontFamily].initialSettings;
//       const propName = action.type; //action.type.slice(action.type.indexOf('_'));
//       const updatedSettings = { ...currentSettings, [propName]: action.value };
//       const fontSettings = parseFontSettings(updatedSettings);
//       const fontProperties = { ...state.fontProperties };

//       const newState = {
//         ...state,
//         [fontFamily]: { initialSettings, currentSettings: updatedSettings },
//         fontProperties: { ...fontProperties, [propName]: action.value },
//         fontSettings,
//       };

//       return newState;
//     }
//   }
// };

export const textReducer = (state, action) => {
  switch (action.type) {
    case 'STROKE_WIDTH':
    case 'STROKE_COLOR':
    case 'FONT_SIZE':
    case 'LETTER_SPACING':
    case 'CONTENT': {
      const property = snakeToCamel(action.type);
      return { ...state, [property]: action.value };
    }
  }
};

export const buttonReducer = (state, action) => {
  const updated = Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});

  const propName = action.type.toLowerCase();

  switch (action.type) {
    case 'CODE':
    case 'HELP': {
      return { ...updated, [propName]: action.value };
    }
  }
};

const initialShapeState = {
  shape: 'Cube',
  cubeWidth: 150,
  cubeHeight: 150,
  cubeDepth: 100,
  cubeOpacity: 1,
  cubeMain: '#D2B48C',
  cubeHair: '#654321',
  cubeEyes: '#8cbecf',
  rotateXAxis: 155,
  rotateYAxis: 160,
  rotateZAxis: 160,
  translateXAxis: 0,
  translateYAxis: 0,
  translateZAxis: 0,
  speed: 1,

  sphereOuter: '#df60201a',
  sphereMiddle: '#9fdf201a',
  sphereInner: '#20df601a',
};

// sphereSides: 12,
// color: '#9ba84a',
// outline: true,

export const shapeReducer = (state, action) => {
  // const actionType = snakeToCamel(action.type);
  const propName = getPropFromAction(action.type);
  // console.log(propName);
  switch (action.type) {
    case 'SHAPE_CUBE_WIDTH':
    case 'SHAPE_CUBE_HEIGHT':
    case 'SHAPE_CUBE_DEPTH':
    case 'SHAPE_CUBE_HAIR':
    case 'SHAPE_CUBE_EYES':
    case 'SHAPE_CUBE_MAIN':
    case 'SHAPE_CUBE_OPACITY':
    case 'SHAPE_ROTATE_X_AXIS':
    case 'SHAPE_ROTATE_Y_AXIS':
    case 'SHAPE_ROTATE_Z_AXIS':
    case 'SHAPE_TRANSLATE_X_AXIS':
    case 'SHAPE_TRANSLATE_Y_AXIS':
    case 'SHAPE_TRANSLATE_Z_AXIS':
    case 'SHAPE_SIDES':
    case 'SHAPE_SPHERE_OUTER':
    case 'SHAPE_SPHERE_MIDDLE':
    case 'SHAPE_SPHERE_INNER':
    case 'SHAPE_SPEED': {
      return { ...state, [propName]: action.value };
    }
    case 'SHAPE_CHANGE': {
      return { ...state, shape: action.value };
    }
    case 'RESET': {
      return {
        ...initialShapeState,
        sides: state.sides,
        speed: state.speed,
        shape: state.shape,
        opacity: state.cubeOpacity,
      };
    }
    default:
      return { ...state };
  }
};

export const fancyTextReducer = (state, action) => {
  switch (action.type) {
    case 'CODE':
    case 'HELP': {
      const actionType = action.type.toLowerCase();
      return { ...state, [actionType]: action.value };
    }
    case 'RESET': {
      return fancyTextInitialState;
    }
    case 'GRADIENT': {
      switch (action.property) {
        case 'COLOR_START':
        case 'COLOR_END':
        case 'ANGLE':
        case 'MIDPOINT':
        case 'BLEND': {
          const propName = toCamelCase(action.property);
          const gradient = { ...state.gradient, [propName]: action.value };
          const css = { ...state.css, gradient: makeGradient2(gradient) };
          return { ...state, gradient, css };
        }
      }
      break;
    }
    case 'SHADOW': {
      switch (action.property) {
        case 'COLOR_START':
        case 'COLOR_END':
        case 'LAYERS':
        case 'GAP':
        case 'BLUR':
        case 'OFFSET_X':
        case 'OFFSET_Y': {
          const propName = toCamelCase(action.property);
          const shadow = { ...state.shadow, [propName]: action.value };
          const css = { ...state.css, shadow: makeShadow2(shadow) };
          return { ...state, shadow, css };
        }
      }
      break;
    }
    case 'TEXT': {
      switch (action.property) {
        case 'LETTER_SPACING':
        case 'FONT_SIZE':
        case 'STROKE_WIDTH':
        case 'STROKE_COLOR': {
          const propName = toCamelCase(action.property);
          const text = { ...state.text, [propName]: action.value };
          const css = { ...state.css, [propName]: action.value };
          return { ...state, text, css };
        }
      }
      break;
    }
    case 'FONT_FAMILY': {
      const css = { ...state.css };
      const fontFamily = action.value;
      return { ...state, fontFamily, css: { ...css, fontFamily } };
    }
    case 'MONO':
    case 'CRSV':
    case 'CASL':
    case 'BLDA':
    case 'TRMD':
    case 'TRMC':
    case 'SKLD':
    case 'TRML':
    case 'SKLA':
    case 'TRMF':
    case 'TRMK':
    case 'BLDB':
    case 'WMX2':
    case 'TRMB':
    case 'TRMA':
    case 'SKLB':
    case 'TRMG':
    case 'TRME':
    case 'wght':
    case 'slnt':
    case 'wdth':
    case 'ital': {
      const fontFamily = state.fontFamily;
      const initialSettings = state[fontFamily].initialSettings;
      const currentSettings = state[fontFamily].currentSettings;

      const fontFamilySettings = {
        initialSettings,
        currentSettings: { ...currentSettings, [action.type]: action.value },
      };

      // const fontSettings = { ...currentSettings, [action.type]: action.value };

      const css = { ...state.css };
      return {
        ...state,
        [fontFamily]: fontFamilySettings,
        css: { ...css, fontSettings: parseFontSettings(fontFamilySettings.currentSettings) },
      };
    }
    default: {
      return { ...state };
    }
  }
};
