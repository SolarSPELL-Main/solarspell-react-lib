import React from 'react';

interface MetadataTableProps {
  metadataTypes: SerializedMetadataType[]
  metadata: SerializedMetadata[]
}

function MetadataTable(props: MetadataTableProps): React.ReactElement {
  return (
    <h1>Hello, world!</h1>
  )
}

export default MetadataTable;
