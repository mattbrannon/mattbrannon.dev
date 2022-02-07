export const springDown = 'cubic-bezier(0.17, 0.88, 0.32, 1.27)';
export const springUp = 'cubic-bezier(0.47, 1.74, 0.99, 0.99)';
export { fonts, decovarTemplate, decovarVariables, decovarValues } from './fonts';
export { mobile, tablet, laptop, desktop, breakpoints } from './breakpoints';
export { svg } from './svg';
export { blogHeader, blogVariant } from './blog';

// export const fonts = {
//   families: [ 'Jost', 'OpenSans', 'Recursive', 'Decovar' ],

//   sizes: {
//     size10: `${10 / 16}rem`,
//     size12: `${12 / 16}rem`,
//     size14: `${14 / 16}rem`,
//     size16: `${16 / 16}rem`,
//     size18: `${18 / 16}rem`,
//     size20: `${20 / 16}rem`,
//     size21: `${21 / 16}rem`,
//     size24: `${24 / 16}rem`,
//     size28: `${28 / 16}rem`,
//     size32: `${32 / 16}rem`,
//     size40: `${40 / 16}rem`,
//     size48: `${48 / 16}rem`,
//   },

//   presets: {
//     recursive2: `"MONO" 0, "CRSV" 1, "CASL" 1, "wght" 700, "slnt" -15`,
//     recursive3: `"MONO" 0, "CRSV" 1, "CASL" 0.75, "wght" 200, "slnt" 0`,
//     recursive4: `"MONO" 0, "CRSV" 1, "CASL" 0.15, "wght" 900, "slnt" -6`,
//     recursive5: `"MONO" 0, "CRSV" 1, "CASL" 1, "wght" 300, "slnt" -15`,
//     recursive6: `"MONO" 0, "CRSV" 1, "CASL" 0, "wght" 700, "slnt" 0`,
//     recursive7: `"MONO" 0, "CRSV" 1, "CASL" 1, "wght" 400, "slnt" 0`,
//     recursive8: `"MONO" 0, "CRSV" 1, "CASL" 1, "wght" 700, "slnt" -10`,
//     recursive9: `"MONO" 0.5, "CASL" 1, "wght" 673.25, "slnt" 0, "CRSV" 0.38`,
//   },
// };

// export const breakpoints = {
//   mobile: 564,
//   tablet: 795,
//   laptop: 992,
//   desktop: 1200,
// };

// export const decovarTemplate =
//   "'BLDA' 0, 'BLDB' 0, 'SKLA' 0, 'SKLB' 0, 'SKLD' 0, 'TRMA' 0, 'TRMB' 0, 'TRMC' 0, 'TRMD' 0, 'TRME' 0, 'TRMF' 0, 'TRMG' 0, 'TRMK' 0, 'TRML' 0";

// export const decovarVariables = [
//   '--decovar-default',
//   '--decovar-open',
//   '--decovar-worm',
//   '--decovar-checkered',
//   '--decovar-checkered-reverse',
//   '--decovar-striped',
//   '--decovar-rounded',
//   '--decovar-flared',
//   '--decovar-flared-open',
//   '--decovar-rounded-slab',
//   '--decovar-sheared',
//   '--decovar-bifurcated',
//   '--decovar-inline',
//   '--decovar-slab',
//   '--decovar-contrast',
//   '--decovar-fancy',
//   '--decovar-mayhem',
//   '--decovar-start',
//   '--decovar-end',
// ];

// export const decovarValues = {
//   default:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   open:
//     "'BLDA' 1000, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   worm:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 1000, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   checkered:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 1000, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   reverse:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 1000, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   striped:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 500, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   rounded:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 1000, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   flared:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 1000, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   flaredOpen:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 1000, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 1000, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   roundedSlab:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 1000, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   sheared:
//     "'BLDA' 0, 'TRMD' 1000, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   bifurcated:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 1000",
//   inline:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 500, 'TRMF' 500, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   slab:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 0, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 1000, 'TRME' 0",
//   contrast:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 0, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 1000, 'TRMB' 0, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   fancy:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 0, 'SKLD' 0, 'TRML' 0, 'SKLA' 1000, 'TRMF' 0, 'TRMK' 0, 'BLDB' 0, 'WMX2' 1000, 'TRMB' 1000, 'TRMA' 0, 'SKLB' 0, 'TRMG' 0, 'TRME' 0",
//   mayhem:
//     "'BLDA' 0, 'TRMD' 0, 'TRMC' 750, 'SKLD' 0, 'TRML' 250,'SKLA' 1000, 'TRMF' 250, 'TRMK' 250, 'BLDB' 1000, 'WMX2' 750, 'TRMB' 500, 'TRMA' 500, 'SKLB' 1000, 'TRMG' 750, 'TRME' 500",
//   custom:
//     '"BLDA" 352.27, "TRMD" 371.5, "TRMC" 577.8, "SKLD" 0, "TRML" 600.52, "SKLA" 249.13, "TRMF" 166.96, "TRMK" 509.62, "BLDB" 462.41, "WMX2" 182.69, "TRMB" 565.56, "TRMA" 406.47, "SKLB" 376.75, "TRMG" 420.45, "TRME" 659.97',
// };

// export const svg = {
//   paths: [
//     'M0 17L3.3 18.5C6.7 20 13.3 23 20 23.8C26.7 24.7 33.3 23.3 40 21.7C46.7 20 53.3 18 60 18.3C66.7 18.7 73.3 21.3 80 22.2C86.7 23 93.3 22 96.7 21.5L100 21L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 22L3.3 21.7C6.7 21.3 13.3 20.7 20 20.5C26.7 20.3 33.3 20.7 40 20.2C46.7 19.7 53.3 18.3 60 16.8C66.7 15.3 73.3 13.7 80 14.2C86.7 14.7 93.3 17.3 96.7 18.7L100 20L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 9L3.3 9.7C6.7 10.3 13.3 11.7 20 12.2C26.7 12.7 33.3 12.3 40 12.7C46.7 13 53.3 14 60 15.2C66.7 16.3 73.3 17.7 80 17.5C86.7 17.3 93.3 15.7 96.7 14.8L100 14L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 13L3.3 13.8C6.7 14.7 13.3 16.3 20 15.8C26.7 15.3 33.3 12.7 40 13C46.7 13.3 53.3 16.7 60 17.7C66.7 18.7 73.3 17.3 80 17.2C86.7 17 93.3 18 96.7 18.5L100 19L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 12L3.3 12.7C6.7 13.3 13.3 14.7 20 14.2C26.7 13.7 33.3 11.3 40 11.3C46.7 11.3 53.3 13.7 60 14.3C66.7 15 73.3 14 80 13.5C86.7 13 93.3 13 96.7 13L100 13L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 10L3.3 9.5C6.7 9 13.3 8 20 8.8C26.7 9.7 33.3 12.3 40 13.7C46.7 15 53.3 15 60 14.5C66.7 14 73.3 13 80 11.8C86.7 10.7 93.3 9.3 96.7 8.7L100 8L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 10L3.3 9.8C6.7 9.7 13.3 9.3 20 9.3C26.7 9.3 33.3 9.7 40 9.5C46.7 9.3 53.3 8.7 60 8.8C66.7 9 73.3 10 80 9.8C86.7 9.7 93.3 8.3 96.7 7.7L100 7L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 11L3.3 11C6.7 11 13.3 11 20 10.3C26.7 9.7 33.3 8.3 40 8.2C46.7 8 53.3 9 60 9.3C66.7 9.7 73.3 9.3 80 9.5C86.7 9.7 93.3 10.3 96.7 10.7L100 11L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 5L3.3 5.2C6.7 5.3 13.3 5.7 20 5.8C26.7 6 33.3 6 40 6.2C46.7 6.3 53.3 6.7 60 7.2C66.7 7.7 73.3 8.3 80 8.3C86.7 8.3 93.3 7.7 96.7 7.3L100 7L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 5L3.3 5C6.7 5 13.3 5 20 5.3C26.7 5.7 33.3 6.3 40 6.2C46.7 6 53.3 5 60 5C66.7 5 73.3 6 80 6.3C86.7 6.7 93.3 6.3 96.7 6.2L100 6L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 3L3.3 3.3C6.7 3.7 13.3 4.3 20 4.7C26.7 5 33.3 5 40 4.8C46.7 4.7 53.3 4.3 60 3.8C66.7 3.3 73.3 2.7 80 2.7C86.7 2.7 93.3 3.3 96.7 3.7L100 4L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//     'M0 3L3.3 2.8C6.7 2.7 13.3 2.3 20 2.2C26.7 2 33.3 2 40 2.2C46.7 2.3 53.3 2.7 60 2.5C66.7 2.3 73.3 1.7 80 1.3C86.7 1 93.3 1 96.7 1L100 1L100 0L96.7 0C93.3 0 86.7 0 80 0C73.3 0 66.7 0 60 0C53.3 0 46.7 0 40 0C33.3 0 26.7 0 20 0C13.3 0 6.7 0 3.3 0L0 0Z',
//   ],
//   fills: [
//     '#987654',
//     '#926f4d',
//     '#8c6947',
//     '#856341',
//     '#7f5c3a',
//     '#795634',
//     '#73502e',
//     '#6d4a28',
//     '#664422',
//     '#603e1c',
//     '#5a3816',
//     '#543210',
//   ],
// };
