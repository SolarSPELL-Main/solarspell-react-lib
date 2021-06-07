import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ConfirmationDialogProps {
  open: boolean
  onClose: (agreed: boolean) => void
  title: string
  description?: string
}

function ConfirmationDialog(props: ConfirmationDialogProps): React.ReactElement {
  const agree = React.useCallback(() => props.onClose(true), [props.onClose]);
  const disagree = React.useCallback(() => props.onClose(false), [props.onClose]);

  return (
    <Dialog
      open={props.open}
      onClose={disagree}
    >
      <DialogTitle>{props.title}</DialogTitle>
      {props.description && <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>}
      <DialogActions>
        <Button onClick={disagree} color='primary'>
          No
        </Button>
        <Button onClick={agree} color='primary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
