import { useEffect, useReducer, useRef, useState } from 'react';
import { fancyTextReducer, initialState } from '@utils/reducers';
import { FontControls } from '@components/Controls/FontControls';
import { MainView, HelpView, CodeView } from 'views/FancyTextGenerator';
import { AnimatePresence, m as motion } from 'framer-motion';
import { toSnakeUpperCase } from '@utils/helpers';
import { Article, NoScript } from 'views/FancyTextGenerator/styles';
import Head from '@components/Head';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { breakpoints } from '@constants/breakpoints';
import { Main } from '@components/Layout';

export default function Page({ ...props }) {
  const [state, dispatch] = useReducer(fancyTextReducer, initialState);
  const ref = useRef();
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const [controlWidth, setControlWidth] = useState(0);

  const onChange = (e) => {
    const type = toSnakeUpperCase(e.target.name);
    dispatch({ type, value: e.target.value });
  };

  return (
    <Main>
      <Head title="Fancy Text Generator" description="Developer tools" />

      <FontControls
        ref={ref}
        onChange={onChange}
        state={state}
        dispatch={dispatch}
        setControlWidth={setControlWidth}
      />
      <Article style={{ '--controlWidth': controlWidth + 'px' }}>
        <AnimatePresence>
          {state.help ? (
            <HelpView state={state} />
          ) : state.code ? (
            <CodeView styles={state.styles} />
          ) : (
            <MainView {...props} dispatch={dispatch} state={state} />
          )}
        </AnimatePresence>
        <NoScript>This tool requires javascript to work properly</NoScript>
      </Article>
    </Main>
  );
}

{
  /* <motion.div
key={state.help || state.code || 'main'}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
> */
}
