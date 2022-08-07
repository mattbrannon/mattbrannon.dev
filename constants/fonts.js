export const fonts = {
  families: ['Jost', 'OpenSans', 'Recursive', 'Decovar'],

  sizes: {
    size10: `${10 / 16}rem`,
    size12: `${12 / 16}rem`,
    size14: `${14 / 16}rem`,
    size16: `${16 / 16}rem`,
    size18: `${18 / 16}rem`,
    size20: `${20 / 16}rem`,
    size21: `${21 / 16}rem`,
    size24: `${24 / 16}rem`,
    size28: `${28 / 16}rem`,
    size32: `${32 / 16}rem`,
    size36: `${36 / 16}rem`,
    size40: `${40 / 16}rem`,
    size44: `${44 / 16}rem`,
    size48: `${48 / 16}rem`,
    size52: `${52 / 16}rem`,
    size56: `${56 / 16}rem`,
    size60: `${60 / 16}rem`,
  },

  presets: {
    recursive1: '"MONO" 1, "CRSV" 0, "CASL" 1, "wght" 900, "slnt" 0',
    recursive2: '"MONO" 0, "CRSV" 0, "CASL" 1, "wght" 700, "slnt" -15',
    recursive3: '"MONO" 0, "CRSV" 0, "CASL" 0.75, "wght" 200, "slnt" 0',
    recursive4: '"MONO" 0, "CRSV" 0, "CASL" 0.15, "wght" 900, "slnt" -6',
    recursive5: '"MONO" 0, "CRSV" 0, "CASL" 1, "wght" 300, "slnt" -15',
    recursive6: '"MONO" 0, "CRSV" 0, "CASL" 0, "wght" 700, "slnt" 0',
    recursive7: '"MONO" 0, "CRSV" 0, "CASL" 1, "wght" 400, "slnt" 0',
    recursive8: '"MONO" 0, "CRSV" 0, "CASL" 1, "wght" 700, "slnt" -10',
    recursive9: '"MONO" 0.5, "CRSV" 0.38, "CASL" 1, "wght" 673.25, "slnt" 0',

    monospace: '"MONO" 1, "CASL" 0, "CRSV" 0, "wght" 360, "slnt" 0',
    monospaceLight: '"MONO" 1, "CASL" 0, "CRSV" 0.5, "wght" 100, "slnt" 0',

    jostHairline: '"wght" 100, "ital" 0',
    jostHeavy: '"wght" 800, "ital" 0',
    jostBlack: '"wght" 900, "ital" 0',
  },
};

// "MONO" 0, "CRSV" 0, "CASL" 1, "wght" 700, "slnt" -15;
// "MONO" 0, "CRSV" 0, "CASL" 0.75, "wght" 200, "slnt" 0;
// "MONO" 0, "CRSV" 0, "CASL" 0.15, "wght" 900, "slnt" -6;
// "MONO" 0, "CRSV" 0, "CASL" 1, "wght" 300, "slnt" -15;
// "MONO" 0, "CRSV" 0, "CASL" 0, "wght" 700, "slnt" 0;
// "MONO" 0, "CRSV" 0, "CASL" 1, "wght" 400, "slnt" 0;
// "MONO" 0, "CRSV" 0, "CASL" 1, "wght" 700, "slnt" -10;
// "MONO" 0.5, "CASL" 1, "wght" 673.25, "slnt" 0, "CRSV" 0.38;

export const decovarTemplate =
  '\'BLDA\' 0, \'BLDB\' 0, \'SKLA\' 0, \'SKLB\' 0, \'SKLD\' 0, \'TRMA\' 0, \'TRMB\' 0, \'TRMC\' 0, \'TRMD\' 0, \'TRME\' 0, \'TRMF\' 0, \'TRMG\' 0, \'TRMK\' 0, \'TRML\' 0';

export const decovarVariables = [
  '--decovar-default',
  '--decovar-open',
  '--decovar-worm',
  '--decovar-checkered',
  '--decovar-checkered-reverse',
  '--decovar-striped',
  '--decovar-rounded',
  '--decovar-flared',
  '--decovar-flared-open',
  '--decovar-rounded-slab',
  '--decovar-sheared',
  '--decovar-bifurcated',
  '--decovar-inline',
  '--decovar-slab',
  '--decovar-contrast',
  '--decovar-fancy',
  '--decovar-mayhem',
  '--decovar-start',
  '--decovar-end',
];

export const decovarValues = {
  default:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  open: '\'BLDA\' 1000, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  worm: '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 1000, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  checkered:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 1000, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  reverse:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 1000, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  striped:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 500, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  rounded:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 1000, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  flared:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 1000, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  flaredOpen:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 1000, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 1000, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  roundedSlab:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 1000, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  sheared:
    '\'BLDA\' 0, \'TRMD\' 1000, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  bifurcated:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 1000',
  inline:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 500, \'TRMF\' 500, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  slab: '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 0, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 1000, \'TRME\' 0',
  contrast:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 0, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 1000, \'TRMB\' 0, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  fancy:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 0, \'SKLD\' 0, \'TRML\' 0, \'SKLA\' 1000, \'TRMF\' 0, \'TRMK\' 0, \'BLDB\' 0, \'WMX2\' 1000, \'TRMB\' 1000, \'TRMA\' 0, \'SKLB\' 0, \'TRMG\' 0, \'TRME\' 0',
  mayhem:
    '\'BLDA\' 0, \'TRMD\' 0, \'TRMC\' 750, \'SKLD\' 0, \'TRML\' 250,\'SKLA\' 1000, \'TRMF\' 250, \'TRMK\' 250, \'BLDB\' 1000, \'WMX2\' 750, \'TRMB\' 500, \'TRMA\' 500, \'SKLB\' 1000, \'TRMG\' 750, \'TRME\' 500',
  custom:
    '"BLDA" 352.27, "TRMD" 371.5, "TRMC" 577.8, "SKLD" 0, "TRML" 600.52, "SKLA" 249.13, "TRMF" 166.96, "TRMK" 509.62, "BLDB" 462.41, "WMX2" 182.69, "TRMB" 565.56, "TRMA" 406.47, "SKLB" 376.75, "TRMG" 420.45, "TRME" 659.97',
  custom2:
    '"BLDA" 0, "TRMD" 1000, "TRMC" 1000, "SKLD" 260, "TRML" 100, "SKLA" 612, "TRMF" 395, "TRMK" 394, "BLDB" 165, "WMX2" 163, "TRMB" 0, "TRMA" 0, "SKLB" 0, "TRMG" 0, "TRME" 204',
};

// --decovar-default
// --decovar-open
// --decovar-worm
// --decovar-checkered
// --decovar-checkered-reverse
// --decovar-striped
// --decovar-rounded
// --decovar-flared
// --decovar-flared-open
// --decovar-rounded-slab
// --decovar-sheared
// --decovar-bifurcated
// --decovar-inline
// --decovar-slab
// --decovar-contrast
// --decovar-fancy
// --decovar-mayhem
