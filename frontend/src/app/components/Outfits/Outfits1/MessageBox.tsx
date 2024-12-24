"use client"; // クライアントコンポーネントを明示

import { Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const MessageBox = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/outfits2"); // outfits2ページに遷移
  };

  return (
    <Box p={4} textAlign="center">
      <Button
        onClick={handleClick}
        bg="green.400" // 背景色
        color="gray.700" // テキスト色
        _hover={{ bg: "orange.500" }} // ホバー時の背景色
        px={6} // パディングX
        py={2} // パディングY
        rounded="lg" // 角丸
        transition="0.2s" // トランジション時間
      >
        何着て行こうかな？
      </Button>
    </Box>
  );
};

export default MessageBox;
