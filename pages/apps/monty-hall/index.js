import { AppTitle } from '@components/AppTitle';
import { NormalButton as StandardButton } from '@components/Button';
import Head from '@components/Head';
import { H2Link } from '@components/Headings';
import PageButtons from '@components/PageButtons';
import SideNote from '@components/SideNote';
import Text from '@components/Text/Text';
// import Image from 'next/future/image';
import { useState, memo } from 'react';
import styled from 'styled-components';
import { Picture } from '@components/Picture';

import image1Png from '/public/images/monty-hall/monty-hall1.png';
import image2Png from '/public/images/monty-hall/monty-hall2.png';
import image3Png from '/public/images/monty-hall/monty-hall3.png';

import image1Webp from '/public/images/monty-hall/monty-hall1.webp';
import image2Webp from '/public/images/monty-hall/monty-hall2.webp';
import image3Webp from '/public/images/monty-hall/monty-hall3.webp';

import image1Avif from '/public/images/monty-hall/monty-hall1.avif';
import image2Avif from '/public/images/monty-hall/monty-hall2.avif';
import image3Avif from '/public/images/monty-hall/monty-hall3.avif';

const makeSourceArray = (...images) => {
  return images.map((image) => {
    const { src, width, height, blurDataURL } = image;
    return { src, width, height, blurDataURL };
  });
};

const image1Sources = makeSourceArray(image1Avif, image1Webp, image1Png);
const image2Sources = makeSourceArray(image2Avif, image2Webp, image2Png);
const image3Sources = makeSourceArray(image3Avif, image3Webp, image3Png);

// .map((image) => {
//   const { src, width, height, blurDataURL } = image;
//   console.log(image);
//   return { src, width, height, blurDataURL };
// });

// const image2Sources = [image2Avif, image2Webp, image2Png].map((image) => {
//   const { src, width, height, blurDataURL } = image;
//   console.log(image);
//   return { src, width, height, blurDataURL };
// });

// const image3Sources = [image3Avif, image3Webp, image3Png].map((image) => {
//   const { src, width, height, blurDataURL } = image;
//   console.log(image);
//   return { src, width, height, blurDataURL };
// });

export default memo(function MontyHallPage() {
  const [isCorrect, setIsCorrect] = useState(null);

  const links = {
    github: 'https://github.com/mattbrannon/monty-hall-experiment',
    liveSite: 'https://monty-hall-experiment.surge.sh/',
  };
  const sources = ['/videos/demos/montyhall.mp4'];

  return (
    <article>
      <Head title="Monty Hall Experiment" description="Monty Hall Experiment discussion" />

      <AppTitle title="Monty Hall Experience" sources={sources} links={links}>
        A game inspired by the Monty Hall problem
      </AppTitle>

      <section>
        <Heading>What is the Monty Hall Problem?</Heading>

        <MiniGame isCorrect={isCorrect} setIsCorrect={setIsCorrect} />
        {/* <Buttons isCorrect={isCorrect} setIsCorrect={setIsCorrect} /> */}

        {/* <Spacer axis="vertical" size={32} /> */}
      </section>

      <section>
        <Heading>Motivation</Heading>
        <Text>
          When I first started learning javascript, one of the first things I made was a little
          simulation of the monty hall problem. You'd tell it how many rounds to play and whether to
          switch doors or stick with the original. Then, once it finished, it would tell you the
          percentages of rounds won vs rounds lost. It was a cool program but it had no user
          interface. After I got a little better at frontend development, I decided to go ahead and
          create an actual game out of that simulation.
        </Text>

        <SideNote>
          If you played the little mini game above and got the wrong answer, don't feel bad. When
          the question first appeared in Marilyn Vos Savant's column in Parade magazine, many people
          including mathematicians, physicists and many others with advanced degrees actually got
          this wrong. And not only did they get it wrong, a few of them were so sure they were
          right, they publicly berated others who answered correctly.
        </SideNote>
      </section>

      <section>
        <Heading>Frontend: React</Heading>
        <Text>
          One of the things that surprised me when making this game was the amount of state I needed
          to keep track of. Which round are we on? Has the player chosen a door? Which door have
          they chosen? What's their total score? These are just a few examples of the state we keep
          track of during the game. Luckily, React makes keeping track of application state pretty
          easy.
        </Text>
        <FlexContainer>
          <Picture sources={image1Sources} alt="image1" />
          <Picture sources={image2Sources} alt="image2" />
        </FlexContainer>
        <div style={{ height: '4px' }}></div>
        <FlexContainer>
          <Picture sources={image3Sources} alt="image3" />
        </FlexContainer>
      </section>

      <PageButtons prev="/apps/elbowroom" next="/apps/lets-make-a-gif" />
    </article>
  );
});

const Heading = styled(H2Link)`
  font-size: var(--size28);
  color: var(--h2);
`;

const Results = ({ isCorrect }) => {
  const display =
    isCorrect !== null ? (isCorrect ? 'That\'s correct!' : 'Sorry, that\'s incorrect') : null;

  const color = isCorrect ? 'var(--correct-answer)' : 'var(--wrong-answer)';

  return (
    <ResultContainer>
      <Result style={{ '--color': color }}>{display}</Result>
      <div>
        <Small>You have about a 67% chance of winning if you switch doors</Small>
      </div>
    </ResultContainer>
  );
};

const Buttons = ({ isCorrect, setIsCorrect }) => {
  if (isCorrect === null) {
    return (
      <ButtonGroup>
        <ButtonWrapper>
          <StandardButton
            onClick={() => {
              setIsCorrect(true);
            }}
          >
            Yes
          </StandardButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <StandardButton
            onClick={() => {
              setIsCorrect(false);
            }}
          >
            No
          </StandardButton>
        </ButtonWrapper>
      </ButtonGroup>
    );
  }
  else {
    return <Results isCorrect={isCorrect} />;
  }
};

const Question = ({ ...props }) => {
  return (
    <div>
      <SideNote>
        Suppose you're on a game show, and you're given the choice of three doors: Behind one door
        is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows
        what's behind the doors, opens another door, say No. 3, which has a goat. He then says to
        you, "Do you want to pick door No. 2?"
        <br />
        <br />
        <b> Is it to your advantage to switch your choice?</b>
      </SideNote>

      <Buttons {...props} />
    </div>
  );
};

function MiniGame({ isCorrect, setIsCorrect }) {
  return <Question setIsCorrect={setIsCorrect} isCorrect={isCorrect} />;
}

const ResultContainer = styled.div`
  width: 100%;
  min-height: 140px;
  display: grid;
  place-content: center;
  font-variation-settings: 'wdth' 120, 'wght' 700;
`;

const Result = styled.div`
  font-weight: 700;
  text-align: center;
  color: var(--color);
`;

const Small = styled.small`
  display: block;
  text-align: center;
`;

// const FancyButton = styled(Button)`
//   flex: 1;
//   width: 100%;
// `;

const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(16px, 5vw, 32px);
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;

  margin: 32px 0;
  padding: 32px 0;
  margin: auto;
  width: 100%;
  min-height: 140px;
`;

const ButtonWrapper = styled.div`
  max-width: 160px;
  width: 100%;
  color: white;
`;

// const ImageContainer = styled.div`
//   display: block;
//   width: 100%;
// `;

// const ResponsiveImage = ({ ...props }) => {
//   return (
//     <ImageContainer>
//       <Image {...props} layout="responsive" alt={props.alt} />
//     </ImageContainer>
//   );
// };

const FlexContainer = styled.div`
  display: flex;
  gap: 4px;
`;
