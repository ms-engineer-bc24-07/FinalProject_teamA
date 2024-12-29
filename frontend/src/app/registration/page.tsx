"use client"; // Next.jsでクライアントコンポーネント指定

import React, { useState } from "react";
import { Box, Flex, Image, Button, Text, Spacer } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { FaTshirt } from "react-icons/fa";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

const RegistrationPage: React.FC = () => {
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("/item-image.png"); // 仮の画像URL

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };

  const handleSave = async () => {
    if (!category || !color) {
      toaster.create({
        title: "Validation Error",
        description: "Please select both category and color.",
        type: "error",
      });
      return;
    }

    const payload = {
      image, // 画像URL（AWS S3のURLに置き換える）
      categoryTag: category,
      colorTag: color,
    };

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toaster.create({
          title: "Success",
          description: "Item saved successfully.",
          type: "success",
        });
        // フォームをリセット
        setCategory("");
        setColor("");
      } else {
        const errorData = await response.json();
        toaster.create({
          title: "Error",
          description: errorData.message || "Failed to save item.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toaster.create({
        title: "Network Error",
        description: "Unable to save item. Please try again later.",
        type: "error",
      });
    }
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
              placeholder="アイテムの種類を選択してください"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="tops">トップス</option>
              <option value="bottoms">ボトムス</option>
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
              placeholder="メインの色を選択してください"
              value={color}
              onChange={handleColorChange}
            >
              <option value="white">ホワイト</option>
              <option value="black">ブラック</option>
              <option value="brown">ブラウン</option>
              <option value="navy">ネイビー</option>
              <option value="beige">ベージュ</option>
              <option value="khaki">カーキ</option>
              <option value="red">レッド</option>
              <option value="blue">ブルー</option>
              <option value="yellow">イエロー</option>
              <option value="purple">パープル</option>
              <option value="pink">ピンク</option>
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
    </Box>
  );
};

export default RegistrationPage;
