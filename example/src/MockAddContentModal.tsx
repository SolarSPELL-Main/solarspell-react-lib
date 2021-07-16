import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  ContentModal,
  ContentMetadataDisplay,
  BaseMetadataType,
  BaseMetadata,
} from 'solarspell-react-lib';

import { metadata, metadataTypes, DLMSContent, content } from './MockData';

function MockAddContentModal(): React.ReactElement {
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
    <ContentModal<DLMSContent>
      initialState={content[0]}
      fields={[
        {
          component: TextField,
          propFactory: (state, reasons, setter) => {
            return {
              fullWidth: true,
              label: 'Title',
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                setter(event.currentTarget.value);
              },
              error: !!reasons['title'],
              helperText: reasons['title'],
              value: state['title'],
            };
          },
          field: 'title',
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
          propFactory: (state, reasons, setter, _g, genericReasonSetter) => {
            return {
              fullWidth: true,
              label: 'Description',
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                setter(event.currentTarget.value);
                genericReasonSetter('description', 'You typed');
              },
              value: state['description'],
              error: !!reasons['description'],
              helperText: reasons['description'],
            };
          },
          field: 'description',
          initialValue: '',
          validator: () => {
            return new Promise(resolve => {
              console.log('Started 3 sec async validator');
              setTimeout(() => resolve('NOPE'), 3000);
            })
          },
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
          field: 'file',
          initialValue: undefined,
        },
        {
          field: 'fileName',
          initialValue: '',
        },
        {
          component: TextField,
          propFactory: (state, reasons, setter) => {
            return {
              fullWidth: true,
              label: 'Year of Publication',
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                setter(event.currentTarget.value);
              },
              error: !!reasons['datePublished'],
              helperText: reasons['datePublished'],
              value: state['datePublished'],
            };
          },
          field: 'datePublished',
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
          field: 'reviewDate',
          initialValue: new Date(),
        },
        {
          component: TextField,
          propFactory: (state, _r, setter) => {
            return {
              fullWidth: true,
              label: 'Copyright Notes',
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                setter(event.currentTarget.value);
              },
              value: state['copyright'],
            };
          },
          field: 'copyright',
          initialValue: '',
        },
        {
          component: TextField,
          propFactory: (state, _r, setter) => {
            return {
              fullWidth: true,
              label: 'Rights Statement',
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                setter(event.currentTarget.value);
              },
              value: state['rightsStatement'],
            };
          },
          field: 'rightsStatement',
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
          field: 'duplicatable',
          initialValue: false,
        },
        {
          component: ContentMetadataDisplay,
          propFactory: (state, _r, setter) => {
            return {
              metadataTypes: metadataTypes,
              metadata: state['metadata'],
              options: metadata,
              actions: {
                onSelect: (
                  metadataType: BaseMetadataType,
                  selected: BaseMetadata[],
                ) => {
                  setter((oldState: typeof metadata) => ({
                    ...oldState,
                    [metadataType.id]: selected,
                  }));
                },
              },
            };
          },
          field: 'metadata',
          initialValue: {},
        },
        {
          component: TextField,
          propFactory: (state, _r, setter) => {
            return {
              fullWidth: true,
              label: 'Additional Notes',
              onChange: (event: React.SyntheticEvent<HTMLInputElement>) => {
                setter(event.currentTarget.value);
              },
              value: state['notes'],
            };
          },
          field: 'notes',
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

export default MockAddContentModal;
