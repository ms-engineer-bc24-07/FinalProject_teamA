// 01060819CoordinateコンポーネントでonChangeClickプロパティを受け取り、Buttonsコンポーネントに渡します。
"use client";

import { Box, Text, Container } from "@chakra-ui/react";
import OutfitsList from "./OutFitsList";
import Buttons from "./Buttons";

type Props = {
  topsImage?: string;
  bottomsImage?: string;
  onChangeClick: () => void;
};

const Coordinate: React.FC<Props> = ({ topsImage, bottomsImage, onChangeClick }) => {
  return (
    <Box paddingTop="100px" p={2} bg="gray.50" minH="100vh">
      <Container centerContent mb={16}>
        <Text color="gray.600">今日のあなたにぴったりな服装はこれです！</Text>
      </Container>
      <Box mb={8}>
        {/* プロパティを渡す */}
        <OutfitsList topsImage={topsImage} bottomsImage={bottomsImage} />
      </Box>
      <Container centerContent>
        <Buttons onChangeClick={onChangeClick} />
      </Container>
    </Box>
  );
};

export default Coordinate;


// *******************************************************
// // 前Outfits2の中身
// "use client";

// import { Box, Text, Container } from "@chakra-ui/react";
// import OutfitsList from "./OutFitsList";
// import { useEffect } from "react";

// import Buttons from "./Buttons";

// type Props = {
//   topsImage?: string;
//   bottomsImage?: string;
// };

// const Coordinate: React.FC<Props> = ({ topsImage, bottomsImage, ...props }) => {
//   // TODO: 非同期処理でAPIデータを取得
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const [imagesRes] = await Promise.all([fetch(imagesURL)]);
//   //     } catch (error) {
//   //       console.error("Error fetching data: ", error);
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);

//   return (
//     <Box paddingTop="100px" p={2} bg="gray.50" minH="100vh">
//       <Container centerContent mb={16}>
//         <Text color="gray.600">今日のあなたにぴったりな服装はこれです！</Text>
//       </Container>
//       <Box mb={8}>
//         {/* プロパティを渡す */}
//         <OutfitsList topsImage={topsImage} bottomsImage={bottomsImage} />
//       </Box>
//       <Container centerContent>
//         <Buttons />
//       </Container>
//     </Box>
//   );
// };

// export default Coordinate;
