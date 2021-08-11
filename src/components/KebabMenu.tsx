import React from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

import { preventEvent, preventEventFactory } from '../utils';

/**
 * Creates a kebab icon with an associated menu.
 * @param props Currently only consists of the child KebabMenuItems to display.
 * @returns A kebab icon with an associated menu.
 */
function KebabMenu(
  props: React.PropsWithChildren<unknown>
): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  // Anchor el ref element needed for pop-up menu to function properly
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const onClick = React.useCallback(preventEventFactory(e => {
    setOpen(true);
    setAnchorEl(e.currentTarget as SVGSVGElement);
  }), []);
  const onClose = React.useCallback(
    preventEventFactory(() => setOpen(false)),
    [],
  );

  return (
    <>
      <MoreVertIcon
        onClick={onClick}
        onFocus={preventEvent()}
      />
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
      >
        {props.children}
      </Menu>
    </>
  );
}

export default KebabMenu;
