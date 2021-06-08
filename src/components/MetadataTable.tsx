import React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import KebabMenu from './KebabMenu';
import KebabMenuItem from './KebabMenuItem';
import ActionPanel from './ActionPanel';
import ActionPanelItem from './ActionPanelItem';
import { Edit, Delete } from '@material-ui/icons';

import { BaseMetadata, BaseMetadataType } from '../types';

interface MetadataTableProps {
  onEdit: (item: BaseMetadata, val: string) => void
  onDelete: (item: BaseMetadata) => void
  onAdd: (type: BaseMetadataType, val: string) => void
  onEditType: (type: BaseMetadataType, val: string) => void
  onDeleteType: (type: BaseMetadataType) => void
  onDownload: (type: BaseMetadataType) => void
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
  const onAdd = React.useCallback(props.onAdd.bind(null, props.metadataType), [props.onAdd, props.metadataType]);
  const onEditType = React.useCallback(props.onEditType.bind(null, props.metadataType), [props.onAdd, props.metadataType]);
  const onDeleteType = React.useCallback((confirmation: string) => {
    if (confirmation === props.metadataType.name) {
      props.onDeleteType(props.metadataType);
    }
  }, [props.onDeleteType, props.metadataType]);
  const onDownload = React.useCallback(props.onDownload.bind(null, props.metadataType), [props.onDownload, props.metadataType]);

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const metadata = params.row as BaseMetadata;

        return (
          <ActionPanel>
            <ActionPanelItem
              type={'text_input'}
              tooltip={'Edit'}
              icon={Edit}
              onAction={(val: string) => props.onEdit(metadata, val)}
              textInputTitle={`Edit Metadata ${metadata.name}`}
              textInputLabel={'Metadata Name'}
            />
            <ActionPanelItem
              type={'confirm'}
              tooltip={'Delete'}
              icon={Delete}
              onAction={() => props.onDelete(metadata)}
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
      disableColumnMenu: true,
    },
  ];

  return (
    <Accordion>
      <AccordionSummary>
        <Grid container>
          <Grid item xs={6} style={{ textAlign: 'left' }}>
            <Typography style={accordionHeaderStyle}>{props.metadataType.name}</Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <KebabMenu>
              <KebabMenuItem
                type={'text_input'}
                label={'Add Metadata'}
                onAction={onAdd}
                textInputTitle={`Create a new Metadata of type ${props.metadataType.name}`}
                textInputLabel={'Metadata Name'}
                submitButtonText={'Create'}
              />
              <KebabMenuItem
                type={'text_input'}
                label={'Edit Metadata Type'}
                onAction={onEditType}
                textInputTitle={`Edit Metadata Type ${props.metadataType.name}`}
                textInputLabel={'Metadata Type Name'}
                textInputSize={'xs'}
              />
              <KebabMenuItem
                type={'text_input'}
                label={'Delete Metadata Type'}
                onAction={onDeleteType}
                textInputTitle={`Delete Metadata Type ${props.metadataType.name}`}
                textInputDescription={`WARNING: Deleting a metadata type will also delete all metadata of that type and is irreversible. Enter "${props.metadataType.name}" to confirm deletion`}
                textInputLabel={`Enter "${props.metadataType.name}" here to confirm deletion`}
                submitButtonColor={'secondary'}
                cancelButtonColor={'primary'}
                textInputSize={'md'}
              />
              <KebabMenuItem
                type={'button'}
                label={'Download Spreadsheet'}
                onAction={onDownload}
              />
            </KebabMenu>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid columns={columns} rows={props.metadata} autoHeight />
      </AccordionDetails>
    </Accordion>
  );
}

export default MetadataTable;
