"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Flex, IconButton, Image } from "@chakra-ui/react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { Link } from "@chakra-ui/react";

export default function CameraPage() {
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const initializeCamera = async () => {
      if (
        typeof navigator !== "undefined" &&
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia
      ) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing webcam: ", error);
        }
      }
    };

    initializeCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageDataUrl = canvasRef.current.toDataURL("image/png");
        setCapturedImage(imageDataUrl);
        setIsPhotoTaken(true);
      }
    }
  };

  const handleYesClick = () => {
    if (capturedImage) {
      try {
        const encodedImage = encodeURIComponent(capturedImage);
        console.log(
          `Navigating to: /registration?capturedImage=${encodedImage}`
        );
        router.push(`/registration?capturedImage=${encodedImage}`);
      } catch (error) {
        console.error("Error navigating to registration page:", error);
      }
    }
  };

  const handleNoClick = () => {
    setIsPhotoTaken(false);
    setCapturedImage(null);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Box p={8}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
      >
        <IconButton
          aria-label="Capture photo"
          variant="ghost"
          onClick={handleCapture}
        >
          <Camera />
        </IconButton>
        <video
          ref={videoRef}
          autoPlay
          style={{ width: "100%", maxWidth: "640px" }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {isPhotoTaken && capturedImage ? (
          <Image src={capturedImage} alt="Preview" mb={4} />
        ) : (
          <Link href="/registration">
            <Button colorScheme="yellow" onClick={handleYesClick} mb={2}>
              OK
            </Button>
            <Button colorScheme="gray" onClick={handleNoClick}>
              again
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
}
