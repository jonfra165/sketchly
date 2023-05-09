import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


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
  useEffect(() => {
    if (imageData) {
      convertToSketch();
    }
  }, [imageData]);

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
    <>
      <Col d-flex>
        <Card style={{ width: '18rem' }}>
          {imageData && (
          <Card.Img variant="top" src={`data:image/jpeg;base64,${imageData}`} />)}
          <Card.Body>
            <Card.Title>Originalbild</Card.Title>
            <Card.Text>
              Här visas originalbilden för att kunna jämföra den med skissen.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: '18rem' }}>
          {sketchData && (
          <Card.Img variant="top" src={`data:image/jpeg;base64,${sketchData}`} />)}
          <Card.Body>
            <Card.Title>Skiss</Card.Title>
            <Card.Text>
              Här visas bilden som en skiss med hjälp av funktionalitet från OpenCV.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <input type="file" className="mt-5" onChange={handleImageUpload} />
    </>
  );
};

export default ShowImage;