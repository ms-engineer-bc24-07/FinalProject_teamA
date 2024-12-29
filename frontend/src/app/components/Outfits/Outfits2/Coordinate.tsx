// 前Outfits2の中身
import { Box, Text, Container } from "@chakra-ui/react";
import OutfitList from "./OutFitsList";
import Buttons from "./Buttons";
import { useState } from "react";

type Props = {
  topsImages?: string;
  bottomsImages?: string;
};

const Coordinate: React.FC<Props> = ({
  topsImages,
  bottomsImages,
  ...props
}) => {
  // 非同期処理でAPIデータを取得
  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const [imagesRes] = await Promise.all([
  //           fetch(imagesURL),
  //         ]);

  return (
    <Box p={4} bg="gray.50" minH="100vh">
      <Container centerContent mb={8}>
        <Text color="gray.600">今日のあなたにぴったりな服装はこれです！</Text>
      </Container>
      <Box mb={8}>
        <OutfitList />
      </Box>
      <Container centerContent>
        <Buttons />
      </Container>
    </Box>
  );
};

export default Coordinate;
