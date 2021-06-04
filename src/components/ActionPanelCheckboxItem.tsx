import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/';

import { SvgIconComponent } from '@material-ui/icons';

interface ActionPanelCheckboxItemProps<T> {
  tooltip?: string
  item: T
  toggle: (item: T, active: boolean, dispatch: React.Dispatch<React.SetStateAction<boolean>>) => void
  activeIcon: SvgIconComponent
  inactiveIcon: SvgIconComponent
  active?: boolean
}

const pointerStyle: React.CSSProperties = {
  cursor: 'pointer',
};

/**
 * Creates a clickable icon backed with checkbox logic.
 * @param props The properties of the icon.
 * @returns A toggleable icon.
 */
function ActionPanelCheckboxItem<T>(props: ActionPanelCheckboxItemProps<T>): React.ReactElement {
  const [active, setActive] = React.useState(props.active ?? false);
  const activate = props.toggle.bind(null, props.item, true, setActive);
  const deactivate = props.toggle.bind(null, props.item, false, setActive);

  return (
    <Tooltip title={props.tooltip || ''}>
      {active ?
        <props.activeIcon
          style={pointerStyle}
          onClick={deactivate}
        />
        :
        <props.inactiveIcon
          style={pointerStyle}
          onClick={activate}
        />
      }
    </Tooltip>
  );
}

export default ActionPanelCheckboxItem;
