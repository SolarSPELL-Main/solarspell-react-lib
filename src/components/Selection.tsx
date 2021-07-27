import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// Form components only used for layout
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import ButtonDialog from './ButtonDialog';
import { DialogButtonStyleProps } from './types';
import Grid from '@material-ui/core/Grid';

type SelectionFieldDescriptor<T> = {
  /** The displayed name of the field */
  title: string
  /** The actual key of the field */
  field: keyof T
}

type SelectionProps<T> = {
  /** The fields available for selection */
  fields: SelectionFieldDescriptor<T>[]
  /** Initial fields that are checked */
  initialState?: Record<string,boolean>
  /** Whether the selection dialog is open */
  open: boolean
  /** Callback on dialog close */
  onClose: (state: Record<string,boolean>) => void
  /** Additional styling props */
  dialogStyle?: Partial<DialogButtonStyleProps>
}

/**
 * Dialog form for selecting keys of an object using checkboxes.
 * Currently displays checkboxes in two columns.
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
        <Grid container>
          {props.fields.map((field, idx) => (
            <Grid
              item
              xs={6}
              key={idx}
            >
              <FormControlLabel
                control={<Checkbox
                  checked={state[field.field] ?? false}
                  onChange={setterFactory(field.field)}
                />}
                label={field.title}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </ButtonDialog>
  );
}

export type { SelectionFieldDescriptor };
export default Selection;
