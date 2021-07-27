import React from 'react';
import { DialogConfirmationStyleProps } from './types';
declare type TextInputDialogProps = {
    /** Whether the dialog is open */
    open: boolean;
    /**
     * Callback to fire on closing the dialog.
     * Note, the string is the empty string if
     * the dialog is not closed using the textfield
     * or clicking the submit button.
     */
    onClose: (input: string) => void;
    /** Label to display for the textfield */
    label: string;
    /** Whether to stop propagation of events */
    stopPropagation?: boolean;
    /** Whether to prevent default handling of events */
    preventDefault?: boolean;
    /** Initial value of the textfield */
    defaultValue?: string;
    /** Whether to allow pressing 'enter' to submit the textfield */
    allowEnter?: boolean;
} & DialogConfirmationStyleProps;
/**
 * Creates a dialog with a text input box that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A text input dialog component.
 */
declare function TextInputDialog({ size, cancelColor, cancelText, confirmColor, confirmText, stopPropagation, preventDefault, ...props }: TextInputDialogProps): React.ReactElement;
export default TextInputDialog;
