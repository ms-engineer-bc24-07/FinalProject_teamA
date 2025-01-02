//提案されたコーデのアイテム表示
"use client";
import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  topsImage?: string;
  bottomsImage?: string;
};

const OutFitsList: React.FC<Props> = ({
  topsImage,
  bottomsImage,
  ...props
}) => {
  return (
    <Box p={9}>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={3}>
        {topsImage && (
          <Box
            p={2}
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.100"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
          >
            <Image
              src={topsImage}
              alt="Today's tops"
              aspectRatio={4 / 3}
              width="300px"
            />
          </Box>
        )}
        {bottomsImage && (
          <Box
            p={2}
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.100"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
          >
            <Image
              src={bottomsImage}
              alt="Today's bottoms"
              aspectRatio={4 / 3}
              width="300px"
            />
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default OutFitsList;
