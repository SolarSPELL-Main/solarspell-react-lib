import React from 'react';
import { DataGrid, GridColDef, GridRowData, GridSelectionModelChangeParams, GridSlotsComponent, GridSlotsComponentsProps } from '@material-ui/data-grid';
declare type OtherDataGridProps = Partial<Exclude<React.ComponentProps<typeof DataGrid>, 'columns' | 'rows' | 'checkboxSelection' | 'onSelectionModelChange' | 'components' | 'componentsProps'>>;
declare type DataTableOptionalProps = {
    selectable?: boolean;
    onSelectChange?: (rows: GridSelectionModelChangeParams) => void;
    components?: GridSlotsComponent;
    componentsProps?: GridSlotsComponentsProps;
    additionalProps?: OtherDataGridProps;
};
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
export type { DataTableOptionalProps, OtherDataGridProps };
export default DataTable;
