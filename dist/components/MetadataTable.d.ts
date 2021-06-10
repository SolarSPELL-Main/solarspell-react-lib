import React from 'react';
import { BaseMetadata, BaseMetadataType } from '../types';
interface MetadataTableProps {
    onEdit: (item: BaseMetadata, val: string) => void;
    onDelete: (item: BaseMetadata) => void;
    metadataType: BaseMetadataType;
    metadata: BaseMetadata[];
}
/**
 * This component creates a single table for a metadata type and its corresponding members.
 * All members of the passed in metadata prop should belong to the metadataType prop.
 * @param props The data for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
declare function MetadataTable(props: MetadataTableProps): React.ReactElement;
export default MetadataTable;
