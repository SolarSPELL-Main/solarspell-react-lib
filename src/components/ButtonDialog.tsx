import React from 'react';

import Button from '@material-ui/core/Button';

import GenericDialog from './GenericDialog';
import { DialogButtonStyleProps } from './types';

type ButtonDialogProps = {
  /** Whether the dialog is open */
  open: boolean
  /** Callback to fire on closing the dialog */
  onClose: () => void
} & DialogButtonStyleProps

/**
 * Creates a single-button dialog that will call a callback.
 * For the purposes of viewing something or alerting the user.
 * 'Single-button' means only one button is present at the bottom
 * right of the dialog, as opposed to two (like in a confirmation dialog).
 * @param props The styling and functional properties of the dialog.
 * @returns A single-button dialog component.
 */
function ButtonDialog({
  size='md',
  buttonText='Close',
  buttonColor='secondary',
  ...props
}: React.PropsWithChildren<ButtonDialogProps>): React.ReactElement {
  return (
    <GenericDialog
      title={props.title}
      description={props.description}
      size={size}
      open={props.open}
      onClose={props.onClose}
      actions={(
        <>
          <Button
            onClick={props.onClose}
            color={buttonColor}
            {...props.buttonAdditionalProps}
          >
            {buttonText}
          </Button>
        </>
      )}
      additionalProps={{
        fullWidth: true,
      }}
    >
      {props.children}
    </GenericDialog>
  );
}

export default ButtonDialog;
