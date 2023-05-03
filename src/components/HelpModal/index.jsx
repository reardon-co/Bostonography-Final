import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';

export const HelpModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tutorial</ModalHeader>
        <ModalBody>
          <Text>
            Atlascople is a game about Boston's old atlases. Like Wordle, you get a several guesses before the game is
            over.
          </Text>
          <br />
          <Text>Start by typing in the borough that you think the pin on the atlas is located in.</Text>
          <br />
          <Text>
            The closer your guess is to the target, the closer to green the response square will be, according to this
            key:
          </Text>
          <br />
          <Text> &lt; 0.5 miles = 🟩</Text>
          <Text>&lt; 1 mile = 🟨</Text>
          <Text>&lt; 2 miles = 🟧</Text>
          <Text>&lt; 4 miles = 🟥</Text>
          <br />
          <Text>Each guess will zoom the map out, revealing more of the area surrounding the pin.</Text>
          <br />
          <Text>Try to guess the borough before the map can't zoom out any further!</Text>
          <br />
          <Text>&#40;Note that borough data is being pulled from OpenStreetMap&#41;</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
