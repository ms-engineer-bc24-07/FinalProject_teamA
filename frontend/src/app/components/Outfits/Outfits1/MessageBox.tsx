'use client'; // クライアントコンポーネントを明示

import { Button, Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const MessageBox = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/outfits2'); // outfits2ページに遷移
  };

  return (
    <Box p={4} textAlign="center">
      <Button
        onClick={handleClick}
        bg="amber.500" // 背景色
        color="white" // テキスト色
        _hover={{ bg: 'orange.500' }} // ホバー時の背景色
        px={6} // パディングX
        py={2} // パディングY
        rounded="lg" // 角丸
        transition="0.2s" // トランジション時間
      >
        I wanna get new look
      </Button>
    </Box>
  );
};

export default MessageBox;

