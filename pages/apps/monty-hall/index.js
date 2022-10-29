import { AppTitle } from '@components/AppTitle';
import Head from '@components/Head';
import { headings } from '@components/Headings';
import PageButtons from '@components/PageButtons';
import { text } from '@components/Text';
import { useState, useContext, memo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { link } from '@components/Links';

import image1Avif from '/public/images/monty-hall/monty-hall1.avif';
import image1WebP from '/public/images/monty-hall/monty-hall1.webp';
import image1Png from '/public/images/monty-hall/monty-hall1.png';
import { Picture } from '@components/Picture';

import { AnimatePresence, m as motion } from 'framer-motion';
import { VideoPlayer } from '@components/VideoPlayer';
import { spacer } from '@components/Spacer';
import { MiniGame } from '@components/MiniGame';
import { Main } from '@components/Layout';

const links = {
  github: 'https://github.com/mattbrannon/monty-hall-experiment',
  liveSite: 'https://monty-hall-experiment.surge.sh/',
};
const sources = ['/videos/demos/montyhall.webm'];

export default memo(function MontyHallPage() {
  const [isCorrect, setIsCorrect] = useState(null);
  const context = useContext(ThemeContext);

  const setGameState = (isCorrect) => {
    setIsCorrect(isCorrect);
    context.setHasPlayedGame(true);
  };

  return (
    <Main>
      <Head title="Monty Hall Experiment" description="Monty Hall Experiment discussion" />

      <AppTitle title="Monty Hall Experience" sources={sources} links={links}>
        A game inspired by the Monty Hall problem
      </AppTitle>

      <section>
        <Heading>What is the Monty Hall Problem?</Heading>

        <text.paragraph>
          The Monty Hall Problem is a logic puzzle originally posed by Steve Selvin in a letter written to the American
          Statistician in 1975. It was made famous when a reader of Parade Magazine's <em>Ask Marilyn</em> column posed
          the same question to Marilyn Vos Savant
        </text.paragraph>

        <MiniGame setGameState={setGameState} isCorrect={isCorrect} />
      </section>

      {isCorrect !== null || context.hasPlayedGame ? (
        <AnimatePresence>
          <motion.section key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Heading>Explanation</Heading>
            <text.paragraph>
              If you've never encountered this problem before, the idea that switching doors would increase your chances
              of winning very likely seems wrong. How could switching doors increase your chances? Let's look at a
              single round of game play.
            </text.paragraph>

            <Table />

            <text.paragraph>Let's say we pick door #1.</text.paragraph>
            <Table1 />

            <text.paragraph>
              Our host, Monty Hall, then opens door #2, revealing a goat and asks if we want to switch doors.
            </text.paragraph>

            <Table2 />

            <text.paragraph>Keep in mind, door #2 is now out of play.</text.paragraph>
            <Table3 />

            <text.paragraph>
              Here comes the tricky part. Our original odds haven't changed. We had a 1 in 3 chance of selecting the
              correct door at the start of the game. And those odds remain the same. Monty removing a door after the
              fact cannot change those odds.
            </text.paragraph>

            <Table4 />

            <text.paragraph>
              Similarly the odds of the winning door being one of the other two hasn't changed either. When Monty
              removes one of the losing options from his side, there is still a 2 in 3 chance of the winning option
              being on his side. And since Monty is now holding 1 door, the odds of it being the winning door are 2 in
              3.
            </text.paragraph>

            <Table5 />

            <SubHeading>Alternative Approach</SubHeading>
            <text.paragraph>
              An alternative way to think about it is to just go through each possibility and look at the results of
              switching versus not switching. If you do that, you'll start to notice a pattern. If we always switch
              doors, the only time we actually lose, is when we choose the correct door at the beginning of the round.
              And since we only have 1 in 3 chance of choosing the correct door, there is 2 in 3 chance of the door
              being the last remaining door after Monty reveals a goat.
            </text.paragraph>

            <Table6 />
            <small>Every possible round of play</small>

            <spacer.block size={64} />

            <VideoPlayer sources={['/math.mp4']} />
          </motion.section>

          <motion.section key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Heading>Motivation</Heading>

            <text.paragraph>
              The Monty Hall Problem is fascinating on multiple levels. It's not a complex problem but it is an
              unintuitive one. A person can quickly and easily map out every possible round of play and determine for
              themselves that it's actually better to switch. In fact, doing so would have saved quite a few college
              professors some embarassement.
            </text.paragraph>

            <text.paragraph>
              I always had a hard time understanding The Monty Hall problem. None of the explanations I read made a lot
              of sense to me. When I started getting into programming, one of the first things I made was a little
              simulation of the monty hall problem. You'd tell it how many rounds to play and whether to switch doors or
              stick with the original. Then, once it finished, it would tell you the percentages of rounds won vs rounds
              lost. As I started focusing on frontend development, I wanted to make an actual game that could be played
              by anyone. So that's what I did.
            </text.paragraph>
          </motion.section>

          <motion.section key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Heading>Frontend: React</Heading>
            <text.paragraph>
              React is my goto framework of choice for frontend development. I wrote the code for this game while I was
              learning React Hooks. As a result, some parts of this app are written using class based components while
              others are written in a more modern style with hooks.
            </text.paragraph>

            <Picture sources={[image1Avif, image1WebP, image1Png]} alt="image1" />

            <text.paragraph>
              This is one of those projects that I always come back to at some point in time. It's a cool game with semi
              decent visual appeal. But it could be so much better. At the time I wrote it, I thought the video playing
              in the background was pretty cool. Now it just feels like a giant eye sore and wasted resources every time
              I look at it. I'd also like to do a few more animations. Specifically, when a door opens to reveal a goat,
              I envision the goat off to the side out of view and then poking his into view soon after the door opens in
              a very exaggerated cartoon like way.
            </text.paragraph>

            <text.paragraph>
              I hope to find a little free time to make some updates and improve on this app. Here's another link to{' '}
              <link.external href="https://monty-hall-experiment.surge.sh/">The Monty Hall Experiment</link.external> if
              you'd like to play it yourself.
            </text.paragraph>
          </motion.section>
        </AnimatePresence>
      ) : null}

      <PageButtons prev="/apps/elbowroom" next="/apps/password-generator" />
    </Main>
  );
});

const Heading = styled(headings.h2Link)`
  font-size: var(--size28);
  color: var(--h2);
`;

const SubHeading = styled(headings.h3Link)`
  font-size: var(--size21);
  color: var(--h4);
`;

const Table = () => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Door 1</th>
          <th>Door 2</th>
          <th>Door 3</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ textAlign: 'center' }}>
          <td>Goat</td>
          <td>Goat</td>
          <td>Car</td>
        </tr>
      </tbody>
    </table>
  );
};

const Table1 = () => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ background: 'lightblue', color: 'black' }}>Door 1</th>
          <th>Door 2</th>
          <th>Door 3</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ textAlign: 'center' }}>
          <td>Goat</td>
          <td>Goat</td>
          <td>Car</td>
        </tr>
      </tbody>
    </table>
  );
};

const Table2 = () => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ background: 'lightblue', color: 'black' }}>Door 1</th>
          <th style={{ background: '#555' }}>Door 2</th>
          <th>Door 3</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ textAlign: 'center' }}>
          <td>Goat</td>
          <td style={{ background: '#555', color: 'white' }}>Goat</td>
          <td>Car</td>
        </tr>
      </tbody>
    </table>
  );
};

const Table3 = () => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ background: 'lightblue', color: 'black' }}>Door 1</th>
          <th style={{ background: '#555', opacity: 0 }}>Door 2</th>
          <th>Door 3</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ textAlign: 'center' }}>
          <td>Goat</td>
          <td style={{ background: '#555', opacity: 0, color: 'white' }}>Goat</td>
          <td>Car</td>
        </tr>
      </tbody>
    </table>
  );
};

const Table4 = () => {
  return (
    <table style={{ width: '100%', outline: 'none', borderSpacing: '0px' }}>
      <thead>
        <tr>
          <th style={{ background: 'lightblue', color: 'black' }}>Door 1</th>
          <th style={{ background: 'lightgreen', color: 'black' }}>Door 2</th>
          <th style={{ background: 'lightgreen', color: 'black' }}>Door 3</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ textAlign: 'center', outline: 'none' }}>
          <td style={{ background: 'lightblue', color: 'black' }}>Goat</td>
          <td style={{ background: 'lightgreen', color: 'black' }}>Goat</td>
          <td style={{ background: 'lightgreen', color: 'black' }}>Car</td>
        </tr>
      </tbody>
    </table>
  );
};

const Table5 = () => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
          <th style={{ background: 'lightblue', color: 'black', flex: 1 }}>Door 1</th>
          <th style={{ background: 'lightgreen', color: 'black', flex: 2 }}>Door 3</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ textAlign: 'center', display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
          <td style={{ flex: 1 }}>Goat</td>
          <td style={{ flex: 2 }}>Car</td>
        </tr>
      </tbody>
    </table>
  );
};

const Table6 = () => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <Th>Prize</Th>
          <Th>Choice</Th>
          <Th>Reveal</Th>
          <Th>Offer</Th>
          <Th>Stay</Th>
          <Th>Switch</Th>
        </tr>
      </thead>
      <tbody>
        <PrizeInDoor1 />
        <PrizeInDoor2 />
        <PrizeInDoor3 />
      </tbody>
    </table>
  );
};

const PrizeInDoor1 = () => {
  return (
    <>
      <tr>
        <Td>door 1</Td>
        <Td>door 1</Td>
        <Td>2 or 3</Td>
        <Td>2 or 3</Td>
        <Win>Win</Win>
        <Lose>Lose</Lose>
      </tr>
      <tr>
        <Td>door 1</Td>
        <Td>door 2</Td>
        <Td>door 3</Td>
        <Td>door 1</Td>
        <Lose>Lose</Lose>
        <Win>Win</Win>
      </tr>
      <tr>
        <Td>door 1</Td>
        <Td>door 3</Td>
        <Td>door 2</Td>
        <Td>door 1</Td>
        <Lose>Lose</Lose>
        <Win>Win</Win>
      </tr>
    </>
  );
};

const PrizeInDoor2 = () => {
  return (
    <>
      <tr>
        <Td>door 2</Td>
        <Td>door 1</Td>
        <Td>door 3</Td>
        <Td>door 2</Td>
        <Lose>Lose</Lose>
        <Win>Win</Win>
      </tr>
      <tr>
        <Td>door 2</Td>
        <Td>door 2</Td>
        <Td>1 or 3</Td>
        <Td>1 or 3</Td>
        <Win>Win</Win>
        <Lose>Lose</Lose>
      </tr>
      <tr>
        <Td>door 2</Td>
        <Td>door 3</Td>
        <Td>door 1</Td>
        <Td>door 2</Td>
        <Lose>Lose</Lose>
        <Win>Win</Win>
      </tr>
    </>
  );
};

const PrizeInDoor3 = () => {
  return (
    <>
      <tr>
        <Td>door 3</Td>
        <Td>door 1</Td>
        <Td>door 2</Td>
        <Td>door 3</Td>
        <Lose>Lose</Lose>
        <Win>Win</Win>
      </tr>
      <tr>
        <Td>door 3</Td>
        <Td>door 2</Td>
        <Td>door 1</Td>
        <Td>door 3</Td>
        <Lose>Lose</Lose>
        <Win>Win</Win>
      </tr>
      <tr>
        <Td>door 3</Td>
        <Td>door 3</Td>
        <Td>1 or 2</Td>
        <Td>1 or 2</Td>
        <Win>Win</Win>
        <Lose>Lose</Lose>
      </tr>
    </>
  );
};

const Th = styled.th`
  background: #915a22;
  font-size: 12px;
  /* font-size: clamp(0.75rem, 1rem - 0.1vw, 1rem); */
  font-size: clamp(10px, 10px + 0.1vw, 14px);
`;

const Td = styled.td`
  background: #f7cb76;
  font-size: 12px;
  /* font-size: clamp(0.75rem, 1rem + 0.1vw, 1rem); */
`;

const Win = styled.td`
  color: darkgreen;
  font-weight: 700;
  font-size: 12px;
  /* font-size: clamp(0.75rem, 1rem + 0.1vw, 1rem); */
`;

const Lose = styled.td`
  color: maroon;
  font-weight: 700;
  font-size: 12px;
  /* font-size: clamp(0.75rem, 1rem + 0.1vw, 1rem); */
`;
