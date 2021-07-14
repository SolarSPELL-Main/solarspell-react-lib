import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
//Importing libraries, APIs from outside the project
import React from 'react';
import TextField from '@material-ui/core/TextField';
//Importing functions from other files of the projects
import ConfirmationDialog from './ConfirmationDialog';
import { preventEvent } from '../utils';
/**
 * Creates a dialog with a text input box that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A text input dialog component.
 */
function TextInputDialog(_a) {
    var { size = 'xs', cancelColor = 'secondary', cancelText = 'Cancel', confirmColor = 'primary', confirmText = 'Confirm', stopPropagation = true, preventDefault = true } = _a, props = __rest(_a, ["size", "cancelColor", "cancelText", "confirmColor", "confirmText", "stopPropagation", "preventDefault"]);
    const [input, setInput] = React.useState('');
    const onClose = React.useCallback((accepted) => {
        if (accepted) {
            props.onClose(input);
        }
        else {
            props.onClose('');
        }
        setInput('');
    }, [input, props.onClose]);
    return (_jsx(ConfirmationDialog, Object.assign({ open: props.open, title: props.title, description: props.description, size: size, cancelColor: cancelColor, cancelText: cancelText, confirmColor: confirmColor, confirmText: confirmText, onClose: onClose, stopPropagation: stopPropagation, preventDefault: preventDefault }, { children: _jsx(TextField, { fullWidth: true, autoFocus: true, margin: 'dense', label: props.label, value: input, onChange: e => {
                setInput(e.target.value);
            }, onKeyDown: preventEvent(true, false) }, void 0) }), void 0));
}
export default TextInputDialog;
