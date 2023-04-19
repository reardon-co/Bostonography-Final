import { Button, Card, Flex, Spacer, Text, useClipboard } from '@chakra-ui/react';
import classes from './index.module.css';

const CopyTextButton = ({ textToCopy }) => {
  const { onCopy, hasCopied } = useClipboard(textToCopy);
  return (
    <Card className={classes.cardStyles} variant="outline">
      <Flex direction="row" alignItems="center">
        <Text>{textToCopy}</Text>
        <Spacer />
        <Button onClick={onCopy}>{hasCopied ? 'Copied!' : 'Copy'}</Button>
      </Flex>
    </Card>
  );
};

export default CopyTextButton;
