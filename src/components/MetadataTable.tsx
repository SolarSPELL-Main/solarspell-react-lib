import React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import ActionPanel from './ActionPanel';
import ActionPanelButtonItem from './ActionPanelButtonItem';
import { Edit, Delete } from '@material-ui/icons';

import { BaseMetadata, BaseMetadataType } from '../types';

interface MetadataTableProps {
  onEdit: (item: BaseMetadata) => void
  onDelete: (item: BaseMetadata) => void
  metadataType: BaseMetadataType
  metadata: BaseMetadata[]
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
        const metadata = params.row as BaseMetadata;

        return (
          <ActionPanel>
            <ActionPanelButtonItem
              tooltip={'Edit'}
              icon={Edit}
              func={() => props.onEdit(metadata)}
            />
            <ActionPanelButtonItem
              tooltip={'Delete'}
              icon={Delete}
              func={() => props.onDelete(metadata)}
              confirmed
              confirmationTitle={`Delete Metadata item ${metadata.name} of type ${props.metadataType.name}?`}
              confirmationDescription={'WARNING: Deleting a metadata will also delete each of that metadata on every content and is irreversible.'}
            />
          </ActionPanel>
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
