import React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { MetadataTyped, MetadataTagged } from './types';
import { BaseMetadata, BaseMetadataType } from '../types';

type ComponentsDef<P extends MetadataTyped = any, V extends MetadataTagged = any> = {
  KebabMenu?: React.JSXElementConstructor<P>
  ActionPanel?: React.JSXElementConstructor<V>
}

type ComponentsPropsDef = {
  [Component in keyof ComponentsDef]: any
}

type MetadataTableMenuProps<P extends MetadataTyped, V extends MetadataTagged> = {
  components?: ComponentsDef<P,V>
  componentProps?: ComponentsPropsDef
  additionalColumns?: GridColDef[]
}

type MetadataTableProps<P extends MetadataTyped, V extends MetadataTagged> = {
  metadataType: BaseMetadataType
  metadata: BaseMetadata[]
} & MetadataTableMenuProps<P,V>

const accordionHeaderStyle: React.CSSProperties = {
  fontWeight: 600,
};

/**
 * This component creates a single table for a metadata type and its corresponding members.
 * All members of the passed in metadata prop should belong to the metadataType prop.
 * @param props The data for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
function MetadataTable<P extends MetadataTyped, V extends MetadataTagged>(props: MetadataTableProps<P,V>): React.ReactElement {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Metadata Name',
      flex: 1,
      disableColumnMenu: true,
    },
    ...props.additionalColumns ?? []
  ];

  // Add Actions column only if ActionPanel component specified
  // Prioritizes Actions column, Name column, followed by custom columns
  if (props.components?.ActionPanel) {
    const ActionPanel = props.components.ActionPanel;
    const ActionPanelProps = props.componentProps?.ActionPanel;

    columns.unshift({
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const metadata = params.row as BaseMetadata;

        return (
          <ActionPanel {...ActionPanelProps} metadata={metadata} metadataType={props.metadataType} />
        );
      },
    });
  }

  return (
    <Accordion>
      <AccordionSummary>
        <Grid container>
          <Grid item xs={6} style={{ textAlign: 'left' }}>
            <Typography style={accordionHeaderStyle}>{props.metadataType.name}</Typography>
          </Grid>
          {props.components?.KebabMenu && <Grid item xs={6} style={{ textAlign: 'right' }}>
            <props.components.KebabMenu {...props.componentProps?.KebabMenu} metadataType={props.metadataType} />
          </Grid>}
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid columns={columns} rows={props.metadata} autoHeight rowsPerPageOptions={[10, 25, 50]} />
      </AccordionDetails>
    </Accordion>
  );
}

export type { MetadataTableMenuProps };
export default MetadataTable;
