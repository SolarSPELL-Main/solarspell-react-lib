import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { GenericDialogStyleProps } from './types';

/** Main props object */
type GenericDialogProps = {
  /** Whether the dialog is open */
  open: boolean
  /** Callback to fire on dialog close */
  onClose: (e: React.SyntheticEvent) => void
  /** Controls to render in actions section of Dialog */
  actions: React.ReactElement
} & GenericDialogStyleProps

/**
 * Creates a generic dialog that will call a callback on close.
 * @param props The styling and functional properties of the dialog.
 * @returns A generic dialog component.
 */
function GenericDialog({
  size='md',
  ...props
}: React.PropsWithChildren<GenericDialogProps>): React.ReactElement {
  return (
    <Dialog
      {...props.additionalProps}
      open={props.open}
      onClose={props.onClose}
      maxWidth={size}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {(props.description || props.children) && <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        {props.children}
      </DialogContent>}
      <DialogActions>
        {props.actions}
      </DialogActions>
    </Dialog>
  );
}

export default GenericDialog;

