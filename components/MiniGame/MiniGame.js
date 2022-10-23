import { button } from '@components/Button';
import { AnimatePresence, m as motion } from 'framer-motion';
import { SideNote } from '@components/SideNote';
import { ResultContainer, Result, ButtonGroup, ButtonWrapper, Small } from './styles';

const Results = ({ isCorrect }) => {
  const display = isCorrect !== null ? (isCorrect ? "That's correct!" : "Sorry, that's incorrect") : null;

  const color = isCorrect ? 'var(--correct-answer)' : 'var(--wrong-answer)';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="results"
    >
      <ResultContainer>
        <Result style={{ '--color': color }}>{display}</Result>
        <div>
          <Small>You have about a 67% chance of winning if you switch doors</Small>
        </div>
      </ResultContainer>
    </motion.div>
  );
};

const Buttons = ({ setGameState }) => {
  return (
    <ButtonGroup
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="buttons"
    >
      <ButtonWrapper>
        <button.teal onClick={() => setGameState(true)}>Yes</button.teal>
      </ButtonWrapper>
      <ButtonWrapper>
        <button.teal onClick={() => setGameState(false)}>No</button.teal>
      </ButtonWrapper>
    </ButtonGroup>
  );
};

const Choices = ({ isCorrect, setGameState }) => {
  return (
    <AnimatePresence mode="wait">
      {isCorrect === null ? <Buttons setGameState={setGameState} /> : <Results isCorrect={isCorrect} />}
    </AnimatePresence>
  );
};

export const MiniGame = ({ ...props }) => {
  return (
    <>
      <SideNote>
        Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the
        others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door,
        say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?"
        <br />
        <br />
        <b> Is it to your advantage to switch your choice?</b>
      </SideNote>

      <Choices {...props} />
    </>
  );
};
