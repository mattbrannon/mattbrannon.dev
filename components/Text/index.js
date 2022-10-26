// export { P } from './Paragraph';
export { Em } from './Emphasis';
export { Strong } from './Strong';
// export { StrongText } from './FancyText';
export { FancyText } from './FancyText';
// export { Text } from './Text';
// export { P as Text } from './Text';
import { P } from './P';
import { Strong } from './Strong';
import { Em } from './Emphasis';
import { Note } from './Note';
import { HelpText } from './help';

export const text = {
  paragraph: P,
  strong: Strong,
  em: Em,
  note: Note,
  help: HelpText,
};
