/// <reference types="react" />
interface MetadataDisplayProps {
    metadataTypes: BaseMetadataType[];
    metadata: Record<string, BaseMetadata[]>;
}
/**
 * This component creates multiple expandable tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed, even if metadata contains additional types.
 * @param props The data for the tables.
 * @returns A series of expandable panels containing the metadata in tables.
 */
declare const MetadataDisplay: (props: MetadataDisplayProps) => JSX.Element;
export default MetadataDisplay;
