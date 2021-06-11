import React from 'react';
import { DataGrid, GridColDef, GridRowData, GridSelectionModelChangeParams } from '@material-ui/data-grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Optional selection enabling/disabling
type SelectableProps = {
  selectable?: boolean
  onSelectChange?: (rows: GridSelectionModelChangeParams) => void
}

type DataTableOptionalProps = SelectableProps

// Actual component props
type DataTableProps = {
  header: string
  headerMenu?: React.ReactElement
  columns: GridColDef[]
  rows: GridRowData[]
} & DataTableOptionalProps

const accordionHeaderStyle: React.CSSProperties = {
  fontWeight: 600,
};

/**
 * This component creates a single table nested in an accordion to display data.
 * @param props The properties and data of the table.
 * @returns An expandable panel containing the data in a table.
 */
function DataTable(props: DataTableProps): React.ReactElement {
  return (
    <Accordion>
      <AccordionSummary>
        <Grid container>
          <Grid item xs={6} style={{ textAlign: 'left' }}>
            <Typography style={accordionHeaderStyle}>{props.header}</Typography>
          </Grid>
          {props.headerMenu && <Grid item xs={6} style={{ textAlign: 'right' }}>
            {props.headerMenu}
          </Grid>}
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid
          columns={props.columns}
          rows={props.rows}
          autoHeight
          checkboxSelection={props.selectable}
          onSelectionModelChange={props.onSelectChange}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export type { DataTableOptionalProps };
export default DataTable;
