import React from 'react';
import MetadataTable from './MetadataTable';

import { BaseMetadata, BaseMetadataType } from '../types';

interface MetadataDisplayProps {
  onEdit: (item: BaseMetadata, val: string) => void
  onDelete: (item: BaseMetadata) => void
  onAdd: (type: BaseMetadataType, val: string) => void
  onEditType: (type: BaseMetadataType, val: string) => void
  onDeleteType: (type: BaseMetadataType) => void
  onDownload: (type: BaseMetadataType) => void
  metadataTypes: BaseMetadataType[]
  metadata: Record<number, BaseMetadata[]>
}

/**
 * This component creates multiple expandable tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed, even if metadata contains additional types.
 * @param props The data for the tables. The metadata should be organized in a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
function MetadataDisplay(props: MetadataDisplayProps): React.ReactElement {
  return (
    <>
      {props.metadataTypes.map(metadataType => {
        return (
          <MetadataTable
            key={metadataType.id}
            metadataType={metadataType}
            metadata={props.metadata[metadataType.id]}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
            onAdd={props.onAdd}
            onEditType={props.onEditType}
            onDeleteType={props.onDeleteType}
            onDownload={props.onDownload}
          />
        );
      })}
    </>
  );
}

export default MetadataDisplay;
