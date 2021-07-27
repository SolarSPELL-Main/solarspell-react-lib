import React from 'react';
import { GridColDef } from '@material-ui/data-grid';
import { SelectionFieldDescriptor } from '../Selection';
import { BaseMetadataType, BaseContent } from '../../types';
declare type ContentColumnSelectionFieldDescriptor<T> = {
    /** Additional prop specifying how the generated grid column should look */
    column?: (field: ContentColumnSelectionFieldDescriptor<T>, hidden: boolean) => GridColDef;
} & SelectionFieldDescriptor<T>;
declare type ContentColumnSelectionProps<T, M> = {
    /** The items selectable in the component */
    fields: ContentColumnSelectionFieldDescriptor<T>[];
    /** The metadata types available for tagging */
    metadataTypes: M[];
    /** Which fields are initially selected */
    initialState?: Record<string, boolean>;
    /** Whether the dialog is open */
    open: boolean;
    /** Callback to trigger on dialog close */
    onClose: (cols: GridColDef[]) => void;
};
/**
 * Column selection modal for content.
 * Provides support for selecting which Content fields should
 * be displayed in the DataGrid, in addition to metadata types.
 * Callback takes the constructed columns as an argument.
 * @param props Callbacks, context, and fields
 * @returns A dialog checkbox form for selecting columns.
 */
declare function ContentColumnSelection<T extends BaseContent = BaseContent, M extends BaseMetadataType = BaseMetadataType>(props: ContentColumnSelectionProps<T, M>): React.ReactElement;
export default ContentColumnSelection;
