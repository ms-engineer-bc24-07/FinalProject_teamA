//ホーム画面
"use client";
import { Flex, Box } from "@chakra-ui/react";
import MessageBox from "./components/Outfits/Outfits1/MessageBox";
import { useState } from "react";
import Coordinate from "./components/Outfits/Outfits2/Coordinate";

const Outfits1 = () => {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [topsImage, setTopsImage] = useState<string | null>(null);
  const [bottomsImage, setBottomsImage] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setLoading(true);
      // TODO apiが完成したら繋げる
      // const response = await fetch(
      //   "http://localhost:5000/api/coordinate/recommend",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );

      // if (response.ok) {
      //   const data = await response.json();
      //   localStorage.setItem("outfitRecommendation", JSON.stringify(data));
      //   setLoading(false);
      // } else {
      //   console.error("Failed to fetch recommendations");
      // }
      setLoading(false);
      setTopsImage("photo/002GreenTshirt.png"); // apiが完成したらfetchしたトップス画像を持ってくる
      setBottomsImage("photo/005BlackJeans.png"); // apiが完成したらfetchしたボトムス画像を持ってくる
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  if (loading === undefined) {
    return (
      <Flex
        height="100vh" // 画面全体の高さ
        width="100%" // 横幅を全体に
        justifyContent="center" // 横方向の中央揃え
        pt="200px" // 上部の余白を設定
      >
        {loading === undefined && (
          <Box paddingTop="10px" paddingBottom="30px">
            <MessageBox clickEvent={handleClick} />
          </Box>
        )}
      </Flex>
    );
  } else if (loading) {
    return (
      <Flex
        height="100vh" // 画面全体の高さ
        width="100%" // 横幅を全体に
        justifyContent="center" // 横方向の中央揃え
        pt="200px" // 上部の余白を設定
      >
        {loading && <Box paddingTop="80px">loading</Box>}
      </Flex>
    );
  } else {
    return (
      <Flex
        height="100vh" // 画面全体の高さ
        width="100%" // 横幅を全体に
        justifyContent="center" // 横方向の中央揃え
        pt="200px" // 上部の余白を設定
      >
        {topsImage && bottomsImage && (
          <Coordinate topsImage={topsImage} bottomsImage={bottomsImage} />
        )}
      </Flex>
    );
  }
};

export default Outfits1;
