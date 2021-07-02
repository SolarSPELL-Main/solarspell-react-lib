//Importing libraries, APIs from outside the project
import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowData,
  GridSelectionModelChangeParams,
  GridSlotsComponent,
  GridSlotsComponentsProps,
} from '@material-ui/data-grid';

// Optional selection enabling/disabling
type SelectableProps = {
  selectable?: boolean
  onSelectChange?: (rows: GridSelectionModelChangeParams) => void
  components?: GridSlotsComponent
  componentsProps?: GridSlotsComponentsProps
}

type DataTableOptionalProps = SelectableProps

// Actual component props
type DataTableProps = {
  columns: GridColDef[]
  rows: GridRowData[]
} & DataTableOptionalProps

/**
 * Boilerplate component for a DataGrid.
 * @param props The properties and data of the table.
 * @returns A DataGrid to display all data.
 */
function DataTable(props: DataTableProps): React.ReactElement {
  return (
    <DataGrid
      columns={props.columns}
      rows={props.rows}
      checkboxSelection={props.selectable}
      onSelectionModelChange={props.onSelectChange}
      components={props.components}
      componentsProps={props.componentsProps}
      autoHeight
      disableSelectionOnClick
    />
  );
}

export type { DataTableOptionalProps };
export default DataTable;
