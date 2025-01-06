// page.tsx の例
"use client";
import React from "react";
import {
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

const LoginPage: React.FC = () => {
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
                </Field>
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
};

export default LoginPage;
