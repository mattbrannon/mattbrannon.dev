import { useReducer, useRef } from 'react';
import { fancyTextReducer, initialState } from '@utils/reducers';
import { FontControls } from '@components/Controls/FontControls';
import { MainView, HelpView, CodeView } from 'views/FancyTextGenerator';
import { AnimatePresence, m as motion } from 'framer-motion';
import { toSnakeUpperCase } from '@utils/helpers';
import { Main, NoScript } from 'views/FancyTextGenerator/styles';
import Head from '@components/Head';

export default function Page({ ...props }) {
  const [state, dispatch] = useReducer(fancyTextReducer, initialState);
  const ref = useRef();

  const onChange = (e) => {
    const type = toSnakeUpperCase(e.target.name);
    dispatch({ type, value: e.target.value });
  };

  return (
    <>
      <Head title="Fancy Text Generator" description="Developer tools" />

      <FontControls ref={ref} onChange={onChange} state={state} dispatch={dispatch} />
      <Main style={{ '--controlWidth': 336 + 'px' }}>
        <AnimatePresence>
          <motion.div
            key={state.help || state.code || 'main'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {state.help ? (
              <HelpView state={state} />
            ) : state.code ? (
              <CodeView styles={state.styles} />
            ) : (
              <MainView {...props} dispatch={dispatch} state={state} />
            )}
          </motion.div>
        </AnimatePresence>
        <NoScript>This tool requires javascript to work properly</NoScript>
      </Main>
    </>
  );
}
