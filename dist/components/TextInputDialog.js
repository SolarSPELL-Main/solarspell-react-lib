import { __rest } from "tslib";

import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';

import TextField from '@material-ui/core/TextField';

import ConfirmationDialog from './ConfirmationDialog';

/**
 * Creates a dialog with a text input box that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A text input dialog component.
 */
function TextInputDialog(_a) {
    var _b;
    var { size = 'xs', cancelColor = 'secondary', cancelText = 'Cancel', confirmColor = 'primary', confirmText = 'Confirm', stopPropagation = true, preventDefault = true } = _a, props = __rest(_a, ["size", "cancelColor", "cancelText", "confirmColor", "confirmText", "stopPropagation", "preventDefault"]);
    const [input, setInput] = React.useState((_b = props.defaultValue) !== null && _b !== void 0 ? _b : '');
    // On open, set input value to props default value
    React.useEffect(() => {
        var _a;
        if (props.open) {
            setInput((_a = props.defaultValue) !== null && _a !== void 0 ? _a : '');
        }
    }, [props.open]);
    const onClose = React.useCallback((accepted) => {
        var _a;
        if (accepted) {
            props.onClose(input);
        }
        else {
            props.onClose('');
        }
        setInput((_a = props.defaultValue) !== null && _a !== void 0 ? _a : '');
    }, [input, props.onClose]);
    return (_jsx(ConfirmationDialog, Object.assign({ open: props.open, title: props.title, description: props.description, size: size, cancelColor: cancelColor, cancelText: cancelText, confirmColor: confirmColor, confirmText: confirmText, onClose: onClose, stopPropagation: stopPropagation, preventDefault: preventDefault, cancelAdditionalProps: props.cancelAdditionalProps, confirmAdditionalProps: props.confirmAdditionalProps }, { children: _jsx(TextField, { fullWidth: true, autoFocus: true, margin: 'dense', label: props.label, value: input, onChange: e => {
                setInput(e.target.value);
            }, onKeyDown: e => {
                if (props.allowEnter && e.key === 'Enter') {
                    onClose(true);
                    e.preventDefault();
                }
                e.stopPropagation();
            } }, void 0) }), void 0));
}
export default TextInputDialog;
