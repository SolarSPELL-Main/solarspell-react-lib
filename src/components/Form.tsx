//Importing from outside the project
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Importing from other files of the projects
import ConfirmationDialog from './ConfirmationDialog';
import { fullEvery } from '../utils';
import type { DialogConfirmationStyleProps } from './types';

type FormFieldDescriptor<T> = {
  component: React.JSXElementConstructor<any>
  propFactory: (
    state: Partial<T>, // current state
    reasons: Partial<Record<keyof T,any>>, // current error reasons
    setter: (val: any) => void, // sets item's field in state to value
    genericSetter: (
      field: keyof T,
      val: any,
    ) => void, // set any field in state to value
    genericReasonSetter: (
      field: keyof T,
      val: any,
    ) => void, // set any field in reasons to value
  ) => any
  field: keyof T
  initialValue: any
  validator?: (state: Partial<T>) => any
  mb?: string|number
} | {
  component?: never
  propFactory?: never
  field: keyof T
  initialValue: any
  validator?: (state: Partial<T>) => any
  mb?: never
}

type FormOptionalProps<T> = {
  type: 'dialog'
  onSubmit: (values?: Partial<T>) => void // null when submit cancelled
  dialogStyle: DialogConfirmationStyleProps
  open: boolean
} | {
  type?: never
  onSubmit: (values: Partial<T>) => void
}

type FormProps<T> = {
  fields: FormFieldDescriptor<T>[]
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
      // To enable async validation, assume all results are promises
      setSubmitting(true);

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

        if (valid) {
          props.onSubmit(state);
        }
      });
    }
  }, [props.onSubmit, setState, setReasons, state, props.fields]);

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

  switch (props.type) {
    case 'dialog':
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
      break;
    default:
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
      break;
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
