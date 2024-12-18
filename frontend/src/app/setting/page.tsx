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
            to enjoy all of our cool features ✌️
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
    <Field invalid={false} label="Email" errorText="This field is required">
    <Input placeholder="Enter your email" />
    </Field>
            </Box>
            <Box>
    <Field invalid={false} label="Email" errorText="This field is required">
    <Input placeholder="Enter your email" />
    </Field>             </Box>
            </Stack>
            <Stack padding={10} pt={2}>
            <Button
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                bg: 'blue.500',
                }}>
                Sign up
            </Button>
            </Stack>
        </Stack>
        </Box>
    </Stack>
    </Flex>
)
}