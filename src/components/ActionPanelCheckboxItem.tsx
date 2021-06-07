import React from 'react';
import ActionPanelButtonItem from './ActionPanelButtonItem';

import { SvgIconComponent } from '@material-ui/icons';

interface ActionPanelCheckboxItemProps {
  tooltip?: string
  toggle: (active: boolean, dispatch: React.Dispatch<React.SetStateAction<boolean>>) => void
  activeIcon: SvgIconComponent
  inactiveIcon: SvgIconComponent
  active?: boolean
}

/**
 * Creates a clickable icon backed with checkbox logic.
 * @param props The properties of the icon.
 * @returns A toggleable icon.
 */
function ActionPanelCheckboxItem(props: ActionPanelCheckboxItemProps): React.ReactElement {
  const [active, setActive] = React.useState(props.active ?? false);
  const toggle = React.useCallback(() => props.toggle(!active, setActive), [active, props.toggle]);

  return (
    <>
      {active ? 
        <ActionPanelButtonItem
          tooltip={props.tooltip}
          icon={props.activeIcon}
          func={toggle}
        />
        :
        <ActionPanelButtonItem
          tooltip={props.tooltip}
          icon={props.inactiveIcon}
          func={toggle}
        />
      }
    </>
  );
}

export default ActionPanelCheckboxItem;
