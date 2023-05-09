import React from 'react';
import Navbar from './components/Navbar';
import ShowImage from './components/ShowImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <ShowImage />
        </Row>
      </Container>
    </>
  );
}

export default App;