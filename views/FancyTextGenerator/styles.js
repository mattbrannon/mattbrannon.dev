import styled from 'styled-components';
import { m as motion, useMotionValue } from 'framer-motion';
import { Children, useState, useEffect } from 'react';
import FancyTitle from '@components/FancyTitle';

export const Main = styled.div`
  position: absolute;
  top: var(--header-height);
  left: var(--controlWidth);
  right: 0;
  bottom: var(--footer-height);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

// HelpView
export const Container = styled.div`
  background: var(--help-background);
  color: var(--color-text);
`;

export const Wrapper = styled.ul`
  margin-left: 0;
  margin-top: 0;
`;

export const Heading = styled.h3`
  margin-top: 0;
  padding: 32px 0 0 0;
  color: var(--h3);
`;

export const SubHeading = styled.h4`
  color: var(--fancy-text-color);
  margin: 0 48px 16px 32px;
`;

export const Row = styled.li`
  margin: 0 48px 16px 32px;
  display: grid;
  grid-template-columns: 120px auto;
`;

export const Section = styled.section`
  padding: 0 0 32px 0;
  background: inherit;
`;

export const Text = styled.p`
  margin: 0 48px 16px 32px;
`;

//// CodeView

export const ViewWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  left: 0;
  right: 0;
  top: 0;
`;

/// MainView

// export const ContentEditable = ({ children, ...props }) => {
//   const [text, setText] = useState('');
//   console.log(props);
//   return (
//     <P
//       style={props.styles}
//       onInput={(e) => setText(e.target.textContent)}
//       text={text}
//       spellCheck={false}
//       contentEditable={true}
//     >
//       {children}
//     </P>
//   );
// };

// export const P = styled.p`
//   height: 100%;
//   width: calc(100vw - var(--controlWidth));
//   margin: 0;
//   padding: 32px;
//   outline: none;
//   font-family: var(--fontFamily);
//   font-variation-settings: var(--fontSettings);
//   font-size: var(--fontSize);
//   letter-spacing: var(--letterSpacing);

//   background-image: var(--gradient);
//   text-shadow: var(--shadow);

//   &:before {
//     ${
//   '' /* background-clip: text;
//     -webkit-background-clip: text;
//     color: transparent;
//     -webkit-text-fill-color: transparent;
//     content: '${({ children }) => children}';
//     position: absolute;
//     z-index: -1;

//     text-shadow: var(--shadow);
//     -webkit-text-stroke: var(--strokeWidth) var(--strokeColor); */
// }
//   }

//   &:after {
//     text-shadow: none;
//     color: red;
//     content: '${({ children }) => children}';
//     position: absolute;
//     top: 0;
//     padding: 32px;
//   }
// `;

// export const FancyText = ({ children, ...props }) => {
//   return (
//     <>
//       <div style={{ height: '120px' }}></div>
//       <div style={{ top: '48px', padding: '120px 48px' }}>
//         {children.split(' ').map((word, i, collection) => {
//           const space = i < collection.length - 1;
//           return (
//             <Word space={space} key={i}>
//               {word}
//             </Word>
//           );
//         })}
//       </div>
//     </>
//   );
// };

export const Span = styled(motion.span)`
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontSettings);
  font-size: var(--fontSize);
  position: relative;
  display: inline-block;
  /* width: max-content; */

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  padding: 24px;

  background-image: var(--gradient);
  letter-spacing: var(--letterSpacing);

  /* white-space: nowrap; */

  &:before {
    content: '${({ children }) => children}';
    position: absolute;
    z-index: -1;

    text-shadow: var(--shadow);
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  }

  &:after {
    content: '${(p) => p.children}';
    padding: 24px;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    text-shadow: var(--shadow);
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  }
`;

// const Heading = styled(H1)`
//   font-size: clamp(48px, 4vw, 60px);
//   margin-bottom: 0;
//   margin-top: 0;
//   letter-spacing: var(--letterSpacing);
// `;

const Word = ({ children, ...props }) => {
  if (props.space) {
    return <Span {...props}>{children}&nbsp;</Span>;
  }
  else {
    return <Span {...props}>{children}</Span>;
  }
};

export const FancyGradient = ({ ...props }) => {
  const [text, setText] = useState(props.children);

  const handleChange = (e) => {
    const text = e.target.value.replace(/\s+/g, '\u{00a0}');
    setText(text);
  };

  return (
    <>
      <FancyInput onChange={handleChange} />
      <Span {...props}>{text}</Span>
    </>
  );
};

export const FancyHeading = styled.span`
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontSettings);
  font-size: var(--fontSize);

  background-image: var(--gradient);
  padding: 24px;

  ${'' /* white-space: nowrap; */}

  letter-spacing: var(--letterSpacing);

  &:before {
    content: '${({ children }) => children}';
    position: absolute;
    z-index: -1;

    text-shadow: var(--shadow);
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  }
`;

export const FancyInput = styled.input.attrs(() => {
  return {
    spellcheck: false,
  };
})`
  font-size: var(--fontSize);
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  /* font-weight: 900; */
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontSettings);
  caret-color: red;
  color: red;
  /* color: transparent; */
  /* outline: none; */
  border: none;
`;

// import styled from 'styled-components';
// import { m as motion, useMotionValue } from 'framer-motion';

// export const Main = styled.div`
//   position: absolute;
//   top: var(--header-height);
//   left: var(--controlWidth);
//   right: 0;
//   bottom: var(--footer-height);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow-x: hidden;
// `;

// // HelpView
// export const Container = styled.div`
//   background: var(--help-background);
//   color: var(--color-text);
// `;

// export const Wrapper = styled.ul`
//   margin-left: 0;
//   margin-top: 0;
// `;

// export const Heading = styled.h3`
//   margin-top: 0;
//   padding: 32px 0 0 0;
//   color: var(--h3);
// `;

// export const SubHeading = styled.h4`
//   color: var(--fancy-text-color);
//   margin: 0 48px 16px 32px;
// `;

// export const Row = styled.li`
//   margin: 0 48px 16px 32px;
//   display: grid;
//   grid-template-columns: 120px auto;
// `;

// export const Section = styled.section`
//   padding: 0 0 32px 0;
//   background: inherit;
// `;

// export const Text = styled.p`
//   margin: 0 48px 16px 32px;
// `;

// //// CodeView

// export const ViewWrapper = styled(motion.div)`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   left: 0;
//   right: 0;
//   top: 0;
// `;

// /// MainView

// // export const FancyText = ({ children, ...props }) => {
// //   return <FancyHeading>{children}</FancyHeading>;
// // };

// export const FancyText = styled.h1`
//   background-clip: text;
//   -webkit-background-clip: text;
//   color: transparent;
//   -webkit-text-fill-color: transparent;
//   font-family: var(--fontFamily);
//   font-variation-settings: var(--fontSettings);
//   font-size: var(--fontSize);

//   background-image: var(--gradient);
//   padding: 24px;

//   white-space: nowrap;

//   letter-spacing: var(--letterSpacing);

//   will-change: font-variation-settings, background-image;

//   &:before {
//     content: '${({ children }) => children}';
//     position: absolute;
//     z-index: -1;

//     text-shadow: var(--shadow);

//     will-change: text-shadow;

//     -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
//   }
// `;
