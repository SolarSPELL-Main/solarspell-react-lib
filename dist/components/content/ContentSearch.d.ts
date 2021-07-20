import React from 'react';
import { GridSize } from '@material-ui/core/Grid';
declare type FieldDescriptor = {
    field: string;
    title: string;
    unit?: string;
    width: GridSize;
} & Field;
declare type Field = NumericField | DateField | StringField | EnumField | CustomField;
declare type NumericField = {
    type: 'numeric';
    min?: number;
    max?: number;
};
declare type DateField = {
    type: 'date';
    stringifier: (val: Date) => string;
};
declare type StringField = {
    type: 'string';
};
declare type EnumField = {
    type: 'enum';
    options: {
        value: string;
        title: string;
    }[];
    initialValue: string;
};
declare type CustomField = {
    type: 'custom';
    component: React.JSXElementConstructor<any>;
    propFactory: (setter: (val: any) => void, state: Record<string, any>) => any;
};
declare type ContentSearchProps = {
    fields: FieldDescriptor[];
    onQueryChange: (values: any) => void;
};
/**
 * Expandable search bar for content (or general use).
 * @param props The callback and fields of the search bar.
 * @returns A search bar nested in an expandable panel.
 */
declare function ContentSearch(props: ContentSearchProps): React.ReactElement;
export default ContentSearch;
