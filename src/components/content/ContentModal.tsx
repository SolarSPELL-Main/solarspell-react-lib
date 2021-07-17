//Importing from outside the project
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

//Importing from other files of the projects
import Form, { FormFieldDescriptor } from '../Form';
import { DialogConfirmationStyleProps } from '../types';
import { BaseContent } from '../../types';

type ContentModalProps<T> = {
  fields: FormFieldDescriptor<T>[]
  onSubmit: (values?: Partial<T>) => void // null when submit cancelled
  dialogStyle: DialogConfirmationStyleProps
  open: boolean
  initialState?: Partial<T>
}

/**
 * The modal for adding/editing content.
 * Takes care of state, validation, and callback.
 * @param props The form content and callbacks.
 * @returns A modal for content, displayed in a dialog.
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
