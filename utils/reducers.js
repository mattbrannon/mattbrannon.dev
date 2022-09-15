import { makeGradient, makeShadow, parseFontSettings, snakeToCamel } from './helpers';

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

export const initialShapeState = {
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
        sides: 12,
        // sides: state.sides,
        // speed: state.speed,
        // shape: state.shape,
        // opacity: state.cubeOpacity,
      };
    }
    default:
      return { ...state };
  }
};
