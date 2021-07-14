import React from 'react';
declare type FormFieldDescriptor<T> = {
    component: React.JSXElementConstructor<any>;
    propFactory: (state: Partial<T>, // current state
    reasons: Partial<Record<keyof T, any>>, // current error reasons
    setter: (val: any) => void, // sets item's field in state to value
    genericSetter: (field: keyof T, val: any) => void) => any;
    field: keyof T;
    initialValue: any;
    validator?: (state: Partial<T>) => any;
} | {
    component?: never;
    propFactory?: never;
    field: keyof T;
    initialValue: any;
    validator?: (state: Partial<T>) => any;
};
declare type FormProps<T> = {
    fields: FormFieldDescriptor<T>[];
    onSubmit: (values: Partial<T>) => void;
    initialState?: Partial<T>;
    renderer?: React.JSXElementConstructor<{
        onSubmit: () => void;
        body: React.ReactElement;
    }>;
};
/**
 * A generic form for submitting data.
 * Takes care of state, validation, and callback.
 * Displays fields in a descending order in a column.
 * @param props The form content and callbacks.
 * @returns A form.
 */
declare function Form<T>(props: FormProps<T>): React.ReactElement;
export type { FormFieldDescriptor };
export default Form;
