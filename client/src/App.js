import React from 'react';
import ShowImage from './components/ShowImage';
import Navbar from './components/Navbar';
import UploadButton from './components/UploadButton';

function App() {
  return (
    <div>
        <Navbar />
        <ShowImage />
        <UploadButton />
    </div>
  );
}

export default App;
