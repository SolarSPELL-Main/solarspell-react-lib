import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
//Importing libraries, APIs from outside the project
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
//Importing functions from other files of the projects
import ConfirmationDialog from './ConfirmationDialog';
import TextInputDialog from './TextInputDialog';
import { preventEventFactory } from '../utils';
/**
 * Creates a clickable menu item for a variety of different use cases.
 * @param props The properties of the menu item.
 * @returns A clickable menu item.
 */
function KebabMenuItem(props) {
    switch (props.type) {
        case 'button': {
            const onClick = React.useCallback(preventEventFactory(props.onAction), [props.onAction]);
            return (_jsx(MenuItem, Object.assign({ onClick: onClick }, { children: props.label }), void 0));
        }
        case 'confirm': {
            const [confirmationDialogActive, setConfirmationDialogActive,] = React.useState(false);
            const onAgree = React.useCallback((agreed) => {
                if (agreed) {
                    props.onAction();
                }
                setConfirmationDialogActive(false);
            }, [props.onAction]);
            const openConfirmationDialog = React.useCallback(() => setConfirmationDialogActive(true), []);
            return (_jsxs(_Fragment, { children: [_jsx(KebabMenuItem, { type: 'button', label: props.label, onAction: openConfirmationDialog }, void 0), _jsx(ConfirmationDialog, { title: props.confirmationTitle, description: props.confirmationDescription, open: confirmationDialogActive, onClose: onAgree, confirmText: props.confirmButtonText, confirmColor: props.confirmButtonColor, cancelText: props.cancelButtonText, cancelColor: props.cancelButtonColor, size: props.confirmationSize }, void 0)] }, void 0));
        }
        case 'text_input': {
            const [textInputDialogActive, setTextInputDialogActive,] = React.useState(false);
            const onSubmit = React.useCallback((val) => {
                if (val) {
                    props.onAction(val);
                }
                setTextInputDialogActive(false);
            }, [props.onAction]);
            const openTextInputDialog = React.useCallback(() => setTextInputDialogActive(true), []);
            return (_jsxs(_Fragment, { children: [_jsx(KebabMenuItem, { type: 'button', label: props.label, onAction: openTextInputDialog }, void 0), _jsx(TextInputDialog, { title: props.textInputTitle, description: props.textInputDescription, label: props.textInputLabel, open: textInputDialogActive, onClose: onSubmit, confirmText: props.submitButtonText, confirmColor: props.submitButtonColor, cancelText: props.cancelButtonText, cancelColor: props.cancelButtonColor, size: props.textInputSize }, void 0)] }, void 0));
        }
    }
}
// Ref arg seems to be unused for now
// Ref forwarding necessary for use in MUI Menu
const ForwardedKebabMenuItem = React.forwardRef((props, _ref) => {
    return (_jsx(KebabMenuItem, Object.assign({}, props), void 0));
});
export default ForwardedKebabMenuItem;