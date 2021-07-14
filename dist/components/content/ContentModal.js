import { jsx as _jsx } from "react/jsx-runtime";
//Importing from outside the project
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
//Importing from other files of the projects
import Form from '../Form';
import ConfirmationDialog from '../ConfirmationDialog';
/**
 * The modal for adding/editing content.
 * Takes care of state, validation, and callback.
 * @param props The form content and callbacks.
 * @returns A modal for content, displayed in a dialog.
 */
function ContentModal(props) {
    return (_jsx(Form, { fields: props.fields.concat(
        // Add default value for content ID
        [{ field: 'id', initialValue: -1 }]), onSubmit: props.onSubmit, initialState: props.initialState, renderer: innerProps => {
            const onSubmit = React.useCallback((submitted) => {
                if (submitted) {
                    innerProps.onSubmit();
                }
                else {
                    props.onSubmit();
                }
            }, [props.onSubmit, innerProps.onSubmit]);
            return (_jsx(ConfirmationDialog, Object.assign({ onClose: onSubmit, open: props.open, preventDefault: false }, props.dialogStyle, { children: innerProps.body }), void 0));
        } }, void 0));
}
export default ContentModal;
