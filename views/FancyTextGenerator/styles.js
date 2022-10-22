import styled from 'styled-components';
import { m as motion } from 'framer-motion';
// import {FancyTitle} from '@components/FancyTitle';
import { breakpoints } from '@constants/breakpoints';

export const Article = styled.article`
  position: absolute;
  top: var(--header-height);
  left: var(--controlWidth);
  right: 0;
  bottom: var(--footer-height);
  overflow: auto;

  @media (max-width: ${breakpoints.tablet}px) {
    --controlWidth: 0;
    left: 0;
  }
`;

export const NoScript = styled.noscript`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  display: grid;
  place-items: center;
  font-size: var(--size52);
  font-family: recursive;
  font-variation-settings: 'wght' 800, 'slnt' -6, 'CRSV' 0, 'CASL' 0, 'MONO' 0;
  text-align: center;
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
  /* position: absolute; */
  /* width: 100%; */
  height: 100%;
  overflow: auto;
  /* overflow: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; */

  @media (max-width: ${breakpoints.mobile}) {
    left: 0;
    right: 0;
  }
`;

/// MainView

export const Span = styled(motion.span)`
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontSettings);
  font-size: var(--fontSize);
  position: relative;
  display: inline-block;

  -webkit-background-clip: text;
  background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  /* color: transparent; */
  padding-bottom: 0.2em;
  padding-left: 0.44em;
  margin-left: -0.44em;
  margin-bottom: -0.2em;
  background-image: var(--gradient);
  letter-spacing: var(--letterSpacing);

  &:after {
    content: '${(p) => p.children}';
    padding-bottom: 0.2em;
    padding-left: 0.44em;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    text-shadow: var(--shadow);
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  }
`;

// export const WordSpan = styled(Span)`
//   padding-top: 12px;
//   padding-bottom: 12px;
//   padding-left: 0px;
//   padding-right: 0px;

//   &:after {
//     padding-top: 12px;
//     padding-bottom: 12px;
//     padding-left: 0px;
//     padding-right: 0px;
//   }
// `;

// const Word = ({ children, ...props }) => {
//   if (props.space) {
//     return <Span {...props}>{children}&nbsp;</Span>;
//   }
//   else {
//     return <Span {...props}>{children}</Span>;
//   }
// };

export const FancyGradient = ({ ...props }) => {
  const onChange = (e) => {
    const text = e.target.value.replace("'", '`').replace('\\', '');
    props.dispatch({ type: 'TEXT_CONTENT', value: text });
  };

  const Gradient = props.state.applyToWords ? WordGradient : PhraseGradient;

  return <Gradient onChange={onChange} {...props} />;
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
  /* caret-color: transparent; */
  caret-color: white;
  color: transparent;
  /* outline: none; */
  border: none;
  z-index: 1000;
`;

const FancyGradientShadow = ({ ...props }) => {
  const words = props.state.textContent.split(' ');

  return (
    <>
      <ShadowLayer />
    </>
  );
};

const TextArea = styled(motion.textarea).attrs({ maxLength: 200, spellCheck: false })`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  resize: none;
  background: transparent;
  font-size: var(--fontSize);
  font-family: var(--fontFamily);
  font-variation-settings: var(--fontVariationSettings);
  letter-spacing: var(--letterSpacing);
  color: transparent;
  caret-color: var(--fancyCaretColor);
  padding: 3rem;
  overflow: hidden;
`;

const ShadowLayer = styled(TextArea)`
  text-shadow: var(--shadow);
  color: transparent;
  font-size: var(--fontSize);
  background: transparent;
  -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
  overflow: hidden;
`;

const GradientLayer = styled(TextArea)`
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  background-image: var(--gradient);
  font-size: var(--fontSize);
  overflow: hidden;
`;
