import React from 'react';
import { DialogConfirmationStyleProps } from './types';
declare type ConfirmationDialogProps = {
    open: boolean;
    onClose: (agreed: boolean) => void;
    stopPropagation?: boolean;
    preventDefault?: boolean;
} & DialogConfirmationStyleProps;
/**
 * Creates a confirmation dialog that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A confirmation dialog component.
 */
declare function ConfirmationDialog({ size, cancelColor, cancelText, confirmColor, confirmText, stopPropagation, preventDefault, ...props }: React.PropsWithChildren<ConfirmationDialogProps>): React.ReactElement;
export default ConfirmationDialog;
