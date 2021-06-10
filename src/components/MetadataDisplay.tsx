import React from 'react';
import MetadataTable, { MetadataTableMenuProps } from './MetadataTable';

import { MetadataTyped, MetadataTagged } from './types';
import { BaseMetadata, BaseMetadataType } from '../types';

type MetadataDisplayProps<P extends MetadataTyped, V extends MetadataTagged> = {
  metadataTypes: BaseMetadataType[]
  metadata: Record<number, BaseMetadata[]>
  tableActionProps?: MetadataTableMenuProps<P,V>
}

/**
 * This component creates multiple expandable tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed, even if metadata contains additional types.
 * @param props The data for the tables. The metadata should be organized in a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
function MetadataDisplay<P extends MetadataTyped, V extends MetadataTagged>(props: MetadataDisplayProps<P,V>): React.ReactElement {
  return (
    <>
      {props.metadataTypes.map(metadataType => {
        return (
          <MetadataTable
            key={metadataType.id}
            metadataType={metadataType}
            metadata={props.metadata[metadataType.id]}
            {...props.tableActionProps}
          />
        );
      })}
    </>
  );
}

export default MetadataDisplay;
