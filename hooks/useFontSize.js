export const useFontSize = (minFont, maxFont, minView, maxView) => {
  const toFloat = (n) => Math.round(n * 10) / 10;
  const pxToRem = (n) => toFloat(n / 16);

  const minRem = pxToRem(minFont);
  const maxRem = pxToRem(maxFont);

  const m = (maxFont - minFont) / (maxView - minView);
  const slope = `${toFloat(m * 100)}vw`;
  const b = toFloat((minFont - m * minView) / 16);

  const operator = Math.sign(b) < 0 ? '-' : '+';
  const clampedValue = `${slope} ${operator} ${Math.abs(b)}rem`;

  return `clamp(${minRem}rem, ${clampedValue}, ${maxRem}rem)`;
};
