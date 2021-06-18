import React from 'react';
import './App.css';
import MockMetadataDisplay from './MockMetadataDisplay';
import MockActionPanel from './MockActionPanel';
import MockTagger from './MockTagger';

function App(): React.ReactElement {
  return (
    <>
      <MockMetadataDisplay />
      <MockActionPanel />
      <MockTagger />
    </>
  );
}

export default App;
