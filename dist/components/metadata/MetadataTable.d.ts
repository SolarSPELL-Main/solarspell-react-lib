import React from 'react';
import { GridColDef, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { OtherDataGridProps } from '../DataTable';
import { BaseMetadata, BaseMetadataType } from '../../types';
declare type ComponentsDef = {
    KebabMenu?: React.JSXElementConstructor<any>;
    ActionPanel?: React.JSXElementConstructor<any>;
};
declare type ComponentsPropsDef = {
    [Component in keyof ComponentsDef]: any;
};
declare type MetadataTableOptionalProps<T extends BaseMetadataType, M extends BaseMetadata> = {
    components?: ComponentsDef;
    componentProps?: ComponentsPropsDef;
    additionalColumns?: GridColDef[];
    selectable?: boolean;
    onSelectChange?: (metadata: M[], metadataType: T, rows: GridSelectionModelChangeParams) => void;
    additionalProps?: OtherDataGridProps;
};
declare type MetadataTableProps<T extends BaseMetadataType, M extends BaseMetadata> = {
    metadataType: T;
    metadata: M[];
} & MetadataTableOptionalProps<T, M>;
/**
 * This component creates a single table for a metadata type and its members.
 * All members of the passed in metadata prop should belong to metadataType.
 * For components, the KebabMenu should accept metadataType as a property,
 * and the ActionPanel should accept metadata and metadataType as properties.
 * @param props The data and properties for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
declare function MetadataTable<T extends BaseMetadataType, M extends BaseMetadata>(props: MetadataTableProps<T, M>): React.ReactElement;
export type { MetadataTableOptionalProps };
export default MetadataTable;
