import React from 'react';
import { GridColDef, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { OtherDataGridProps } from '../DataTable';
import { BaseMetadata, BaseMetadataType } from '../../types';
/** Optional components that can be added to the table */
declare type ComponentsDef = {
    /** Kebab menu component to display in upper right of each table */
    KebabMenu?: React.JSXElementConstructor<any>;
    /** Actions to display in the Actions column of the table */
    ActionPanel?: React.JSXElementConstructor<any>;
};
/** Corresponding properties to pass to optional components */
declare type ComponentsPropsDef = {
    [Component in keyof ComponentsDef]: any;
};
/** Optional customizable properties of the table */
declare type MetadataTableOptionalProps<T extends BaseMetadataType, M extends BaseMetadata> = {
    /** Optional components associated with the component */
    components?: ComponentsDef;
    /** Props objects associated with optional components */
    componentProps?: ComponentsPropsDef;
    /**
     * Additional columns to display besides the default columns.
     * Default columns include:
     *  Metadata Name
     */
    additionalColumns?: GridColDef[];
    /** Whether the metadata rows should be selectable */
    selectable?: boolean;
    /** Callback to fire on metadata row selection */
    onSelectChange?: (metadata: M[], metadataType: T, rows: GridSelectionModelChangeParams) => void;
    /** Additional properties associated with the underlying DataGrid */
    additionalProps?: OtherDataGridProps;
};
/** Main props object */
declare type MetadataTableProps<T extends BaseMetadataType, M extends BaseMetadata> = {
    /** Metadata type associated with this table */
    metadataType: T;
    /** Metadata of one type to display in the table */
    metadata: M[];
    /** See ExpandPanel for prop description */
    mountContents?: boolean;
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
