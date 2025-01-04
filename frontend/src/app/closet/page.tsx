"use client";

import { Box, Button, SimpleGrid, Image } from "@chakra-ui/react";
import { Tabs, Link, Box, SimpleGrid, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Closet = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [items, setItems] = useState<
    { categoryTag: string; imageUrl: string }[]
  >([]);
  const [filteredItems, setFilteredItems] = useState<
    { categoryTag: string; imageUrl: string }[]
  >([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/closet/items");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        alert(`Error fetching items: ${error.message}`);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (currentCategory === "all") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        (item) => item.categoryTag === currentCategory
      );
      setFilteredItems(filtered);
    }
    // // ここでカテゴリーに基づいて画像を変更
    // if (currentCategory === "tops") {
    //   setImage("https://item-shopping.c.yimg.jp/i/n/t-shirtstore_cbtyxh500101"); // apiが完成したらfetchしたトップス画像を持ってくる
    // } else if (currentCategory === "bottoms") {
    //   setImage(
    //     "https://image.plst.com/PL/ST3/jp/imagesgoods/706719/item/jpgoods_38_706719.jpg" // apiが完成したらfetchしたボトムス画像を持ってくる
    //   );
    // }

    console.log("current category:", currentCategory);
    console.log("Filtered Items:", filtered);
    console.log("Selected Image URL:", image);
  }, [currentCategory, items]);

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Button mr={2} onClick={() => setCurrentCategory("all")}>
          すべて
        </Button>
        <Button mr={2} onClick={() => setCurrentCategory("tops")}>
          トップス
        </Button>
        <Button onClick={() => setCurrentCategory("bottoms")}>ボトムス</Button>
      </Box>
      <SimpleGrid columns={3} gap={4}>
        {filteredItems.map((item, index) => (
          <Image
            key={index}
            src={item.imageUrl}
            alt={`${item.categoryTag} ${index + 1}`}
          />
        ))}
      </SimpleGrid>
      <Tabs.Root
        defaultValue="tops"
        onValueChange={(details) => setCurrentCategory(details.value)}
      >
        <Tabs.List>
          {/* ゆかりんさんへ:"allItems" は仮で入れただけなので、良いように修正お願いします。 */}
          <Tabs.Trigger value="allItems" asChild>
            <Link unstyled href="#allItems">
              すべて
            </Link>
          </Tabs.Trigger>
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
        <Tabs.Content value="allItems">
          <Image src={image} alt="AllItems" />
        </Tabs.Content>
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
