import React from 'react';
import { FormFieldDescriptor } from '../Form';
import { DialogConfirmationStyleProps } from '../types';
import { BaseContent } from '../../types';
/** Main props object */
declare type ContentModalProps<T> = {
    /** Fields to show in the form */
    fields: FormFieldDescriptor<T>[];
    /** Callback on the user clicking the 'Submit' button */
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
