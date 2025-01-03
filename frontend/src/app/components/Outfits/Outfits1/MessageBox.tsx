"use client"; // クライアントコンポーネントを明示

import { Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  clickEvent?: () => void;
};

const MessageBox: React.FC<Props> = ({ clickEvent, ...props }) => {
  const router = useRouter();

  return (
    <Box p={4} textAlign="center">
      <Button
        onClick={clickEvent}
        bg="green.400" // 背景色
        color="gray.700" // テキスト色
        _hover={{ bg: "orange.500" }} // ホバー時の背景色
        px={6} // パディングX
        py={2} // パディングY
        rounded="lg" // 角丸
        transition="0.2s" // トランジション時間
      >
        何着ようかな？
      </Button>
    </Box>
  );
};

export default MessageBox;
