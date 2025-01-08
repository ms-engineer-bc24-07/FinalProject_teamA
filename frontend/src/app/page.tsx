// 01060820AI挿入後、AIが回答した色のアイテムが画像表示され、再検索ボタンも機能（最新成功パターン）
// あとはあけぴさんのファイルとのがっちゃんこ

"use client"; // Next.jsでクライアントコンポーネント指定

import { Flex, Box } from "@chakra-ui/react";
import MessageBox from "./components/Outfits/Outfits1/MessageBox";
import { useState } from "react";
import Coordinate from "./components/Outfits/Outfits2/Coordinate";

interface ClothingItem {
  color: string;
}

const Outfits1 = () => {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [topsImage, setTopsImage] = useState<string | null>(null);
  const [bottomsImage, setBottomsImage] = useState<string | null>(null);

  const fetchRecommendation = async () => {
    try {
      setLoading(true);
      console.log("fetchRecommendation: Loading started");

      const colors = ["white", "black", "brown", "khaki", "navy", "beige", "red", "blue", "yellow", "purple", "green", "pink"];
      const randomTop = colors[Math.floor(Math.random() * colors.length)];
      const randomBottom = colors.filter(color => color !== randomTop)[Math.floor(Math.random() * (colors.length - 1))];

      const tops: ClothingItem[] = [{ color: randomTop }];
      const bottoms: ClothingItem[] = [{ color: randomBottom }];

      // デバッグ用のログ
      console.log("Sending Data:", { tops, bottoms });

      const response = await fetch(
        "http://localhost:5000/api/coordinate/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tops: tops,
            bottoms: bottoms,
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("outfitRecommendation", JSON.stringify(data));
        setTopsImage(data["tops-image"]); // APIから取得したトップスの画像URLを設定
        setBottomsImage(data["bottoms-image"]); // APIから取得したボトムスの画像URLを設定
        
        // デバッグ用のログ
        console.log("Tops Image URL:", data["tops-image"]);
        console.log("Bottoms Image URL:", data["bottoms-image"]);
      } else {
        console.error("Failed to fetch recommendations");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      height="100vh" // 画面全体の高さ
      width="100%" // 横幅を全体に
      justifyContent="center" // 横方向の中央揃え
      pt="200px" // 上部の余白を設定
    >
      <Box paddingTop="10px" paddingBottom="30px">
        <MessageBox clickEvent={fetchRecommendation} />
      </Box>
      {loading ? (
        <Box paddingTop="80px">loading</Box>
      ) : (
        topsImage && bottomsImage && (
          <Coordinate topsImage={topsImage} bottomsImage={bottomsImage} onChangeClick={fetchRecommendation} />
        )
      )}
    </Flex>
  );
};

export default Outfits1;






// *************************************************************
// // AI挿入後、AIが回答した色のアイテムが画像表示される（成功パターン）

// "use client"; // Next.jsでクライアントコンポーネント指定

// import { Flex, Box } from "@chakra-ui/react";
// import MessageBox from "./components/Outfits/Outfits1/MessageBox";
// import { useState } from "react";
// import Coordinate from "./components/Outfits/Outfits2/Coordinate";

// interface ClothingItem {
//   color: string;
// }

// const Outfits1 = () => {
//   const [loading, setLoading] = useState<boolean | undefined>(undefined);
//   const [topsImage, setTopsImage] = useState<string | null>(null);
//   const [bottomsImage, setBottomsImage] = useState<string | null>(null);

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       console.log("handleClick: Loading started");

//       // テストデータとしてトップスとボトムスの配列を送信
//       const tops: ClothingItem[] = [{ color: "white" }];
//       const bottoms: ClothingItem[] = [{ color: "black" }];

//       // デバッグ用のログ
//       console.log("Sending Data:", { tops, bottoms });

//       // APIにリクエストを送信して画像URLを取得
//       const response = await fetch(
//         "http://localhost:5000/api/coordinate/recommend",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             tops: tops,
//             bottoms: bottoms,
//           })
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("outfitRecommendation", JSON.stringify(data));
//         setTopsImage(data["tops-image"]); // APIから取得したトップスの画像URLを設定
//         setBottomsImage(data["bottoms-image"]); // APIから取得したボトムスの画像URLを設定
        
//         // デバッグ用のログ
//         console.log("Tops Image URL:", data["tops-image"]);
//         console.log("Bottoms Image URL:", data["bottoms-image"]);
//       } else {
//         console.error("Failed to fetch recommendations");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading === undefined) {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         <Box paddingTop="10px" paddingBottom="30px">
//           <MessageBox clickEvent={handleClick} />
//         </Box>
//       </Flex>
//     );
//   } else if (loading) {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         <Box paddingTop="80px">loading</Box>
//       </Flex>
//     );
//   } else {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         {topsImage && bottomsImage && (
//           <Coordinate topsImage={topsImage} bottomsImage={bottomsImage} />
//         )}
//       </Flex>
//     );
//   }
// };

// export default Outfits1;







// // AI挿入後、画像も表示されるが白黒のハードコーディングバージョン。チェンジは機能しない

// "use client"; // Next.jsでクライアントコンポーネント指定

// import { Flex, Box } from "@chakra-ui/react";
// import MessageBox from "./components/Outfits/Outfits1/MessageBox";
// import { useState } from "react";
// import Coordinate from "./components/Outfits/Outfits2/Coordinate";

// const Outfits1 = () => {
//   const [loading, setLoading] = useState<boolean | undefined>(undefined);
//   const [topsImage, setTopsImage] = useState<string | null>(null);
//   const [bottomsImage, setBottomsImage] = useState<string | null>(null);

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       console.log("handleClick: Loading started");

//       const tops = [{ color: "white" }, { color: "blue" }];
//       const bottoms = [{ color: "black" }, { color: "khaki" }];

//       // APIにリクエストを送信して画像URLを取得
//       const response = await fetch(
//         "http://localhost:5000/api/coordinate/recommend",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             tops: tops,
//             bottoms: bottoms,
//           })
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("outfitRecommendation", JSON.stringify(data));
//         setTopsImage(data["tops-image"]); // APIから取得したトップスの画像URLを設定
//         setBottomsImage(data["bottoms-image"]); // APIから取得したボトムスの画像URLを設定
        
//         // デバッグ用のログ
//         console.log("Tops Image URL:", data["tops-image"]);
//         console.log("Bottoms Image URL:", data["bottoms-image"]);
//       } else {
//         console.error("Failed to fetch recommendations");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading === undefined) {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         <Box paddingTop="10px" paddingBottom="30px">
//           <MessageBox clickEvent={handleClick} />
//         </Box>
//       </Flex>
//     );
//   } else if (loading) {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         <Box paddingTop="80px">loading</Box>
//       </Flex>
//     );
//   } else {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         {topsImage && bottomsImage && (
//           <Coordinate topsImage={topsImage} bottomsImage={bottomsImage} />
//         )}
//       </Flex>
//     );
//   }
// };

// export default Outfits1;


// *************************************************************
// 0105コメントアウト（AI挿入前）
// "use client"; // Next.jsでクライアントコンポーネント指定

// import { Flex, Box } from "@chakra-ui/react";
// import MessageBox from "./components/Outfits/Outfits1/MessageBox";
// import { useState } from "react";
// import Coordinate from "./components/Outfits/Outfits2/Coordinate";

// const Outfits1 = () => {
//   const [loading, setLoading] = useState<boolean | undefined>(undefined);
//   const [topsImage, setTopsImage] = useState<string | null>(null);
//   const [bottomsImage, setBottomsImage] = useState<string | null>(null);

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       console.log("handleClick: Loading started");
//       // APIにリクエストを送信して画像URLを取得
//       const response = await fetch(
//         "http://localhost:5000/api/coordinate/recommend",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             request: "recommendation" // 新しいリクエストデータ
//           })
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("outfitRecommendation", JSON.stringify(data));
//         setTopsImage(data["tops-image"]); // APIから取得したトップスの画像URLを設定
//         setBottomsImage(data["bottoms-image"]); // APIから取得したボトムスの画像URLを設定
//       } else {
//         console.error("Failed to fetch recommendations");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading === undefined) {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         <Box paddingTop="10px" paddingBottom="30px">
//           <MessageBox clickEvent={handleClick} />
//         </Box>
//       </Flex>
//     );
//   } else if (loading) {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         <Box paddingTop="80px">loading</Box>
//       </Flex>
//     );
//   } else {
//     return (
//       <Flex
//         height="100vh" // 画面全体の高さ
//         width="100%" // 横幅を全体に
//         justifyContent="center" // 横方向の中央揃え
//         pt="200px" // 上部の余白を設定
//       >
//         {topsImage && bottomsImage && (
//           <Coordinate topsImage={topsImage} bottomsImage={bottomsImage} />
//         ) }
//       </Flex>
//     );
//   }
// };

// export default Outfits1;

