import React from 'react';
import { DialogButtonStyleProps } from './types';
/** Specifies how a field should be displayed in the dialog */
declare type SelectionFieldDescriptor<T> = {
    /** The displayed name of the field */
    title: string;
    /** The actual key of the field */
    field: keyof T;
};
/** Main props object */
declare type SelectionProps<T> = {
    /** The fields available for selection */
    fields: SelectionFieldDescriptor<T>[];
    /** Whether the selection dialog is open */
    open: boolean;
    /** Which fields are currently checked/unchecked */
    value: Record<string, boolean>;
    /** Callback on dialog close */
    onClose: () => void;
    /** Callback when state changes */
    onChange?: (field: SelectionFieldDescriptor<T>, checked: boolean) => void;
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
