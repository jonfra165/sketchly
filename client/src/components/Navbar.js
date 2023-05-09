import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function NavbarComponent() {
  return (
    <Navbar bg="ligth" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={process.env.PUBLIC_URL + '/logo.svg'}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            SKETCH.LY
          </Navbar.Brand>
        </Container>
      </Navbar>
  );
}