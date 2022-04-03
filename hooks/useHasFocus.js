import { useState, useEffect } from 'react';

export const useHasFocus = (ref) => {
  const [ hasFocus, setHasFocus ] = useState(false);

  useEffect(() => {
    function isFocused(event) {
      const focus = ref.current.contains(event.relatedTarget);
      setHasFocus(focus);
    }

    ref.current.addEventListener('focusout', isFocused);
    return ref.current.removeEventListener('focusout', isFocused);
  }, [ ref, hasFocus ]);

  return hasFocus;
};
