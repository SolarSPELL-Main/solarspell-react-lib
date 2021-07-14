/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Grid, { GridSize } from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from '@material-ui/pickers';

import ExpandPanel from '../ExpandPanel';

type FieldDescriptor = {
  field: string
  title: string
  unit?: string
  width: GridSize
} & Field

type Field = NumericField | DateField | StringField | EnumField | CustomField

type NumericField = {
  type: 'numeric'
  min?: number
  max?: number
}

type DateField = {
  type: 'date'
  stringifier: (val: Date) => string
  parser: (val: string) => Date
}

type StringField = {
  type: 'string'
}

type EnumField = {
  type: 'enum'
  options: {
    value: string
    title: string
  }[]
  initialValue: string
}

type CustomField = {
  type: 'custom'
  component: React.JSXElementConstructor<any>
  propFactory: (setter: (val: any) => void, state: Record<string,any>) => any
}

type ContentSearchProps = {
  fields: FieldDescriptor[]
  onQueryChange: (values: any) => void
}

/**
 * Expandable search bar for content (or general use).
 * @param props The callback and fields of the search bar.
 * @returns A search bar nested in an expandable panel.
 */
function ContentSearch(props: ContentSearchProps): React.ReactElement {
  const [state, setState] = React.useState<Record<string,any>>({});

  // Factory for setters
  const setterFactory = React.useCallback(
    (field: string) => (val: any) => setState(
      oldState => ({
        ...oldState,
        [field]: (val instanceof Function) ? val(oldState[field]) : val,
      }),
    ),
    [setState],
  );

  // Fire onQueryChange callback on state change
  React.useEffect(() => {
    props.onQueryChange(state);
  }, [state, props.onQueryChange]);

  const isValidDate = (date: Date) => date && !isNaN(date.getTime());

  return (
    <ExpandPanel header={'Search'}>
      <Grid container spacing={2}>
        {props.fields.map(field => {
          const current = state[field.field];
          const setter = setterFactory(field.field);
          let element: React.ReactElement;
          
          // Construct search field according to field descriptor
          switch (field.type) {
            case 'string':
              element = (
                <Grid item xs={field.width} >
                  <TextField
                    label={`${field.title}` + 
                      (field.unit ? ` (${field.unit})` : '')
                    }
                    fullWidth
                    value={current ?? ''}
                    onChange={event => {
                      event.persist();
                      setter(event.target.value);
                    }}
                  />
                </Grid>
              );
              break;
            case 'numeric':
              element = (<>
                <Grid item xs={field.width} >
                  <TextField
                    label={`${field.title} From` + 
                      (field.unit ? ` (${field.unit})` : '')
                    }
                    type={'number'}
                    InputProps={{
                      inputProps: {
                        min: field.min ?? -Infinity,
                        max: field.max ?? Infinity,
                      },
                    }}
                    fullWidth
                    value={current?.from ?? ''}
                    onChange={event => {
                      event.persist();
                      setter(
                        (oldState: any) => ({
                          ...oldState,
                          from: event.target.value ?
                            parseInt(event.target.value)
                            :
                            null,
                        })
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={field.width} >
                  <TextField
                    label={`${field.title} To` + 
                      (field.unit ? ` (${field.unit})` : '')
                    }
                    type={'number'}
                    InputProps={{
                      inputProps: {
                        min: field.min ?? -Infinity,
                        max: field.max ?? Infinity,
                      },
                    }}
                    fullWidth
                    value={current?.to ?? ''}
                    onChange={event => {
                      event.persist();
                      setter(
                        (oldState: any) => ({
                          ...oldState,
                          to: event.target.value ?
                            parseInt(event.target.value)
                            :
                            null,
                        })
                      );
                    }}
                  />
                </Grid>
              </>);
              break;
            case 'date':
              element = (<>
                <Grid item xs={field.width} >
                  <KeyboardDatePicker
                    label={`${field.title} From` + 
                      (field.unit ? ` (${field.unit})` : '')
                    }
                    variant={'inline'}
                    format={'MM/dd/yyyy'}
                    // Why all this complicated hubaloo?
                    // Because we want the user to be able to type in
                    // any date they want, but we also want the actual
                    // state submitted to be valid.
                    // So we require this kind of dual-state that keeps
                    // track of the possibly-invalid state and the
                    // actual valid state.
                    value={null}
                    inputValue={current?.rawFrom ?? ''}
                    onChange={(date: Date, val?: string|null) => setter(
                      (oldState: any) => ({
                        ...oldState,
                        rawFrom: val,
                        from: val ?
                          isValidDate(date) ?
                            field.stringifier(date)
                            :
                            oldState?.from
                          :
                          null,
                      })
                    )}
                  />
                </Grid>
                <Grid item xs={field.width} >
                  <KeyboardDatePicker
                    label={`${field.title} To` + 
                      (field.unit ? ` (${field.unit})` : '')
                    }
                    variant={'inline'}
                    format={'MM/dd/yyyy'}
                    value={null}
                    inputValue={current?.rawTo ?? ''}
                    onChange={(date: Date, val?: string|null) => setter(
                      (oldState: any) => ({
                        ...oldState,
                        rawTo: val,
                        to: val ?
                          isValidDate(date) ?
                            field.stringifier(date)
                            :
                            oldState?.to
                          :
                          null,
                      })
                    )}
                  />
                </Grid>
              </>);
              break;
            case 'enum':
              element = (
                <Grid item xs={field.width} >
                  <Select
                    style={{alignSelf: 'bottom'}}
                    label={field.title}
                    value={current ?? field.initialValue}
                    onChange={event => setter(event.target.value)}
                  >
                    {field.options.map(
                      opt => (
                        <MenuItem value={opt.value} key={opt.value}>
                          {opt.title}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Grid>
              );
              break;
            case 'custom':
              element = (
                <Grid item xs={field.width}>
                  <field.component {...field.propFactory(setter, state)} />
                </Grid>
              );
              break;
          }

          return <React.Fragment key={field.field}>{element}</React.Fragment>;
        })}
      </Grid>
    </ExpandPanel>
  );
}

export default ContentSearch;
