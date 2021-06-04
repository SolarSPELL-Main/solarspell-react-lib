import React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import ActionPanelButtonItem from './ActionPanelButtonItem';
import { Edit, Delete } from '@material-ui/icons';

interface MetadataTableProps {
  metadataType: SerializedMetadataType
  metadata: SerializedMetadata[]
  onEdit: (item: SerializedMetadata) => void
  onDelete: (item: SerializedMetadata) => void
}

const accordionHeaderStyle: React.CSSProperties = {
  fontWeight: 600,
};

/**
 * This component creates a single table for a metadata type and its corresponding members.
 * All members of the passed in metadata prop should belong to the metadataType prop.
 * @param props The data for the table.
 * @returns An expandable panel containing the metadata in a table.
 */
function MetadataTable(props: MetadataTableProps): React.ReactElement {
  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <ActionPanelButtonItem
              tooltip={'Edit'}
              item={params.row as SerializedMetadata}
              icon={Edit}
              func={props.onEdit}
            />
            <ActionPanelButtonItem
              tooltip={'Delete'}
              item={params.row as SerializedMetadata}
              icon={Delete}
              func={props.onDelete}
            />
          </>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Metadata Name',
      flex: 1,
    },
  ];

  return (
    <Accordion>
      <AccordionSummary>
        <Typography style={accordionHeaderStyle}>{props.metadataType.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid columns={columns} rows={props.metadata} autoHeight />
      </AccordionDetails>
    </Accordion>
  );
}

export default MetadataTable;
