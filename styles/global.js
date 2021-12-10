import { fonts } from '@constants';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Jost';
  src: url(/fonts/Jost-english-subset.woff2) format('woff2 supports variations'),
    url(/fonts/Jost-english-subset.woff2) format('woff2-variations');
  font-weight: 100 900;
  font-display: fallback;
  font-style: oblique 0 2;
}

@font-face {
  font-family: 'Recursive';
  font-style: oblique 0deg 15deg;
  font-weight: 300 1000;
  font-display: fallback;
  src: url(/fonts/recursive-variable.woff2) format('woff2');
  unicode-range: U+000D, U+0020-007E, U+00A0, U+00A2-00A9, U+00AC-00AE,
    U+00B0-00B7, U+00B9-00BA, U+00BC-00BE, U+00D7, U+00F7, U+2007-200B, U+2010,
    U+2012-2015, U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+2030,
    U+2032-2033, U+2039-203A, U+203E, U+2044, U+2052, U+2074, U+20AC, U+2122,
    U+2190-2199, U+2212, U+2215, U+F8FF;
}

@font-face {
  font-family: 'Open Sans';
  src: url(/fonts/open-sans-regular.woff2);
  font-display: swap;
  font-weight: 300 800;
  font-stretch: 75% 100%;
  unicode-range: U+0000, U+000D, U+0020-007E, U+00A0, U+00A2-00A9, U+00AC-00AE,
    U+00B0-00B7, U+00B9-00BA, U+00BC-00BE, U+00D7, U+00F7, U+2000-200B,
    U+2013-2015, U+2017-201E, U+2020-2022, U+2026, U+2030, U+2032-2033,
    U+2039-203A, U+203C, U+2044, U+2074, U+20AC, U+2122, U+2212, U+2215, U+FEFF,
    U+FFFD;
}

:root {
  
  --size10: ${fonts.sizes.size10};
  --size12: ${fonts.sizes.size12};
  --size14: ${fonts.sizes.size14};
  --size16: ${fonts.sizes.size16};
  --size18: ${fonts.sizes.size18};
  --size20: ${fonts.sizes.size20};
  --size21: ${fonts.sizes.size21};
  --size24: ${fonts.sizes.size24};
  --size28: ${fonts.sizes.size28};
  --size32: ${fonts.sizes.size32};
  --size40: ${fonts.sizes.size40};
  --size48: ${fonts.sizes.size48};
  
  --unit: calc((30 / 100) * 1vw);
  --cube-height: calc(50 * var(--unit));
  --cube-width: calc(50 * var(--unit));
  --cube-depth: calc(25 * var(--unit));
  --header-height: 80px;
  --footer-height: 100px;

  --breathing-room: 48px;
  --max-width: 80ch;

  --tealBg: hsl(191, 50%, 34%);
  --tealHover: hsl(191, 44%, 40%);
  --tealFocus: hsl(191, 40%, 44%);
  --tealShadow: hsl(191, 36%, 30%);

  --teal-accent: hsl(330, 100%, 40%);

  --orange-main: hsl(36, 100%, 62%);
  --orange-hover: hsl(45, 100%, 60%);
  --tealBright: hsl(32, 100%, 50%);
  --tealBrightHover: hsl(32, 100%, 65%);

  --pinkBg: hsl(328, 100%, 54%);
  --pinkHover: hsl(328, 88%, 60%);
  --pinkFocus: hsl(328, 85%, 62%);
  --pinkShadow: hsl(328, 100%, 45%);
  --pinkActive: hsl(328, 78%, 60%);
  --pinkUnderline: hsl(328, 100%, 74%);

  --dark-blue: hsl(195deg, 100%, 8%);
  --med-blue: hsl(195deg, 100%, 16%);
  --skyblue: hsl(195deg, 100%, 50%);
  --skyblue2: hsl(195deg, 100%, 63%);

  --blueUnderline: hsl(210, 100%, 74%);

  --shadow1: hsl(190, 45%, 65%, 1);
  --shadow2: hsl(200, 100%, 60%, 0.9);
  --shadow3: hsl(210, 100%, 50%, 1);

  --body-background: hsl(223, 33%, 96%); /* #f1f3f8 */

  --header-background: #333333;
  --footer-background: var(--header-background);

  --jost-hairline: 'wght' 100, 'ital' 0;
  --jost-thin: 'wght' 200, 'ital' 0;
  --jost-light: 'wght' 300, 'ital' 0;
  --jost-book: 'wght' 400, 'ital' 0;
  --jost-medium: 'wght' 500, 'ital' 0;
  --jost-semi: 'wght' 600, 'ital' 0;
  --jost-bold: 'wght' 700, 'ital' 0;
  --jost-heavy: 'wght' 800, 'ital' 0;
  --jost-black: 'wght' 900, 'ital' 0;
  --jost-hairline-italic: 'wght' 100, 'ital' 1;
  --jost-thin-italic: 'wght' 200, 'ital' 1;
  --jost-light-italic: 'wght' 300, 'ital' 1;
  --jost-book-italic: 'wght' 400, 'ital' 1;
  --jost-medium-italic: 'wght' 500, 'ital' 1;
  --jost-semi-italic: 'wght' 600, 'ital' 1;
  --jost-bold-italic: 'wght' 700, 'ital' 1;
  --jost-heavy-italic: 'wght' 800, 'ital' 1;
  --jost-black-italic: 'wght' 900, 'ital' 1;

  --open-sans-narrow: 'wdth' 75, 'wght' 300;
  --open-sans-heavy-narrow: 'wdth' 75, 'wght' 800;
  --open-sans-wide: 'wdth' 100, 'wght' 300;
  --open-sans-heavy-wide: 'wdth' 100, 'wght' 800;

  --recursive1: 'MONO' 0, 'CRSV' 1, 'CASL' 0, 'wght' 400, 'slnt' 0;
  --recursive2: 'MONO' 0, 'CRSV' 0, 'CASL' 1, 'wght' 700, 'slnt' -15;
  --recursive3: 'MONO' 0, 'CRSV' 1, 'CASL' 0.77, 'wght' 666, 'slnt' -4;
  --recursive4: 'MONO' 0, 'CRSV' 0, 'CASL' 0.15, 'wght' 900, 'slnt' -6;
  --recursive5: 'MONO' 0, 'CRSV' 0, 'CASL' 1, 'wght' 300, 'slnt' -15;
  --recursive6: 'MONO' 0, 'CRSV' 0, 'CASL' 0, 'wght' 700, 'slnt' 0;
  --recursive7: 'MONO' 0, 'CRSV' 0, 'CASL' 1, 'wght' 400, 'slnt' 0;
  --recursive8: 'MONO' 0, 'CRSV' 0, 'CASL' 1, 'wght' 700, 'slnt' -10;

  --speech-bubble-start: #018793;
  --speech-bubble-end: #0d9c89;

  --blue-main: hsl(195, 90%, 50%);
  --blue-main-light: hsl(195, 100%, 65%);
  --blue-main-bright: hsl(195, 100%, 80%);

  --blue-main-hover: hsl(210, 75%, 80%);

  --text-shadow-hue: 210;
  --text-shadow-outline-color: hsl(var(--text-shadow-hue), 85%, 20%);

  --blue0: hsl(var(--text-shadow-hue), 65%, 35%, 0.1);
  --blue1: hsl(var(--text-shadow-hue), 75%, 80%, 1);
  --blue2: hsl(var(--text-shadow-hue), 70%, 75%, 1);
  --blue3: hsl(var(--text-shadow-hue), 65%, 70%, 1);
  --blue11: hsl(var(--text-shadow-hue), 60%, 65%, 0.9);
  --blue22: hsl(var(--text-shadow-hue), 55%, 60%, 0.8);
  --blue33: hsl(var(--text-shadow-hue), 50%, 55%, 0.8);
  --blue111: hsl(var(--text-shadow-hue), 45%, 50%, 0.7);
  --blue222: hsl(var(--text-shadow-hue), 40%, 45%, 0.7);
  --blue333: hsl(var(--text-shadow-hue), 35%, 40%, 0.7);

  --blue4: hsl(210, 80%, 85%, 1);
  --blue5: hsl(210, 85%, 90%, 1);
  --blue6: hsl(210, 45%, 85%, 1);

  --orange0: hsl(36, 65%, 90%);
  --orange1: hsl(36deg, 65%, 72%);
  --orange2: hsl(36deg, 100%, 62%);
  --orange3: hsl(36deg, 63%, 42%);
  --orange4: hsl(36deg, 62%, 35%);
  --orange5: hsl(36deg, 63%, 69%);
  --orange: hsl(36deg, 100%, 50%);

  --accent-pink: hsl(169, 100%, 24%);

  --px: 0.0125em;
  --blur: calc(var(--px) * 0);

  --px1: calc(var(--px) * -1);
  --px2: calc(var(--px) * -1.75);
  --px3: calc(var(--px) * -2.5);
  --px4: calc(var(--px) * -3.25);
  --px5: calc(var(--px) * -4);
  --px6: calc(var(--px) * -4.75);
  --px7: calc(var(--px) * -5.5);
  --px8: calc(var(--px) * -6.25);
  --px9: calc(var(--px) * -7);

  --blur0: calc(var(--blur) * 0.5);
  --blur1: calc(var(--blur) * 1);
  --blur2: calc(var(--blur) * 2);
  --blur3: calc(var(--blur) * 2.5);
  --blur4: calc(var(--blur) * 3);
  --blur5: calc(var(--blur) * 3.25);
  --blur6: calc(var(--blur) * 3.5);
  --blur7: calc(var(--blur) * 3.75);
  --blur8: calc(var(--blur) * 4);
  --blur9: calc(var(--blur) * 4.125);

  --text-shadow1: var(--px1) var(--px1) var(--blur0) var(--blue1);
  --text-shadow2: var(--px2) var(--px2) var(--blur1) var(--blue2);
  --text-shadow3: var(--px3) var(--px3) var(--blur2) var(--blue3);
  --text-shadow4: var(--px4) var(--px4) var(--blur3) var(--blue11);
  --text-shadow5: var(--px5) var(--px5) var(--blur4) var(--blue22);
  --text-shadow6: var(--px6) var(--px6) var(--blur5) var(--blue33);
  --text-shadow7: var(--px7) var(--px7) var(--blur6) var(--blue111);
  --text-shadow8: var(--px8) var(--px8) var(--blur7) var(--blue222);
  --text-shadow9: var(--px9) var(--px9) var(--blur8) var(--blue333);

  --px0: calc(var(--px) * 0.25);
  --px00: calc(var(--px0) * -1);
  --text-shadow-outline: var(--px0) var(--px0) var(--text-shadow-outline-color),
    var(--px00) var(--px00) var(--text-shadow-outline-color),
    var(--px0) var(--px00) var(--text-shadow-outline-color),
    var(--px00) var(--px0) var(--text-shadow-outline-color);

  --welcome-gradient: var(--orange1), var(--orange2), var(--orange3),
    var(--orange4) 90%;
  --welcome-shadow: var(--text-shadow1), var(--text-shadow2),
    var(--text-shadow3), var(--text-shadow4), var(--text-shadow5),
    var(--text-shadow6);

  --no-shadow: 0em 0em transparent, 0em 0em transparent, 0em 0em transparent,
    0em 0em transparent, 0em 0em transparent, 0em 0em transparent;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
  margin: 0;
  padding: 0;
}

html,
body,
#__next {
  height: 100%;
}

html:focus-within {
  scroll-behavior: smooth;
}

body {
  text-rendering: optimizeSpeed;
  background: var(--body-background);
  line-height: 1.6;
  font-size: var(--size20);
  font-variation-settings: 'wdth' 75;
  font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
}

a:hover {
  text-decoration: revert;
}

/* Make images easier to work with */
img,
picture {
  height: auto;
  max-width: 100%;
  display: block;
  object-fit: contain;
}

p,
ul,
li {
  margin: revert;
  padding: revert;
}

p {
  font-weight: 500;
  font-size: clamp(var(--size16), 0.2vw + 1rem, var(--size20));
}

ol {
  list-style: decimal;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsla(0deg, 0%, 80%, 0.9);
}

::-webkit-scrollbar-thumb {
  background: hsl(215, 23%, 45%);
  border: 2px ridge hsl(215, 20%, 34%);

  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(215, 33%, 52%);
}

p,
li,
section {
  font-family: 'Open Sans', system-ui, sans-serif;
  line-height: 1.7;
  font-variation-settings: 'wght' 555, 'wdth' 95;
}

button {
  font-family: 'Jost';
}

a:focus,
button:focus {
  outline: revert;
  outline-offset: 2px;
}

a:focus:not(:focus-visible),
button:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid hsl(210, 100%, 50%, 1);
  /* outline-offset: 0.2em; */
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid hsl(210, 100%, 50%, 1);
  /* outline-offset: 0.5em; */
}

pre > * {
  font-size: var(--size14) !important;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  ::before,
  ::after {
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    background-attachment: initial !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    --body-background: hsl(0, 0%, 20%);
    --hero-background: hsl(225, 5%, 15%);
    --header-background: hsl(0, 0%, 7%);
    color: hsl(60, 56%, 91%);
  }

  a:hover {
    color: var(--pink6);
  }
}
`;
