import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

const ClosetPage = () => {
  // 仮のサンプルデータ
  const items = [
    { type: 'tops', image: '/white-tshirt.png', title: 'White T-Shirt' },
    { type: 'bottoms', image: '/blue-jeans.png', title: 'Blue Jeans' },
    { type: 'outerwear', image: '/brown-hoodie.png', title: 'Brown Hoodie' },
  ];

  return (
    <Box p={8}>
      <Heading mb={6}>My Closet</Heading>
      <Flex flexWrap="wrap" gap={6}>
        {items.map((item, index) => (
          <Box key={index} w="200px">
            <Image src={item.image} alt={item.title} mb={2} />
            <Text fontWeight="bold">{item.title}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default ClosetPage;