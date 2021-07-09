/* eslint-disable @typescript-eslint/no-explicit-any */

//Importing from outside the project
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

//Importing from other files of the projects
import ButtonDialog from '../ButtonDialog';
import { DialogButtonStyleProps } from '../types';
import { BaseContent, BaseMetadataType } from '../../types';

type ItemDescriptor<T> = {
  title: string
  field: keyof T
  displayer?: (val: any) => any
  defaultValue?: string
}

type ContentViewerProps<T,M> = {
  content: T
  metadataTypes: M[]
  items: ItemDescriptor<T>[]
  dialogStyle?: DialogButtonStyleProps
  open: boolean
  onClose: () => void
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
  items,
  dialogStyle,
  open,
  onClose,
  content,
  metadataTypes,
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
          {items.map((item, idx) => (
            <Box mb={1} key={idx}>
              <Typography variant={'h6'} >{item.title}</Typography>
              <Typography>{content[item.field] != null ?
                item.displayer ?
                  item.displayer(content[item.field])
                  :
                  content[item.field]
                :
                item.defaultValue != null ?
                  item.defaultValue
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
              body = <Typography>No entries</Typography>;
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
          {open && <object

          />}
        </Grid>
      </Grid>
    </ButtonDialog>
  );
}

export default ContentViewer;
