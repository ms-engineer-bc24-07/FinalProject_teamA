'use client'

import { auth } from "@/firebase"; // 初期化済みのauthをインポート
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import { useRouter } from 'next/navigation'  // next/navigation を使用

import { Field } from "@/components/ui/field"
import {
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react'

export default function SignupCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // 新規登録処理
  const handleSignup = async () => {
    console.log('Signup button clicked');  // ここで確認
    try {
      // Firebaseで新規ユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully')
      console.log('User created successfully', userCredential);

      // ユーザーのIDトークンを取得
      const user = userCredential.user;
      const idToken = await user.getIdToken();  // IDトークンを取得
      console.log('ID Token:', idToken);  // トークンをコンソールに表示

      // トークンをバックエンドのAPIに送信
      fetch('/api/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,  // Authorizationヘッダーにトークンを設定
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);  // サーバーからのレスポンスを処理
        })
        .catch(error => {
          console.error('Error:', error);
        });

      // 登録成功後のリダイレクト
      console.log('Redirecting to home...')
      router.push('/home')  // ホーム画面に遷移
    } catch (err: any) {
      setError(err.message)  // エラーメッセージを表示
      console.error('Error creating user:', err);
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'gray.50'}>
      <Stack padding={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            服選びのストレスから解放されよう ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'lg'}
          p={8}>
          <Stack padding={4}>
            <Stack>
              <Box>
                <Field invalid={false} label="メールアドレス" errorText="再度ログインして下さい">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // 入力の変更をstateに反映
                    placeholder="メールアドレスを入力して下さい"
                  />
                </Field>
              </Box>
              <Box>
                <Field invalid={false} label="パスワード" errorText="再度ログインして下さい">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // 入力の変更をstateに反映
                    placeholder="パスワードを入力して下さい"
                  />
                </Field>
              </Box>
            </Stack>
            <Stack padding={10} pt={2}>
              <Link href={"/"}>
                <Button
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  ログインする
                </Button>
              </Link>
            </Stack>
            <Stack padding={10} pt={2}>
              <Button
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignup} // 新規登録処理を実行
              >
                新規登録する
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
