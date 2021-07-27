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

type OtherDataGridProps = Partial<
  Exclude<
    React.ComponentProps<typeof DataGrid>,
    'columns'|'rows'|'checkboxSelection'|'onSelectionModelChange'|
    'components'|'componentsProps'
  >
>

// Any optional props
type DataTableOptionalProps = {
  selectable?: boolean
  onSelectChange?: (rows: GridSelectionModelChangeParams) => void
  components?: GridSlotsComponent
  componentsProps?: GridSlotsComponentsProps
  additionalProps?: OtherDataGridProps
}

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
      autoHeight
      disableSelectionOnClick
      columns={props.columns}
      rows={props.rows}
      checkboxSelection={props.selectable}
      onSelectionModelChange={props.onSelectChange}
      components={props.components}
      componentsProps={props.componentsProps}
      {...props.additionalProps}
    />
  );
}

export type { DataTableOptionalProps, OtherDataGridProps };
export default DataTable;
