export const SHADOW_COLOR_START = 'SHADOW_COLOR_START';
export const SHADOW_COLOR_END = 'SHADOW_COLOR_END';
export const SHADOW_LAYERS = 'SHADOW_LAYERS';
export const SHADOW_GAP = 'SHADOW_GAP';
export const SHADOW_OFFSET_X = 'SHADOW_OFFSET_X';
export const SHADOW_OFFSET_Y = 'SHADOW_OFFSET_Y';
export const SHADOW_BLUR = 'SHADOW_BLUR';

export const shadowProps = {
  shadowBlur: SHADOW_BLUR,
  shadowColorEnd: SHADOW_COLOR_END,
  shadowColorStart: SHADOW_COLOR_START,
  shadowGap: SHADOW_GAP,
  shadowLayers: SHADOW_LAYERS,
  shadowOffsetX: SHADOW_OFFSET_X,
  shadowOffsetY: SHADOW_OFFSET_Y,
};

export const GRADIENT_COLOR_START = 'GRADIENT_COLOR_START';
export const GRADIENT_COLOR_END = 'GRADIENT_COLOR_END';
export const GRADIENT_MIDPOINT = 'GRADIENT_MIDPOINT';
export const GRADIENT_BLEND = 'GRADIENT_BLEND';
export const GRADIENT_ANGLE = 'GRADIENT_ANGLE';

export const gradientProps = {
  gradientAngle: GRADIENT_ANGLE,
  gradientBlend: GRADIENT_BLEND,
  gradientColorEnd: GRADIENT_COLOR_END,
  gradientColorStart: GRADIENT_COLOR_START,
  gradientMidpoint: GRADIENT_MIDPOINT,
};

export const WDTH = 'WDTH';
export const WGHT = 'WGHT';
export const ITAL = 'ITAL';
export const SLNT = 'SLNT';
export const MONO = 'MONO';

export const standardFontAxes = {
  wdth: 'WDTH',
  wght: 'WGHT',
  ital: 'ITAL',
  slnt: 'SLNT',
  mono: 'MONO',
};

export const CRSV = 'CRSV';
export const CASL = 'CASL';
export const BLDA = 'BLDA';
export const TRMD = 'TRMD';
export const TRMC = 'TRMC';
export const SKLD = 'SKLD';
export const TRML = 'TRML';
export const SKLA = 'SKLA';
export const TRMF = 'TRMF';
export const TRMK = 'TRMK';
export const BLDB = 'BLDB';
export const WMX2 = 'WMX2';
export const TRMB = 'TRMB';
export const TRMA = 'TRMA';
export const SKLB = 'SKLB';
export const TRMG = 'TRMG';
export const TRME = 'TRME';

export const customFontAxes = {
  blda: BLDA,
  bldb: BLDB,
  casl: CASL,
  crsv: CRSV,
  skla: SKLA,
  sklb: SKLB,
  skld: SKLD,
  trma: TRMA,
  trmb: TRMB,
  trmc: TRMC,
  trmd: TRMD,
  trme: TRME,
  trmf: TRMF,
  trmg: TRMG,
  trmk: TRMK,
  trml: TRML,
  wmx2: WMX2,
};

export const CHANGE_FONT = 'CHANGE_FONT';
export const RESET = 'RESET';
export const TOGGLE_CODE = 'TOGGLE_CODE';
export const HELP = 'HELP';
export const IS_CHANGING_FONTS = 'IS_CHANGING_FONTS';
export const SHOW_BACKGROUND = 'SHOW_BACKGROUND';

export const fontToggles = {
  changeFont: CHANGE_FONT,
  reset: RESET,
  toggleCode: TOGGLE_CODE,
  help: HELP,
  isChangingFonts: IS_CHANGING_FONTS,
  showBackground: SHOW_BACKGROUND,
};

export const TEXT_STROKE_COLOR = 'TEXT_STROKE_COLOR';
export const TEXT_STROKE_WIDTH = 'TEXT_STROKE_WIDTH';
export const FONT_SIZE = 'FONT_SIZE';

export const fontProps = {
  textStrokeColor: TEXT_STROKE_COLOR,
  textStrokeWidth: TEXT_STROKE_WIDTH,
  fontSize: FONT_SIZE,
  fontToggles,
  standardFontAxes,
  customFontAxes,
};

export const fancyTextProps = {
  gradientProps,
  shadowProps,
  fontProps,
};
