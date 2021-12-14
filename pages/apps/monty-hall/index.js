import AppTitle from '@components/AppTitle';
import { InvertedButton as Button } from '@components/Button';
import DocumentHead from '@components/Head';
import Picture from '@components/Image';
import { BottomRow, FullBleed } from '@components/Layout';
import PageButtons from '@components/PageButtons';
import SectionHeading from '@components/SectionHeading';
import SideNote from '@components/SideNote';
import { getImageConfig } from '@utils/images';
import { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';

export default function MontyHallPage({ config }) {
  const links = {
    github: 'https://github.com/mattbrannon/monty-hall-experiment',
    liveSite: 'https://monty-hall-experiment.surge.sh/',
  };
  const sources = [ '/videos/demos/montyhall.mp4' ];

  return (
    <>
      <DocumentHead
        title="Monty Hall Experiment"
        desc="Monty Hall Experiment discussion"
      />

      <AppTitle title="Monty Hall Experience" sources={sources} links={links}>
        A game inspired by the Monty Hall problem
      </AppTitle>

      <div>
        <SectionHeading>What is the Monty Hall Problem?</SectionHeading>

        <MiniGame />
        {/* <Spacer axis="vertical" size={32} /> */}
      </div>

      <div>
        <SectionHeading>Motivation:</SectionHeading>
        <p>
          Years ago when I first started learning javascript, one of the first things I
          made was a little simulation of the monty hall problem. You'd tell it how many
          rounds to play and whether to switch doors or stick with the original. Then,
          once it finished, it would tell you the percentages of rounds won vs rounds
          lost. It was a cool program but it had no user interface. Once I became a little
          more proficient at frontend development, I decided to go ahead and create an
          actual game out of the simulation I'd programmed years ago.
        </p>
      </div>

      <div>
        <SideNote>
          If you played the little mini game above and got the wrong answer, don't feel
          bad. When this question was first popularized, many people including
          mathematicians, physicists and many others with advanced degrees actually got
          this wrong. And not only did they get it wrong, a few of them were so sure they
          were right, they publicly berated others who answered correctly.
        </SideNote>
      </div>

      <ImageWrapper>
        <Picture sources={config.keep} alt="player chooses to stay" />
        <Picture sources={config.swap} alt="player chooses to swap" />
      </ImageWrapper>
      <div>
        <SectionHeading>Frontend: React</SectionHeading>
        <p>
          One of the things that surprised me when making this game was the amount of
          state I needed to keep track of. Which round are we on? Has the player chosen a
          door? Which door have they chosen? What's their total score? These are just a
          few examples of the state we keep track of during the game. Luckily, React makes
          keeping track of application state pretty easy.
        </p>
      </div>

      <BottomRow>
        <PageButtons prev="/apps/elbowroom" next="/apps/lets-make-a-gif" />
      </BottomRow>
    </>
  );
}

function MiniGame() {
  const [ isCorrect, setIsCorrect ] = useState(null);
  const ref1 = useRef();
  const ref2 = useRef();

  useEffect(() => {
    const fadingOut = [ { opacity: 1 }, { opacity: 0 } ];
    const fadingIn = [ { opacity: 0 }, { opacity: 1 } ];
    const timing = { easing: 'ease', fill: 'both', duration: 1000 };
    if (isCorrect !== null) {
      ref1.current.animate(fadingOut, { ...timing, duration: 400 });
      // fadeOut.pause();
      // fadeOut.finished.then(() => {});
      ref2.current.animate(fadingIn, { ...timing, duration: 200 });
    }
  }, [ isCorrect ]);

  const Results = forwardRef((props, ref) => {
    const { isCorrect } = props;
    const display =
      isCorrect !== null
        ? isCorrect
          ? "That's correct!"
          : "Sorry, that's incorrect"
        : isCorrect;

    return (
      <ResultContainer ref={ref}>
        <Result>{display}</Result>
        <div>
          <Small>You have a 67% chance of winning if you switch doors</Small>
        </div>
      </ResultContainer>
    );
  });

  Results.displayName = 'showResult';

  const Buttons = forwardRef((props, ref) => {
    return (
      <ButtonGroup ref={ref}>
        <FancyButton onClick={() => setIsCorrect(true)}>Yes</FancyButton>
        <FancyButton onClick={() => setIsCorrect(false)}>No</FancyButton>
      </ButtonGroup>
    );
  });

  Buttons.displayName = 'Buttons';

  return (
    <div>
      <SideNote>
        Suppose you're on a game show, and you're given the choice of three doors: Behind
        one door is a car; behind the others, goats. You pick a door, say No. 1, and the
        host, who knows what's behind the doors, opens another door, say No. 3, which has
        a goat. He then says to you, "Do you want to pick door No. 2?"
        <br />
        <br />
        <b> Is it to your advantage to switch your choice?</b>
      </SideNote>

      <ButtonSection>
        <Buttons ref={ref1} />
        <Results isCorrect={isCorrect} ref={ref2} />
      </ButtonSection>
    </div>
  );
}

const ResultContainer = styled.div`
  ${'' /* height: 10px; */}
  opacity: 0;
  position: absolute;
  width: 100%;
  margin: 32px auto;
`;

const Result = styled.div`
  font-weight: 800;
  text-align: center;
`;

// const SmallWrapper = styled.div`
//   text-align: center;
// `;

const Small = styled.small`
  display: block;
  text-align: center;
`;

const ButtonSection = styled.section`
  height: 120px;
  ${'' /* background: red; */}
  position: relative;
  display: grid;
`;

const FancyButton = styled(Button)`
  flex: 1;
  max-width: 160px;
`;

const ButtonGroup = styled.div`
  position: absolute;
  display: flex;
  gap: clamp(16px, 5vw, 32px);
  align-items: center;
  ${'' /* margin: 32px 0 48px 0; */}
  ${'' /* padding: 32px 0 0 0; */}
  flex-wrap: wrap;
  justify-content: space-evenly;

  margin: 32px 0;
  padding: 32px 0;
  margin: auto;
  width: 100%;
  ${'' /* height: 160px; */}
`;

const ImageWrapper = styled(FullBleed)`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
`;

export async function getStaticProps() {
  const config = await getImageConfig('monty-hall');
  return {
    props: {
      config: config,
    },
  };
}
