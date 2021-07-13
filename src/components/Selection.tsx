import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// Form components only used for layout
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import ButtonDialog from './ButtonDialog';
import { DialogButtonStyleProps } from './types';

type SelectionFieldDescriptor<T> = {
  title: string
  field: keyof T
}

type SelectionProps<T> = {
  fields: SelectionFieldDescriptor<T>[]
  initialState?: Record<string,boolean>
  open: boolean
  onClose: (state: Record<string,boolean>) => void
  dialogStyle?: Partial<DialogButtonStyleProps>
}

/**
 * Dialog form for selecting keys of an object using checkboxes.
 * @param props Context, callback, and styling of the component.
 * @returns A dialog form.
 */
function Selection<T>(props: SelectionProps<T>): React.ReactElement {
  const [state, setState] = React.useState<Record<string,boolean>>({});

  const setterFactory = React.useCallback(
    (field: keyof T) =>
      (_e: React.SyntheticEvent, checked: boolean) => setState(state => ({
        ...state,
        [field]: checked,
      })),
    [],
  );

  const onClose = React.useCallback(
    () => props.onClose(state),
    [props.onClose, state],
  );

  return (
    <ButtonDialog
      open={props.open}
      onClose={onClose}
      buttonColor={'primary'}
      size={'sm'}
      {...props.dialogStyle}
    >
      <FormGroup>
        {props.fields.map((field, idx) => (
          <FormControlLabel
            key={idx}
            control={<Checkbox
              checked={state[field.field] ?? false}
              onChange={setterFactory(field.field)}
            />}
            label={field.title}
          />
        ))}
      </FormGroup>
    </ButtonDialog>
  );
}

export type { SelectionFieldDescriptor };
export default Selection;
