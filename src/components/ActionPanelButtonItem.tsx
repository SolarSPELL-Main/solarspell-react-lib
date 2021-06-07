import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/';

import { SvgIconComponent } from '@material-ui/icons';

interface ActionPanelButtonItemProps {
  tooltip?: string
  icon: SvgIconComponent
  func: () => void
}

const pointerStyle: React.CSSProperties = {
  cursor: 'pointer',
};

/**
 * Creates a clickable icon.
 * @param props The properties of the icon.
 * @returns A clickable icon.
 */
function ActionPanelButtonItem(props: ActionPanelButtonItemProps): React.ReactElement {
  return (
    <Tooltip title={props.tooltip || ''}>
      <props.icon
        style={pointerStyle}
        onClick={props.func}
      />
    </Tooltip>
  );
}

export default ActionPanelButtonItem;
