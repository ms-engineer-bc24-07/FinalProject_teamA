"use client"; // Next.jsでクライアントコンポーネント指定

import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FaHome, FaCamera, FaTshirt, FaCog } from "react-icons/fa";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

const RegistrationPage: React.FC = () => {
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };

  return (
    <Box
      p={4}
      bg="gray.100"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Header */}
      <Box mb={4} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" textTransform="uppercase">
          registration
        </Text>
      </Box>

      {/* Image & Form */}
      <Box
        w="90%"
        maxW="400px"
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        p={6}
        textAlign="center"
      >
        {/* Top Icon */}
        <Box mb={2}>
          <FaTshirt size={36} />
        </Box>

        {/* Item Image */}
        <Image
          src="/item-image.png" // アイテム画像のパス（publicフォルダ内）
          alt="Item"
          borderRadius="md"
          boxSize="200px"
          mx="auto"
          mb={6}
        />

        {/* Category Selection */}
        <Box mb={4}>
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            category
          </Text>
          <NativeSelectRoot size="sm" width="240px">
            <NativeSelectField
              placeholder="select tags"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="outer">Outer</option>
              <option value="accessory">Accessory</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>

        {/* Color Selection */}
        <Box mb={6}>
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            color
          </Text>
          <NativeSelectRoot size="sm" width="240px">
            <NativeSelectField
              placeholder="select tags"
              value={color}
              onChange={handleColorChange}
            >
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="black">Black</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>

        {/* Buttons */}
        <Flex justify="center" gap={4}>
          <Button colorScheme="yellow" w="40%">
            OK
          </Button>
          <Button colorScheme="gray" w="40%">
            back
          </Button>
        </Flex>
      </Box>

      <Spacer />

      {/* Bottom Navigation */}
      <Box
        w="100%"
        bg="yellow.300"
        p={4}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        borderTopRadius="xl"
        mt={8}
      >
        <IconButton aria-label="home" fontSize="2xl" bg="transparent">
          <FaHome />
        </IconButton>
        <IconButton aria-label="camera" fontSize="2xl" bg="transparent">
          <FaCamera />
        </IconButton>
        <IconButton aria-label="closet" fontSize="2xl" bg="transparent">
          <FaTshirt />
        </IconButton>
        <IconButton aria-label="setting" fontSize="2xl" bg="transparent">
          <FaCog />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
