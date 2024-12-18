import { Box, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      as="header"
      textAlign="center"
      p={4}
      bg="gray.300"
      borderBottom="1px"
      borderColor="gray.400"
    >
      <Heading as="h1" size="lg" fontWeight="bold">
        My Closet App
      </Heading>
    </Box>
  );
};

export default Header;
