//Importing libraries, APIs from outside the project
import React from 'react';
import Button from '@material-ui/core/Button';

//Importing functions from other files of the projects
import GenericDialog from './GenericDialog';
import { preventEventFactory, preventEvent } from '../utils';
import { DialogConfirmationStyleProps } from './types';

type ConfirmationDialogProps = {
  open: boolean
  onClose: (agreed: boolean) => void
  stopPropagation?: boolean
  preventDefault?: boolean
} & DialogConfirmationStyleProps

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
    <GenericDialog
      title={props.title}
      description={props.description}
      size={size}
      open={props.open}
      onClose={disagree}
      actions={(
        <>
          <Button
            onClick={disagree}
            color={cancelColor}
            {...props.cancelAdditionalProps}
          >
            {cancelText}
          </Button>
          <Button
            onClick={agree}
            color={confirmColor}
            {...props.confirmAdditionalProps}
          >
            {confirmText}
          </Button>
        </>
      )}
      additionalProps={{
        onClick: preventEvent(stopPropagation,preventDefault),
        onFocus: preventEvent(stopPropagation,preventDefault),
        fullWidth: true,
      }}
    >
      {props.children}
    </GenericDialog>
  );
}

export default ConfirmationDialog;
