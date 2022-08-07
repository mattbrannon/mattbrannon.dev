import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root {
  --yellow-faded: hsl(55, 67%, 80%);
  --yellow-faded-light: hsl(55, 67%, 90%);
  --blue-black: hsl(218, 35%, 6%, 0.929);

  --red-light: hsl(0, 100%, 70%);
  --red-dark: hsl(0, 100%, 40%);
  --green-light: hsl(120, 100%, 65%);
  --green-dark: hsl(120, 100%, 25%);
  --yellow-orange: hsl(45, 100%, 60%);
  --amber: hsl(45, 100%, 50%);
  --orange-dark: hsl(22, 100%, 55%);

  --yellow: hsl(55, 100%, 55%);
  --orange-hover: hsl(45, 100%, 60%);
  --orange: hsl(36, 100%, 62%);

  --off-white: hsl(36, 65%, 90%);

  --pink-light: hsl(328, 100%, 74%);
  --pink-medium-light: hsl(328, 100%, 62%);
  --pink: hsl(328, 100%, 54%);
  --pink-medium-dark: hsl(328, 100%, 45%);
  --pink-dark: hsl(328, 100%, 37%);

  --sky: hsl(195, 100%, 50%);
  --sky-light: hsl(195, 100%, 75%);

  --azure: hsl(210, 100%, 50%);
  --azure-light: hsl(210, 100%, 74%);
  --azure-dark: hsl(210, 100%, 35%);
  --azure-heavy: hsl(210, 75%, 25%);
  --azure-25: hsl(210, 100%, 25%);
  --azure-35: hsl(210, 100%, 35%);
  --azure-75: hsl(210, 100%, 75%);
  --azure-85: hsl(210, 100%, 85%);
  --cyan-55: hsl(190, 100%, 55%);
  --cyan-75: hsl(190, 100%, 75%);
  --blue3: hsl(236, 100%, 35%);
  --blue3-light: hsl(236, 100%, 45%);
  --blue5: #001c3b;
  --blue6: #021f5f;
  --blue-white: hsl(208, 100%, 97%);
  --blue-white-faded: hsl(223, 20%, 88%);
  --blue-body: hsl(223, 33%, 96%);
  --blue-body-faded: hsl(223, 25%, 80%);
  --gray-code: hsl(0, 0%, 85%);

  --white-soft: hsl(54, 100%, 95%);
  --white: hsl(58, 0%, 100%);

  /* --black: hsl(0, 0%, 0%); */
  --black: hsl(0, 0%, 13%);
  --black-soft: hsl(0, 0%, 20%);
  --black1: hsl(0, 0%, 15%);
  --black2: hsl(0, 0%, 7%);
  --black3: hsl(0, 0%, 13%);

  --tealBg: hsl(191, 50%, 34%);
  --tealHover: hsl(191, 44%, 40%);
  --tealFocus: hsl(191, 40%, 44%);
  --tealShadow: hsl(191, 36%, 30%);

  --pinkHover: hsl(328, 88%, 60%);
  --pinkFocus: hsl(328, 85%, 62%);
  --pinkShadow: hsl(328, 100%, 45%);
  --pinkActive: hsl(328, 78%, 60%);
  --pinkUnderline: hsl(328, 100%, 74%);

  --dark-faded-blue: hsl(195deg, 10%, 20%);
  --beige: hsl(55deg, 35%, 85%);

  --color-404: black;
  --color-outline: var(--azure);

  --center: polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%);
  --left: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  --right: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
  --top: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  --bottom: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  --visible: polygon(-20% -20%, 100% -20%, 100% 100%, -20% 100%);

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

  --size10: 0.625rem;
  --size12: 0.75rem;
  --size14: 0.875rem;
  --size16: 1rem;
  --size18: 1.125rem;
  --size20: 1.25rem;
  --size21: 1.3125rem;
  --size24: 1.5rem;
  --size28: 1.75rem;
  --size32: 2rem;
  --size36: 2.25rem;
  --size40: 2.5rem;
  --size44: 2.75rem;
  --size48: 3rem;
  --size52: 3.25rem;
  --size56: 3.5rem;
  --size60: 3.75rem;

  --decovar-default: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-open: 'BLDA' 1000, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-worm: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 1000, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-checkered: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 1000, 'TRMF' 0,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-reverse: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0,
    'TRMK' 1000, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-striped: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 500, 'TRML' 0, 'SKLA' 0, 'TRMF' 0,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-rounded: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 1000, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-flared: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 0, 'WMX2' 0, 'TRMB' 1000, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-flaredOpen: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 1000, 'TRMF' 0,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 1000, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-roundedSlab: 'BLDA' 0, 'TRMD' 0, 'TRMC' 1000, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-sheared: 'BLDA' 0, 'TRMD' 1000, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-bifurcated: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 1000;
  --decovar-inline: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 500, 'TRMF' 500,
    'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-slab: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 1000, 'TRME' 0;
  --decovar-contrast: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 0, 'WMX2' 1000, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-fancy: 'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 1000, 'TRMF' 0, 'TRMK' 0,
    'BLDB' 0, 'WMX2' 1000, 'TRMB' 1000, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0;
  --decovar-mayhem: 'BLDA' 0, 'TRMD' 0, 'TRMC' 750, 'SKLD' 0, 'TRML' 250, 'SKLA' 1000, 'TRMF' 250,
    'TRMK' 250, 'BLDB' 1000, 'WMX2' 750, 'TRMB' 500, 'TRMA' 500, 'SKLB' 1000, 'TRMG' 750, 'TRME' 500;
  --decovar-custom: 'BLDA' 352.27, 'TRMD' 371.5, 'TRMC' 577.8, 'SKLD' 0, 'TRML' 600.52,
    'SKLA' 249.13, 'TRMF' 166.96, 'TRMK' 509.62, 'BLDB' 462.41, 'WMX2' 182.69, 'TRMB' 565.56,
    'TRMA' 406.47, 'SKLB' 376.75, 'TRMG' 420.45, 'TRME' 659.97;
  --decovar-custom2: 'BLDA' 0, 'TRMD' 1000, 'TRMC' 1000, 'SKLD' 260, 'TRML' 100, 'SKLA' 612,
    'TRMF' 395, 'TRMK' 394, 'BLDB' 165, 'WMX2' 163, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0,
    'TRME' 204;

  --recursive1: 'MONO' 1, 'CRSV' 0, 'CASL' 1, 'wght' 900, 'slnt' 0;
  --recursive2: 'MONO' 0, 'CRSV' 0, 'CASL' 1, 'wght' 700, 'slnt' -15;
  --recursive3: 'MONO' 0, 'CRSV' 0, 'CASL' 0.75, 'wght' 200, 'slnt' 0;
  --recursive4: 'MONO' 0, 'CRSV' 0, 'CASL' 0.15, 'wght' 900, 'slnt' -6;
  --recursive5: 'MONO' 0, 'CRSV' 0, 'CASL' 1, 'wght' 300, 'slnt' -15;
  --recursive6: 'MONO' 0, 'CRSV' 0, 'CASL' 0, 'wght' 700, 'slnt' 0;
  --recursive7: 'MONO' 0, 'CRSV' 0, 'CASL' 1, 'wght' 400, 'slnt' 0;
  --recursive8: 'MONO' 0, 'CRSV' 0, 'CASL' 1, 'wght' 700, 'slnt' -10;
  --recursive9: 'MONO' 0.5, 'CRSV' 0.38, 'CASL' 1, 'wght' 673.25, 'slnt' 0;
  --monospace: 'MONO' 1, 'CASL' 0, 'CRSV' 0, 'wght' 360, 'slnt' 0;
  --monospaceLight: 'MONO' 1, 'CASL' 0, 'CRSV' 0.5, 'wght' 100, 'slnt' 0;

  --jostHairline: 'wght' 100, 'ital' 0;
  --jostHeavy: 'wght' 800, 'ital' 0;
  --jostBlack: 'wght' 900, 'ital' 0;

  --shadow-light-mode: -0.002em -0.002em 0.006em hsl(18, 51%, 38%),
    -0.004em -0.004em 0.006em hsl(14, 50%, 37%), -0.005em -0.005em 0.006em hsl(9, 48%, 35%),
    -0.007em -0.007em 0.006em hsl(04, 46%, 34%), -0.009em -0.009em 0.006em hsl(0, 45%, 33%),
    -0.011em -0.011em 0.006em hsl(356, 43%, 32%), -0.012em -0.012em 0.006em hsl(351, 42%, 30%),
    -0.014em -0.014em 0.006em hsl(346, 41%, 29%), -0.016em -0.016em 0.006em hsl(343, 38%, 28%),
    -0.018em -0.018em 0.006em hsl(338, 37%, 27%), -0.019em -0.019em 0.006em hsl(334, 35%, 25%),
    -0.021em -0.021em 0.006em hsl(329, 34%, 24%), -0.023em -0.023em 0.006em hsl(324, 33%, 23%),
    -0.025em -0.025em 0.006em hsl(319, 31%, 22%), -0.026em -0.026em 0.006em hsl(315, 30%, 20%),
    -0.028em -0.028em 0.006em hsl(311, 28%, 19%), -0.03em -0.03em 0.006em hsl(305, 27%, 18%),
    -0.032em -0.032em 0.006em hsl(303, 25%, 17%), -0.033em -0.033em 0.006em hsl(297, 23%, 15%),
    -0.035em -0.035em 0.006em hsl(293, 22%, 14%);

  --shadow-dark-mode: -0.005em -0.005em 0.006em hsl(280, 99%, 50%),
    -0.01em -0.01em 0.006em hsl(279, 97%, 48%), -0.015em -0.015em 0.006em hsl(277, 95%, 46%),
    -0.02em -0.02em 0.006em hsl(276, 93%, 45%), -0.024em -0.024em 0.006em hsl(275, 91%, 43%),
    -0.029em -0.029em 0.006em hsl(273, 89%, 41%), -0.034em -0.034em 0.006em hsl(272, 87%, 39%),
    -0.039em -0.039em 0.006em hsl(271, 84%, 37%), -0.044em -0.044em 0.006em hsl(269, 82%, 36%),
    -0.049em -0.049em 0.006em hsl(268, 80%, 34%), -0.054em -0.054em 0.006em hsl(266, 78%, 32%),
    -0.059em -0.059em 0.006em hsl(265, 77%, 30%), -0.063em -0.063em 0.006em hsl(263, 74%, 29%),
    -0.068em -0.068em 0.006em hsl(262, 72%, 27%), -0.073em -0.073em 0.006em hsl(261, 70%, 25%),
    -0.078em -0.078em 0.006em hsl(260, 68%, 23%), -0.083em -0.083em 0.006em hsl(258, 67%, 21%),
    -0.088em -0.088em 0.006em hsl(257, 64%, 20%), -0.093em -0.093em 0.006em hsl(256, 63%, 18%),
    -0.098em -0.098em 0.006em hsl(255, 60%, 16%);

  --gradient-light-mode: linear-gradient(180deg, hsl(52, 100%, 50%) 25%, hsl(27, 100%, 50%) 75%);
  --gradient-dark-mode: linear-gradient(180deg, hsl(157, 100%, 43%) 25%, hsl(200, 100%, 65%) 75%);

  @media (max-width: 660px) {
    --breathing-room: 15px;
    --header-height: 50px;
  }
}

`;
