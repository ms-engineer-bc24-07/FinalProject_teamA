//ホーム画面
"use client";
import { Flex, Box } from "@chakra-ui/react";
import MessageBox from "./components/Outfits/Outfits1/MessageBox";
import { useState } from "react";
import { truncateSync } from "fs";
import Coordinate from "./components/Outfits/Outfits2/Coordinate";

const Outfits1 = () => {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [image, setImage] = useState("");

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
      setImage(
        "https://www.urban-research.jp/common/images/products/detail/5/451195/2897417_base.jpg"
      ), // apiが完成したらfetchしたトップス画像を持ってくる
        setImage(
          "https://outlet.bigi.co.jp/photo/2021/B0503AFP091/z-B0503AFP091_001003-1.jpg?1659403888"
        ); // apiが完成したらfetchしたボトムス画像を持ってくる
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
        <MessageBox clickEvent={handleClick} />
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
        <Box>loading</Box>
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
        <Coordinate topsImages={image} />
      </Flex>
    );
  }
};

export default Outfits1;
