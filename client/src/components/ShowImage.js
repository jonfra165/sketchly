import React, { useState, useEffect } from 'react';

function ShowImage() {
    
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch('/show-image')
      .then(response => response.json())
      .then(data => {
        console.log(data.image); // Log the base64-encoded image data
        setImage(data.image);
      })
      .catch(error => console.error(error));
  }, []);



  return (
    <>
      {image ? <img src={`data:image/png;base64,${image}`} alt="Image" /> : null}
    </>
    

  );
}

export default ShowImage;
