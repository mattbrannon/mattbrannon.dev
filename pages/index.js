import { ThemeContext } from 'styled-components';
import Hero from '@components/Hero';
import { FancyTitle } from '@components/FancyTitle';
import Head from '@components/Head';
import { layout } from '@components/Layout';
import { useContext } from 'react';
import { useReducedMotion } from 'framer-motion';
// import { breakpoints } from '@constants/breakpoints';

const homePageVariant = {
  hidden: {
    opacity: 0,
    clipPath: 'var(--left)',
  },
  show: ({ hasRun, shouldReduceMotion }) => {
    return {
      opacity: 1,
      clipPath: 'var(--visible)',
      transition: shouldReduceMotion ? { type: false } : { duration: hasRun ? 1.5 : 0.8 },
    };
  },
};

export default function HomePage() {
  const context = useContext(ThemeContext);
  const shouldReduceMotion = useReducedMotion();
  return (
    <layout.home id="main-content">
      <Head
        description="I'm Matt Brannon, a web developer and musician. I make things for the web, like a realtime chat room and a photo and video editor."
        title="Matt Brannon | Web Developer"
      />

      <FancyTitle
        style={{
          '--gradient': 'var(--app-name-gradient)',
          '--shadow': 'var(--app-name-shadow)',
          overflow: 'hidden',
          textAlign: 'center',
        }}
        variants={homePageVariant}
        initial="hidden"
        animate="show"
        custom={{ hasRun: context.hasRun, shouldReduceMotion }}
      >
        Welcome to my site!
      </FancyTitle>

      <Hero />
    </layout.home>
  );
}
