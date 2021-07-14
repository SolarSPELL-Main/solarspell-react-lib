import React from 'react';
import { DialogButtonStyleProps } from './types';
declare type SelectionFieldDescriptor<T> = {
    title: string;
    field: keyof T;
};
declare type SelectionProps<T> = {
    fields: SelectionFieldDescriptor<T>[];
    initialState?: Record<string, boolean>;
    open: boolean;
    onClose: (state: Record<string, boolean>) => void;
    dialogStyle?: Partial<DialogButtonStyleProps>;
};
/**
 * Dialog form for selecting keys of an object using checkboxes.
 * @param props Context, callback, and styling of the component.
 * @returns A dialog form.
 */
declare function Selection<T>(props: SelectionProps<T>): React.ReactElement;
export type { SelectionFieldDescriptor };
export default Selection;
