import { DataGrid, GridColDef, GridRowData, GridSelectionModelChangeParams, GridSlotsComponent, GridSlotsComponentsProps } from '@material-ui/data-grid';
import React from 'react';
/** Excludes props of DataGrid that are covered by other props */
declare type OtherDataGridProps = Partial<Exclude<React.ComponentProps<typeof DataGrid>, 'columns' | 'rows' | 'checkboxSelection' | 'onSelectionModelChange' | 'components' | 'componentsProps'>>;
/** Any optional props */
declare type DataTableOptionalProps = {
    /** Whether the rows of the DataGrid should be selectable */
    selectable?: boolean;
    /** Callback to fire on selecting rows */
    onSelectChange?: (rows: GridSelectionModelChangeParams) => void;
    /** Additional optional components associated with the DataGrid */
    components?: GridSlotsComponent;
    /** Props objects associated with the optional components */
    componentsProps?: GridSlotsComponentsProps;
    /** Any other props of the DataGrid */
    additionalProps?: OtherDataGridProps;
    paginationProps?: any;
};
/** Main props object */
declare type DataTableProps = {
    /** Columns to display in the DataGrid */
    columns: GridColDef[];
    /** Rows to display in the DataGrid */
    rows: GridRowData[];
} & DataTableOptionalProps;
/**
 * Boilerplate component for a DataGrid.
 * @param props The properties and data of the table.
 * @returns A DataGrid to display all data.
 */
declare function DataTable(props: DataTableProps): React.ReactElement;
export type { DataTableOptionalProps, OtherDataGridProps };
export default DataTable;
