import React from 'react';

import { DialogButtonStyleProps } from '../types';
import { BaseContent, BaseMetadataType } from '../../types';
declare type FieldDescriptor<T> = {
    /** Title to display for the field */
    title: string;
    /** Actual key of the field */
    field: keyof T;
    /** How the value should be formatted */
    formatter?: (val: any) => any;
    /** What to display if the value is undefined */
    defaultValue?: string;
};
declare type ContentViewerProps<T, M> = {
    /** The content to extract fields from */
    content: T;
    /** The metadata types available for contnt tags */
    metadataTypes: M[];
    /** The fields of the content to display */
    fields: FieldDescriptor<T>[];
    /** Additional styling props for the dialog itself */
    dialogStyle?: DialogButtonStyleProps;
    /** Whether the dialog is open */
    open: boolean;
    /** Callback to fire on closing the dialog */
    onClose: () => void;
    /** How to display the file associated with the content */
    fileDisplay: {
        field: keyof T;
        formatter: (val: any) => any;
    };
};
/**
 * Dialog for viewing content.
 * @param props The dialog content, style, and callbacks.
 * @returns A dialog for viewing content.
 */
declare function ContentViewer<T extends BaseContent, M extends BaseMetadataType>({ fields, dialogStyle, open, onClose, content, metadataTypes, fileDisplay, }: ContentViewerProps<T, M>): React.ReactElement;
export default ContentViewer;
