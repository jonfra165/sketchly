import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


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
    }
  };

  return (
    <div> 
    <Card sx={{
  maxWidth: 1/2,
  margin: "0 auto",
  padding: "0.1em",
  display: 'flex',
  flexDirection: 'column'
}}>
  {imageData && <CardMedia
    sx={{ height: 300, objectFit: 'contain' }}
    component="img"
    image={`data:image/jpeg;base64,${imageData}`}
    title="Uploaded"
  />}
  <input type="file" onChange={handleImageUpload} />
</Card>

      <Card sx={{ maxWidth: 1/2,
  margin: "0 auto",
  padding: "0.1em",
  display: 'flex',
  flexDirection: 'column'}}>          
      {sketchData && <CardMedia
          sx={{ height: 300, objectFit: 'contain' }}
          component="img"
          image={`data:image/jpeg;base64,${sketchData}`}
          title="Sketch"
        />}

      </Card>
      <button onClick={convertToSketch}>Convert to Sketch</button>
    </div>
    

  );
};

export default ShowImage;