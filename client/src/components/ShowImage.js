import React, { useState } from 'react';
import axios from 'axios';

const ShowImage = () => {
  const [imageData, setImageData] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData);
      setImageData(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Show Image</h2>
      <input type="file" onChange={handleImageUpload} />
      {imageData && <img src={`data:image/jpeg;base64,${imageData}`} alt="Uploaded" />}
    </div>
  );
};

export default ShowImage;