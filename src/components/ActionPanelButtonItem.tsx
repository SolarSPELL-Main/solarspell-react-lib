import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/';

import { SvgIconComponent } from '@material-ui/icons';

interface ActionPanelButtonItemProps<T> {
  tooltip?: string
  item: T
  icon: SvgIconComponent
  func: (item: T) => void
}

const pointerStyle: React.CSSProperties = {
  cursor: 'pointer',
};

function ActionPanelButtonItem<T>(props: ActionPanelButtonItemProps<T>): React.ReactElement {
  const func = props.func.bind(null, props.item);

  return (
    <Tooltip title={props.tooltip || ''}>
      <props.icon
        style={pointerStyle}
        onClick={func}
      />
    </Tooltip>
  );
}

export default ActionPanelButtonItem;
