//Importing from outside the project
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Importing from other files of the projects
import { fullEvery } from '../utils';

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
  ) => any
  field: keyof T
  initialValue: any
  validator?: (state: Partial<T>) => any
} | {
  component?: never
  propFactory?: never
  field: keyof T
  initialValue: any
  validator?: (state: Partial<T>) => any
}

type FormProps<T> = {
  fields: FormFieldDescriptor<T>[]
  onSubmit: (values: Partial<T>) => void
  initialState?: Partial<T>
  renderer?: React.JSXElementConstructor<{
    onSubmit: () => void
    body: React.ReactElement
  }>
}

/**
 * A generic form for submitting data.
 * Takes care of state, validation, and callback.
 * Displays fields in a descending order in a column.
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

  // Initializes state with initial values and initial state
  // Initial state takes priority over initialValue properties
  // Also returns a hook on unrender to reset state to empty
  React.useEffect(() => {
    setState(Object.assign(props.fields.reduce<Partial<T>>(
      (accum, val) => ({
        ...accum,
        [val.field]: val.initialValue,
      }),
      {},
    ), props.initialState));

    return () => {
      setState({});
      setReasons({});
    };
  }, [props.fields, props.initialState, setState]);

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

  const stateSetter = React.useCallback(
    (name: keyof T) => genericSetter.bind(null, name),
    [setState, genericSetter],
  );
  
  // Performs validation on submission
  const onSubmit = React.useCallback(() => {
    const reasonDraft: typeof reasons = {};

    // Check no reasons present
    if (fullEvery(props.fields, item => {
      if (item.validator) {
        const reason = item.validator(state);
        reasonDraft[item.field] = reason;
        return !reason;
      } else {
        return true;
      }
    })) {
      props.onSubmit(state);
    }

    setReasons(reasonDraft);
  }, [props.onSubmit, setState, setReasons, state, props.fields]);

  const formBody = (
    <Grid container>
      {props.fields.map((item, idx) => {
        return (
          <Grid item key={idx} xs={12} style={{ marginBottom: '10px' }} >
            {item.component && <item.component {...item.propFactory(
              state,
              reasons,
              stateSetter(item.field),
              genericSetter,
            )} />}
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    props.renderer ?
      <props.renderer
        body={formBody}
        onSubmit={onSubmit}
      />
      :
      <>
        {formBody}
        <Button onClick={onSubmit}>Submit</Button>
      </>
  );
}

export type { FormFieldDescriptor };
export default Form;
