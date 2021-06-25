import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ContentModal, BaseContent } from 'solarspell-react-lib';

// Additional fields seen in DLMS for demo purposes
type FullBaseContent = {
  duplicatable: boolean
  notes: string
  reviewDate: Date
  file?: File
} & BaseContent

function MockContentModal(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const onSubmit = React.useCallback(
    (values?: Record<string, any>) => {
      console.log(values);
      setOpen(false);
    },
    [],
  );

  return (
  <>
    <Button
    variant={'contained'}
    color={'primary'}
    onClick={() => setOpen(true)}
    >
      Add Content
    </Button>
    <ContentModal<FullBaseContent>
      items={[
        {
          component: TextField,
          propFactory: (_s, reasons, setter) => {
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
          propFactory: (_s, _r, setter) => {
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
          propFactory: (state, _r, setter, genericSetter) => {
            return {
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                const target = event.target as HTMLInputElement;
                const file = target.files?.[0];
                if (file) {
                  setter(file);
                  genericSetter('fileName', file.name);
                }
              },
              text: state['fileName'] ?
                `Existing file: ${state['fileName']}`
                :
                'No file chosen',
            };
          },
          label: 'file',
          initialValue: undefined,
        },
        {
          component: TextField,
          propFactory: (_s, reasons, setter) => {
            return {
              fullWidth: true,
              label: 'Year of Publication',
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                setter(event.currentTarget.value);
              },
              error: !!reasons['datePublished'],
              helperText: reasons['datePublished'],
            };
          },
          label: 'datePublished',
          initialValue: '',
          validator: (state) => {
            if (!state['datePublished'] || isNaN(Number(state['datePublished']))) {
              return 'Invalid year';
            } else {
              return null;
            }
          },
        },
        {
          component: KeyboardDatePicker,
          propFactory: (state, _r, setter) => {
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
          propFactory: (_s, _r, setter) => {
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
          propFactory: (_s, _r, setter) => {
            return {
              fullWidth: true,
              label: 'Rights Statement',
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                setter(event.currentTarget.value);
              },
            };
          },
          label: 'rightsStatement',
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
          propFactory: (state, _r, setter) => {
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
          propFactory: (_s, _r, setter) => {
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
      ]}
      dialogStyle={{
        title: 'Add New Item',
        cancelColor: 'secondary',
        confirmColor: 'primary',
        confirmText: 'Add',
      }}
      onSubmit={onSubmit}
      open={open}
    />
  </>
  );
}

export default MockContentModal;
