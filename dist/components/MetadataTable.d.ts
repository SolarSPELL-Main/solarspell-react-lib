import React from 'react';
import { GridColDef, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { MetadataTyped, MetadataTagged } from './types';
import { BaseMetadata, BaseMetadataType } from '../types';
declare type ComponentsDef<P extends MetadataTyped = any, V extends MetadataTagged = any> = {
    KebabMenu?: React.JSXElementConstructor<P>;
    ActionPanel?: React.JSXElementConstructor<V>;
};
declare type ComponentsPropsDef = {
    [Component in keyof ComponentsDef]: any;
};
declare type MetadataTableOptionalProps<P extends MetadataTyped, V extends MetadataTagged> = {
    components?: ComponentsDef<P, V>;
    componentProps?: ComponentsPropsDef;
    additionalColumns?: GridColDef[];
    selectable?: boolean;
    onSelectChange?: (metadata: BaseMetadata[], metadataType: BaseMetadataType, rows: GridSelectionModelChangeParams) => void;
};
declare type MetadataTableProps<P extends MetadataTyped, V extends MetadataTagged> = {
    metadataType: BaseMetadataType;
    metadata: BaseMetadata[];
} & MetadataTableOptionalProps<P, V>;
/**
 * This component creates a single table for a metadata type and its corresponding members.
 * All members of the passed in metadata prop should belong to the metadataType prop.
 * @param props The data and properties for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
declare function MetadataTable<P extends MetadataTyped, V extends MetadataTagged>(props: MetadataTableProps<P, V>): React.ReactElement;
export type { MetadataTableOptionalProps };
export default MetadataTable;
