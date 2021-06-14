import React from 'react';
import { MetadataTableOptionalProps } from './MetadataTable';
import { MetadataTyped, MetadataTagged } from './types';
import { BaseMetadata, BaseMetadataType } from '../types';
declare type MetadataDisplayProps<P extends MetadataTyped, V extends MetadataTagged> = {
    metadataTypes: BaseMetadataType[];
    metadata: Record<number, BaseMetadata[]>;
    tableProps?: MetadataTableOptionalProps<P, V>;
};
/**
 * This component creates multiple expandable tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed, even if metadata contains additional types.
 * @param props The data for the tables. The metadata should be organized in a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
declare function MetadataDisplay<P extends MetadataTyped, V extends MetadataTagged>(props: MetadataDisplayProps<P, V>): React.ReactElement;
export default MetadataDisplay;
