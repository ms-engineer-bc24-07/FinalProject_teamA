//提案されたコーデのアイテム表示

import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

type Outfit = {
  id: number;
  name: string;
};

const outfits: Outfit[] = [
  { id: 1, name: "アイテム１" },
  { id: 2, name: "アイテム２" },
  // { id: 3, name: 'Outfit 3', description: 'A sporty look for active days.' },
];

const OutfitList = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        {outfits.map((outfit) => (
          <Box
            key={outfit.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.100"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
          >
            <Heading as="h3" size="md" mb={2}>
              {outfit.name}
            </Heading>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default OutfitList;
