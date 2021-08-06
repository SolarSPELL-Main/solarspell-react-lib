import type { ComponentProps } from 'react';
import type Button from '@material-ui/core/Button';
import type Dialog from '@material-ui/core/Dialog';
import type { PropTypes } from '@material-ui/core';
/** Directly ripped from Material-UI definition */
export declare type DialogWidth = false | 'md' | 'xs' | 'sm' | 'lg' | 'xl' | undefined;
/** Aliases for any other props to include in a type */
declare type PartialButton = Partial<ComponentProps<typeof Button>>;
declare type PartialDialog = Partial<React.ComponentProps<typeof Dialog>>;
/** Generic props used for any dialogs */
export declare type GenericDialogStyleProps = {
    /** The title at the top of the dialog */
    title?: string;
    /** The description of the dialog contents */
    description?: string;
    /** The size of the dialog */
    size?: DialogWidth;
    /** Any other dialog props to include */
    additionalProps?: PartialDialog;
};
/** Props used for dialogs with a single button */
export declare type DialogButtonStyleProps = {
    /** Text to display on the button */
    buttonText?: string;
    /** Color of the button */
    buttonColor?: PropTypes.Color;
    /** Any other button props to include */
    buttonAdditionalProps?: PartialButton;
} & GenericDialogStyleProps;
/** Props used for dialogs with two buttons */
export declare type DialogConfirmationStyleProps = {
    /** Text to display on the rightmost button (confirm) */
    confirmText?: string;
    /** Color of the rightmost button */
    confirmColor?: PropTypes.Color;
    /** Any other button props to include on the rightmost button */
    confirmAdditionalProps?: PartialButton;
    /** Text to display on the leftmost button (cancel) */
    cancelText?: string;
    /** Color of the leftmost button */
    cancelColor?: PropTypes.Color;
    /** Any other button props to include on the leftmost button */
    cancelAdditionalProps?: PartialButton;
} & GenericDialogStyleProps;
/** Props used for items associated with a confirmation action */
declare type ConfirmProps<T> = {
    /**
     * Specifies that the item should open a confirmation dialog
     * on click
     */
    type: 'confirm';
    /** Title of the confirmation dialog */
    confirmationTitle: string;
    /** Description of the confirmation dialog */
    confirmationDescription?: string;
    /** Size of the confirmation dialog */
    confirmationSize?: DialogWidth;
    /** Text to display on the rightmost button (confirm) */
    confirmButtonText?: string;
    /** Text to display on the leftmost button (cancel) */
    cancelButtonText?: string;
    /** Color of the rightmost button */
    confirmButtonColor?: PropTypes.Color;
    /** Color of the leftmost button */
    cancelButtonColor?: PropTypes.Color;
} & T;
/** Props used for items associated with a text input action */
declare type TextInputProps<T> = {
    /**
     * Specifies that the item should open a dialog with a textfield
     * on click
     */
    type: 'text_input';
    /** Title of the textfield dialog */
    textInputTitle: string;
    /** Description of the textfield dialog */
    textInputDescription?: string;
    /** Label of the textfield */
    textInputLabel: string;
    /** Size of the textfield dialog */
    textInputSize?: DialogWidth;
    /** Initial value of the textfield */
    textInputDefaultValue?: string;
    /** Text to display on the rightmost button (submit) */
    submitButtonText?: string;
    /** Text to display on the leftmost button (cancel) */
    cancelButtonText?: string;
    /** Color of the rightmost button */
    submitButtonColor?: PropTypes.Color;
    /** Color of the leftmost button */
    cancelButtonColor?: PropTypes.Color;
    /** Callback to fire on text submission / dialog closure */
    onAction: (input: string) => void;
    /** Whether to allow pressing 'enter' in the textfield to trigger a submit */
    allowEnter?: boolean;
} & Omit<T, 'onAction'>;
/**
 * Props used for items associated with general click action.
 * Can be used to implement any of the others.
 */
declare type ButtonProps<T> = {
    /** Specifies that the item should fire a callback on click */
    type: 'button';
} & T;
/**
 * Props used for items associated with some kind of action.
 * These include: action icons, menu items, etc.
 */
export declare type CustomizableActionProps<T extends {
    /**
     * Callback to fire on action.
     * Omitted from TextInputProps due to additional input arg requirement.
     */
    onAction: () => void;
}> = ConfirmProps<T> | TextInputProps<T> | ButtonProps<T>;
export {};
