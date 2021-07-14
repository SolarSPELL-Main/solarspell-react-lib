import React from 'react';
import { DialogButtonStyleProps } from '../types';
import { BaseContent, BaseMetadataType } from '../../types';
declare type ItemDescriptor<T> = {
    title: string;
    field: keyof T;
    formatter?: (val: any) => any;
    defaultValue?: string;
};
declare type ContentViewerProps<T, M> = {
    content: T;
    metadataTypes: M[];
    items: ItemDescriptor<T>[];
    dialogStyle?: DialogButtonStyleProps;
    open: boolean;
    onClose: () => void;
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
declare function ContentViewer<T extends BaseContent, M extends BaseMetadataType>({ items, dialogStyle, open, onClose, content, metadataTypes, fileDisplay, }: ContentViewerProps<T, M>): React.ReactElement;
export default ContentViewer;
