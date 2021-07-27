import React from 'react';
import Button from '@material-ui/core/Button';

import GenericDialog from './GenericDialog';
import { preventEventFactory, preventEvent } from '../utils';
import { DialogConfirmationStyleProps } from './types';

type ConfirmationDialogProps = {
  /** Whether the dialog is open or not */
  open: boolean
  /** 
   * Callback to fire on closing the dialog.
   * The agreed argument is only true when
   * the user clicks on the 'Confirm' button
   * for this component.
   */
  onClose: (agreed: boolean) => void
  /**
   * Whether to stop event propagation.
   * This and the below preventDefault properties
   * are necessary to disable a weird interaction
   * between the Dialog and other components,
   * such as the Menu.
   */
  stopPropagation?: boolean
  /** Whether to prevent default handling of events */
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
