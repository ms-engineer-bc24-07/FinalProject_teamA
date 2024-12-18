import { Box, Button } from '@chakra-ui/react';

const Buttons = () => {
  return (
    <Box display="flex" justifyContent="center" gap={4}>
      <Button
  bg="teal.500"
  color="white"
  _hover={{ bg: 'teal.600' }}
  px={6} // 横のパディング
  py={3} // 縦のパディング
  borderRadius="md"
>
  YES!!
</Button>

<Button
  bg="teal.500"
  color="white"
  _hover={{ bg: 'teal.600' }}
  px={6} // 横のパディング
  py={3} // 縦のパディング
  borderRadius="md"
>
  CHANGE
</Button>

    </Box>
  );
};

export default Buttons;
