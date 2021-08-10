import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
// Form components only used for layout
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

import ButtonDialog from './ButtonDialog';
import { DialogButtonStyleProps } from './types';

/** Specifies how a field should be displayed in the dialog */
type SelectionFieldDescriptor<T> = {
  /** The displayed name of the field */
  title: string
  /** The actual key of the field */
  field: keyof T
}

/** Main props object */
type SelectionProps<T> = {
  /** The fields available for selection */
  fields: SelectionFieldDescriptor<T>[]
  /** Whether the selection dialog is open */
  open: boolean
  /** Which fields are currently checked/unchecked */
  value: Record<string,boolean>
  /** Callback on dialog close */
  onClose: () => void
  /** Callback when state changes */
  onChange?: (field: SelectionFieldDescriptor<T>, checked: boolean) => void
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
  const onClose = React.useCallback(
    () => props.onClose(),
    [props.onClose],
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
                  checked={props.value[field.field] ?? false}
                  onChange={(_e, checked) => {
                    if (props.onChange) {
                      props.onChange(field, checked);
                    }
                  }}
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
