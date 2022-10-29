import styled from 'styled-components';
import { m as motion } from 'framer-motion';
// import {FancyTitle} from '@components/FancyTitle';
import { breakpoints } from '@constants/breakpoints';

// export const Article = styled.article`
//   /* @media (max-width: ${breakpoints.tablet}px) {
//     --controlWidth: 0;
//     left: 0;
//   } */

//   @media (min-width: ${breakpoints.laptop}px) {
//     position: absolute;
//     top: var(--header-height);
//     left: var(--controlWidth);
//     right: 0;
//     bottom: var(--footer-height);
//     overflow: auto;
//     height: calc(100vh - (var(--header-height) + var(--footer-height)));
//   }
// `;

export const Article = styled.article.attrs(({ theme }) => {
  const headerFooterTotal = theme.headerSize + theme.footerSize + 'px';
  return {
    style: {
      '--offsetHeight': headerFooterTotal,
    },
  };
})`
  min-height: 300px;
  max-height: 400px;
  overflow: auto;
  flex: 1;
  height: calc(100vh - var(--offsetHeight));

  @media (min-width: ${breakpoints.laptop}px) {
    max-height: unset;
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
  height: 100%;
  overflow: auto;
`;

/// MainView

export const MainViewWrapper = styled(motion.div)`
  padding: clamp(16px, 0.5rem + 3vw, 36px);
  // padding causes overflow
  overflow: hidden;
`;

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

export const Grid = styled.main`
  /* display: grid;
  height: calc(100vh - (var(--header-height) + var(--footer-height))); */
`;

export const MainContainer = styled(motion.div).attrs(({ state }) => {
  return {
    style: {
      '--fontFamily': state.styles.fontFamily,
      '--fontSize': state.styles.fontSize + 'px',
      '--fontVariationSettings': state.styles.fontVariationSettings,
      '--gradient': state.styles.gradient,
      '--shadow': state.styles.shadow,
      '--strokeWidth': state.styles.strokeWidth + 'em',
      '--strokeColor': state.styles.strokeColor,
      '--letterSpacing': state.styles.letterSpacing + 'em',
    },
  };
})`
  font-family: var(--fontFamily);
  font-size: var(--fontSize);
  font-variation-settings: var(--fontVariationSettings);
  letter-spacing: var(--letterSpacing);

  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  position: relative;
`;

export const GradientSpan = styled.span`
  font: inherit;
  background: var(--gradient);
  background-clip: text;
  color: transparent;
  box-decoration-break: clone;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  margin: 0 -32px;
  padding-left: 32px;
  padding-right: 32px;
`;

export const MainWrapper = styled(motion.div)`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::after {
    content: '${(p) => p.state.textContent} \u{00a0}';
    white-space: pre-wrap;
    border: none;
    font: inherit;
    color: transparent;
    text-shadow: var(--shadow);
    z-index: -1;
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;

export const TextAreaBox = styled.textarea.attrs({ rows: 1, spellCheck: false })`
  resize: none;
  overflow: hidden;
  border: none;
  font: inherit;
  background: none;
  color: transparent;
  -webkit-text-fill-color: transparent;
  caret-color: var(--fancyCaretColor);
  letter-spacing: var(--letterSpacing);

  margin: -32px;
  padding: 32px;

  &::placeholder {
    -webkit-text-fill-color: hsl(0, 0%, 97%, 0.7);
    /* -webkit-text-stroke: 0.0125em black; */
    text-shadow: -0.0125em -0.0125em 0em #777, -0.025em -0.025em 0em #555, -0.0375em -0.0375em 0em #333,
      -0.05em -0.05em 0em #111;
  }
`;
