import React from 'react';
import TextField from '@material-ui/core/TextField';

import ConfirmationDialog from './ConfirmationDialog';
import { DialogConfirmationStyleProps } from './types';

type TextInputDialogProps = {
  /** Whether the dialog is open */
  open: boolean
  /** 
   * Callback to fire on closing the dialog.
   * Note, the string is the empty string if
   * the dialog is not closed using the textfield
   * or clicking the submit button.
   */
  onClose: (input: string) => void
  /** Label to display for the textfield */
  label: string
  /** Whether to stop propagation of events */
  stopPropagation?: boolean
  /** Whether to prevent default handling of events */
  preventDefault?: boolean
  /** Initial value of the textfield */
  defaultValue?: string
  /** Whether to allow pressing 'enter' to submit the textfield */
  allowEnter?: boolean
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
  const [input, setInput] = React.useState(props.defaultValue ?? '');

  // On open, set input value to props default value
  React.useEffect(() => {
    if (props.open) {
      setInput(props.defaultValue ?? '');
    }
  }, [props.open]);

  const onClose = React.useCallback((accepted: boolean) => {
    if (accepted) {
      props.onClose(input);
    } else {
      props.onClose('');
    }
    setInput(props.defaultValue ?? '');
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
        onKeyDown={e => {
          if (props.allowEnter && e.key === 'Enter') {
            onClose(true);
            e.preventDefault();
          }

          e.stopPropagation();
        }}
      />
    </ConfirmationDialog>
  );
}

export default TextInputDialog;
