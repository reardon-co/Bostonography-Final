import { Button, Heading, IconButton, Input, Text, useDisclosure } from '@chakra-ui/react';
import MapComponent from '../MapComponent';
import classes from './index.module.css';
import useGameLogic from '../../hooks/useGameLogic';
import { GameEndModal } from '../GameEndModal';
import { QuestionIcon } from '@chakra-ui/icons';
import { HelpModal } from '../HelpModal';

const MainPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isHelpOpen, onOpen: onHelpOpen, onClose: onHelpClose } = useDisclosure();
  const [{ position, positionData, zoomLevel, scoreIndicator, gameWon }, { setGuess, validateAnswer, skipGuess }] =
    useGameLogic({
      openModal: onOpen,
    });

  return (
    <div className={classes.mainContainer}>
      <GameEndModal
        isOpen={isOpen}
        onClose={onClose}
        gameWon={gameWon}
        positionAddress={positionData}
        scoreIndicator={scoreIndicator}
      />
      <div className={classes.gridItem}>
        <Heading className={classes.gridItem} as="h1" size="4xl">
          Atlascople
        </Heading>
        <Text className={classes.gridItem}>{scoreIndicator}</Text>
      </div>
      <MapComponent zoomLevel={zoomLevel} position={position} />
      <div className={classes.gridItem}>
        <div className={classes.userInputs}>
          <IconButton aria-label="tutorial" onClick={onHelpOpen} icon={<QuestionIcon />} />
          <HelpModal onClose={onHelpClose} isOpen={isHelpOpen} />
          <Input
            className={classes.growItem}
            placeholder="What borough are we in?"
            onChange={(e) => setGuess(e.currentTarget.value)}
          />
          <Button
            onClick={() => {
              validateAnswer();
            }}
          >
            Submit Guess
          </Button>
          <Button
            onClick={() => {
              skipGuess();
            }}
          >
            Skip Guess
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
