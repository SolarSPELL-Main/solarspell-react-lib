import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { preventEventFactory, preventEvent } from '../utils';

import { PropTypes } from '@material-ui/core';
import { DialogWidth } from './types';

interface TextInputDialogProps {
  open: boolean
  onClose: (input: string) => void
  title: string
  description?: string
  label: string
  submitText?: string
  submitColor?: PropTypes.Color
  cancelText?: string
  cancelColor?: PropTypes.Color
  size?: DialogWidth
}

/**
 * Creates a dialog with a text input box that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A text input dialog component.
 */
function TextInputDialog({
  size='xs',
  cancelColor='secondary',
  cancelText='Cancel',
  submitColor='primary',
  submitText='Confirm',
  ...props
}: TextInputDialogProps): React.ReactElement {
  const [input, setInput] = React.useState('');
  const submit = React.useCallback(preventEventFactory(() => {
    props.onClose(input);
    setInput('');
  }), [input, props.onClose]);
  const cancel = React.useCallback(preventEventFactory(() => {
    props.onClose('');
    setInput('');
  }), [props.onClose]);

  return (
    <Dialog
      open={props.open}
      onClose={cancel}
      onClick={preventEvent()}
      onFocus={preventEvent()}
      maxWidth={size}
      fullWidth
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        {props.description && <DialogContentText>{props.description}</DialogContentText>}
        <TextField
          fullWidth
          autoFocus
          margin={'dense'}
          label={props.label}
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
          onKeyDown={preventEvent(true, false)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color={cancelColor}>
          {cancelText}
        </Button>
        <Button onClick={submit} color={submitColor}>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TextInputDialog;
