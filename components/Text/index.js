// export { P } from './Paragraph';
export { Em } from './Emphasis';
export { Strong } from './Strong';
// export { StrongText } from './FancyText';
export { FancyText } from './FancyText';
// export { Text } from './Text';
// export { P as Text } from './Text';
import { P } from './Text';
import { Strong } from './Strong';
import { Em } from './Emphasis';

export const text = {
  paragraph: P,
  strong: Strong,
  em: Em,
};
