// // 202501031224コメントアウトしました

"use client";

import { Tabs, Link, Box, SimpleGrid, Image } from "@chakra-ui/react";
import { image } from "framer-motion/client";
import { useState, useEffect } from "react";

const Closet = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("tops");
  const [image, setImage] = useState<string>("");
  const [items, setItems] = useState<{ categoryTag: string; name: string }[]>(
    []
  ); // カテゴリー問わずアイテム全て
  const [filteredItems, setFilteredItems] = useState<
    { categoryTag: string; name: string }[]
  >([]); // カテゴリー別に表示するアイテム

  // TODO api完成したら繋げる。カテゴリー変更時に画像を更新
  // useEffect(() => {
  //   // APIからデータを取得する場合
  //   fetch("/api/items")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setItems(data.items);
  //     })
  //     .catch((error) => console.error("Error fetching items:", error));
  // }, []);

  // カテゴリーが変更されたときにフィルタリング
  useEffect(() => {
    const filtered = items.filter(
      (item) => item.categoryTag === currentCategory
    );
    setFilteredItems(filtered);

    // ここでカテゴリーに基づいて画像を変更
    setImage("https://item-shopping.c.yimg.jp/i/n/t-shirtstore_cbtyxh500101"),
      // apiが完成したらfetchしたトップス画像を持ってくる
      setImage(
        "https://image.plst.com/PL/ST3/jp/imagesgoods/706719/item/jpgoods_38_706719.jpg"
      ); // apiが完成したらfetchしたボトムス画像を持ってくる
  }, [currentCategory, items]);

  return (
    <Box>
      <Tabs.Root defaultValue="tops">
        <Tabs.List>
          <Tabs.Trigger value="tops" asChild>
            <Link unstyled href="#tops">
              トップス
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="bottoms" asChild>
            <Link unstyled href="#bottoms">
              ボトムス
            </Link>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tops">
          <Image src={image} alt="Tops" />
        </Tabs.Content>
        <Tabs.Content value="bottoms">
          <Image src={image} alt="Bottoms" />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default Closet;

// // registrationで画像データをS3にアップロードし、アップロード完了後に closet ページにリダイレクトするロジックを追加し、
// // closet ページでクエリパラメータから画像URLを受け取り、その画像を表示するようにします。
// "use client";

// import { Tabs, Link, Box, Image } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router"; // useRouterフックを使用

// const Closet: React.FC = () => {
//   const [currentCategory, setCurrentCategory] = useState<string>("tops");
//   const [image, setImage] = useState<string>("");
//   const [items, setItems] = useState<{ categoryTag: string; name: string }[]>([]); // カテゴリー問わずアイテム全て
//   const [filteredItems, setFilteredItems] = useState<{ categoryTag: string; name: string }[]>([]); // カテゴリー別に表示するアイテム
//   const router = useRouter(); // useRouterフックを使用

//   useEffect(() => {
//     const { query } = router;
//     if (query.imageUrl) {
//       setImage(query.imageUrl as string);
//     }
//   }, [router]);

//   useEffect(() => {
//     const filtered = items.filter((item) => item.categoryTag === currentCategory);
//     setFilteredItems(filtered);
//   }, [currentCategory, items]);

//   return (
//     <Box>
//       <Tabs.Root defaultValue="tops">
//         <Tabs.List>
//           <Tabs.Trigger value="tops" asChild>
//             <Link unstyled href="#tops">
//               トップス
//             </Link>
//           </Tabs.Trigger>
//           <Tabs.Trigger value="bottoms" asChild>
//             <Link unstyled href="#bottoms">
//               ボトムス
//             </Link>
//           </Tabs.Trigger>
//         </Tabs.List>
//         <Tabs.Content value="tops">
//           <Image src={image} alt="Tops" />
//         </Tabs.Content>
//         <Tabs.Content value="bottoms">
//           <Image src={image} alt="Bottoms" />
//         </Tabs.Content>
//       </Tabs.Root>
//     </Box>
//   );
// };

// export default Closet;
