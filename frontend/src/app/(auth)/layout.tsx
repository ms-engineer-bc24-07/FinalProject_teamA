"use client";
// authに関わるlayout
import React from "react";
import { AuthContextProvider } from "./login/authContext";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const AuthLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <AuthContextProvider>
      <Box className="layout-container">
        <Box as="header" bg="green.500" color="white" textAlign="center" py={4}>
          <Heading>Auth Section</Heading>
        </Box>
        <Flex
          as="main"
          className="main-content"
          flex="1"
          justify="center"
          align="center"
        >
          {children}
        </Flex>
        <Box
          as="footer"
          bg="gray.700"
          color="white"
          textAlign="center"
          py={2}
        ></Box>
      </Box>
    </AuthContextProvider>
  );
};

export default AuthLayout;
