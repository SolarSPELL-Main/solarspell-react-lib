import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/';
import ConfirmationDialog from './ConfirmationDialog';
import TextInputDialog from './TextInputDialog';

import { SvgIconComponent } from '@material-ui/icons';

type BaseProps = {
  tooltip?: string
  icon: SvgIconComponent
  onAction: () => void
}

type ConfirmProps = {
  type: 'confirm'
  confirmationTitle: string
  confirmationDescription?: string
} & BaseProps

type TextInputProps = {
  type: 'text_input'
  textInputTitle: string
  textInputDescription?: string
  textInputLabel: string
  onAction: (input: string) => void
} & Omit<BaseProps, 'onAction'>

type ButtonProps = {
  type: 'button'
} & BaseProps

type ToggleProps = {
  type: 'toggle'
  tooltip?: string
  toggle: (active: boolean, dispatch: React.Dispatch<React.SetStateAction<boolean>>) => void
  activeIcon: SvgIconComponent
  inactiveIcon: SvgIconComponent
  active?: boolean
}

type ActionPanelItemProps = ConfirmProps | TextInputProps | ButtonProps | ToggleProps

const pointerStyle: React.CSSProperties = {
  cursor: 'pointer',
};

/**
 * Creates a clickable icon for a variety of different use cases.
 * @param props The properties of the icon.
 * @returns A clickable icon.
 */
function ActionPanelItem(props: ActionPanelItemProps): React.ReactElement {
  switch (props.type) {
    case 'button': {
      return (
        <Tooltip title={props.tooltip || ''}>
          <props.icon
            style={pointerStyle}
            onClick={props.onAction}
          />
        </Tooltip>
      );
    }
    case 'toggle': {
      const [active, setActive] = React.useState(props.active ?? false);
      const toggle = React.useCallback(() => props.toggle(!active, setActive), [active, props.toggle]);

      return (
        <ActionPanelItem
          type={'button'}
          tooltip={props.tooltip}
          icon={active ? props.activeIcon : props.inactiveIcon}
          onAction={toggle}
        />
      );
    }
    case 'confirm': {
      const [confirmationDialogActive, setConfirmationDialogActive] = React.useState(false);
      const onAgree = React.useCallback((agreed: boolean) => {
        if (agreed) {
          props.onAction();
        }
        setConfirmationDialogActive(false);
      }, [props.onAction]);
      const openConfirmationDialog = React.useCallback(() => setConfirmationDialogActive(true), []);

      return (
        <>
          <ActionPanelItem
            type={'button'}
            tooltip={props.tooltip}
            icon={props.icon}
            onAction={openConfirmationDialog}
          />
          <ConfirmationDialog
            title={props.confirmationTitle}
            description={props.confirmationDescription}
            open={confirmationDialogActive}
            onClose={onAgree}
          />
        </>
      );
    }
    case 'text_input': {
      const [textInputDialogActive, setTextInputDialogActive] = React.useState(false);
      const onSubmit = React.useCallback((val: string) => {
        if (val) {
          props.onAction(val);
        }
        setTextInputDialogActive(false);
      }, [props.onAction]);
      const openTextInputDialog = React.useCallback(() => setTextInputDialogActive(true), []);

      return (
        <>
          <ActionPanelItem
            type={'button'}
            tooltip={props.tooltip}
            icon={props.icon}
            onAction={openTextInputDialog}
          />
          <TextInputDialog
            title={props.textInputTitle}
            description={props.textInputDescription}
            label={props.textInputLabel}
            open={textInputDialogActive}
            onClose={onSubmit}
          />
        </>
      );
    }
  }
}

export default ActionPanelItem;
