// app/Outfits2/page.tsx
import { Box, Heading, Text, Container } from "@chakra-ui/react";
import OutfitList from "../components/Outfits/Outfits2/OutFitsList";
import Buttons from "../components/Outfits/Outfits2/Buttons";

const Home2 = () => {
  return (
    <Box p={4} bg="gray.50" minH="100vh">
      <Container centerContent mb={8}>
        <Heading as="h1" size="xl" color="blue.600" mb={2}>
          Home2
        </Heading>
        <Text color="gray.600">
          Find your perfect outfit from our recommendations!
        </Text>
      </Container>
      <Box mb={8}>
        <OutfitList />
      </Box>
      <Container centerContent>
        <Buttons />
      </Container>
    </Box>
  );
};

export default Home2;
