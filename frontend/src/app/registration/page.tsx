// **********************************************************
// camera/page.tsxで写真を撮った後、RegistrationPageに遷移
// プルダウンでタグを選択してクローゼット（S3）に登録し、データベースに登録
// **********************************************************

"use client"; // Next.jsでクライアントコンポーネント指定

import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Button, Text, Spacer } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { FaTshirt } from "react-icons/fa";
import { useRouter } from "next/navigation"; // useRouterフックをインポート
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
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

const RegistrationPage: React.FC = () => {
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [itemImageURL, setItemImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ローディング状態を追加
  const router = useRouter(); // useRouterフックを使用

  // セッションストレージから画像を取得するための useEffect フック
  useEffect(() => {
    const loadImage = async () => {
      const capturedImage = sessionStorage.getItem("capturedImage");
      console.log("Captured image from session storage:", capturedImage); // ログ出力で確認
      if (capturedImage) {
        setItemImageURL(capturedImage);
      }
      setLoading(false); // データ取得後にローディング状態を解除
    };
    loadImage();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value); // カテゴリーを更新
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value); // カラーを更新
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

    if (!itemImageURL) {
      toaster.create({
        title: "Validation Error",
        description: "No image captured.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(itemImageURL);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob, "capturedImage.png");
      formData.append("category", category);
      formData.append("color", color);

      // デバッグ用のログ
      console.log("FormData content:");
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const uploadResponse = await fetch(
        "http://localhost:5000/api/registration/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (uploadResponse.ok) {
        const data = await uploadResponse.json();
        setItemImageURL(data.filename);
        toaster.create({
          title: "Success",
          description: "Item saved successfully.",
          type: "success",
        });
        setCategory("");
        setColor("");

        // Closetページに遷移し、新しいアイテムを追加する
        router.push("/closet");
      } else {
        const errorData = await uploadResponse.json();
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

  if (loading) {
    return <Text>Loading...</Text>; // ローディング中の表示
  }

  return (
    <Box
      p={8}
      bg="gray.100"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      h="70%"
    >
      {/* Header */}
      <Box mb={4} textAlign="center">
        <Text fontSize="xl" fontWeight="medium" textTransform="uppercase">
          アイテムを登録する
        </Text>
      </Box>

      {/* itemImageURL & Form */}
      <Box
        w="90%"
        maxW="400px"
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        p={10}
        textAlign="center"
      >
        {/* Top Icon */}
        <Box mb={2}>
          <FaTshirt size={36} />
        </Box>

        {/* Item Image */}
        {itemImageURL ? (
          <Image
            src={itemImageURL} // キャプチャされた画像のURL
            alt="Item"
            borderRadius="md"
            boxSize="200px"
            mx="auto"
            mb={6}
          />
        ) : (
          <Text>No Image</Text>
        )}

        {/* Category Selection */}
        <Box mb={4}>
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Category
          </Text>
          <NativeSelectRoot size="xs" width="210px" alignItems="center">
            <NativeSelectField
              placeholder="アイテムの種類を選択してください"
              value={category}
              onChange={handleCategoryChange}
              textOverflow="ellipsis"
            >
              <option value="tops">トップス</option>
              <option value="bottoms">ボトムス</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>

        {/* Color Selection */}
        <Box mb={6}>
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Color
          </Text>
          <NativeSelectRoot size="xs" width="210px">
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
              <option value="green">グリーン</option>
              <option value="pink">ピンク</option>
              <option value="orange">オレンジ</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>

        {/* Buttons */}
        <Flex justify="center" gap={8}>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button
                w="40%"
                variant="solid"
                colorPalette="teal"
                color="yellow50" // テキスト色
                fontWeight="650" // 文字の太さを指定
                _hover={{ bg: "teal.300" }} // ホバー時の背景色
                rounded="lg" // 角丸
              >
                OK
              </Button>
            </DialogTrigger>
            {/* ダイアログのコンテンツ */}
            <DialogContent w="max">
              <DialogHeader>
                {/* <DialogTitle>今日の一言</DialogTitle> */}
              </DialogHeader>
              <DialogBody>
                <Text>新しいアイテムが保存されました！</Text>
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

          <Button
            colorScheme="gray"
            w="40%"
            variant="solid"
            colorPalette="teal"
            color="yellow50" // テキスト色
            fontWeight="650" // 文字の太さを指定
            _hover={{ bg: "teal.300" }} // ホバー時の背景色
            rounded="lg" // 角丸
          >
            BACK
          </Button>
        </Flex>
      </Box>

      <Spacer />
    </Box>
  );
};

export default RegistrationPage;
