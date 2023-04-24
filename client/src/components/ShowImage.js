import React, { useState } from 'react';
import axios from 'axios';

const ShowImage = () => {
  const [imageData, setImageData] = useState('');
  const [sketchData, setSketchData] = useState('');

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
  const convertToSketch = async () => {
    const blob = await fetch(`data:image/jpeg;base64,${imageData}`).then(res => res.blob());
    const formData = new FormData();
    formData.append('image', blob);
  
    try {
      const response = await axios.post('/api/sketch', formData);
      console.log(response);
      setSketchData(response.data.sketch);
    } catch (error) {
      console.log(error);
      console.log('erroooroororo');
      console.log(imageData);
    }
  };

  return (
    <div>
      <h2>Show Image</h2>
      <input type="file" onChange={handleImageUpload} />
      {imageData && <img src={`data:image/jpeg;base64,${imageData}`} alt="Uploaded" />}
      <button onClick={convertToSketch}>Convert to Sketch</button>
      {sketchData && <img src={`data:image/jpeg;base64,${sketchData}`} alt="Sketch" />}

      
    </div>
  );
};

export default ShowImage;