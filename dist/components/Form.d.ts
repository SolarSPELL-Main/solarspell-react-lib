import React from 'react';
import type { DialogConfirmationStyleProps } from './types';
declare type FormFieldDescriptor<T> = {
    component: React.JSXElementConstructor<any>;
    propFactory: (state: Partial<T>, // current state
    reasons: Partial<Record<keyof T, any>>, // current error reasons
    setter: (val: any) => void, // sets item's field in state to value
    genericSetter: (field: keyof T, val: any) => void, // set any field in state to value
    genericReasonSetter: (field: keyof T, val: any) => void) => any;
    field: keyof T;
    initialValue: any;
    validator?: (state: Partial<T>) => any;
    mb?: string | number;
} | {
    component?: never;
    propFactory?: never;
    field: keyof T;
    initialValue: any;
    validator?: (state: Partial<T>) => any;
    mb?: never;
};
declare type FormOptionalProps<T> = {
    type: 'dialog';
    onSubmit: (values?: Partial<T>) => void;
    dialogStyle: DialogConfirmationStyleProps;
    open: boolean;
} | {
    type?: never;
    onSubmit: (values: Partial<T>) => void;
};
declare type FormProps<T> = {
    fields: FormFieldDescriptor<T>[];
    initialState?: Partial<T>;
} & FormOptionalProps<T>;
/**
 * A generic form for submitting data.
 * Takes care of state, validation, and callback.
 * Displays fields in a descending order in a column.
 * Can be displayed in a dialog instead of in page body.
 * @param props The form content and callbacks.
 * @returns A form.
 */
declare function Form<T>(props: FormProps<T>): React.ReactElement;
export type { FormFieldDescriptor };
export default Form;
