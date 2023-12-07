import React, { useState } from "react";
import axios from "axios";

const Testing4 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=29ece6b8b3a3a74d990e6534dd31ece7",
      formData
    );

    setImageUrl(response.data.data.url);
    console.log("Uploaded Image URL:", response.data.data.url);
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded Image" />
          <p>Uploaded Image URL (copied to console): {imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default Testing4;
