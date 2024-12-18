"use client";

import React, { useState } from 'react';
import { Box, Button, Flex, IconButton, Image } from '@chakra-ui/react';
import { Camera } from "lucide-react";


const CameraPage: React.FC = () => {
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);

  const handleYesClick = () => {
    // 写真の撮影や登録の処理を行う
    setIsPhotoTaken(true);
  };

  const handleNoClick = () => {
    // 写真の撮影をキャンセルする処理を行う
    setIsPhotoTaken(false);
  };

  return (
    <Box p={8}>
      <Flex direction="column" alignItems="center" justifyContent="center" h="100vh">
      <IconButton
              aria-label="Call support"
              variant={"ghost"}
            >
              <Camera />
          </IconButton>
        {isPhotoTaken ? (
          <Image src="/preview-image.png" alt="Preview" mb={4} />
        ) : (
          <>
            <Button colorScheme="yellow" onClick={handleYesClick} mb={2}>
              OK
            </Button>
            <Button colorScheme="gray" onClick={handleNoClick}>
              again
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default CameraPage;
