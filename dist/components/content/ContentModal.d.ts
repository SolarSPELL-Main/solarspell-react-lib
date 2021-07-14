import React from 'react';
import { FormFieldDescriptor } from '../Form';
import { DialogConfirmationStyleProps } from '../types';
import { BaseContent } from '../../types';
declare type ContentModalProps<T> = {
    fields: FormFieldDescriptor<T>[];
    onSubmit: (values?: Partial<T>) => void;
    dialogStyle: DialogConfirmationStyleProps;
    open: boolean;
    initialState?: Partial<T>;
};
/**
 * The modal for adding/editing content.
 * Takes care of state, validation, and callback.
 * @param props The form content and callbacks.
 * @returns A modal for content, displayed in a dialog.
 */
declare function ContentModal<T extends BaseContent>(props: ContentModalProps<T>): React.ReactElement;
export default ContentModal;
