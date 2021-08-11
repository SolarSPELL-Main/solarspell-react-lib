/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import ConfirmationDialog from './ConfirmationDialog';
import { fullEvery } from '../utils';
import type { DialogConfirmationStyleProps } from './types';

/** Specifies how each field in the form should be rendered */
type FormFieldDescriptor<T> = {
  /** The component to render for the form field */
  component: React.JSXElementConstructor<any>
  /** Should return the props of the field component */
  propFactory: (
    /** Current state of the form */
    state: Partial<T>,
    /** Current vlidation failure reasons in the form */
    reasons: Partial<Record<keyof T,any>>,
    /** Setter for this specific field */
    setter: (val: any) => void,
    /** Setter for any field in the form */
    genericSetter: (
      field: keyof T,
      val: any,
    ) => void,
    /** Setter for validation failure reason for any field in the form */
    genericReasonSetter: (
      field: keyof T,
      val: any,
    ) => void,
  ) => any
  /** Actual key of the field */
  field: keyof T
  /** Initial value of the field if not otherwise specified in state */
  initialValue: any
  /** Validator (can be async) for the field. Called on submit. */
  validator?: (state: Partial<T>) => any
  /** Margin beneath this field. */
  mb?: string|number
} | {
  // Similar properties as above, but no rendered component
  // Used for things such as properties that should be present
  // in the state, but aren't explicitly editable by the user
  component?: never
  propFactory?: never
  field: keyof T
  initialValue: any
  validator?: (state: Partial<T>) => any
  mb?: never
}

/** Specifies how the form itself should be rendered */
type FormOptionalProps<T> = {
  /** Indicates that the form should be rendered in a dialog */
  type: 'dialog'
  /** 
   * Callback to fire on successful validation and submission.
   * Since the form is now a dialog, also fires on dialog close,
   * in which case values is undefined.
   */
  onSubmit: (values?: Partial<T>) => void
  /** Additional style props for the dialog itself */
  dialogStyle: DialogConfirmationStyleProps
  /** Whether the dialog is open or not */
  open: boolean
} | {
  /** Indicates that the form should be rendered as a regular page component */
  type?: never
  /** Callback to fire on successful validation and submission */
  onSubmit: (values: Partial<T>) => void
}

/** Main props object */
type FormProps<T> = {
  /** Fields to display in the form */
  fields: FormFieldDescriptor<T>[]
  /** Initial state of the fields */
  initialState?: Partial<T>
} & FormOptionalProps<T>

/**
 * A generic form for submitting data.
 * Takes care of state, validation, and callback.
 * Displays fields in a descending order in a column.
 * Can be displayed in a dialog instead of in page body.
 * @param props The form content and callbacks.
 * @returns A form.
 */
function Form<T>(props: FormProps<T>): React.ReactElement {
  const [
    state,
    setState,
  ] = React.useState<Partial<T>>({});
  const [
    reasons,
    setReasons,
  ] = React.useState<Partial<Record<keyof T,any>>>({});

  // Keeps track of this for async validation
  const [submitting, setSubmitting] = React.useState(false);

  // Setter factory functions
  const genericSetter = React.useCallback(
    (name: keyof T, val: any) => {
      setState(oldState => ({
        ...oldState,
        [name]: (val instanceof Function) ? val(oldState[name]) : val,
      }));
    },
    [setState],
  );

  const genericReasonSetter = React.useCallback(
    (name: keyof T, val: any) => {
      setReasons(oldState => ({
        ...oldState,
        [name]: (val instanceof Function) ? val(oldState[name]) : val,
      }));
    },
    [setReasons],
  );

  const stateSetter = React.useCallback(
    (name: keyof T) => genericSetter.bind(null, name),
    [setState, genericSetter],
  );
  
  // Performs validation on submission
  const onSubmit = React.useCallback(() => {
    if (!submitting) {
      setSubmitting(true);

      // To enable async validation, assume all results are promises
      const promises = props.fields.map(item => item.validator ?
        item.validator(state)
        :
        null
      );

      Promise.all(promises).then(res => {
        const reasonDraft: typeof reasons = {};

        // Check no reasons present
        const valid = fullEvery(res, (item, idx) => {
          reasonDraft[props.fields[idx].field] = item;
          return !item;
        });

        // State updates should come before external callbacks
        setSubmitting(false);
        setReasons(reasonDraft);

        // On successful validation, submit
        if (valid) {
          props.onSubmit(state);
        }
      });
    }
  }, [props.onSubmit, setState, setReasons, state, props.fields]);

  // Contains all the form fields in a grid
  const formBody = (
    <Grid container>
      {props.fields.map((item, idx) => {
        if (!item.component) {
          return null;
        }
        
        return (
          <Grid
            item
            key={idx}
            xs={12}
            style={{ marginBottom: item.mb ?? '10px' }}
          >
            {<item.component {...item.propFactory(
              state,
              reasons,
              stateSetter(item.field),
              genericSetter,
              genericReasonSetter,
            )} />}
          </Grid>
        );
      })}
    </Grid>
  );

  let finalRender = <></>;
  let deps = [];

  if (props.type === 'dialog') {
    // Form state initialization should reset on open/close
    // Hence props.open is included in deps
    deps = [props.open, props.initialState];
    finalRender = (
      <ConfirmationDialog
        onClose={(submitted: boolean) => {
          // Form was submitted
          if (submitted) {
            // Submit with state
            onSubmit();
          // Form was closed
          } else {
            // Submit with nothing
            props.onSubmit();
          }
        }}
        open={props.open}
        preventDefault={false}
        confirmAdditionalProps={{
          endIcon: submitting && <CircularProgress
            size={'1em'}
          />,
        }}
        {...props.dialogStyle}
      >
        {formBody}
      </ConfirmationDialog>
    );
  } else {
    // Form state initialization should only depend on initialState prop
    deps = [props.initialState];
    finalRender = (
      <>
        {formBody}
        <Button
          onClick={onSubmit}
          endIcon={submitting && <CircularProgress
            size={'1em'}
          />}
        >
          Submit
        </Button>
      </>
    );
  }

  // Initializes state with initial values and initial state
  // initialState takes priority over initialValue properties
  React.useEffect(() => {
    setState(Object.assign(props.fields.reduce<Partial<T>>(
      (accum, val) => ({
        ...accum,
        [val.field]: val.initialValue,
      }),
      {},
    ), props.initialState));
    setReasons({});
  }, deps);

  return finalRender;
}

export type { FormFieldDescriptor };
export default Form;
