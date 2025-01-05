"use client"; // Next.jsでクライアントコンポーネント指定

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
      console.log("handleClick: Loading started");
      // APIにリクエストを送信して画像URLを取得
      const response = await fetch(
        "http://localhost:5000/api/coordinate/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            request: "recommendation" // 新しいリクエストデータ
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("outfitRecommendation", JSON.stringify(data));
        setTopsImage(data["tops-image"]); // APIから取得したトップスの画像URLを設定
        setBottomsImage(data["bottoms-image"]); // APIから取得したボトムスの画像URLを設定
      } else {
        console.error("Failed to fetch recommendations");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
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
        <Box paddingTop="10px" paddingBottom="30px">
          <MessageBox clickEvent={handleClick} />
        </Box>
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
        <Box paddingTop="80px">loading</Box>
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
        ) }
      </Flex>
    );
  }
};

export default Outfits1;

