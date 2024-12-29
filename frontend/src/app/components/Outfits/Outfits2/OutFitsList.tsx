//提案されたコーデのアイテム表示
"use client";
import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  topsImages?: string;
  bottomsImages?: string;
};

const OutFitsList: React.FC<Props> = ({
  topsImages,
  bottomsImages,
  ...props
}) => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.100"
          boxShadow="md"
          _hover={{ boxShadow: "lg" }}
        >
          <Image
            src={topsImages}
            alt="GreenTops"
            aspectRatio={4 / 3}
            width="300px"
          />
        </Box>
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.100"
          boxShadow="md"
          _hover={{ boxShadow: "lg" }}
        >
          <Image
            src={bottomsImages}
            alt="denims"
            aspectRatio={4 / 3}
            width="300px"
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default OutFitsList;
