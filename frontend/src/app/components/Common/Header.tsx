"use client";
import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";

const Header = () => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    setImage("/images/clear-back.svg");
  });

  return (
    <Box
      as="header"
      position="fixed" // ヘッダーを固定
      top="0" // 上部に配置
      width="100%" // 全幅をカバー
      zIndex="10" // 他の要素より前面に表示
      textAlign="center"
      p={5}
      bg="gray.50"
      borderColor="green.400"
      boxShadow="sm"
      display="flex" // Flexboxを有効にする
      justifyContent="center" //横方向に中央揃え
      alignItems="center" // 縦方向に中央揃え
    >
      <Image src={image} alt="icon header" width="130px" height="auto" />
    </Box>
  );
};

export default Header;
