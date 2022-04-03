import styled from 'styled-components';
import Card from '@components/Card';
import HeroImage from './MotionImage';
import { breakpoints } from '@constants/index.js';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useRef, useState, useEffect, useCallback, forwardRef } from 'react';
import SlidingText from './SlidingText';
import s from './style.module.css';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
// import { loadFeatures } from '@utils/helpers';
import Button from '@components/Button';
// import { useHasMounted } from '@hooks/useHasMounted';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const yVariant = {
  initial: { clipPath: 'circle(0%)', x: 0, y: 0 },
  animate: {
    clipPath: 'circle(16px)',
    y: [ 0, 90, -180 ],
    x: 0,
    // scale: y === -180 ? 0 : 1,
    transition: {
      clipPath: {
        duration: 0.25,
      },
      y: {
        // delay: 0.25,
        duration: 0.75,
        type: 'spring',
        bounce: 5,
        damping: 10,
        ease: [ 1, -0.35, 1, 0.95 ],
      },
      // scale: {
      //   duration: 0.25,
      // },
    },
  },
};

const circleVariant = {
  initial: { clipPath: 'circle(0%)', x: 0, y: 0 },

  animate: {
    clipPath: 'circle(16px)',
    y: -120,
    x: -300,
    transition: {
      clipPath: {
        duration: 1,
      },
      y: {
        delay: 2.25,
        duration: 0.75,
        type: 'spring',
        bounce: 5,
        damping: 10,
        ease: [ 1, -0.35, 1, 0.95 ],
      },
      x: {
        delay: 3.25,
        duration: 0.75,
        ease: [ 0.52, -0.51, 1, -0.09 ],
      },
    },
  },
  remove: {
    width: 0,
    height: 0,
    clipPath: 'circle(0%)',
    transition: {
      width: {
        duration: 1,
        ease: 'linear',
      },
      height: {
        duration: 1,
        ease: 'linear',
      },
    },
  },
};

const cardVariant = {
  theme: {
    background: 'var(--basic-card-background)',
    boxShadow: 'var(--card-shadow)',
    transition: {
      background: {
        duration: 0.2,
      },
      boxShadow: {
        duration: 0.1,
      },
    },
  },
  hidden: {
    background: 'var(--body-background)',
    boxShadow: 'var(--transparent-shadow)',
  },
  show: {
    background: 'var(--basic-card-background)',
    boxShadow: 'var(--card-shadow)',
    transition: {
      delay: 0.5,
      duration: 2,
    },
  },
};

// const getPosition = (card, circle) => {
//   const position = {
//     x: circle.x - card.x,
//     y: circle.y - card.y,
//     width: circle.width,
//     height: circle.height,
//   };
//   return position;
// };

const MobileText = ({ ...props }) => {
  return (
    <motion.div initial={{ x: 40 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
      <SlidingText showWords={props.hasCookie}>
        Hey there! My name is Matt. I'm a web developer and musician. Thanks for stopping by my
        little corner of the web.
      </SlidingText>
    </motion.div>
  );
};

const RegularText = ({ ...props }) => {
  return (
    <SlidingText showWords={props.hasCookie}>
      Hey there! My name is Matt. I'm a web developer and musician. I enjoy building solutions to
      modern problems with code. Thanks for stopping by my little corner of the web.
    </SlidingText>
  );
};

// const buttonConfig = [
//   { href: '/blog/about-me', side: 'left', text: 'Who am I?' },
//   { href: '/apps', side: 'center', text: 'View my work' },
//   { href: '/contact', side: 'right', text: 'Get in touch' },
// ];

export default function AnimatedHero({ setShowTitle, hasCookie, setHasCookie }) {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const isTablet = useMediaQuery({ maxWidth: breakpoints.tablet });

  const TextComponent = isMobile ? MobileText : RegularText;

  const { theme } = useTheme();
  const controls = useAnimation();

  const circle = useRef();
  const card = useRef();
  const image = useRef();

  const buttonWidth = isMobile ? 400 : isTablet ? 180 : 180;

  const handleAnimationComplete = useCallback(() => {
    if (!hasCookie) {
      document.cookie = 'finished=true';
    }
    setShowTitle(true);
    setHasCookie(true);
  }, [ hasCookie, setHasCookie, setShowTitle ]);

  useEffect(() => {
    if (isMobile) {
      handleAnimationComplete();
    }
  }, [ isMobile, handleAnimationComplete ]);

  useEffect(() => {
    controls.start('theme');
  }, [ theme, controls ]);

  useEffect(() => {
    if (hasCookie) {
      controls.start('show');
    }
  }, [ hasCookie, controls ]);

  return (
    <Wrapper ref={card}>
      <Card variants={cardVariant} initial="hidden" animate={controls}>
        <div>
          <HeroImage
            width={isMobile ? 100 : 160}
            height={isMobile ? 100 : 160}
            src="/images/hero/hero.png"
            alt="photo of me"
            className={isMobile ? s.mobile : s.center}
            priority={true}
            hasCookie={hasCookie}
            ref={image}
          />
          <TextComponent hasCookie={hasCookie} />
        </div>
        <AnimatePresence>
          <div style={{ position: 'relative' }}>
            <CenterCircle onAnimationComplete={handleAnimationComplete} ref={circle} />
            <ButtonWrapper style={{ '--buttonWidth': `${buttonWidth}px` }}>
              <ButtonLink href="/blog/about-me" side="left" hasCookie={hasCookie}>
                Who am I?
              </ButtonLink>

              <ButtonLink href="/apps" side="center" hasCookie={hasCookie}>
                View my work
              </ButtonLink>

              <ButtonLink href="/contact" side="right" hasCookie={hasCookie}>
                Get in touch
              </ButtonLink>
            </ButtonWrapper>
          </div>
        </AnimatePresence>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${'' /* max-width: 1800px; */}
  width: 100%;
  margin: 0 auto;
  isolation: isolate;
  margin-bottom: -32px;
`;

const ButtonWrapper = styled.div`
  transition: all 1s linear;
  position: relative;

  gap: 8px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${breakpoints.mobile}px) {
    ${'' /* max-width: 200px; */}
    margin: 16px 0;
    flex-wrap: wrap;
    grid-template-columns: 1fr;
    ${'' /* max-width: 300px;
    margin: 0 auto; */}
  }
`;

const Circle = styled(motion.div)`
  height: 100%;
  width: 100%;

  background: var(--tealBg);
  border-radius: 50%;
  position: absolute;

  @media (max-width: ${breakpoints.mobile}px) {
    display: none;
  }
`;

const CenterCircle = forwardRef(({ ...props }, ref) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const controls = useAnimation();

  useEffect(() => {
    const hasCookie = !!document.cookie.length;
    if (hasCookie) {
      controls.set('initial');
    }
    else {
      controls.start('animate');
    }
  });

  return (
    <Circle
      variants={isMobile ? yVariant : circleVariant}
      initial="initial"
      animate={controls}
      exit="remove"
      ref={ref}
      {...props}
    />
  );
});

CenterCircle.displayName = 'CenterCircle';

const buttonCircleVariants = {
  desktopHidden: ({ side }) => {
    return {
      clipPath: 'circle(0px)',
      x: side === 'left' ? 'calc(100% + 8px)' : side === 'right' ? 'calc(-100% - 8px)' : 0,
      y: 0,
    };
  },
  desktopShow: ({ hasCookie }) => {
    return {
      clipPath: hasCookie ? 'circle(100%)' : 'circle(16px)',
      x: 0,
      y: 0,
      transition: {
        clipPath: {
          duration: 0.35,
        },
        x: {
          delay: hasCookie ? 0 : 1,
          duration: hasCookie ? 0 : 1,
          ease: [ 0.09, 0.78, 0.3, 1.5 ],
        },
      },
    };
  },
  mobileHidden: ({ side }) => {
    return {
      clipPath: 'circle(0px)',
      x: 0,
      y: side === 'left' ? 'calc(100% + 8px)' : side === 'right' ? 'calc(-100% - 8px)' : 0,
    };
  },
  mobileShow: ({ hasCookie, side }) => {
    return {
      clipPath: hasCookie ? 'circle(100%)' : 'circle(16px)',
      x: 0,
      y: hasCookie
        ? 0
        : side === 'left'
        ? 'calc(100% + 8px)'
        : side === 'right'
        ? 'calc(-100% - 8px)'
        : 0,

      transition: {
        clipPath: {
          duration: 0.75,
          delay: hasCookie ? 1 : 0,
        },
        y: {
          delay: 0,
          duration: 1,
          ease: [ 0.09, 0.78, 0.3, 1.5 ],
        },
      },
    };
  },
};

const getVariantLabels = (isMobile) => {
  const initial = isMobile ? 'mobileHidden' : 'desktopHidden';
  const animate = isMobile ? 'mobileShow' : 'desktopShow';
  return { initial, animate };
};

function ButtonLink({ ...props }) {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const { initial, animate } = getVariantLabels(isMobile);
  const { side, hasCookie } = props;

  const [ variantLabels, setVariantLabels ] = useState({ initial, animate });

  useEffect(() => {
    const { initial, animate } = getVariantLabels(isMobile);
    setVariantLabels({ initial, animate });
  }, [ isMobile ]);

  return (
    <Link passHref href={props.href}>
      <motion.div
        // style={{ minWidth: 'min(200px, 100%)' }}
        style={{ minWidth: '100%' }}
        variants={buttonCircleVariants}
        initial={variantLabels.initial}
        animate={variantLabels.animate}
        custom={{ side, hasCookie }}
      >
        <Button
          style={{
            whiteSpace: 'nowrap',
            flex: 1,
            height: 'fit-content',
            width: '100%',
            '--transition-delay': isMobile ? '1s' : '0.2s',
            '--weight-button': hasCookie ? 600 : 100,
            '--color-button': hasCookie ? 'white' : 'transparent',
            '--shadow-button': hasCookie ? '-0.025em -0.025em 0.025em black' : 'none',
          }}
        >
          {props.children}
        </Button>
      </motion.div>
    </Link>
  );
}

// {/* <SlidingText showWords={hasCookie}>
// Hey there! My name is Matt. I'm a web developer and musician. I
// enjoy building solutions to modern problems with code. Thanks for
// stopping by my little corner of the web.
//   </SlidingText> */}

// <Circle
//   key={hasCookie}
//   variants={isMobile ? yVariant : circleVariant}
// custom={{
//   stopAt,
//   x: coords.x,
//   y: coords.y,
// }}
//   initial="initial"
//   animate="animate"
//   exit="remove"
//   ref={circle}
//   // onUpdate={handleUpdate}
//   onAnimationComplete={handleAnimationComplete}
// />
