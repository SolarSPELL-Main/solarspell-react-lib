import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/';
import ConfirmationDialog from './ConfirmationDialog';

import { SvgIconComponent } from '@material-ui/icons';

type ConfirmedProps = {
  confirmed?: false
  confirmationTitle?: never
  confirmationDescription?: never
} | {
  confirmed: true
  confirmationTitle: string
  confirmationDescription?: string
}

type ActionPanelButtonItemProps = {
  tooltip?: string
  icon: SvgIconComponent
  func: () => void
} & ConfirmedProps

const pointerStyle: React.CSSProperties = {
  cursor: 'pointer',
};

/**
 * Creates a clickable icon.
 * @param props The properties of the icon.
 * @returns A clickable icon.
 */
function ActionPanelButtonItem(props: ActionPanelButtonItemProps): React.ReactElement {
  if (props.confirmed) {
    const [dialogActive, setDialogActive] = React.useState(false);
    const onAgree = React.useCallback((agreed: boolean) => {
      if (agreed) {
        props.func();
      }
      setDialogActive(false);
    }, [props.func]);
    const openDialog = React.useCallback(() => setDialogActive(true), []);

    return (
      <>
        <Tooltip title={props.tooltip || ''}>
          <props.icon
            style={pointerStyle}
            onClick={openDialog}
          />
        </Tooltip>
        <ConfirmationDialog
          title={props.confirmationTitle}
          description={props.confirmationDescription}
          open={dialogActive}
          onClose={onAgree}
        />
      </>
    );
  } else {
    return (
      <Tooltip title={props.tooltip || ''}>
        <props.icon
          style={pointerStyle}
          onClick={props.func}
        />
      </Tooltip>
    );
  }
}

export default ActionPanelButtonItem;
