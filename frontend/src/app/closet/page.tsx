"use client";

import { Box, Button, SimpleGrid, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Closet = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [items, setItems] = useState<{ categoryTag: string; imageUrl: string }[]>([]); 
  const [filteredItems, setFilteredItems] = useState<{ categoryTag: string; imageUrl: string }[]>([]);

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
  }, [currentCategory, items]);

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Button mr={2} onClick={() => setCurrentCategory("all")}>すべて</Button>
        <Button mr={2} onClick={() => setCurrentCategory("tops")}>トップス</Button>
        <Button onClick={() => setCurrentCategory("bottoms")}>ボトムス</Button>
      </Box>
      <SimpleGrid columns={3} gap={4}>
        {filteredItems.map((item, index) => (
          <Image key={index} src={item.imageUrl} alt={`${item.categoryTag} ${index + 1}`} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Closet;



