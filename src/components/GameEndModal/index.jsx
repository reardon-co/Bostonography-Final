import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import CopyTextButton from '../CopyTextButton';

export const GameEndModal = ({ isOpen, onClose, gameWon, positionAddress, scoreIndicator }) => {
  if (positionAddress) {
    if (gameWon) {
      return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Game Won!</ModalHeader>
            <ModalBody>
              <Text>
                Good job! Today, this location is: <br />
                <i>{positionAddress.display_name}</i>.
              </Text>
              <Text>It took you {(scoreIndicator.length - 1) / 2 + 1} guesses to get it right.</Text>
              <CopyTextButton textToCopy={scoreIndicator} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => window.location.reload(true)}>Play Again?</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    } else {
      return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Game Over</ModalHeader>
            <ModalBody>
              <Text>Nice try! The correct location was {positionAddress.address.suburb}.</Text>
              <CopyTextButton textToCopy={scoreIndicator} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => window.location.reload(true)}>Play Again?</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    }
  } else {
    return null;
  }
};
