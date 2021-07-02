//Importing libraries, APIs from outside the project
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Importing functions from other files of the projects
import { preventEventFactory, preventEvent } from '../utils';
import { DialogStyleProps } from './types';

type ConfirmationDialogProps = {
  open: boolean
  onClose: (agreed: boolean) => void
  stopPropagation?: boolean
  preventDefault?: boolean
} & DialogStyleProps

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
  stopPropagation=true,
  preventDefault=true,
  ...props
}: React.PropsWithChildren<ConfirmationDialogProps>): React.ReactElement {
  const agree = React.useCallback(
    preventEventFactory(() => props.onClose(true)),
    [props.onClose],
  );
  const disagree = React.useCallback(
    preventEventFactory(() => props.onClose(false)),
    [props.onClose],
  );

  return (
    <Dialog
      open={props.open}
      onClose={disagree}
      onClick={preventEvent(stopPropagation,preventDefault)}
      onFocus={preventEvent(stopPropagation,preventDefault)}
      maxWidth={size}
      fullWidth
    >
      <DialogTitle>{props.title}</DialogTitle>
      {(props.description || props.children) && <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        {props.children}
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
