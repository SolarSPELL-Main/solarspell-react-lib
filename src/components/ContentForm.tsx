/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from './ConfirmationDialog';

import { DialogStyleProps } from './types';

type ItemDescriptor = {
  component: React.JSXElementConstructor<any>
  propFactory: (setter: (val: any) => void) => any
  label: string
}

type ContentFormProps = {
  items: ItemDescriptor[]
  onSubmit: (values?: Record<string,any>) => void
  dialogStyle: DialogStyleProps
  open: boolean
}

function ContentForm(props: ContentFormProps): React.ReactElement {
  const [state, setState] = React.useState<Record<string,any>>({});

  const onSubmit = React.useCallback((submitted: boolean) => {
    if (submitted) {
      props.onSubmit(state);
    } else {
      props.onSubmit();
    }
  }, [props.onSubmit, state]);

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
  ];

  return (
    <ConfirmationDialog
      onClose={onSubmit}
      open={props.open}
      {...props.dialogStyle}
    >
      <Grid container>
        {items.concat(props.items).map((item, idx) => {
          const setter = React.useCallback(
            (val: any) => {
              setState(oldState => ({
                ...oldState,
                [item.label]: val,
              }));
            },
            [item.label, setState],
          );

          return (
            <Grid item key={idx}>
              <item.component {...item.propFactory(setter)} />
            </Grid>
          );
        })}
      </Grid>
    </ConfirmationDialog>
  );
}

export default ContentForm;
