import { m as motion } from 'framer-motion';
import { breakpoints } from '@constants/breakpoints';
import { useMediaQuery } from '@hooks/useMediaQuery';
import SlidingText from './SlidingText';

const MobileText = ({ ...props }) => {
  return (
    <motion.div initial={{ x: 40 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
      <SlidingText>
        Hey there! My name is Matt. I'm a web developer and musician. Thanks for stopping by my
        little corner of the web.
      </SlidingText>
    </motion.div>
  );
};

const RegularText = ({ ...props }) => {
  return (
    <SlidingText>
      Hey there! My name is Matt. I'm a web developer and musician. I enjoy building solutions to
      modern problems with code. Thanks for stopping by my little corner of the web.
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
