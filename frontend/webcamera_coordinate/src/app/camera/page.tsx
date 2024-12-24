'use client'

import React, { useRef, useState, useEffect } from 'react';
import './styles.css';  // スタイルファイルをインポート

const CameraPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const initializeCamera = async () => {
            if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageDataUrl = canvasRef.current.toDataURL('image/png');
                setCapturedImage(imageDataUrl);
                setShowConfirmation(true);
            }
        }
    };

    const handleSave = async () => {
        if (capturedImage) {
            const fileName = prompt("Please enter a file name:", "capture");
            if (fileName) {
                const response = await fetch('/api/saveImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imageData: capturedImage, fileName }),
                });
                const result = await response.json();
                if (result.success) {
                    alert('Image saved successfully');
                    setShowConfirmation(false);
                    setCapturedImage(null);
                } else {
                    alert('Failed to save image');
                }
            }
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setCapturedImage(null);
    };

    if (!isClient) {
        return null; // または適切なローディング表示
    }

    return (
        <div className="camera-page">
            <h1>WebCamera Page</h1>
            <button className="capture-button" onClick={handleCapture}>撮影</button>
            <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '640px' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {showConfirmation && (
                <div>
                    <h2>Confirm Capture</h2>
                    <img src={capturedImage!} alt="Captured" style={{ width: '100%', maxWidth: '640px' }} />
                    <button className="save-button" onClick={handleSave}>保存</button>
                    <button className="cancel-button" onClick={handleCancel}>キャンセル</button>
                </div>
            )}
        </div>
    );
};

export default CameraPage;
