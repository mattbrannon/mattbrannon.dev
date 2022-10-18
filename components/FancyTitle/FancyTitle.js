import { m as motion } from 'framer-motion';
import { useRef, Children } from 'react';
import ClientOnly from '@components/ClientOnly';
// import { Heading, Span } from './styles';
import { Container, GradientSpan, Wrapper, TextAreaBox, OutlineText } from './styles';

export const FancyTitle = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <GradientSpan {...props}>{children}</GradientSpan>
      <OutlineText aria-hidden>{children}</OutlineText>
    </Container>
  );
};

// export const FancyTitle = ({ children, ...props }) => {
//   const container = useRef();

//   return (
//     <ClientOnly>
//       <motion.div {...props}>
//         <Heading {...props} ref={container} tabIndex={-1}>
//           {Children.toArray(children).map((word, i, collection) => {
//             const space = i < collection.length - 1 ? '\u{00a0}' : ' ';
//             return (
//               <Span key={i} {...props}>
//                 {word}
//                 {space}
//               </Span>
//             );
//           })}
//         </Heading>
//       </motion.div>
//     </ClientOnly>
//   );
// };
