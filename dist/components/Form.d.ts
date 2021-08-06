import React from 'react';
import type { DialogConfirmationStyleProps } from './types';
/** Specifies how each field in the form should be rendered */
declare type FormFieldDescriptor<T> = {
    /** The component to render for the form field */
    component: React.JSXElementConstructor<any>;
    /** Should return the props of the field component */
    propFactory: (
    /** Current state of the form */
    state: Partial<T>, 
    /** Current vlidation failure reasons in the form */
    reasons: Partial<Record<keyof T, any>>, 
    /** Setter for this specific field */
    setter: (val: any) => void, 
    /** Setter for any field in the form */
    genericSetter: (field: keyof T, val: any) => void, 
    /** Setter for validation failure reason for any field in the form */
    genericReasonSetter: (field: keyof T, val: any) => void) => any;
    /** Actual key of the field */
    field: keyof T;
    /** Initial value of the field if not otherwise specified in state */
    initialValue: any;
    /** Validator (can be async) for the field. Called on submit. */
    validator?: (state: Partial<T>) => any;
    /** Margin beneath this field. */
    mb?: string | number;
} | {
    component?: never;
    propFactory?: never;
    field: keyof T;
    initialValue: any;
    validator?: (state: Partial<T>) => any;
    mb?: never;
};
/** Specifies how the form itself should be rendered */
declare type FormOptionalProps<T> = {
    /** Indicates that the form should be rendered in a dialog */
    type: 'dialog';
    /** Callback to fire on successful validation and submission */
    onSubmit: (values?: Partial<T>) => void;
    /** Additional style props for the dialog itself */
    dialogStyle: DialogConfirmationStyleProps;
    /** Whether the dialog is open or not */
    open: boolean;
} | {
    /** Indicates that the form should be rendered as a regular page component */
    type?: never;
    /** Callback to fire on successful validation and submission */
    onSubmit: (values: Partial<T>) => void;
};
/** Main props object */
declare type FormProps<T> = {
    /** Fields to display in the form */
    fields: FormFieldDescriptor<T>[];
    /** Initial state of the fields */
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
