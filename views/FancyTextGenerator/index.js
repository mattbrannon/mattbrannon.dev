import { AnimatePresence, m as motion } from 'framer-motion';
import { useReducer, useRef, useState } from 'react';
import { fancyTextReducer, initialState } from './reducer';
import Head from '@components/Head';
import { FontControls } from '@components/Controls/FontControls';
import { layout } from '@components/Layout';
import { breakpoints } from '@constants/breakpoints';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { toSnakeUpperCase } from '@utils/helpers';
import { CodeView } from './CodeView';
import { HelpView } from './HelpView';
import { MainView } from './MainView';
import { Article, NoScript, Grid } from './styles';

export default function FancyTextGenerator({ ...props }) {
  const isDesktop = useMediaQuery({ minWidth: breakpoints.laptop });
  const fontSize = isDesktop ? 128 : 60;
  initialState.styles.fontSize = fontSize;

  const [state, dispatch] = useReducer(fancyTextReducer, initialState);
  const ref = useRef();
  const [controlWidth, setControlWidth] = useState(0);

  const onChange = (e) => {
    const type = toSnakeUpperCase(e.target.name);
    dispatch({ type, value: e.target.value });
  };

  return (
    <>
      <Head title="Fancy Text Generator" description="Developer tools" />
      <layout.fancyTextGenerator controlWidth={controlWidth}>
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
      </layout.fancyTextGenerator>
    </>
  );
}
