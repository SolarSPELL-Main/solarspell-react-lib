import React from 'react';
import { GridColDef, GridRowData, GridSelectionModelChangeParams, GridSlotsComponent, GridSlotsComponentsProps } from '@material-ui/data-grid';
declare type SelectableProps = {
    selectable?: boolean;
    onSelectChange?: (rows: GridSelectionModelChangeParams) => void;
    components?: GridSlotsComponent;
    componentsProps?: GridSlotsComponentsProps;
};
declare type DataTableOptionalProps = SelectableProps;
declare type DataTableProps = {
    columns: GridColDef[];
    rows: GridRowData[];
} & DataTableOptionalProps;
/**
 * Boilerplate component for a DataGrid.
 * @param props The properties and data of the table.
 * @returns A DataGrid to display all data.
 */
declare function DataTable(props: DataTableProps): React.ReactElement;
export type { DataTableOptionalProps };
export default DataTable;
