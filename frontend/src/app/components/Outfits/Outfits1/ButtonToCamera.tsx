"use client"; // クライアントコンポーネントを明示

import { Button, Box, HStack } from "@chakra-ui/react";

const ButtonToCamera = () => {
  return (
    <Box p={4} textAlign="flex-start">
      <HStack wrap="wrap" gap="6">
        <Button
          //   onClick={clickEvent}
          variant="solid"
          colorPalette="teal"
          // bg="green.300" // 背景色
          color="yellow50" // テキスト色
          fontWeight="650" // 文字の太さを指定
          letterSpacing="3px" // 文字の幅を指定
          _hover={{ bg: "teal.300" }} // ホバー時の背景色
          px={10} // パディングX
          py={8} // パディングYs
          rounded="lg" // 角丸
          transition="0.2s" // トランジション時間
        >
          アイテム撮影
        </Button>
      </HStack>
    </Box>
  );
};

export default ButtonToCamera;
