import Spacer from '@components/Spacer';
import { breakpoints } from '@constants/breakpoints';
import { useHasMounted } from '@hooks/useHasMounted';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import styled from 'styled-components';
// import { loadFeatures } from '@utils/helpers';

const containerVariant = {
  hidden: { scale: 0, y: 30, opacity: 0 },
  show: { scale: 1, y: 0, opacity: 1 },
  close: { scale: 0, y: -30, opacity: 0 },
};

export default function DarkModeToggle() {
  const hasMounted = useHasMounted();

  const [ currentIcon, setCurrentIcon ] = useState('');
  const { theme, setTheme } = useTheme();
  const Icon = theme === 'light' ? Sun : Moon;

  if (!hasMounted) {
    return <Spacer axis="horizontal" size={25} />;
  }

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const icon = newTheme === 'light' ? 'sun' : 'moon';
    setCurrentIcon(icon);
    setTheme(newTheme);
  };

  return (
    <ToggleButton title={`Switch to ${theme} mode`} onClick={toggle}>
      <AnimatePresence exitBeforeEnter>
        <IconWrapper
          key={currentIcon}
          variants={containerVariant}
          initial="hidden"
          animate="show"
          exit="close"
        >
          <Icon />
        </IconWrapper>
      </AnimatePresence>
    </ToggleButton>
  );
}

const Sun = () => {
  return (
    <SvgWrapper>
      <svg
        height="24px"
        width="24px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="#ffc21a"
      >
        <path d="M120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z" />
      </svg>
    </SvgWrapper>
  );
};

const Moon = () => {
  return (
    <SvgWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="#a6ccf2"
        width="21px"
        height="21px"
      >
        <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
      </svg>
    </SvgWrapper>
  );
};

const SvgWrapper = styled(motion.span)`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const ToggleButton = styled.button`
  display: block;
  background: none;
  min-width: 32px;
  max-width: 32px;
  width: 100%;
  height: calc(var(--header-height) - 24px);
  border: none;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  margin-bottom: -6px;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}px) {
    right: 64px;
    width: 64px;
    margin-bottom: -3px;
  }
`;

const IconWrapper = styled(motion.span)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
