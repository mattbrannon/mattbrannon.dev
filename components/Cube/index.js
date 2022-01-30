import Cube from '@components/Cube/cube';
import Controls from '@components/Cube/controls';
import styled from 'styled-components';
import { useReducer, useEffect, useState } from 'react';
import { useHasMounted } from '@hooks/useHasMounted';

const initialState = {
  rotateX: 0,
  rotateY: 5,
  rotateZ: -4,
  width: 150,
  height: 150,
  depth: 50,
  eyeX: 0,
  eyeY: 0,
  translateX: 350,
  translateY: 0,
  translateZ: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TRANSLATE_CUBE_X':
      return { ...state, translateX: action.value };
    case 'TRANSLATE_CUBE_Y':
      return { ...state, translateY: action.value };
    case 'TRANSLATE_CUBE_Z':
      return { ...state, translateZ: action.value };
    case 'ROTATE_CUBE_X':
      return { ...state, rotateX: action.value };
    case 'ROTATE_CUBE_Y':
      return { ...state, rotateY: action.value };
    case 'ROTATE_CUBE_Z':
      return { ...state, rotateZ: action.value };
    case 'UPDATE_CUBE_WIDTH':
      return { ...state, width: action.value };
    case 'UPDATE_CUBE_HEIGHT':
      return { ...state, height: action.value };
    case 'UPDATE_CUBE_DEPTH':
      return { ...state, depth: action.value };
    case 'TRANSLATE_EYE_X':
      return { ...state, eyeX: action.value };
    case 'TRANSLATE_EYE_Y':
      return { ...state, eyeY: action.value };
    case 'RESET':
      return { ...initialState };
    default:
      return { ...state };
  }
}

export default function Qbert() {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const hasMounted = useHasMounted();
  const [ hasBeenSet, setHasBeenSet ] = useState(false);

  useEffect(() => {
    if (hasMounted && !hasBeenSet) {
      setHasBeenSet(true);
      if (window.CSS && CSS.registerProperty) {
        window.CSS.registerProperty({
          name: '--depth',
          syntax: '<length>',
          inherits: true,
          initialValue: '25px',
        });
      }
    }
  }, [ hasMounted, hasBeenSet ]);

  return (
    <Wrapper>
      <Cube state={state} />
      <Controls state={state} dispatch={dispatch} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: static;
  width: 100px;
  height: 100%;
  align-self: center;
`;
