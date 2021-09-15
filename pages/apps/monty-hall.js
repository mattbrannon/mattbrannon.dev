import styled from 'styled-components/macro';
import Image from 'next/image';
import initialChoice from '../../public/images/monty-hall/choice.png';
import SideNote from '../../components/SideNote';
import { MaxWidthWrapper } from '../../components/MaxWidth';
import DocumentHead from '../../components/Head';
import VideoPlayer from '../../components/VideoPlayer';
import Spacer from '../../components/Spacer';
// import Link from 'next/link';
import PageButtons from '../../components/PageButtons';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { ExternalLink } from '../../components/ExternalLink';
import { Discussion } from '../../components/Discussion';
import { PageHeading } from '../../components/PageHeading';

export default function MontyHallPage() {
  const [ display, setDisplay ] = useState('');
  const [ isCorrect, setIsCorrect ] = useState(null);

  useEffect(() => {
    if (isCorrect !== null) {
      const display = isCorrect ? "That's correct! " : "Sorry, that's incorrect. ";
      setDisplay(display);
    }
  }, [ isCorrect ]);

  return (
    <>
      <DocumentHead
        title="Monty Hall Experiment"
        desc="Monty Hall Experiment discussion"
      />

      <main>
        <MaxWidthWrapper>
          <PageHeading title="The Monty Hall Experiment">
            A game simulation of the Monty Hall problem
          </PageHeading>

          <VideoPlayer
            sources={[ '/videos/monty-hall.webm', '/videos/monty-hall.mp4' ]}
          />

          <Spacer axis="vertical" size={16} />
          <div style={{ maxWidth: '480px' }}>
            <SideNote>
              Suppose you're on a game show, and you're given the choice of three doors:
              Behind one door is a car; behind the others, goats. You pick a door, say No.
              1, and the host, who knows what's behind the doors, opens another door, say
              No. 3, which has a goat. He then says to you, "Do you want to pick door No.
              2?" Is it to your advantage to switch your choice?
            </SideNote>

            <Spacer axis="vertical" size={32} />
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
              <Button onClick={() => setIsCorrect(true)}>Yes</Button>
              <Button onClick={() => setIsCorrect(false)}>No</Button>
            </div>

            <Spacer axis="vertical" size={16} />
            <div style={{ minHeight: '100px' }}>
              <div style={{ textAlign: 'center' }}>{display.length ? display : null}</div>
              <div style={{ textAlign: 'center' }}>
                {display.length ? (
                  <small>You have a 67% chance of winning if you switch doors</small>
                ) : null}
              </div>
            </div>
          </div>

          <Spacer axis="vertical" size={32} />
          <div style={{ marginTop: '-72px' }}>
            <Discussion title="Motivation">
              The monty hall problem is a very interesting one. If you played the little
              mini game above and got the wrong answer, don't feel bad. When this question
              was first popularized, many well learned academics including mathematicians,
              physicists and many others with advanced degrees actually got this wrong.
              And not only did they get it wrong, many of them were so sure they were
              right, they publicly berated other academics who answered correctly. It is
              said that one such professor of mathematics refused to accept the correct
              answer until he was shown computer simulations that verified the correct
              answer.
            </Discussion>
          </div>
          <Discussion title="Frontend: React">
            React is pretty much what I default to unless there's a good reason not to use
            it. And I've yet to find a good reason not to. For this app, there is quite a
            lot of state that needs to be handled, which React does quite well.
          </Discussion>

          <ExternalLink href="https://monty-hall-experiment.surge.sh/">
            Visit the live site
          </ExternalLink>

          <ImageWrapper>
            <Image layout="intrinsic" src={initialChoice} alt="desktop view of the app" />
          </ImageWrapper>
        </MaxWidthWrapper>

        <PageButtons prev="/apps/elbowroom" next="/apps/lets-make-a-gif" />

        <Spacer axis="vertical" size={64} />
      </main>
    </>
  );
}

const ImageWrapper = styled.div`
  /* margin-left: -16px; */
  width: calc(100% + 48px);
  margin-left: -30px;
`;
