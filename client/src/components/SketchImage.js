import React, { useState} from 'react';
import axios from 'axios';

const ShowSketch = ({ imageData }) => {
  const [sketchData, setSketchData] = useState('');

  const convertToSketch = async () => {
    const blob = await fetch(`data:image/jpeg;base64,${imageData}`).then(res => res.blob());
    const formData = new FormData();
    formData.append('image', blob);
  
    try {
      const response = await axios.post('/api/sketch', formData);
      setSketchData(response.data.sketch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Show Sketch</h2>
      <button onClick={convertToSketch}>Convert to Sketch</button>
      {sketchData && <img src={`data:image/jpeg;base64,${sketchData}`} alt="Sketch" />}
    </div>
  );
};

export default ShowSketch;
