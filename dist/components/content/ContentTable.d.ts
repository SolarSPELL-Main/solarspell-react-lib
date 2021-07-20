import React from 'react';
import { GridColDef, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { OtherDataGridProps } from '../DataTable';
import { BaseContent } from '../../types';
declare type ComponentsDef = {
    ActionPanel?: React.JSXElementConstructor<any>;
};
declare type ComponentsPropsDef = {
    [Component in keyof ComponentsDef]: any;
};
declare type ContentTableOptionalProps<C> = {
    components?: ComponentsDef;
    componentProps?: ComponentsPropsDef;
    additionalColumns?: GridColDef[];
    selectable?: boolean;
    onSelectChange?: (content: C[], rows: GridSelectionModelChangeParams) => void;
    additionalProps?: OtherDataGridProps;
};
declare type ContentTableProps<C> = {
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
