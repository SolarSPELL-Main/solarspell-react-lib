import type { ComponentProps } from 'react';
import type Button from '@material-ui/core/Button';
import type Dialog from '@material-ui/core/Dialog';
import type { PropTypes } from '@material-ui/core';

export type DialogWidth = false | 'md' | 'xs' | 'sm' | 'lg' | 'xl' | undefined

type PartialButton = Partial<ComponentProps<typeof Button>>;
type PartialDialog = Partial<React.ComponentProps<typeof Dialog>>;

export type GenericDialogStyleProps = {
  title?: string
  description?: string
  size?: DialogWidth
  additionalProps?: PartialDialog
}

export type DialogButtonStyleProps = {
  buttonText?: string
  buttonColor?: PropTypes.Color
  buttonAdditionalProps?: PartialButton
} & GenericDialogStyleProps

export type DialogConfirmationStyleProps = {
  confirmText?: string
  confirmColor?: PropTypes.Color
  confirmAdditionalProps?: PartialButton
  cancelText?: string
  cancelColor?: PropTypes.Color
  cancelAdditionalProps?: PartialButton
} & GenericDialogStyleProps

type ConfirmProps<T> = {
  type: 'confirm'
  confirmationTitle: string
  confirmationDescription?: string
  confirmationSize?: DialogWidth
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: PropTypes.Color
  cancelButtonColor?: PropTypes.Color
} & T

type TextInputProps<T> = {
  type: 'text_input'
  textInputTitle: string
  textInputDescription?: string
  textInputLabel: string
  textInputSize?: DialogWidth
  textInputDefaultValue?: string
  submitButtonText?: string
  cancelButtonText?: string
  submitButtonColor?: PropTypes.Color
  cancelButtonColor?: PropTypes.Color
  onAction: (input: string) => void
  allowEnter?: boolean
} & Omit<T, 'onAction'>

type ButtonProps<T> = {
  type: 'button'
} & T

export type CustomizableActionProps<T extends {
  onAction: () => void
}> = ConfirmProps<T> | TextInputProps<T> | ButtonProps<T>
