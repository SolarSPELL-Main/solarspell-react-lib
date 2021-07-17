import React from 'react';
import { GenericDialogStyleProps } from './types';
declare type GenericDialogProps = {
    open: boolean;
    onClose: (e: React.SyntheticEvent) => void;
    actions: React.ReactElement;
} & GenericDialogStyleProps;
/**
 * Creates a generic dialog that will call a callback on close.
 * @param props The styling and functional properties of the dialog.
 * @returns A generic dialog component.
 */
declare function GenericDialog({ size, ...props }: React.PropsWithChildren<GenericDialogProps>): React.ReactElement;
export default GenericDialog;
