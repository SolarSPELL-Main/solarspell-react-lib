/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Form, { FormFieldDescriptor } from '../Form';
import { DialogConfirmationStyleProps } from '../types';
import { BaseContent } from '../../types';

type ContentModalProps<T> = {
  /** Fields to show in the form */
  fields: FormFieldDescriptor<T>[]
  /** Callback on the user clicking the 'Submit' button */
  onSubmit: (values?: Partial<T>) => void
  /** Additional dialog styling props */
  dialogStyle: DialogConfirmationStyleProps
  /** Whether the modal is open */
  open: boolean
  /** The initial states of the form fields */
  initialState?: Partial<T>
}

/**
 * The modal for adding/editing content.
 * Takes care of state, validation, and callback.
 * @param props The form content and callbacks.
 * @returns A form for filling out content, displayed in a dialog.
 */
function ContentModal<
  T extends BaseContent, // type for state
>(props: ContentModalProps<T>): React.ReactElement {
  return (
    <Form<T>
      {...props}
      fields={props.fields.concat(
        // Add default value for content ID
        [{ field: 'id', initialValue: -1 }],
      )}
      type={'dialog'}
    />
  );
}

export default ContentModal;
