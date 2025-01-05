"use client";

import { Tabs, Link, Box, SimpleGrid, Image, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  LuFolder,
  LuSearch,
  LuShirt,
  LuSquareCheck,
  LuUser,
} from "react-icons/lu";

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
        // alert(`Error fetching items: ${error.message}`);
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

    console.log("current category:", currentCategory);
    // console.log("Filtered Items:", filtered);
    // console.log("Selected Image URL:", image);
  }, [currentCategory, items]);

  return (
    // ゆかりんさんのコード一旦コメントオフしてます。ButtunではなくてTabを使いたいため。TODO: Tabうまくいったら消す。
    // <Box>
    //   <Box display="flex" justifyContent="center" mb={4}>
    //     <Button mr={2} onClick={() => setCurrentCategory("all")}>
    //       すべて
    //     </Button>
    //     <Button mr={2} onClick={() => setCurrentCategory("tops")}>
    //       トップス
    //     </Button>
    //     <Button onClick={() => setCurrentCategory("bottoms")}>ボトムス</Button>
    //   </Box>
    //   <SimpleGrid columns={3} gap={4}>
    //     {filteredItems.map((item, index) => (
    //       <Image
    //         key={index}
    //         src={item.imageUrl}
    //         alt={`${item.categoryTag} ${index + 1}`}
    //       />
    //     ))}
    //   </SimpleGrid>
    <Tabs.Root
      defaultValue="all"
      variant="plain"
      onValueChange={(details) => setCurrentCategory(details.value)}
    >
      <Tabs.List>
        <Tabs.Trigger value="all">
          <LuSearch />
          すべて
        </Tabs.Trigger>
        <Tabs.Trigger value="tops">
          <LuShirt />
          トップス
        </Tabs.Trigger>
        <Tabs.Trigger value="bottoms">
          <LuSquareCheck />
          ボトムス
        </Tabs.Trigger>
        <Tabs.Indicator rounded="l2" />
      </Tabs.List>
      <Tabs.Content value="all">
        <SimpleGrid columns={3} gap={4}>
          {filteredItems.map((item, index) => (
            <Image
              key={index}
              src={item.imageUrl}
              alt={`${item.categoryTag} ${index + 1}`}
            />
          ))}
        </SimpleGrid>
      </Tabs.Content>
      <Tabs.Content value="tops">
        <SimpleGrid columns={3} gap={4}>
          {filteredItems.map((item, index) => (
            <Image
              key={index}
              src={item.imageUrl}
              alt={`${item.categoryTag} ${index + 1}`}
            />
          ))}
        </SimpleGrid>
      </Tabs.Content>
      <Tabs.Content value="bottoms">
        <SimpleGrid columns={3} gap={4}>
          {filteredItems.map((item, index) => (
            <Image
              key={index}
              src={item.imageUrl}
              alt={`${item.categoryTag} ${index + 1}`}
            />
          ))}
        </SimpleGrid>
      </Tabs.Content>
    </Tabs.Root>
  );
};
export default Closet;
