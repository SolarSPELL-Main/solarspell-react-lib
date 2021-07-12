//Importing from outside the project
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

//Importing from other files of the projects
import Form, { FormFieldDescriptor } from '../Form';
import ConfirmationDialog from '../ConfirmationDialog';
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
      fields={props.fields.concat(
        // Add default value for content ID
        [{ field: 'id', initialValue: -1 }],
      )}
      onSubmit={props.onSubmit}
      initialState={props.initialState}
      renderer={innerProps => {
        const onSubmit = React.useCallback(
          (submitted: boolean) => {
            if (submitted) {
              innerProps.onSubmit();
            } else {
              props.onSubmit();
            }
          },
          [props.onSubmit, innerProps.onSubmit],
        );

        return (
          <ConfirmationDialog
            onClose={onSubmit}
            open={props.open}
            preventDefault={false}
            {...props.dialogStyle}
          >
            {innerProps.body}
          </ConfirmationDialog>
        );
      }}
    />
  );
}

export default ContentModal;
