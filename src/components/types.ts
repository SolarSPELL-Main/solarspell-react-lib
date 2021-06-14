import { PropTypes } from '@material-ui/core';
import { BaseMetadata, BaseMetadataType } from '../types';

export type DialogWidth = false | 'md' | 'xs' | 'sm' | 'lg' | 'xl' | undefined

export type DialogStyleProps = {
  title: string
  description?: string
  confirmText?: string
  confirmColor?: PropTypes.Color
  cancelText?: string
  cancelColor?: PropTypes.Color
  size?: DialogWidth
}

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

export type CustomizableActionProps<T extends { onAction: () => void }> = ConfirmProps<T> | TextInputProps<T> | ButtonProps<T>

export type MetadataTyped = {
  metadataType: BaseMetadataType
}

export type MetadataTagged = {
  metadataType: BaseMetadataType
  metadata: BaseMetadata
}
