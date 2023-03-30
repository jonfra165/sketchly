import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import axios from 'axios';


export default function UploadButtons() {
    const [imageUrl, setImageUrl] = useState(null);
  
    function handleImageUpload(event) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      axios.post('http://127.0.0.1:5000/api/upload_image', formData)
        .then(response => {
            console.log(response);
          setImageUrl(response.data.url); // set the image URL to the state
          // handle success
        })
        .catch(error => {
            console.log("ERROR")
            console.log(error);
          // handle error
        });
    }
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" onChange={handleImageUpload} multiple type="file" />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
      <input type="file" onChange={handleImageUpload} />
        {imageUrl && (
        <img src={imageUrl} alt="uploaded image" />
        )}
    </Stack>
  );
}
