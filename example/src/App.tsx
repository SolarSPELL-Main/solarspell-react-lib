import React from 'react';
import './App.css';
import MockMetadataDisplay from './MockMetadataDisplay';
import MockActionPanel from './MockActionPanel';
import MockTagger from './MockTagger';
import MockAddContentModal from './MockAddContentModal';
import MockContentTable from './MockContentTable';
import MockContentSearch from './MockContentSearch';
import MockContentViewer from './MockContentViewer';

function App(): React.ReactElement {
  return (
    <>
      <MockMetadataDisplay />
      <MockActionPanel />
      <MockTagger />
      <MockAddContentModal />
      <MockContentSearch />
      <MockContentViewer />
      <MockContentTable />
    </>
  );
}

export default App;
