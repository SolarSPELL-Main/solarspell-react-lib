import React from 'react';
import { GridSize } from '@material-ui/core/Grid';
declare type FieldDescriptor = {
    /** Key name of the field */
    field: string;
    /** Displayed title of the field */
    title: string;
    /** What units the field is in */
    unit?: string;
    /** Grid columns taken up by the field */
    width: GridSize;
} & Field;
declare type Field = NumericField | DateField | StringField | EnumField | CustomField;
declare type NumericField = {
    /**
     * Specifies that the field should be rendered by two
     * TextFields, for from/to values respectively.
     * State is formatted as: {
     *  from: number
     *  to: number
     * }
     */
    type: 'numeric';
    /** Minimum value for field */
    min?: number;
    /** Maximum value for field */
    max?: number;
    /** Conversion method from number to string */
    formatter?: (val: number, field: 'from' | 'to') => number | string;
};
declare type DateField = {
    /**
     * Specifies that the field should be rendered by two
     * TextFields, for from/to values respectively.
     * State is formatted as: {
     *  from: string
     *  rawFrom: string
     *  to: string
     *  rawTo: string
     * }
     */
    type: 'date';
    /** Conversion method from Date to string */
    formatter: (val: Date, field: 'from' | 'to') => string;
};
declare type StringField = {
    /**
     * Specifies that the field should be rendered by one
     * TextField.
     * State is formatted as: string
     */
    type: 'string';
};
declare type EnumField = {
    /**
     * Specifies that the field should be rendered by a
     * combo box (Select).
     * State is formatted as: string
     */
    type: 'enum';
    /** The enum represented by the field */
    options: {
        /** Actual value of the enum */
        value: string;
        /** Displayed name of the enum */
        title: string;
    }[];
    /** Initial selected enum value */
    initialValue: string;
};
declare type CustomField = {
    /**
     * Specifies that the field should be rendered by a
     * custom component.
     * State is formatted however it is specified by the setter.
     */
    type: 'custom';
    /** Custom component to render for the field */
    component: React.JSXElementConstructor<any>;
    /** Props for the component derived from the state setter and current state */
    propFactory: (setter: (val: any) => void, state: Record<string, any>) => any;
};
declare type ContentSearchProps = {
    /** Fields to display in the search bar */
    fields: FieldDescriptor[];
    /** Callback to fire whenever any field changes */
    onQueryChange: (values: any) => void;
};
/**
 * Expandable search bar for content (or general use).
 * Contains preset fields for various purposes, specified by
 * the 'type' property in the FieldDescriptor type.
 * @param props The callback and fields of the search bar.
 * @returns A search bar nested in an expandable panel.
 */
declare function ContentSearch(props: ContentSearchProps): React.ReactElement;
export default ContentSearch;
