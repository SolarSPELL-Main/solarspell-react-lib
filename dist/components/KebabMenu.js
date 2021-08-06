import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import { preventEvent, preventEventFactory } from '../utils';
/**
 * Creates a kebab icon with an associated menu.
 * @param props Currently only consists of the child KebabMenuItems to display.
 * @returns A kebab icon with an associated menu.
 */
function KebabMenu(props) {
    const [open, setOpen] = React.useState(false);
    // Anchor el ref element needed for pop-up menu to function properly
    const [anchorEl, setAnchorEl] = React.useState(null);
    const onClick = React.useCallback(preventEventFactory(e => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
    }), []);
    const onClose = React.useCallback(preventEventFactory(() => setOpen(false)), []);
    return (_jsxs(_Fragment, { children: [_jsx(MoreVertIcon, { onClick: onClick, onFocus: preventEvent() }, void 0), _jsx(Menu, Object.assign({ open: open, anchorEl: anchorEl, onClose: onClose }, { children: props.children }), void 0)] }, void 0));
}
export default KebabMenu;
