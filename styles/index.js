import { createGlobalStyle } from 'styled-components';
import {
  breakpoints,
  shadows,
  gradients,
  decovarValues,
  fonts,
} from '../constants';

export const GlobalStyle = createGlobalStyle`
:root {
  --yellow-faded: hsl(55, 67%, 80%);
  --yellow-faded-light: hsl(55, 67%, 90%);
  --blue-black: hsl(218, 35%, 6%, 0.929);

  --red-light: hsl(0, 100%, 70%);
  --red-dark: hsl(0, 100%, 40%);
  --green-light: hsl(120, 100%, 65%);
  --green-dark: hsl(120, 100%, 25%);

  /* --yellow: hsl(51, 100%, 50%); */
  /* --yellow-orange: hsl(44, 100%, 55%); */
  --yellow-orange: hsl(45, 100%, 60%);
  --amber: hsl(45, 100%, 50%);
  --orange-dark: hsl(22, 100%, 55%);

  --pink-light: hsl(328, 100%, 74%);
  --pink-medium-light: hsl(328, 100%, 62%);
  --pink: hsl(328, 100%, 54%);
  --pink-medium-dark: hsl(328, 100%, 45%);
  --pink-dark: hsl(328, 100%, 37%);

  --sky: hsl(195, 100%, 50%);
  --sky-light: hsl(195, 100%, 75%);
  /* --sky-dark: hsl(195, 100%, 25%); */

  --azure: hsl(210, 100%, 50%);
  --azure-light: hsl(210, 100%, 74%);
  --azure-dark: hsl(210, 100%, 35%);
  --azure-heavy: hsl(210, 75%, 25%);

  /* --azure-5: hsl(210, 100%, 5%);
  --azure-10: hsl(210, 100%, 10%);
  --azure-15: hsl(210, 100%, 15%);
  --azure-20: hsl(210, 100%, 20%); */
  --azure-25: hsl(210, 100%, 25%);
  /* --azure-30: hsl(210, 100%, 30%); */
  --azure-35: hsl(210, 100%, 35%);
  /* --azure-40: hsl(210, 100%, 40%); */
  /* --azure-45: hsl(210, 100%, 45%);
  --azure-50: hsl(210, 100%, 50%);
  --azure-55: hsl(210, 100%, 55%);
  --azure-60: hsl(210, 100%, 60%);
  --azure-65: hsl(210, 100%, 65%);
  --azure-70: hsl(210, 100%, 70%); */
  --azure-75: hsl(210, 100%, 75%);
  /* --azure-80: hsl(210, 100%, 80%); */
  --azure-85: hsl(210, 100%, 85%);
  /* --azure-90: hsl(210, 100%, 90%); */
  /* --azure-95: hsl(210, 100%, 95%); */

  /* --cyan-5: hsl(190, 100%, 5%);
  --cyan-10: hsl(190, 100%, 10%);
  --cyan-15: hsl(190, 100%, 15%);
  --cyan-20: hsl(190, 100%, 20%);
  --cyan-25: hsl(190, 100%, 25%);
  --cyan-30: hsl(190, 100%, 30%);
  --cyan-35: hsl(190, 100%, 35%);
  --cyan-40: hsl(190, 100%, 40%);
  --cyan-45: hsl(190, 100%, 45%);
  --cyan-50: hsl(190, 100%, 50%); */
  --cyan-55: hsl(190, 100%, 55%);
  /* --cyan-60: hsl(190, 100%, 60%);
  --cyan-65: hsl(190, 100%, 65%);
  --cyan-70: hsl(190, 100%, 70%); */
  --cyan-75: hsl(190, 100%, 75%);
  /* --cyan-80: hsl(190, 100%, 80%);
  --cyan-85: hsl(190, 100%, 85%);
  --cyan-90: hsl(190, 100%, 90%);
  --cyan-95: hsl(190, 100%, 95%); */

  --blue3: hsl(236, 100%, 35%);
  --blue3-light: hsl(236, 100%, 45%);

  /* --eye-color: hsl(240 35% 65%); */

  --blue5: #001c3b;
  --blue6: #021f5f;
  --blue-white: hsl(208, 100%, 97%);
  --blue-white-faded: hsl(223, 20%, 88%);

  --blue-body: hsl(223, 33%, 96%);
  --blue-body-faded: hsl(223, 25%, 80%);
  --gray-code: hsl(0, 0%, 85%);

  --white-soft: hsl(54, 100%, 95%);
  --white: hsl(58, 0%, 100%);

  --black: hsl(0, 0%, 0%);
  --black-soft: hsl(0, 0%, 20%);
  --black1: hsl(0, 0%, 10%);
  --black2: hsl(0, 0%, 7%);
  --black3: hsl(0, 0%, 13%);
  /* --black4: hsl(0, 0%, 19%); */
  /* --black5: hsl(0, 0%, 23%); */

  --tealBg: hsl(191, 50%, 34%);
  --tealHover: hsl(191, 44%, 40%);
  --tealFocus: hsl(191, 40%, 44%);
  --tealShadow: hsl(191, 36%, 30%);

  --yellow: hsl(55, 100%, 55%);
  --orange-hover: hsl(45, 100%, 60%);
  --orange: hsl(36, 100%, 62%);

  --orange0: hsl(36, 65%, 90%);
  /* --orange1: hsl(36, 65%, 72%); */
  /* --orange2: hsl(36, 100%, 62%);
  --orange3: hsl(36, 63%, 42%);
  --orange4: hsl(36, 62%, 35%);
  --orange5: hsl(36, 63%, 69%); */

  --pinkBg: var(--pink);
  --pinkHover: hsl(328, 88%, 60%);
  --pinkFocus: hsl(328, 85%, 62%);
  --pinkShadow: hsl(328, 100%, 45%);
  --pinkActive: hsl(328, 78%, 60%);
  --pinkUnderline: hsl(328, 100%, 74%);
  --dark-pink: var(--pink-dark);
  /* --dark-faded-pink: hsl(330, 52%, 49%); */

  --dark-faded-blue: hsl(195deg, 10%, 20%);
  --beige: hsl(55deg, 35%, 85%);

  --color-404: black;
  --color-outline: var(--azure); 





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
  --size36: ${fonts.sizes.size36};
  --size40: ${fonts.sizes.size40};
  --size44: ${fonts.sizes.size44};
  --size48: ${fonts.sizes.size48};
  --size52: ${fonts.sizes.size52};
  --size56: ${fonts.sizes.size56};
  --size60: ${fonts.sizes.size60};

  /* --jost-hairline: ${fonts.presets.jostHairline};
  --jost-heavy: ${fonts.presets.jostHeavy};
  --jost-black: ${fonts.presets.jostBlack}; */

  /* --recursive1: ${fonts.presets.recursive1}; */
  --recursive2: ${fonts.presets.recursive2};
  /* --recursive3: ${fonts.presets.recursive3}; */
  --recursive4: ${fonts.presets.recursive4};
  /* --recursive5: ${fonts.presets.recursive5}; */
  --recursive6: ${fonts.presets.recursive6};
  /* --recursive7: ${fonts.presets.recursive7}; */
  --recursive8: ${fonts.presets.recursive8};
  /* --recursive9: ${fonts.presets.recursive9}; */
  --monospace: ${fonts.presets.monospace};
  /* --monospace-light: ${fonts.presets.monospaceLight}; */

  --decovar-default: ${decovarValues.default};
  --decovar-open: ${decovarValues.open};
  --decovar-worm: ${decovarValues.worm};
  --decovar-checkered: ${decovarValues.checkered};
  --decovar-checkered-reverse: ${decovarValues.reverse};
  --decovar-striped: ${decovarValues.striped};
  --decovar-rounded: ${decovarValues.rounded};
  --decovar-flared: ${decovarValues.flared};
  --decovar-flared-open: ${decovarValues.flaredOpen};
  --decovar-rounded-slab: ${decovarValues.roundedSlab};
  --decovar-sheared: ${decovarValues.sheared};
  --decovar-bifurcated: ${decovarValues.bifurcated};
  --decovar-inline: ${decovarValues.inline};
  --decovar-slab: ${decovarValues.slab};
  --decovar-contrast: ${decovarValues.contrast};
  --decovar-fancy: ${decovarValues.fancy};
  --decovar-mayhem: ${decovarValues.mayhem};

  --shadow-dark-mode: ${shadows.darkMode};
  --shadow-light-mode: ${shadows.lightMode};

  --gradient-dark-mode: ${gradients.darkMode};
  --gradient-light-mode: ${gradients.lightMode};


  --center: polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%);
  --left: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  --right: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
  --top: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  --bottom: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  --visible: polygon(-20% -20%, 100% -20%, 100% 100%, -20% 100%);
    /* --visible: polygon(-100% -100%, 100% 0%, 100% 100%, 0% 100%); */



  --max-page-width: 80ch;
  --unit: calc((30 / 100) * 1vw);
  --cube-height: calc(50 * var(--unit));
  --cube-width: calc(50 * var(--unit));
  --cube-depth: calc(25 * var(--unit));
  --mouth-padding: 5%;
  --eye-margin: calc(var(--mouth-padding) * -1);
  --header-height: 80px;
  --footer-height: 165px;
  --header-link-gap: clamp(0.5rem, 1rem + 3vw, 5rem);

  --breathing-room: 48px;
  --gutter-size: 48px;
  --line-height: calc(1em + 0.625rem);
  --header-position: translateY(0%);

  @media(max-width: ${breakpoints.mobile}px) {
    --breathing-room: 15px;
    --header-height: 50px;
  } 
}

`;
