import React from 'react';
import { DialogConfirmationStyleProps } from './types';
/** Main props object */
declare type ConfirmationDialogProps = {
    /** Whether the dialog is open or not */
    open: boolean;
    /**
     * Callback to fire on closing the dialog.
     * The agreed argument is only true when
     * the user clicks on the 'Confirm' button
     * for this component.
     */
    onClose: (agreed: boolean) => void;
    /**
     * Whether to stop event propagation.
     * This and the below preventDefault properties
     * are necessary to disable a weird interaction
     * between the Dialog and other components,
     * such as the Menu.
     */
    stopPropagation?: boolean;
    /** Whether to prevent default handling of events */
    preventDefault?: boolean;
} & DialogConfirmationStyleProps;
/**
 * Creates a confirmation dialog that will call a callback.
 * @param props The styling and functional properties of the dialog.
 * @returns A confirmation dialog component.
 */
declare function ConfirmationDialog({ size, cancelColor, cancelText, confirmColor, confirmText, stopPropagation, preventDefault, ...props }: React.PropsWithChildren<ConfirmationDialogProps>): React.ReactElement;
export default ConfirmationDialog;
