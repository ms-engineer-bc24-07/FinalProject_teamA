import { Box, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      as="header"
      textAlign="center"
      p={4}
      bg="green.400"
      borderBottom="1px"
      borderColor="green.400"
    >
      <Heading as="h1" size="lg" fontWeight="bold">
        Dayzzy
      </Heading>
    </Box>
  );
};

export default Header;
