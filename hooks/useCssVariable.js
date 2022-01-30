import { useState, useEffect, useCallback } from 'react';
// import { useHasMounted } from '@hooks/useHasMounted';

// function setVars(...args) {
//   const props = [ ...args ];
//   return function assignValues(...values) {
//     return props.reduce((acc, value, i) => {
//       acc[value] = values[i];
//       return acc;
//     }, {});
//   };
// }

// let useVariables = (ref, ...variables) => {
//   const props = [ ...variables ];
//   const element = ref;
//   return function assignValues(...values) {
//     for (let i = 0; i < props.length; i++) {
//       ref.style.setProperty(`--${props[i]}`, values[i]);
//     }
//     return props.reduce((acc, value, i) => {
//       acc[value] = values[i];
//       acc.element = element;
//       return acc;
//     }, {});
//   };
// };

// var setValues = setVars('radius', 'translateX', 'background')
// setValues(12, 54, 'green')
// var css = setValues(23, 46, 'blue')
// for (var key in css) {
//   ref.current.style.setProperty(`--${key}`, css[key])
// }

// export const useVariables = (ref, ...variables) => {
//   const props = [ ...variables ];
//   const element = ref;
//   return function assignValues(...values) {
//     return props.reduce((acc, value, i) => {
//       acc[value] = values[i];
//       acc.element = element;
//       return acc;
//     }, {});
//   };
// };

export const useCssVariable = (variableName, initialValue = null, ref) => {
  // const hasMounted = useHasMounted();
  const [ value, setValue ] = useState(initialValue);
  // const [ newValue, setNewValue ] = useState(value);

  useEffect(() => {
    const element = ref && ref.current ? ref.current : document.documentElement;
    if (value) {
      element.style.setProperty(variableName, value);
    }
    else {
      const styles = window.getComputedStyle(element);
      if (variableName in styles) {
        const cssValue = styles.getPropertyValue(variableName);
        setValue(cssValue);
      }
    }
  }, [ value, ref, variableName ]);

  const updateValue = useCallback(
    (value) => {
      setValue(value);
      const element = ref && ref.current ? ref.current : document.documentElement;
      element.style.setProperty(variableName, value);
    },
    [ setValue, variableName, ref ]
  );

  return updateValue;
};

// export const useCssVariable = (variableName, initialValue, ref) => {
//   const hasMounted = useHasMounted();
//   const [ value, setValue ] = useState(null);
//   const [ newValue, setNewValue ] = useState(value);
//   const [ hasWarned, setHasWarned ] = useState(false);

//   useEffect(() => {
//     if (hasMounted) {
//       const element = ref && ref.current ? ref.current : document.documentElement;
//   const styles = window.getComputedStyle(element);
//   if (variableName in styles) {
//     const cssValue = styles.getPropertyValue(variableName);
//     setValue(cssValue);
//   }
// }
//   }, [ hasMounted, variableName, ref ]);

//   useEffect(() => {
//     if (hasMounted && !ref && !hasWarned) {
//       const warning = `
//       setting global css custom property ${variableName}.
//       If you want to set a scoped property, pass in a ref as the second argument

//       const ref = useRef();
//       const [customProperty, setCustomProperty] = useCssVariable('--my-custom-property', ref)
//       `;
//       console.warn(warning);
//       setHasWarned(true);
//     }
//   }, [ hasWarned, setHasWarned, hasMounted, ref, variableName ]);

//   const updateValue = useCallback(
//     (value) => {
//       setNewValue(value);
//       const element = ref && ref.current ? ref.current : document.documentElement;
//       element.style.setProperty(variableName, value);
//     },
//     [ setNewValue, variableName, ref ]
//   );

//   return [ newValue, updateValue ];
// };
