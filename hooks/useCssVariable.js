import { useState, useEffect, useCallback } from 'react';

export const useCssVariable = (variableName, initialValue = null, ref) => {
  const [ value, setValue ] = useState(initialValue);
  const getElement = (ref) =>
    ref && ref.current ? ref.current : document.documentElement;

  useEffect(() => {
    const element = getElement(ref);
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
      const element = getElement(ref);
      element.style.setProperty(variableName, value);
    },
    [ setValue, variableName, ref ]
  );

  return updateValue;
};
