/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from './ConfirmationDialog';
import { fullEvery } from '../utils';

import { DialogStyleProps } from './types';

type ItemDescriptor<T> = {
  component: React.JSXElementConstructor<any>
  propFactory: (
    setter: (val: any) => void, // sets item's field in state to value
    state: Record<string,any>, // current state
    reasons: Record<string,any>, // current error reasons
  ) => any
  label: keyof T
  initialValue: any
  validator?: (state: Record<string,any>) => any
}

type ContentModalProps<T> = {
  items: ItemDescriptor<T>[]
  onSubmit: (values?: T) => void
  dialogStyle: DialogStyleProps
  open: boolean
  initialState?: Partial<T>
}

function ContentModal<
  T extends Record<string,any>, // type for state
>(props: ContentModalProps<T>): React.ReactElement {
  const [state, setState] = React.useState<Partial<T>>({});
  const [
    reasons,
    setReasons,
  ] = React.useState<Partial<Record<keyof T,string>>>({});

  // Default items for content
  const items: ItemDescriptor<T>[] = [
    {
      component: TextField,
      propFactory: (setter, _state, reasons) => {
        return {
          fullWidth: true,
          label: 'Title',
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            setter(event.currentTarget.value);
          },
          error: !!reasons['title'],
          helperText: reasons['title'],
        };
      },
      label: 'title',
      initialValue: '',
      validator: (state) => {
        if (!state['title']) {
          return 'Title is required.';
        } else {
          return null;
        }
      },
    },
    {
      component: TextField,
      propFactory: (setter) => {
        return {
          fullWidth: true,
          label: 'Description',
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            setter(event.currentTarget.value);
          },
        };
      },
      label: 'description',
      initialValue: '',
    },
    {
      component: (props) => (
        <>
          <Button
            variant={'contained'}
            component={'label'}
            onChange={props.onChange}
          >
            Upload File
            <input
              type={'file'}
              accept={'*'}
              hidden
            />
          </Button>
          <Typography>{props.text}</Typography>
        </>
      ),
      propFactory: (setter, state) => {
        return {
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            const target = event.target as HTMLInputElement;
            setter(target.files?.[0]);
          },
          text: state['file'] ?
            `Existing file: ${state['file'].name}`
            :
            'No file chosen',
        };
      },
      label: 'file',
      initialValue: '',
    },
    {
      component: TextField,
      propFactory: (setter, _state, reasons) => {
        return {
          fullWidth: true,
          label: 'Year of Publication',
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            setter(event.currentTarget.value);
          },
          error: !!reasons['year'],
          helperText: reasons['year'],
        };
      },
      label: 'year',
      initialValue: '',
      validator: (state) => {
        if (!state['year'] || isNaN(Number(state['year']))) {
          return 'Invalid year';
        } else {
          return null;
        }
      },
    },
    {
      component: KeyboardDatePicker,
      propFactory: (setter, state) => {
        return {
          disableToolbar: true,
          variant: 'inline',
          format: 'MM/dd/yyyy',
          label: 'Reviewed Date',
          onChange: (date: Date) => {
            setter(date);
          },
          value: state['reviewDate'],
        };
      },
      label: 'reviewDate',
      initialValue: new Date(),
    },
    {
      component: TextField,
      propFactory: (setter) => {
        return {
          fullWidth: true,
          label: 'Copyright Notes',
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            setter(event.currentTarget.value);
          },
        };
      },
      label: 'copyright',
      initialValue: '',
    },
    {
      component: TextField,
      propFactory: (setter) => {
        return {
          fullWidth: true,
          label: 'Rights Statement',
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            setter(event.currentTarget.value);
          },
        };
      },
      label: 'rights',
      initialValue: '',
    },
    {
      component: (props) => {
        return (
          <>
            <Typography>Duplicatable</Typography>
            <Checkbox {...props} />
          </>
        );
      },
      propFactory: (setter, state) => {
        return {
          checked: state['duplicatable'],
          onChange: (_e: React.SyntheticEvent, checked: boolean) => {
            setter(checked);
          },
        };
      },
      label: 'duplicatable',
      initialValue: false,
    },
    {
      component: TextField,
      propFactory: (setter) => {
        return {
          fullWidth: true,
          label: 'Additional Notes',
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            setter(event.currentTarget.value);
          },
        };
      },
      label: 'notes',
      initialValue: '',
    },
  ];

  // Initializes state with initial values and initial state
  React.useEffect(() => {
    const allItems = items.concat(props.items);

    setState(Object.assign(allItems.reduce<Partial<T>>(
      (accum, val) => ({
        ...accum,
        [val.label]: val.initialValue,
      }),
      {},
    ), props.initialState));
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
  
  // Performs validation on submission
  const onSubmit = React.useCallback((submitted: boolean) => {
    if (submitted) {
      const reasonDraft: typeof reasons = {};

      // Check no reasons present
      if (fullEvery(items, item => {
        if (item.validator) {
          const reason = item.validator(state);
          reasonDraft[item.label] = reason;
          return !reason;
        } else {
          return true;
        }
      })) {
        props.onSubmit(state as T);
        setState({});
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
        {items.concat(props.items).map((item, idx) => {
          return (
            <Grid item key={idx} xs={12} style={{ marginBottom: '10px' }} >
              <item.component {...item.propFactory(
                stateSetter(item.label),
                state,
                reasons,
              )} />
            </Grid>
          );
        })}
      </Grid>
    </ConfirmationDialog>
  );
}

export default ContentModal;
