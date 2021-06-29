import React from 'react';
import './App.css';
import MockMetadataDisplay from './MockMetadataDisplay';
import MockActionPanel from './MockActionPanel';
import MockTagger from './MockTagger';
import MockAddContentModal from './MockAddContentModal';
import MockContentTable from './MockContentTable';

function App(): React.ReactElement {
  return (
    <>
      <MockMetadataDisplay />
      <MockActionPanel />
      <MockTagger />
      <MockAddContentModal />
      <MockContentTable />
    </>
  );
}

export default App;
