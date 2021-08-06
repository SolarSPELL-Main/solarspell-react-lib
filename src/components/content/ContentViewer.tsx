/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import ButtonDialog from '../ButtonDialog';
import { DialogButtonStyleProps } from '../types';
import { BaseContent, BaseMetadataType } from '../../types';

type FieldDescriptor<T> = {
  /** Title to display for the field */
  title: string
  /** Actual key of the field */
  field: keyof T
  /** How the value should be formatted */
  formatter?: (val: any) => any
  /** What to display if the value is undefined */
  defaultValue?: string
}

type ContentViewerProps<T,M> = {
  /** The content to extract fields from */
  content: T
  /** The metadata types available for contnt tags */
  metadataTypes: M[]
  /** The fields of the content to display */
  fields: FieldDescriptor<T>[]
  /** Additional styling props for the dialog itself */
  dialogStyle?: DialogButtonStyleProps
  /** Whether the dialog is open */
  open: boolean
  /** Callback to fire on closing the dialog */
  onClose: () => void
  /** How to display the file associated with the content */
  fileDisplay: {
    field: keyof T
    formatter: (val: any) => any
  }
}

/**
 * Dialog for viewing content.
 * @param props The dialog content, style, and callbacks.
 * @returns A dialog for viewing content.
 */
function ContentViewer<
  T extends BaseContent,
  M extends BaseMetadataType,
>({
  fields,
  dialogStyle,
  open,
  onClose,
  content,
  metadataTypes,
  fileDisplay,
}: ContentViewerProps<T,M>): React.ReactElement {
  return (
    <ButtonDialog
      {...dialogStyle}
      title={'View Content Item'}
      open={open}
      onClose={onClose}
    >
      <Grid container>
        <Grid item xs={4} >
          {fields.map((field, idx) => (
            <Box mb={1} key={idx}>
              <Typography variant={'h6'} >{field.title}</Typography>
              <Typography>{content[field.field] != null ?
                field.formatter ?
                  field.formatter(content[field.field])
                  :
                  content[field.field]
                :
                field.defaultValue != null ?
                  field.defaultValue
                  :
                  <i>Not Available</i>
              }</Typography>
            </Box>
          ))}
          {metadataTypes.map(type => {
            const metadata = content.metadata[type.id];
            let body;

            if (metadata && metadata.length > 0) {
              body = (
                <div>
                  {metadata.map(m => <Chip key={m.id} label={m.name} />)}
                </div>
              );
            } else {
              body = <Typography><i>No entries</i></Typography>;
            }

            return (
              <Box mb={1} key={type.id}>
                <Typography variant={'h6'}>{type.name}</Typography>
                {body}
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={8} >
          {open && fileDisplay.formatter(content[fileDisplay.field])}
        </Grid>
      </Grid>
    </ButtonDialog>
  );
}

export default ContentViewer;
