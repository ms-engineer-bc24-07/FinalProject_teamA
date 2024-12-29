"use client";

import { Tabs, Link, Box, SimpleGrid, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
// import testMock from "./testMock";

const Closet = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("tops");
  const [images, setImages] = useState("");
  const [items, setItems] = useState<{ categoryTag: string; name: string }[]>(
    []
  ); // カテゴリー問わずアイテム全て
  const [filteredItems, setFilteredItems] = useState<
    { categoryTag: string; name: string }[]
  >([]); // カテゴリー別に表示するアイテム
  // カテゴリー変更時に画像を更新
  useEffect(() => {
    // // APIからデータを取得する場合は以下のように置き換え
    // useEffect(() => {
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
    }, [currentCategory, items]);
    // ダミーデータを使用
    // setImages(testMock[currentCategory] || []);
  }, [currentCategory]);

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
          <Tabs.Trigger value="outer" asChild>
            <Link unstyled href="#outer">
              アウター
            </Link>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tops"></Tabs.Content>
        <Tabs.Content value="bottoms">Bottoms</Tabs.Content>
        <Tabs.Content value="outer">Outer</Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default Closet;
