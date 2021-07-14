import React from 'react';
import { GridColDef } from '@material-ui/data-grid';
import { SelectionFieldDescriptor } from '../Selection';
import { BaseMetadataType, BaseContent } from '../../types';
declare type ContentColumnSelectionFieldDescriptor<T> = {
    column?: (field: ContentColumnSelectionFieldDescriptor<T>, hidden: boolean) => GridColDef;
} & SelectionFieldDescriptor<T>;
declare type ContentColumnSelectionProps<T, M> = {
    fields: ContentColumnSelectionFieldDescriptor<T>[];
    metadataTypes: M[];
    initialState?: Record<string, boolean>;
    open: boolean;
    onClose: (cols: GridColDef[]) => void;
};
/**
 * Column selection modal for content.
 * Callback takes the constructed columns as an argument.
 * @param props Callbacks, context, and fields
 * @returns A dialog checkbox form for selecting columns.
 */
declare function ContentColumnSelection<T extends BaseContent = BaseContent, M extends BaseMetadataType = BaseMetadataType>(props: ContentColumnSelectionProps<T, M>): React.ReactElement;
export default ContentColumnSelection;
