import { breakpoints } from '@constants/breakpoints';
import { useMediaQuery } from '@hooks/useMediaQuery';
import SlidingText from './SlidingText';

const MobileText = ({ ...props }) => {
  return (
    <div>
      <SlidingText>
        Hey there! I'm Matt, a web developer and musician. Have a look around, or just say hi.
      </SlidingText>
    </div>
  );
};

const RegularText = ({ ...props }) => {
  return (
    <SlidingText>
      Hey there! I'm Matt, a web developer and musician. I make things for the web, like a realtime
      chat room and a photo and video editor. Have a look around, or just say hi.
    </SlidingText>
  );
};

export default function TextComponent({ ...props }) {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  if (isMobile) {
    return <MobileText {...props} />;
  }
  return <RegularText {...props} />;
}
