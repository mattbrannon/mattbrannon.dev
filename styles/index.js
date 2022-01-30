import { fonts } from '../constants';
import { createGlobalStyle } from 'styled-components';

export const FontSizes = createGlobalStyle`
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
  --size36: ${fonts.sizes.size32};
  --size40: ${fonts.sizes.size40};
  --size48: ${fonts.sizes.size48};
}
`;
