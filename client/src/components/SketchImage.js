import React, { useState} from 'react';
import axios from 'axios';
import ShowImage from './ShowImage';

const SketchImage = () => {
  const [sketchData, setSketchData] = useState('');

  const handleImageData = (data) => {
    convertToSketch(data);
  };

  const convertToSketch = async (data) => {
    console.log(data);
    const blob = await fetch(`data:image/jpeg;base64,${data}`).then(res => res.blob());
    const formData = new FormData();
    formData.append('image', blob);
  
    try {
      const response = await axios.post('/api/sketch', formData);
      console.log(response);
      setSketchData(response.data.sketch);
    } catch (error) {
      console.log(error);
      console.log('erroooroororo');
      console.log(data);
    }
  };

  return (
    <div>
      <ShowImage onClick={handleImageData} />
      <h2>Show Sketch</h2>
      <button onClick={handleImageData}>Convert to Sketch</button>
      {sketchData && <img src={`data:image/jpeg;base64,${sketchData}`} alt="Sketch" />}
    </div>
  );
};

export default SketchImage;
