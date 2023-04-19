import {
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import MapComponent from '../MapComponent';
import classes from './index.module.css';
import { useState } from 'react';
import { fetchLocationData, fetchLocationFromSuburb, haversineDistance } from '../../utils/fetchLocation';
import useGameLogic from '../../hooks/useGameLogic';
import { GUESS_THRESHOLDS } from '../../constants/mapConstants';
import { GameEndModal } from '../GameEndModal';

const MainPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
