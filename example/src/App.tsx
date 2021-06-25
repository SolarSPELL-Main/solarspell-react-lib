import React from 'react';
import './App.css';
import MockMetadataDisplay from './MockMetadataDisplay';
import MockActionPanel from './MockActionPanel';
import MockTagger from './MockTagger';
import MockContentModal from './MockContentModal';

function App(): React.ReactElement {
  return (
    <>
      <MockMetadataDisplay />
      <MockActionPanel />
      <MockTagger />
      <MockContentModal />
    </>
  );
}

export default App;
