import React from 'react';
import { MetadataTableOptionalProps } from './MetadataTable';
import { BaseMetadata, BaseMetadataType } from '../../types';
declare type MetadataDisplayProps<T extends BaseMetadataType, M extends BaseMetadata> = {
    metadataTypes: T[];
    metadata: Record<number, M[]>;
    tableProps?: MetadataTableOptionalProps<T, M>;
};
/**
 * This component creates multiple tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed.
 * @param props The data for the tables. The metadata should be a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
declare function MetadataDisplay<T extends BaseMetadataType, M extends BaseMetadata>(props: MetadataDisplayProps<T, M>): React.ReactElement;
export default MetadataDisplay;
