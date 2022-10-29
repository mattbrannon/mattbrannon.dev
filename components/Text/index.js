import { SideNote } from '@components/SideNote';
import { Paragraph, Em, Strong, HelpText, Description, FancyTextItalic } from './styles';
import { withGradient } from './GradientText';

export const text = {
  paragraph: Paragraph,
  strong: Strong,
  em: Em,
  note: SideNote,
  help: HelpText,
  description: Description,
  italic: FancyTextItalic,
  gradient: (grad) => withGradient(grad),
};
