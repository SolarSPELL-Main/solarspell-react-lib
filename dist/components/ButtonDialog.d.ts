import React from 'react';

import { DialogButtonStyleProps } from './types';

declare type ButtonDialogProps = {
    /** Whether the dialog is open */
    open: boolean;
    /** Callback to fire on closing the dialog */
    onClose: () => void;
} & DialogButtonStyleProps;
/**
 * Creates a single-button dialog that will call a callback.
 * For the purposes of viewing something or alerting the user.
 * 'Single-button' means only one button is present at the bottom
 * right of the dialog, as opposed to two (like in a confirmation dialog).
 * @param props The styling and functional properties of the dialog.
 * @returns A single-button dialog component.
 */
declare function ButtonDialog({ size, buttonText, buttonColor, ...props }: React.PropsWithChildren<ButtonDialogProps>): React.ReactElement;
export default ButtonDialog;
