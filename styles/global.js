import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'futura';
    src: url('/fonts/futura/futura-bold-03-webfont.woff2') format('woff2'),
      url('/fonts/futura/futura-bold-03-webfont.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'futura narrow';
    src: url('/fonts/futura/futura-condensedextrabold-05-webfont.woff2') format('woff2'),
      url('/fonts/futura/futura-condensedextrabold-05-webfont.woff') format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;

  }

  @font-face {
    font-family: 'futura narrow';
    src: url('/fonts/futura/futura-condensedmedium-04-webfont.woff2') format('woff2'),
      url('/fonts/futura/futura-condensedmedium-04-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;

  }

  @font-face {
    font-family: 'futura';
    src: url('/fonts/futura/futura-medium-01-webfont.woff2') format('woff2'),
      url('/fonts/futura/futura-medium-01-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;

  }

  @font-face {
    font-family: 'futura';
    src: url('/fonts/futura/futura-mediumitalic-02-webfont.woff2') format('woff2'),
      url('/fonts/futura/futura-mediumitalic-02-webfont.woff') format('woff');
    font-weight: normal;
    font-style: italic;
    font-display: swap;

  }

  @font-face {
    font-family: 'Roboto Flex';
    src: url('https://pixelambacht.nl/remote/RobotoFlex[slnt,wdth,wght,opsz].woff2')
        format('woff2 supports variations'),
      url('https://pixelambacht.nl/remote/RobotoFlex[slnt,wdth,wght,opsz].woff2')
        format('woff2-variations');
    font-weight: 100 1000;
    font-stretch: 25% 300%;
    font-display: swap;

  }

  @font-face {
    font-family: 'bloody';
    src: url('/fonts/bloody/bloody-webfont.woff2') format('woff2'),
      url('/fonts/bloody/bloody-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;

  }

  :root {
    --headerHeight: 80px;
    --footerHeight: 70px;
    --mainHeight: calc(100% - (var(--headerHeight) - var(--footerHeight)));

    --maxWidth: 80ch;

    --darkPink:  hsl(328deg, 100%, 33%);
    --medDarkPink: hsl(328deg, 100%, 42%);
    --pink: hsl(328, 100%, 54%);
    --medLightPink: hsl(328deg, 100%, 61%);
    --lightPink: hsl(328deg, 100%, 66%);
    --veryLightPink: hsl(328deg, 100%, 74%);


    --darkModeLinkColor: hsl(245deg, 93%, 79%);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    margin: 0;
    padding: 0;
    /* font-family: 'Roboto Flex'; */
  }

  /* Remove default margin */

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    /* background: hsl(208, 100%, 97%); */
    background: #f1f3f8;
    line-height: 1.6;
    font-size: 1.1rem;
    /* isolation: isolate; */
  }


  #__next {
    min-height: inherit;
    display: grid;
    grid-template-areas: 
    'header'
    'main'
    'footer';

    grid-template-columns: repeat(auto-fill, minmax(min(100vw, 100%), 1fr));
    grid-template-rows: 80px calc(100% - 180px) 100px;
  }


  main {
    padding-top: 32px;
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

  /* Inherit fonts for inputs and buttons */
  /* input,
  button,
  textarea,
  select {
    font: inherit;
  } */

  p,
  ul,
  li {
    margin: revert;
    padding: revert;
  }

  ol{
    list-style: decimal;
  };

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /* background: linear-gradient(180deg, #333 0px, #333 80px, transparent 80px);
    background: hsl(195, 53%, 79%); */
    background: hsla(0deg, 0%, 80%, 0.9);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: hsl(215, 23%, 45%);
    border: 2px ridge hsl(215, 20%, 34%);

    border-radius: 6px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(215, 33%, 52%);
  }

  a,h1,h2,h3,h4,h5,h6 {
    font-family: 'futura', system-ui, sans-serif;
  }

  p,li, section {
    font-family: 'Roboto Flex', system-ui, sans-serif;
    line-height: 1.6;
  }

  button {
    font-family: 'futura';
  }


  a:focus,
  button:focus {
    outline: revert;
    outline-offset: 2px;
  }

  a:focus:not(::focus-visible),
  button:focus:not(:focus-visible) {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid deepskyblue;
    outline-offset: 0.2em;
  }

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid deepskyblue;
    outline-offset: 0.3em;
  }

  /* a {
    @media(prefers-color-scheme: dark) {
      color: var(--darkModeLinkColor)
    }
  } */


  /* a:hover {
    cursor: pointer;
    @media(prefers-color-scheme: dark) {
      color: black;
    }

  } */


  pre > *{
    font-size: 0.9rem !important;
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
      background: #333;
      color: beige;
    }

    /* a {
      color: hsl(195, 53%, 79%);
      
    } */

    a:visited {
      color: hsl(245, 93%, 79%);
    }
  }
`;
