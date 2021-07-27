import React from 'react';
import { DialogConfirmationStyleProps } from './types';
declare type TextInputDialogProps = {
    open: boolean;
    onClose: (input: string) => void;
    label: string;
    stopPropagation?: boolean;
    preventDefault?: boolean;
    defaultValue?: string;
    allowEnter?: boolean;
} & DialogConfirmationStyleProps;
/**
 * Creates a dialog with a text input box that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A text input dialog component.
 */
declare function TextInputDialog({ size, cancelColor, cancelText, confirmColor, confirmText, stopPropagation, preventDefault, ...props }: TextInputDialogProps): React.ReactElement;
export default TextInputDialog;
