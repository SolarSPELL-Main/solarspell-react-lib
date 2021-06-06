import React from 'react';
import MetadataTable from './MetadataTable';

interface MetadataDisplayProps {
  metadataTypes: BaseMetadataType[]
  metadata: Record<string, BaseMetadata[]>
}

/**
 * This component creates multiple expandable tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed, even if metadata contains additional types.
 * @param props The data for the tables.
 * @returns A series of expandable panels containing the metadata in tables.
 */
const MetadataDisplay = (props: MetadataDisplayProps) => <>
        {props.metadataTypes.map(metadataType => {
            return (<MetadataTable metadataType={metadataType} metadata={props.metadata[metadataType.name]} />);
        })}
    </>

export default MetadataDisplay;
