//Importing libraries, APIs from outside the project
import React from 'react';
import TextField from '@material-ui/core/TextField';

//Importing functions from other files of the projects
import ConfirmationDialog from './ConfirmationDialog';
import { preventEvent } from '../utils';
import { DialogConfirmationStyleProps } from './types';

type TextInputDialogProps = {
  open: boolean
  onClose: (input: string) => void
  label: string
  stopPropagation?: boolean
  preventDefault?: boolean
} & DialogConfirmationStyleProps

/**
 * Creates a dialog with a text input box that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A text input dialog component.
 */
function TextInputDialog({
  size='xs',
  cancelColor='secondary',
  cancelText='Cancel',
  confirmColor='primary',
  confirmText='Confirm',
  stopPropagation=true,
  preventDefault=true,
  ...props
}: TextInputDialogProps): React.ReactElement {
  const [input, setInput] = React.useState('');
  const onClose = React.useCallback((accepted: boolean) => {
    if (accepted) {
      props.onClose(input);
    } else {
      props.onClose('');
    }
    setInput('');
  }, [input, props.onClose]);

  return (
    <ConfirmationDialog
      open={props.open}
      title={props.title}
      description={props.description}
      size={size}
      cancelColor={cancelColor}
      cancelText={cancelText}
      confirmColor={confirmColor}
      confirmText={confirmText}
      onClose={onClose}
      stopPropagation={stopPropagation}
      preventDefault={preventDefault}
      cancelAdditionalProps={props.cancelAdditionalProps}
      confirmAdditionalProps={props.confirmAdditionalProps}
    >
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
    </ConfirmationDialog>
  );
}

export default TextInputDialog;
