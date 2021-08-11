import React from 'react';
import { GridColDef, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { OtherDataGridProps } from '../DataTable';
import { BaseContent } from '../../types';
/** Optional components that can be added to the table */
declare type ComponentsDef = {
    /** The actions to display in the 'Actions' column */
    ActionPanel?: React.JSXElementConstructor<any>;
};
/** Corresponding properties to pass to optional components */
declare type ComponentsPropsDef = {
    [Component in keyof ComponentsDef]: any;
};
/** Optional customizable properties of the table */
declare type ContentTableOptionalProps<C> = {
    /** Optional components associated with the table */
    components?: ComponentsDef;
    /** Properties associated with the optional components */
    componentProps?: ComponentsPropsDef;
    /**
     * Additional columns to render in the table.
     * By default includes:
     *  Title
     *  Description
     *  Year of publication
     *  File name
     */
    additionalColumns?: GridColDef[];
    /** Whether the rows are selectable or not */
    selectable?: boolean;
    /** Callback on selection change */
    onSelectChange?: (content: C[], rows: GridSelectionModelChangeParams) => void;
    /** Just about any other props associated with a DataGrid */
    additionalProps?: OtherDataGridProps;
};
/** Main props object */
declare type ContentTableProps<C> = {
    /** The content to display in the table */
    content: C[];
} & ContentTableOptionalProps<C>;
/**
 * This component creates a single table for content.
 * The ActionPanel should take an additional content property.
 * @param props The data and properties for the table.
 * @returns A data grid displaying the content.
 */
declare function ContentTable<C extends BaseContent>(props: ContentTableProps<C>): React.ReactElement;
export type { ContentTableOptionalProps };
export default ContentTable;
