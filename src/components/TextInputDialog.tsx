import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface TextInputDialogProps {
  open: boolean
  onClose: (input: string) => void
  title: string
  description?: string
  label: string
}

function TextInputDialog(props: TextInputDialogProps): React.ReactElement {
  const [input, setInput] = React.useState('');
  const submit = React.useCallback(() => props.onClose(input), [input, props.onClose]);
  const cancel = React.useCallback(() => props.onClose(''), [props.onClose]);

  return (
    <Dialog
      open={props.open}
      onClose={cancel}
      maxWidth={'xs'}
      fullWidth
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        {props.description && <DialogContentText>{props.description}</DialogContentText>}
        <TextField
          fullWidth
          margin={'dense'}
          label={props.label}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color='secondary'>
          Cancel
        </Button>
        <Button onClick={submit} color='primary'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TextInputDialog;
