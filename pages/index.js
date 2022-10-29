import { ThemeContext } from 'styled-components';
import Hero from '@components/Hero';
import { FancyTitle } from '@components/FancyTitle';
import Head from '@components/Head';
import { layout } from '@components/Layout';
import { useContext } from 'react';
// import { breakpoints } from '@constants/breakpoints';

const homePageVariant = {
  hidden: {
    opacity: 0,
    clipPath: 'var(--left)',
  },
  show: ({ hasRun }) => {
    return {
      opacity: 1,
      clipPath: 'var(--visible)',
      transition: {
        duration: 1.5,
        delay: hasRun ? 0 : 4,
      },
    };
  },
};

export default function HomePage() {
  const context = useContext(ThemeContext);
  return (
    <layout.home id="main-content">
      <Head description="Home Base" title="Matt Brannon | Web Developer" />

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
        custom={{ hasRun: context.hasRun }}
      >
        Welcome to my site!
      </FancyTitle>

      <Hero />
    </layout.home>
  );
}
