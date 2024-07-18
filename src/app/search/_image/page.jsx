"use client";
import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';


const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState(null);

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    // Convert the File object to a Blob URL
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);

    // Recognize text from the image
    await recognizeTextFromImage(imageUrl);
  };

  const recognizeTextFromImage = async (imageUrl) => {
    try {
      const result = await Tesseract.recognize(imageUrl);
      setRecognizedText(result.data.text);
    } catch (error) {
      console.error("Failed to recognize text:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
      {recognizedText && <p>{recognizedText}</p>}
    </div>
  );
};

export default ImageUploader;
