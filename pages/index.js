import Head from '@components/Head';
import Layout from '@components/Layout';
import Text from '@components/Text';
// import GradientText from '@components/GradientText';
import styled, { keyframes, css } from 'styled-components';
// import { H1 } from '@components/Headings';
import PageTitle from '@components/PageTitle';
import { CreatureHero } from '@components/Creature';
import { fadeIn } from '@animations/index';
import { motion } from 'framer-motion';
import { InvertedButton } from '@components/Button';

import { useEffect, useRef, useState } from 'react';
import { breakpoints } from '@constants/index';
import { useMediaQuery } from '@hooks/useMediaQuery';

export default function HomePage() {
  const container = useRef();
  const cubeRef = useRef();
  const text = useRef();
  const [ startX, setStartX ] = useState(null);
  const [ stopX, setStopX ] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });

  useEffect(() => {
    const containerExists = container && container.current;
    const textExists = text && text.current;

    if (containerExists && textExists) {
      const containerRect = container.current.getBoundingClientRect();
      const textRect = text.current.getBoundingClientRect();
      const stop = containerRect.left - textRect.right;
      const start = containerRect.width;
      setStartX(start);
      setStopX(stop);
      console.log({ containerRect, textRect });
    }
  }, [ container, startX, text ]);

  return (
    <>
      <Head title="Matt Brannon" description="A brief introduction" />
      <Top>
        <TitleWrapper>
          <PageTitle ref={text} inline>
            About me
          </PageTitle>
        </TitleWrapper>

        <CreatureWrapper ref={container}>
          <CreatureHero ref={cubeRef} eyelid={42} blink startX={startX} stopX={stopX} />
        </CreatureWrapper>
      </Top>

      <Text>
        Hey there. My name is Matt. I'm a software developer and musician. And as of
        recently, it seems I'm also a cube. Not quite sure how that happened but, I
        digress. <strong>Welcome to my little corner of the internet.</strong>
      </Text>

      <Text>
        For most of my life, music was the primary focus. But when you get into your 30's,
        and you're still playing the same dirty bars you've been playing for the past ten
        years, you start to find yourself pulled in a different direction. At least I did
        anyway. A few years ago, I made the jump to software development, and it was
        probably the best decision I ever made.
      </Text>

      <Text>
        One of the best (and worst) things about software development is that you can
        never stop learning. Except for spending three months at a coding boot camp called
        Hack Reactor, I'm entirely self-taught. As such, I've spent years refining and
        sharpening my ability to learn without guidance and find solutions to problems
        autonomously.
      </Text>
    </>
  );
}

function Buttons() {
  return (
    <Wrapper>
      <Button>Portfolio</Button>
      <Button>Blog</Button>
      <Button>Contact</Button>
    </Wrapper>
  );
}

const Button = styled(InvertedButton)`
  min-width: 200px;
  max-width: 220px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  justify-items: center;
`;

// const Button = styled.button`
//   padding: 8px 4px;
//   border-radius: 6px;
//   background: var(--tealBg);
//   font-size: var(--size40);
//   color: white;
//   font-weight: 800;
//   text-shadow: 0.05em 0.05em 0.025em black;
//   border: 0.05em solid black;
//   box-shadow: 2px 2px 10px -4px black;
//   margin: 8px 16px;
//   border-radius: 14px;
//   -webkit-touch-callout: none;
//   -webkit-tap-highlight-color: transparent;
//   user-select: none;

//   &:hover {
//     background: var(--tealHover);
//     cursor: pointer;
//   }
//   &:focus {
//     background: var(--tealFocus);
//   }

//   &:active {
//     outline: 4px solid white;
//     outline-offset: -6px;
//   }
// `;

// <Text></Text>

// {/* <Text>
//   Hey there. My name is Matt. I'm a software developer and a musician. I started
//   my journey into software developemenet several years ago kinda just by chance.
//   For most of my life, music has been my primary focus. It was only after I was an
//   adult in my 30's that I started feeling myself pulled in another direction.
//   Oddly enough, the whole thing started with broken computer. Maybe the fact that
//   I was in my 30's and not a rock star had something to do with it as well.
// </Text>
// <Text>
//   Several years ago, my computer was dying and I hadn't made a backup of the hard
//   drive. Yeah, I'm THAT guy. Luckily I was able to boot into safe mode and
//   transfer all my file to an external drive using the command prompt in safe mode.
//   This experience made me curious about what else I could do from the command
//   line. As it turns out, you can do quite a lot. I spent the first couple of years
//   hacking away at bash scripts to automate various things in my daily life.
// </Text>
// <Text>
//   As time went on, I eventually I found myself becoming more and more interested
//   in Javascript. Once I figured out that I could open the developer tools and type{' '}
//   <small>
//     <code>document.body.style.background = 'red'</code>
//   </small>
//   and watch the background actually change colors, I was like, ok this is cool. So
//   now that's what I do. I just sit around all day changing the background color of
//   web pages. If you'd like me to change the background color of your web page, hit
//   me up!
// </Text> */}

const MainContent = styled.div``;

const Top = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  padding-bottom: 32px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}px) {
    flex-direction: column;
    padding-bottom: 0;
  }
`;

// const spin = keyframes`
//   from {
//     transform: rotateY(1200deg);
//   }
//   to {
//     transform: rotateY(-26deg);
//   }
// `;

// const width = keyframes`
//   from {
//     width: 0%;
//   }
//   to {
//     width: 100%;
//   }
// `;

const CreatureWrapper = styled(motion.div)`
  justify-self: center;
  align-self: flex-end;
  transform-style: preserve-3d;
  flex: 1;
  margin: 32px 0;

  @media (max-width: ${breakpoints.mobile}px) {
    align-self: center;
    margin-top: 0px;
  }
`;

// const InnerWrapper = styled.div`
//   transform-style: preserve-3d;
//   transform-origin: left;
//   ${'' /* animation: ${spin} 2s ease 1s both; */}
// `;

const TitleWrapper = styled.div`
  width: 100%;
  flex: 1;
`;
