"use client";

import {
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "@/components/ui/field";

export default function SignupCard() {
  const [email, setEmail] = useState(""); // メールアドレスの状態管理
  const [password, setPassword] = useState(""); // パスワードの状態管理
  const [loading, setLoading] = useState(false); // ローディング状態管理
  const [error, setError] = useState<string | null>(null); // エラーメッセージの状態管理

  // 新規登録のクリックイベントハンドラ
  const handleSignup = async () => {
    setLoading(true); // ローディングを開始
    setError(null); // エラーメッセージをリセット

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "mail-address": email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("新規登録が成功しました！");
        // 必要ならここでリダイレクト
      } else {
        alert(`新規登録に失敗しました: ${data.message}`);
      }
    } catch (error) {
      // エラーハンドリング
      if (error instanceof Error) {
        setError(error.message); // Errorオブジェクトの場合はそのメッセージを設定
      } else {
        setError("An unknown error occurred"); // その他の場合はデフォルトのエラーメッセージ
      }
      alert(
        `エラーが発生しました: ${error instanceof Error ? error.message : error}`
      );
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  // ログインのクリックイベントハンドラ
  const handleLogin = async () => {
    alert("ログイン機能は未実装です"); // ログイン処理を実装
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack padding={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            fontSize={"3xl"}
            textAlign={"center"}
            margin-bottom={"15"}
            color={"gray.600"}
          >
            WELCOME
          </Heading>
          <Text fontSize={"base"} color={"gray.600"}>
            服選びのストレスから解放されよう
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack padding={4}>
            <Stack padding={6}>
              <Box>
                <Field
                  invalid={false}
                  label="メールアドレス"
                  errorText="再度ログインして下さい"
                >
                  <Input placeholder="メールアドレスを入力して下さい" />
                </Field>
              </Box>
              <Box>
                <Field
                  invalid={false}
                  label="パスワード"
                  errorText="再度ログインして下さい"
                >
                  <Input placeholder="パスワードを入力して下さい" />
                </Field>{" "}
              </Box>
            </Stack>
            <Stack padding={3} pt={2} align={"center"}>
              <Link href={"/"}>
                <Button
                  size="lg"
                  bg={"teal.600"}
                  color={"white"}
                  _hover={{
                    bg: "teal.300",
                  }}
                >
                  ログイン
                </Button>
              </Link>
            </Stack>
            <Stack padding={2} pt={2} align={"center"}>
              <Button
                size="lg"
                bg={"teal.600"}
                color={"white"}
                _hover={{
                  bg: "teal.300",
                }}
              >
                新規登録
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
