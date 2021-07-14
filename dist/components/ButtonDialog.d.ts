import React from 'react';
import { DialogButtonStyleProps } from './types';
declare type ButtonDialogProps = {
    open: boolean;
    onClose: () => void;
} & DialogButtonStyleProps;
/**
 * Creates a single-button dialog that will call a callback.
 * For the purposes of viewing something or alerting the user.
 * @param props The styling and functional properties of the dialog.
 * @returns A single-button dialog component.
 */
declare function ButtonDialog({ size, buttonText, buttonColor, ...props }: React.PropsWithChildren<ButtonDialogProps>): React.ReactElement;
export default ButtonDialog;
