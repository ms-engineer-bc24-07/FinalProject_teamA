"use client";
import { useRouter } from "next/navigation";
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
import { useEffect, useState } from "react";

const Buttons = () => {
  const router = useRouter();
  const [randomMessage, setRandomMessage] = useState<string>("");

  const messages = [
    "あなたの笑顔がまわりの人を幸せしますよ。良い1日を💛",
    "あなたの頑張りは、必ず誰かの心に届きます。素敵な１日を",
    "今日のあなたは、昨日のあなたより強くなる！今日も頑張ろう",
    "どんな小さな一歩も、あなたの宝物になります。良い1日を",
    "うっかり忘れ物には気をつけてください 素敵な1日になりますように.."
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setRandomMessage(messages[randomIndex]);
  }, []);

  const handleOkClick = () =>{ 
    router.push("/");
    // window.location.reload(); // ページをリロードする場合はこっちを選ぶよ
  };

  return (
    <Box display="flex" justifyContent="center" gap={4}>
      {/* YES!! ボタン */}
      <DialogRoot>
        <DialogTrigger asChild>
          <Button
            bg="teal.500"
            color="yellow.50"
            _hover={{ bg: "teal.300" }}
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
            <DialogTitle>あなたのコーディネートが登録されましたよ</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>
              【今日のひとこと】
              <br />
              {randomMessage}
            </Text>
          </DialogBody>
          <DialogFooter>
            {/* OK ボタン */}
            <DialogActionTrigger asChild>
              <Button name="AAA" variant="outline" onClick={handleOkClick}>OK</Button>
            </DialogActionTrigger>
          </DialogFooter>

          {/* ダイアログを閉じるトリガー */}
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>

      {/* CHANGE ボタン */}
      <Button
        bg="teal.500"
        color="yellow.50"
        _hover={{ bg: "teal.300" }}
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
