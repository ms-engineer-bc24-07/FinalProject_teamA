"use client";

import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="layout-container">
      <Flex
        as="main"
        className="main-content"
        flex="1"
        justify="center"
        align="center"
      >
        {children}
      </Flex>
      <Box as="footer" bg="gray.700" color="white" textAlign="center" py={2}>
        <Text>&copy; 2025 Dayzzy</Text>
      </Box>
    </Box>
  );
}
