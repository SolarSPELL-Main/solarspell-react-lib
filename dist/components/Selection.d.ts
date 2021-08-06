import React from 'react';

import { DialogButtonStyleProps } from './types';

declare type SelectionFieldDescriptor<T> = {
    /** The displayed name of the field */
    title: string;
    /** The actual key of the field */
    field: keyof T;
};
declare type SelectionProps<T> = {
    /** The fields available for selection */
    fields: SelectionFieldDescriptor<T>[];
    /** Initial fields that are checked */
    initialState?: Record<string, boolean>;
    /** Whether the selection dialog is open */
    open: boolean;
    /** Callback on dialog close */
    onClose: (state: Record<string, boolean>) => void;
    /** Additional styling props */
    dialogStyle?: Partial<DialogButtonStyleProps>;
};
/**
 * Dialog form for selecting keys of an object using checkboxes.
 * Currently displays checkboxes in two columns.
 * @param props Context, callback, and styling of the component.
 * @returns A dialog form.
 */
declare function Selection<T>(props: SelectionProps<T>): React.ReactElement;
export type { SelectionFieldDescriptor };
export default Selection;
