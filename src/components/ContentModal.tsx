/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from './ConfirmationDialog';

import { DialogStyleProps } from './types';

type ItemDescriptor = {
  component: React.JSXElementConstructor<any>
  propFactory: (setter: (val: any) => void) => any
  label: string
}

type ContentModalProps = {
  items: ItemDescriptor[]
  onSubmit: (values?: Record<string,any>) => void
  dialogStyle: DialogStyleProps
  open: boolean
}

function ContentModal(props: ContentModalProps): React.ReactElement {
  const [state, setState] = React.useState<Record<string,any>>({});

  const onSubmit = React.useCallback((submitted: boolean) => {
    if (submitted) {
      props.onSubmit(state);
    } else {
      props.onSubmit();
    }
  }, [props.onSubmit, state]);

  const setter = React.useCallback(
    (name: string) => (val: any) => {
      setState(oldState => ({
        ...oldState,
        [name]: val,
      }));
    },
    [setState],
  );

  const items: ItemDescriptor[] = [
    {
      component: TextField,
      propFactory: (setter) => {
        return {
          fullWidth: true,
          label: 'Title',
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            setter(event.currentTarget.value);
          },
        };
      },
      label: 'title',
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
    },
    {
      component: TextField,
      propFactory: (setter) => {
        return {
          fullWidth: true,
          label: 'Year of Publication',
          onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
            setter(event.currentTarget.value);
          },
        };
      },
      label: 'year',
    },
    {
      component: KeyboardDatePicker,
      propFactory: (setter) => {
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
    },
  ];

  return (
    <ConfirmationDialog
      onClose={onSubmit}
      open={props.open}
      {...props.dialogStyle}
    >
      <Grid container>
        {items.concat(props.items).map((item, idx) => {
          return (
            <Grid item key={idx} xs={12} style={{ marginBottom: '10px' }} >
              <item.component {...item.propFactory(setter(item.label))} />
            </Grid>
          );
        })}
      </Grid>
    </ConfirmationDialog>
  );
}

export default ContentModal;
