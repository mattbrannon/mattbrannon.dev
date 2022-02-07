import AppTitle from '@components/AppTitle';
import { InvertedButton as Button } from '@components/Button';
import Head from '@components/Head';
import Picture from '@components/Image';
import Layout from '@components/Layout';
import PageButtons from '@components/PageButtons';
import { H2 } from '@components/Headings';
import SideNote from '@components/SideNote';
import { getImageConfig } from '@utils/images';
import { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import image1 from '/public/images/monty-hall/monty-hall1.png';
import image2 from '/public/images/monty-hall/monty-hall2.png';
import image3 from '/public/images/monty-hall/monty-hall3.png';
import image4 from '/public/images/monty-hall/monty-hall4.png';
import Text from '@components/Text';

export default function MontyHallPage({ config }) {
  const links = {
    github: 'https://github.com/mattbrannon/monty-hall-experiment',
    liveSite: 'https://monty-hall-experiment.surge.sh/',
  };
  const sources = [ '/videos/demos/montyhall.mp4' ];

  return (
    <article>
      <Head
        title="Monty Hall Experiment"
        description="Monty Hall Experiment discussion"
      />

      <AppTitle title="Monty Hall Experience" sources={sources} links={links}>
        A game inspired by the Monty Hall problem
      </AppTitle>

      <div>
        <H2>What is the Monty Hall Problem?</H2>

        <MiniGame />
        {/* <Spacer axis="vertical" size={32} /> */}
      </div>

      <div>
        <H2>Motivation:</H2>
        <Text>
          Years ago when I first started learning javascript, one of the first things I
          made was a little simulation of the monty hall problem. You'd tell it how many
          rounds to play and whether to switch doors or stick with the original. Then,
          once it finished, it would tell you the percentages of rounds won vs rounds
          lost. It was a cool program but it had no user interface. Once I became a little
          more proficient at frontend development, I decided to go ahead and create an
          actual game out of the simulation I'd programmed years ago.
        </Text>

        <SideNote>
          If you played the little mini game above and got the wrong answer, don't feel
          bad. When this question was first popularized, many people including
          mathematicians, physicists and many others with advanced degrees actually got
          this wrong. And not only did they get it wrong, a few of them were so sure they
          were right, they publicly berated others who answered correctly.
        </SideNote>
      </div>

      <div>
        <H2>Frontend: React</H2>
        <Text>
          One of the things that surprised me when making this game was the amount of
          state I needed to keep track of. Which round are we on? Has the player chosen a
          door? Which door have they chosen? What's their total score? These are just a
          few examples of the state we keep track of during the game. Luckily, React makes
          keeping track of application state pretty easy.
        </Text>
        <FlexContainer>
          <ResponsiveImage src={image1} alt="image1" />
          <ResponsiveImage src={image2} alt="image2" />
        </FlexContainer>
        <div style={{ height: '4px' }}></div>
        <FlexContainer>
          <ResponsiveImage src={image3} alt="image3" />
        </FlexContainer>
      </div>

      <PageButtons prev="/apps/elbowroom" next="/apps/lets-make-a-gif" />
    </article>
  );
}

function MiniGame() {
  const [ isCorrect, setIsCorrect ] = useState(null);

  const Results = ({ isCorrect }) => {
    const display =
      isCorrect !== null
        ? isCorrect
          ? "That's correct!"
          : "Sorry, that's incorrect"
        : null;

    return (
      <ResultContainer>
        <Result>{display}</Result>
        <div>
          <Small>You have a 67% chance of winning if you switch doors</Small>
        </div>
      </ResultContainer>
    );
  };

  const Buttons = ({ isCorrect }) => {
    if (isCorrect === null) {
      return (
        <ButtonGroup>
          <FancyButton onClick={() => setIsCorrect(true)}>Yes</FancyButton>
          <FancyButton onClick={() => setIsCorrect(false)}>No</FancyButton>
        </ButtonGroup>
      );
    }
    else {
      return <Results isCorrect={isCorrect} />;
    }
  };

  const Question = ({ isCorrect }) => {
    return (
      <div>
        <SideNote>
          Suppose you're on a game show, and you're given the choice of three doors:
          Behind one door is a car; behind the others, goats. You pick a door, say No. 1,
          and the host, who knows what's behind the doors, opens another door, say No. 3,
          which has a goat. He then says to you, "Do you want to pick door No. 2?"
          <br />
          <br />
          <b> Is it to your advantage to switch your choice?</b>
        </SideNote>

        <Buttons isCorrect={isCorrect} />
      </div>
    );
  };

  return <Question isCorrect={isCorrect} />;
}

const ResultContainer = styled.div`
  width: 100%;
  min-height: 140px;
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
  place-items: center;
  width: 100%;
`;

const FancyButton = styled(Button)`
  flex: 1;
  max-width: 160px;
`;

const ButtonGroup = styled.div`
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
  min-height: 140px;
  ${'' /* height: 160px; */}
`;

export async function getStaticProps() {
  const config = await getImageConfig('monty-hall');
  return {
    props: {
      config: config,
    },
  };
}

const ImageContainer = styled.div`
  display: block;
  width: 100%;
`;

const ResponsiveImage = ({ ...props }) => {
  return (
    <ImageContainer>
      <Image {...props} layout="responsive" alt={props.alt} />
    </ImageContainer>
  );
};

const GifWrapper = styled.div`
  height: 280px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 4px;
`;
