import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/';
import ConfirmationDialog from './ConfirmationDialog';
import TextInputDialog from './TextInputDialog';
// Forces the mouse to change to a pointer on hover
const pointerStyle = {
    cursor: 'pointer',
};
/**
 * Creates a clickable icon for a variety of different use cases.
 * @param props The properties of the icon.
 * @returns A clickable icon.
 */
function ActionPanelItem(props) {
    var _a;
    switch (props.type) {
        case 'button': {
            return (_jsx(Tooltip, Object.assign({ title: props.tooltip || '' }, { children: _jsx(props.icon, { style: pointerStyle, onClick: props.onAction }, void 0) }), void 0));
        }
        case 'toggle': {
            const [active, setActive] = React.useState((_a = props.active) !== null && _a !== void 0 ? _a : false);
            const toggle = React.useCallback(() => props.toggle(!active, setActive), [active, props.toggle]);
            return (_jsx(ActionPanelItem, { type: 'button', tooltip: props.tooltip, icon: active ? props.activeIcon : props.inactiveIcon, onAction: toggle }, void 0));
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
            return (_jsxs(_Fragment, { children: [_jsx(ActionPanelItem, { type: 'button', tooltip: props.tooltip, icon: props.icon, onAction: openConfirmationDialog }, void 0), _jsx(ConfirmationDialog, { title: props.confirmationTitle, description: props.confirmationDescription, open: confirmationDialogActive, onClose: onAgree, confirmText: props.confirmButtonText, confirmColor: props.confirmButtonColor, cancelText: props.cancelButtonText, cancelColor: props.cancelButtonColor, size: props.confirmationSize }, void 0)] }, void 0));
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
            return (_jsxs(_Fragment, { children: [_jsx(ActionPanelItem, { type: 'button', tooltip: props.tooltip, icon: props.icon, onAction: openTextInputDialog }, void 0), _jsx(TextInputDialog, { title: props.textInputTitle, description: props.textInputDescription, label: props.textInputLabel, open: textInputDialogActive, onClose: onSubmit, confirmText: props.submitButtonText, confirmColor: props.submitButtonColor, cancelText: props.cancelButtonText, cancelColor: props.cancelButtonColor, size: props.textInputSize, defaultValue: props.textInputDefaultValue, allowEnter: props.allowEnter }, void 0)] }, void 0));
        }
    }
}
export default ActionPanelItem;
