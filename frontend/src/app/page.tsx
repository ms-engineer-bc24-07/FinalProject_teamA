//ホーム画面
import { Flex } from "@chakra-ui/react";
import MessageBox from "./components/Outfits/Outfits1/MessageBox";

const Outfits1 = () => {
  return (
    <Flex
      height="100vh" // 画面全体の高さ
      width="100%" // 横幅を全体に
      justifyContent="center" // 横方向の中央揃え
      pt="200px" // 上部の余白を設定
    >
      <MessageBox />
    </Flex>
  );
};

export default Outfits1;
