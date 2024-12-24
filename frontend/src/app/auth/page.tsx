'use client'

import {
  Flex,
  Box,
//   FormControl,
//   FormLabel,
  Input,
//   InputGroup,
  HStack,
//   InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
//   useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Field } from "@/components/ui/field"

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)

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
    <Input placeholder="メールアドレスを入力して下さい" />
    </Field>
            </Box>
            <Box>
    <Field invalid={false} label="パスワード" errorText="再度ログインして下さい">
    <Input placeholder="パスワードを入力して下さい" />
    </Field>            </Box>
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
                }}>
                新規登録する
            </Button>
            </Stack>

        </Stack>
        </Box>
    </Stack>
    </Flex>
)
}