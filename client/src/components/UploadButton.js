import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function UploadButtons() {
    const [imageUrl, setImageUrl] = useState(null);
  
    function handleImageUpload(event) {
    
        console.log(event.target.files[0])
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        console.log(formData);
        axios.post('http://127.0.0.1:5000/api/upload_image', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
            
        })
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
    <>
    <input type="file" name="file" onChange={handleImageUpload} />
    {imageUrl && (
  <img
    src={imageUrl}
    alt="uploaded image"
    style={{ maxWidth: "100%", maxHeight: "100%" }}
  />
)}
    </>

  );
}
