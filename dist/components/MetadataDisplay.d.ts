import React from "react";
import { BaseMetadata, BaseMetadataType } from '../types';
interface MetadataDisplayProps {
    onEdit: (item: BaseMetadata, val: string) => void;
    onDelete: (item: BaseMetadata) => void;
    metadataTypes: BaseMetadataType[];
    metadata: Record<number, BaseMetadata[]>;
}
/**
 * This component creates multiple expandable tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed, even if metadata contains additional types.
 * @param props The data for the tables. The metadata should be organized in a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
declare function MetadataDisplay(props: MetadataDisplayProps): React.ReactElement;
export default MetadataDisplay;
