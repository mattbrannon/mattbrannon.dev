import { snakeToCamel, makeShadow2 } from '@utils/helpers';

export const initialState = {
  shadow: {
    colorStart: '#f4ccff',
    colorEnd: '#3a313a',
    layers: 6,
    gap: 18,
    blur: 0,
    offsetX: -0.9,
    offsetY: -0.6,
  },
  line: {},

  fractal: {
    size: 120,
    sides: 1,
    maxDepth: 8,
    scale: 0.75,
    radians: -0.52, //2.35, //1.05,
    angle: 0,
    branches: 1,
    strokeStyle: 'yellow',
    lineWidth: 9,
    shadowColor: 'rgb(0, 0, 0, 0.7)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    xAxis: 550,
    yAxis: 500,
    limit: 20,
    composite: 'source-over',
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SHADOW_COLOR_START':
    case 'SHADOW_COLOR_END':
    case 'SHADOW_LAYERS':
    case 'SHADOW_GAP':
    case 'SHADOW_BLUR':
    case 'SHADOW_OFFSET_X':
    case 'SHADOW_OFFSET_Y': {
      const type = snakeToCamel(action.type);
      const shadowState = { ...state.shadow, [type]: action.value };
      const shadow = makeShadow2(shadowState);
      const styles = { ...state.styles };
      return {
        ...state,
        shadow: { ...shadowState },
        styles: { ...styles, shadow },
      };
    }
    case 'FRACTAL_COMPOSITE':
    case 'FRACTAL_X_AXIS':
    case 'FRACTAL_Y_AXIS':
    case 'FRACTAL_LIMIT':
    case 'FRACTAL_SIDES':
    case 'FRACTAL_SIZE':
    case 'FRACTAL_MAX_DEPTH':
    case 'FRACTAL_SCALE':
    case 'FRACTAL_RADIANS':
    case 'FRACTAL_ANGLE':
    case 'FRACTAL_BRANCHES':
    case 'FRACTAL_LINE_WIDTH': {
      const type = snakeToCamel(action.type);
      console.log(type, action.value);
      return { ...state, [type]: action.value };
    }
  }
}
