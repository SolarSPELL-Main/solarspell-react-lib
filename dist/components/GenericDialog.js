import { __rest } from "tslib";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/**
 * Creates a generic dialog that will call a callback on close.
 * @param props The styling and functional properties of the dialog.
 * @returns A generic dialog component.
 */
function GenericDialog(_a) {
    var { size = 'md' } = _a, props = __rest(_a, ["size"]);
    return (_jsxs(Dialog, Object.assign({}, props.additionalProps, { open: props.open, onClose: props.onClose, maxWidth: size }, { children: [props.title && _jsx(DialogTitle, { children: props.title }, void 0), (props.description || props.children) && _jsxs(DialogContent, { children: [_jsx(DialogContentText, { children: props.description }, void 0), props.children] }, void 0), _jsx(DialogActions, { children: props.actions }, void 0)] }), void 0));
}
export default GenericDialog;
