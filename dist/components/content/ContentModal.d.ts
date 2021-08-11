import React from 'react';
import { FormFieldDescriptor } from '../Form';
import { DialogConfirmationStyleProps } from '../types';
import { BaseContent } from '../../types';
/** Main props object */
declare type ContentModalProps<T> = {
    /** Fields to show in the form */
    fields: FormFieldDescriptor<T>[];
    /**
     * Callback on dialog close.
     * The values arg is defined when the user succesfully submits.
     * The values arg is undefined when the user closes the dialog without
     * submitting.
     */
    onSubmit: (values?: Partial<T>) => void;
    /** Additional dialog styling props */
    dialogStyle: DialogConfirmationStyleProps;
    /** Whether the modal is open */
    open: boolean;
    /** The initial states of the form fields */
    initialState?: Partial<T>;
};
/**
 * The modal for adding/editing content.
 * Takes care of state, validation, and callback.
 * @param props The form content and callbacks.
 * @returns A form for filling out content, displayed in a dialog.
 */
declare function ContentModal<T extends BaseContent>(props: ContentModalProps<T>): React.ReactElement;
export default ContentModal;
