export { Help as HelpView } from './HelpView';
export { FancyAnimatedGradient as MainView } from './MainView';
export { CodeView } from './CodeView';

// import { AnimatePresence } from 'framer-motion';
// import { CodeView, ViewWrapper } from './CodeView';
// import { HelpView } from './HelpView';
// import { pxToEm } from '@utils/helpers';

// export const ToggleViews = ({ show, stroke, ...props }) => {
//   console.log(stroke);

//   return (
//     <AnimatePresence exitBeforeEnter>
//       {show.code ? (
//         <CodeView
//           key={show.code}
//           fontFamily={props.font.fontName}
//           shadow={props.shadow}
//           gradient={props.gradient}
//           fontSize={'10vw'}
//           strokeWidth={`${pxToEm(stroke.width)}em`}
//           strokeColor={stroke.color}
//           fontVariationSettings={props.font.css}
//         />
//       ) : show.help ? (
//         <ViewWrapper
//           initial={{ width: 0 }}
//           animate={{ width: '100%' }}
//           exit={{ width: 0, transition: { duration: 0.3 } }}
//           transition={{ duration: 0.8, ease: 'anticipate' }}
//         >
//           <HelpView key={show.help} />
//         </ViewWrapper>
//       ) : null}
//     </AnimatePresence>
//   );
// };
