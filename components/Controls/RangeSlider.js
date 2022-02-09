import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Color from 'color-tools';

import {
  spaceToCamelCase as toCamelCase,
  toSnakeUpperCase,
  debounce,
  throttle,
} from '@utils/helpers';
import { useState, useEffect, useRef, useCallback } from 'react';

const createLabel = (name) => {
  const removeText = [ 'update', 'cube', 'shadow', 'gradient', 'text stroke' ];
  removeText.forEach((str) => {
    name = name.replace(str, '');
  });
  return name;
};

export default function RangeSlider({ ...props }) {
  const { name, state, dispatch } = props;
  const label = createLabel(name);
  const key = toCamelCase(name);
  const defaultValue = state[key] || state.settings[key] || 0;

  const dispatchAction = (e) => {
    const type = name
      .split(' ')
      .map((v) => v.toUpperCase())
      .join('_');

    const value = parseFloat(e.target.value);
    // setValue(value);
    return dispatch({ type, value });
  };

  return (
    <Slider>
      <Label htmlFor={name}>{label}:</Label>
      <Input
        onChange={dispatchAction}
        type={props.type || 'range'}
        id={name}
        {...props}
        value={defaultValue}
      />
    </Slider>
  );
}

const makeHex = (color) => {
  return new Color(color).hex.css();
};

const parseType = (type, value) => {
  return type === 'color' ? makeHex(value) : value;
};

// function useThrottle(cb, delay) {
//   const cbRef = useRef(cb);
//   // use mutable ref to make useCallback/throttle not depend on `cb` dep
//   useEffect(() => {
//     cbRef.current = cb;
//   });
//   return useCallback(
//     throttle((...args) => cbRef.current(...args), delay),
//     [ delay ]
//   );
// }
// function useDebounce(cb, delay) {
//   // ...
//   const inputsRef = useRef({ cb, delay }); // mutable ref like with useThrottle
//   useEffect(() => {
//     inputsRef.current = { cb, delay };
//   }); //also track cur. delay
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   return useCallback(
//     debounce((...args) => {
//       // Debounce is an async callback. Cancel it, if in the meanwhile
//       // (1) component has been unmounted (see isMounted in snippet)
//       // (2) delay has changed
//       if (inputsRef.current.delay === delay && typeof window !== 'undefined')
//         inputsRef.current.cb(...args);
//     }, delay),
//     [ delay, debounce ]
//   );
// }

// export const useDebouncedEffect = (effect, deps, delay) => {
//   useEffect(() => {
//     const handler = setTimeout(() => effect(), delay);

//     return () => clearTimeout(handler);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ ...(deps || []), delay ]);
// };

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [ debouncedValue, setDebouncedValue ] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [ value, delay ] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export const CustomInput = ({ ...props }) => {
  const { name, state, dispatch, type } = props;
  const key = toCamelCase(name);
  const label = createLabel(name);
  const value = parseType(type, state[key]);

  const [ colorValue, setColorValue ] = useState(value);

  const color = useDebounce(colorValue, 0);

  useEffect(() => {
    const type = toSnakeUpperCase(name);
    dispatch({ type, value: color });
  }, [ color, dispatch, name ]);

  return (
    <Wrapper>
      <Label {...props}>{label}:</Label>
      <Input
        onChange={(e) => setColorValue(e.target.value)}
        id={name}
        value={props.state[key]}
        {...props}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
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

const getMaxWidth = (props) => {
  const type = props.type;
  const maxWidth = type === 'number' || type === 'color' ? 50 : 100;
  return `${maxWidth}px`;
};

export const Input = styled.input.attrs((props) => {
  const maxWidth = getMaxWidth(props);
  return {
    style: {
      '--maxWidth': maxWidth,
    },
  };
})`
  display: block;
  max-width: var(--maxWidth);
  min-width: 0;

  justify-self: flex-start;
  direction: ${(p) => (p.reverse ? 'rtl' : undefined)};
`;
