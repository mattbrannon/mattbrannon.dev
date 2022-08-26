import styled from 'styled-components';
import { m as motion, useMotionValue } from 'framer-motion';
import { Children, useState, useEffect, useRef } from 'react';
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
  padding-bottom: 0.2em;
  padding-left: 0.44em;
  margin-left: -0.44em;
  margin-bottom: -0.2em;
  /* padding-right: 0.1em; */

  /* padding: 0.125em 0.25em 0.125em 0.25em; */

  background-image: var(--gradient);
  letter-spacing: var(--letterSpacing);

  &:after {
    content: '${(p) => p.children}';
    /* padding: 0.125em 0.25em 0.125em 0.25em; */
    padding-bottom: 0.2em;
    padding-left: 0.44em;

    /* padding-right: 0.1em; */

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    text-shadow: var(--shadow);
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  }
`;

export const WordSpan = styled(Span)`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 0px;
  padding-right: 0px;

  &:after {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 0px;
    padding-right: 0px;
  }

  /* &:nth-of-type(1) {
    padding-left: 42px;
  }
  &:nth-of-type(1):after {
    padding-left: 42px;
  } */
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
  const onChange = (e) => {
    const text = e.target.value.replace("'", '`').replace('\\', '');
    props.dispatch({ type: 'TEXT_CONTENT', value: text });
  };

  const Gradient = props.state.applyToWords ? WordGradient : PhraseGradient;

  return (
    <div>
      <Gradient onChange={onChange} {...props} />
    </div>
  );
};

const PhraseGradient = ({ ...props }) => {
  return (
    <>
      <FancyInput {...props} value={props.state.textContent} />
      <Span {...props}>{props.state.textContent}</Span>
    </>
  );
};

const WordGradient = ({ ...props }) => {
  const words = props.state.textContent.split(' ');
  return (
    <>
      <FancyInput {...props} value={props.state.textContent} />
      {words.map((word, i) =>
        i === words.length - 1 ? (
          <Span {...props} key={i}>
            {word}
          </Span>
        ) : (
          <Span {...props} key={i}>
            {word}&nbsp;
          </Span>
        )
      )}
    </>
  );
};

// export const WordSpan = styled(motion.span)`
//   font-family: var(--fontFamily);
//   font-variation-settings: var(--fontSettings);
//   font-size: var(--fontSize);
//   position: relative;
//   display: inline-block;
//   /* width: max-content; */

//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;
//   color: transparent;

//   background-image: var(--gradient);
//   letter-spacing: var(--letterSpacing);

//   padding-bottom: 4px;

//   &:after {
//     padding-bottom: 4px;

//     content: '${(p) => p.children}';

//     position: absolute;
//     top: 0;
//     left: 0;
//     z-index: -1;
//     text-shadow: var(--shadow);
//     -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
//   }
// `;

const Editable = styled.div.attrs(() => {
  return { contentEditable: true };
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
    spellCheck: false,
  };
})`
  font-size: var(--fontSize);
  padding: 48px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: transparent;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontSettings);
  caret-color: transparent;
  color: transparent;
  /* outline: none; */
  border: none;
  z-index: 1000;
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

export const FancyText = ({ children, ...props }) => {
  return <FancyHeading {...props}>{children}</FancyHeading>;
};

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

// export const FancyGradient = ({ ...props }) => {
//   const onChange = (e) => {
//     const text = e.target.value.replace("'", '`');
//     props.dispatch({ type: 'TEXT_CONTENT', value: text });
//   };

//   const Gradient = props.state.applyToWords ? WordGradient : PhraseGradient;

//   return (
//     <div style={{ maxWidth: '100%', margin: '0 auto' }}>
//       <Gradient onChange={onChange} {...props} />
//     </div>
//   );

//   // const words = props.state.textContent.split(' ');
//   // return (
//   //   <div style={{ maxWidth: '100%', margin: '0 auto' }}>
//   //     <FancyInput value={props.state.textContent} onChange={onChange} />
//   //     {words.map((word, i) => (
//   //       <WordSpan {...props} key={i}>
//   //         {word}&nbsp;
//   //       </WordSpan>
//   //     ))}
//   //   </div>
//   // );

//   // return (
//   //   <div style={{ maxWidth: '100%', margin: '0 auto' }}>
//   //     <FancyInput value={props.state.textContent} onChange={handleChange} />
//   //     <Span {...props}>{props.state.textContent}</Span>
//   //   </div>
//   // );
// };
