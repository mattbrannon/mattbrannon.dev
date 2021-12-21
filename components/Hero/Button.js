import { useCookie } from '@hooks/useCookie';
import MotionButton from './MotionButtons';
import StaticButton from './StaticButton';

export default function Button({ children, ...props }) {
  const hasCookie = useCookie('navigated')[0];
  const Component = hasCookie ? StaticButton : MotionButton;

  return <Component {...props}>{children}</Component>;
}
