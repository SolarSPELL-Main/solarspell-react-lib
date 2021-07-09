//Importing libraries, APIs from outside the project
import React from 'react';
import Button from '@material-ui/core/Button';

//Importing functions from other files of the projects
import GenericDialog from './GenericDialog';
import { DialogButtonStyleProps } from './types';

type ButtonDialogProps = {
  open: boolean
  onClose: () => void
} & DialogButtonStyleProps

/**
 * Creates a single-button dialog that will call a callback.
 * For the purposes of viewing something or alerting the user.
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
          <Button onClick={props.onClose} color={buttonColor}>
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
