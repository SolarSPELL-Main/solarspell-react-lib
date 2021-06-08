import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { preventEventFactory } from '../utils';

import { PropTypes } from '@material-ui/core';
import { DialogWidth } from './types';

interface ConfirmationDialogProps {
  open: boolean
  onClose: (agreed: boolean) => void
  title: string
  description?: string
  confirmText?: string
  confirmColor?: PropTypes.Color
  cancelText?: string
  cancelColor?: PropTypes.Color
  size?: DialogWidth
}

/**
 * Creates a confirmation dialog that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A confirmation dialog component.
 */
function ConfirmationDialog({
  size='md',
  cancelColor='primary',
  cancelText='Cancel',
  confirmColor='secondary',
  confirmText='Confirm',
  ...props
}: ConfirmationDialogProps): React.ReactElement {
  const agree = React.useCallback(preventEventFactory(() => props.onClose(true)), [props.onClose]);
  const disagree = React.useCallback(preventEventFactory(() => props.onClose(false)), [props.onClose]);

  return (
    <Dialog
      open={props.open}
      onClose={disagree}
      maxWidth={size}
      fullWidth
    >
      <DialogTitle>{props.title}</DialogTitle>
      {props.description && <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>}
      <DialogActions>
        <Button onClick={disagree} color={cancelColor}>
          {cancelText}
        </Button>
        <Button onClick={agree} color={confirmColor}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
