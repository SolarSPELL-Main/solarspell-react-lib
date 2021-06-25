/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from './ConfirmationDialog';
import { fullEvery } from '../utils';

import { DialogStyleProps } from './types';
import { BaseContent } from '../types';

type ItemDescriptor<T, K extends keyof T> = {
  component: React.JSXElementConstructor<any>
  propFactory: (
    state: Partial<T>, // current state
    reasons: Partial<Record<K,string>>, // current error reasons
    setter: (val: any) => void, // sets item's field in state to value
    genericSetter: (
      label: K,
      val: any,
    ) => void, // set any field in state to value
  ) => any
  label: K
  initialValue: T[K]
  validator?: (state: Partial<T>) => any
} | {
  component?: never
  propFactory?: never
  label: K
  initialValue: T[K]
  validator?: (state: Partial<T>) => any
}

type ContentModalProps<T> = {
  items: ItemDescriptor<T, keyof T>[]
  onSubmit: (values?: T) => void // values is null when submit cancelled
  dialogStyle: DialogStyleProps
  open: boolean
  initialState?: Partial<T>
}

/**
 * The modal for adding/editing content.
 * Takes care of state, validation, and callback.
 * @param props The form content and callbacks.
 * @returns A modal for content.
 */
function ContentModal<
  T extends BaseContent, // type for state
>(props: ContentModalProps<T>): React.ReactElement {
  const [state, setState] = React.useState<Partial<T>>({});
  const [
    reasons,
    setReasons,
  ] = React.useState<Partial<Record<keyof T,string>>>({});

  // Initializes state with initial values and initial state
  // Initial state takes priority over initialValue properties
  // Also returns a hook on unrender to reset state to empty
  React.useEffect(() => {
    setState(Object.assign(props.items.reduce<Partial<T>>(
      (accum, val) => ({
        ...accum,
        [val.label]: val.initialValue,
      }),
      {},
    ), props.initialState));

    return () => setState({});
  }, [props.items, props.initialState, setState]);

  // Setter factory function
  const stateSetter = React.useCallback(
    (name: keyof T) => (val: any) => {
      setState(oldState => ({
        ...oldState,
        [name]: val,
      }));
    },
    [setState],
  );

  const genericSetter = React.useCallback(
    (name: keyof T, val: any) => {
      setState(oldState => ({
        ...oldState,
        [name]: val,
      }));
    },
    [setState],
  );
  
  // Performs validation on submission
  const onSubmit = React.useCallback((submitted: boolean) => {
    if (submitted) {
      const reasonDraft: typeof reasons = {};

      // Check no reasons present
      if (fullEvery(props.items, item => {
        if (item.validator) {
          const reason = item.validator(state);
          reasonDraft[item.label] = reason;
          return !reason;
        } else {
          return true;
        }
      })) {
        props.onSubmit(state as T);
      }

      setReasons(reasonDraft);
    } else {
      props.onSubmit();
    }
  }, [props.onSubmit, setState, setReasons, state]);

  return (
    <ConfirmationDialog
      onClose={onSubmit}
      open={props.open}
      preventDefault={false}
      {...props.dialogStyle}
    >
      <Grid container>
        {props.items.map((item, idx) => {
          return (
            <Grid item key={idx} xs={12} style={{ marginBottom: '10px' }} >
              {item.component && <item.component {...item.propFactory(
                state,
                reasons,
                stateSetter(item.label),
                genericSetter,
              )} />}
            </Grid>
          );
        })}
      </Grid>
    </ConfirmationDialog>
  );
}

export default ContentModal;
