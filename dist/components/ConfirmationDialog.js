import { __rest } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
//Importing libraries, APIs from outside the project
import React from 'react';
import Button from '@material-ui/core/Button';
//Importing functions from other files of the projects
import GenericDialog from './GenericDialog';
import { preventEventFactory, preventEvent } from '../utils';
/**
 * Creates a confirmation dialog that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A confirmation dialog component.
 */
function ConfirmationDialog(_a) {
    var { size = 'md', cancelColor = 'primary', cancelText = 'Cancel', confirmColor = 'secondary', confirmText = 'Confirm', stopPropagation = true, preventDefault = true } = _a, props = __rest(_a, ["size", "cancelColor", "cancelText", "confirmColor", "confirmText", "stopPropagation", "preventDefault"]);
    const agree = React.useCallback(preventEventFactory(() => props.onClose(true)), [props.onClose]);
    const disagree = React.useCallback(preventEventFactory(() => props.onClose(false)), [props.onClose]);
    return (_jsx(GenericDialog, Object.assign({ title: props.title, description: props.description, size: size, open: props.open, onClose: disagree, actions: (_jsxs(_Fragment, { children: [_jsx(Button, Object.assign({ onClick: disagree, color: cancelColor }, props.cancelAdditionalProps, { children: cancelText }), void 0),
                _jsx(Button, Object.assign({ onClick: agree, color: confirmColor }, props.confirmAdditionalProps, { children: confirmText }), void 0)] }, void 0)), additionalProps: {
            onClick: preventEvent(stopPropagation, preventDefault),
            onFocus: preventEvent(stopPropagation, preventDefault),
            fullWidth: true,
        } }, { children: props.children }), void 0));
}
export default ConfirmationDialog;
