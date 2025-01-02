"use client";
import { Box, Button, Text } from "@chakra-ui/react";
import { For, HStack } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Buttons = () => {
  return (
    <Box display="flex" justifyContent="center" gap={4}>
      {/* YES!! ボタン */}
      <DialogRoot>
        <DialogTrigger asChild>
          <Button
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            px={6} // 横のパディング
            py={3} // 縦のパディング
            borderRadius="md"
          >
            YES!!
          </Button>
        </DialogTrigger>

        {/* ダイアログのコンテンツ */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>今日の一言</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>
              うっかり忘れ物には気をつけてください 素敵な1日になりますように..
            </Text>
          </DialogBody>
          <DialogFooter>
            {/* Cancel ボタン */}
            <DialogActionTrigger asChild>
              <Button variant="outline">OK</Button>
            </DialogActionTrigger>
          </DialogFooter>

          {/* ダイアログを閉じるトリガー */}
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>

      {/* CHANGE ボタン */}
      <Button
        bg="teal.500"
        color="white"
        _hover={{ bg: "teal.600" }}
        px={6} // 横のパディング
        py={3} // 縦のパディング
        borderRadius="md"
      >
        CHANGE
      </Button>
    </Box>
  );
};

export default Buttons;
