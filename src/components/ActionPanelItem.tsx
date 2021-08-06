import React from 'react';

import Tooltip from '@material-ui/core/Tooltip/';
import { SvgIconComponent } from '@material-ui/icons';

import ConfirmationDialog from './ConfirmationDialog';
import TextInputDialog from './TextInputDialog';
import { CustomizableActionProps } from './types';

type BaseProps = {
  /** Tooltip to display on hovering over the icon */
  tooltip?: string
  /** Icon to associate with the action */
  icon: SvgIconComponent
  /** Callback to fire on clicking the icon */
  onAction: () => void
}

// Special prop for allowing a toggleable action
type ToggleProps = {
  /** Specifies that the icon should be toggleable on/off */
  type: 'toggle'
  /** Tooltip to display on hovering over the icon */
  tooltip?: string
  /** 
   * Callback to fire on toggling the icon.
   * Note that the active argument is the future
   * state of the component (inverted current state).
   * Additionally, the dispatch is included as
   * an argument to allow the option to actually
   * toggle the component or not. It must be used
   * in the callback for the state to change.
   */
  toggle: (
    active: boolean,
    dispatch: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void
  /** Icon to display when active */
  activeIcon: SvgIconComponent
  /** Icon to display when inactive */
  inactiveIcon: SvgIconComponent
  /** Whether the component is initially active or not (default false) */
  active?: boolean
}

type ActionPanelItemProps = CustomizableActionProps<BaseProps> | ToggleProps

// Forces the mouse to change to a pointer on hover
const pointerStyle: React.CSSProperties = {
  cursor: 'pointer',
};

/**
 * Creates a clickable icon for a variety of different use cases.
 * @param props The properties of the icon.
 * @returns A clickable icon.
 */
function ActionPanelItem(props: ActionPanelItemProps): React.ReactElement {
  if (props.type === 'button') {
    return (
      <Tooltip title={props.tooltip || ''}>
        <props.icon
          style={pointerStyle}
          onClick={props.onAction}
        />
      </Tooltip>
    );
  } else if (props.type === 'toggle') {
    const [active, setActive] = React.useState(props.active ?? false);
    const toggle = React.useCallback(
      () => props.toggle(!active, setActive),
      [active, props.toggle]
    );

    return (
      <ActionPanelItem
        type={'button'}
        tooltip={props.tooltip}
        icon={active ? props.activeIcon : props.inactiveIcon}
        onAction={toggle}
      />
    );
  } else if (props.type === 'confirm') {
    const [
      confirmationDialogActive,
      setConfirmationDialogActive,
    ] = React.useState(false);
    const onAgree = React.useCallback(
      (agreed: boolean) => {
        if (agreed) {
          props.onAction();
        }
        setConfirmationDialogActive(false);
      },
      [props.onAction]
    );
    const openConfirmationDialog = React.useCallback(
      () => setConfirmationDialogActive(true),
      [],
    );

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
          confirmText={props.confirmButtonText}
          confirmColor={props.confirmButtonColor}
          cancelText={props.cancelButtonText}
          cancelColor={props.cancelButtonColor}
          size={props.confirmationSize}
        />
      </>
    );
  } else if (props.type === 'text_input') {
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
          confirmText={props.submitButtonText}
          confirmColor={props.submitButtonColor}
          cancelText={props.cancelButtonText}
          cancelColor={props.cancelButtonColor}
          size={props.textInputSize}
          defaultValue={props.textInputDefaultValue}
          allowEnter={props.allowEnter}
        />
      </>
    );
  } else {
    throw Error('Invalid type');
  }
}

export default ActionPanelItem;
