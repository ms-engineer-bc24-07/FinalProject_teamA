"use client";
import { Box, Tabs, IconButton, Flex, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { House, Camera, Shirt, Settings } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  // タブのインデックスに基づいてページ遷移
  const handleTabChange = (index: number) => {
    const routes = ["/outfits2", "/camera", "/closet", "/setting"];
    router.push(routes[index]);
  };

  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      width="100%"
      bg="gray.50"
      borderTop="1px"
      borderColor="green.400"
      boxShadow="sm"
      zIndex={10}
    >
      <Flex gap="0" justify="space-between" width="full">
        <Link href={"/"}>
          <Box height="20" width="25" px={2}>
            <VStack gap="0">
              <IconButton aria-label="Call support" variant={"ghost"}>
                <House />
              </IconButton>
              <Text textStyle="sm">{"Home"}</Text>
            </VStack>
          </Box>
        </Link>
        <Link href={"/camera"}>
          <Box height="20" width="25" px={2}>
            <VStack gap="0">
              <IconButton aria-label="Call support" variant={"ghost"}>
                <Camera />
              </IconButton>
              <Text textStyle="sm">{"Camera"}</Text>
            </VStack>
          </Box>
        </Link>
        <Link href={"/closet"}>
          <Box height="20" width="25" px={2}>
            <VStack gap="0">
              <IconButton aria-label="Call support" variant={"ghost"}>
                <Shirt />
              </IconButton>
              <Text textStyle="sm">{"Closet"}</Text>
            </VStack>
          </Box>
        </Link>
        <Link href={"/setting"}>
          <Box height="20" width="25" px={2}>
            <VStack gap="0">
              <IconButton aria-label="Call support" variant={"ghost"}>
                <Settings />
              </IconButton>
              <Text textStyle="sm">{"Setting"}</Text>
            </VStack>
          </Box>
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
