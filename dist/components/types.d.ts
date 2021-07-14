import type { PropTypes } from '@material-ui/core';
export declare type DialogWidth = false | 'md' | 'xs' | 'sm' | 'lg' | 'xl' | undefined;
export declare type GenericDialogStyleProps = {
    title?: string;
    description?: string;
    size?: DialogWidth;
};
export declare type DialogButtonStyleProps = {
    buttonText?: string;
    buttonColor?: PropTypes.Color;
} & GenericDialogStyleProps;
export declare type DialogConfirmationStyleProps = {
    confirmText?: string;
    confirmColor?: PropTypes.Color;
    cancelText?: string;
    cancelColor?: PropTypes.Color;
} & GenericDialogStyleProps;
declare type ConfirmProps<T> = {
    type: 'confirm';
    confirmationTitle: string;
    confirmationDescription?: string;
    confirmationSize?: DialogWidth;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: PropTypes.Color;
    cancelButtonColor?: PropTypes.Color;
} & T;
declare type TextInputProps<T> = {
    type: 'text_input';
    textInputTitle: string;
    textInputDescription?: string;
    textInputLabel: string;
    textInputSize?: DialogWidth;
    submitButtonText?: string;
    cancelButtonText?: string;
    submitButtonColor?: PropTypes.Color;
    cancelButtonColor?: PropTypes.Color;
    onAction: (input: string) => void;
} & Omit<T, 'onAction'>;
declare type ButtonProps<T> = {
    type: 'button';
} & T;
export declare type CustomizableActionProps<T extends {
    onAction: () => void;
}> = ConfirmProps<T> | TextInputProps<T> | ButtonProps<T>;
export {};
