import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import ConfirmationDialog from './ConfirmationDialog';
import TextInputDialog from './TextInputDialog';
import { preventEventFactory } from '../utils';
import { CustomizableActionProps } from './types';

type BaseProps = {
  /** Text to display in MenuItem */
  label: string
  /** Callback to fire on click */
  onAction: () => void
}

type KebabMenuItemProps = CustomizableActionProps<BaseProps>

/**
 * Creates a clickable menu item for a variety of different use cases.
 * @param props The properties of the menu item.
 * @returns A clickable menu item.
 */
function KebabMenuItem(props: KebabMenuItemProps): React.ReactElement {
  switch (props.type) {
    case 'button': {
      const onClick = React.useCallback(
        preventEventFactory(props.onAction),
        [props.onAction],
      );

      return (
        <MenuItem onClick={onClick}>{props.label}</MenuItem>
      );
    }
    case 'confirm': {
      const [
        confirmationDialogActive,
        setConfirmationDialogActive,
      ] = React.useState(false);
      const onAgree = React.useCallback((agreed: boolean) => {
        if (agreed) {
          props.onAction();
        }
        setConfirmationDialogActive(false);
      }, [props.onAction]);
      const openConfirmationDialog = React.useCallback(
        () => setConfirmationDialogActive(true),
        [],
      );

      return (
        <>
          <KebabMenuItem
            type={'button'}
            label={props.label}
            onAction={openConfirmationDialog}
          />
          <ConfirmationDialog
            title={props.confirmationTitle}
            description={props.confirmationDescription}
            open={confirmationDialogActive}
            onClose={onAgree}
            confirmText={props.confirmButtonText}
            confirmColor={props.confirmButtonColor}
            cancelText={props.cancelButtonText}
            cancelColor={props.cancelButtonColor}
            size={props.confirmationSize}
          />
        </>
      );
    }
    case 'text_input': {
      const [
        textInputDialogActive,
        setTextInputDialogActive,
      ] = React.useState(false);
      const onSubmit = React.useCallback((val: string) => {
        if (val) {
          props.onAction(val);
        }
        setTextInputDialogActive(false);
      }, [props.onAction]);
      const openTextInputDialog = React.useCallback(
        () => setTextInputDialogActive(true),
        [],
      );

      return (
        <>
          <KebabMenuItem
            type={'button'}
            label={props.label}
            onAction={openTextInputDialog}
          />
          <TextInputDialog
            title={props.textInputTitle}
            description={props.textInputDescription}
            label={props.textInputLabel}
            open={textInputDialogActive}
            onClose={onSubmit}
            confirmText={props.submitButtonText}
            confirmColor={props.submitButtonColor}
            cancelText={props.cancelButtonText}
            cancelColor={props.cancelButtonColor}
            size={props.textInputSize}
            allowEnter={props.allowEnter}
            defaultValue={props.textInputDefaultValue}
          />
        </>
      );
    }
  }
}

// Ref arg seems to be unused for now
// Ref forwarding necessary for use in MUI Menu
// Otherwise, throws an error
const ForwardedKebabMenuItem = React.forwardRef(
  (props: KebabMenuItemProps, _ref) => {
    return (
      <KebabMenuItem
        {...props}
      />
    );
  }
);

export default ForwardedKebabMenuItem;
