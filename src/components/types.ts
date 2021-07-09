import type { PropTypes } from '@material-ui/core';

export type DialogWidth = false | 'md' | 'xs' | 'sm' | 'lg' | 'xl' | undefined

export type GenericDialogStyleProps = {
  title: string
  description?: string
  size?: DialogWidth
}

export type DialogButtonStyleProps = {
  buttonText?: string
  buttonColor?: PropTypes.Color
} & GenericDialogStyleProps

export type DialogConfirmationStyleProps = {
  confirmText?: string
  confirmColor?: PropTypes.Color
  cancelText?: string
  cancelColor?: PropTypes.Color
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
  submitButtonText?: string
  cancelButtonText?: string
  submitButtonColor?: PropTypes.Color
  cancelButtonColor?: PropTypes.Color
  onAction: (input: string) => void
} & Omit<T, 'onAction'>

type ButtonProps<T> = {
  type: 'button'
} & T

export type CustomizableActionProps<T extends {
  onAction: () => void
}> = ConfirmProps<T> | TextInputProps<T> | ButtonProps<T>
