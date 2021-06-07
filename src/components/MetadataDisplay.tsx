import React from 'react';
import MetadataTable from './MetadataTable';

import { BaseMetadata, BaseMetadataType } from '../types';

interface MetadataDisplayProps {
  onEdit: (item: BaseMetadata) => void
  onDelete: (item: BaseMetadata) => void
  metadataTypes: BaseMetadataType[]
  metadata: Record<string, BaseMetadata[]>
}

/**
 * This component creates multiple expandable tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed, even if metadata contains additional types.
 * @param props The data for the tables.
 * @returns A series of expandable panels containing the metadata in tables.
 */
function MetadataDisplay(props: MetadataDisplayProps): React.ReactElement {
  return (
    <>
      {props.metadataTypes.map(metadataType => {
        return (
          <MetadataTable
            metadataType={metadataType}
            metadata={props.metadata[metadataType.name]}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        );
      })}
    </>
  );
}

export default MetadataDisplay;
