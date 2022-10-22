import { Color } from '@mattbrannon/color-tools';

export const lighten = (hex, amount) => {
  const color = new Color(hex);
  const rgb = color.rgb.object();
  return (
    '#' +
    Object.values(rgb)
      .map((value) => Math.max(value - amount, 15))
      .map((digit) => digit.toString(16).padStart(2, '0'))
      .join('')
  );
};
