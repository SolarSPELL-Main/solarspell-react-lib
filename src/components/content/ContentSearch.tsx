/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Grid, { GridSize } from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from '@material-ui/pickers';

import ExpandPanel from '../ExpandPanel';

type FieldDescriptor = {
  /** Key name of the field */
  field: string
  /** Displayed title of the field */
  title: string
  /** What units the field is in */
  unit?: string
  /** Grid columns taken up by the field */
  width: GridSize
} & Field

type Field = NumericField | DateField | StringField | EnumField | CustomField

type NumericField = {
  /** 
   * Specifies that the field should be rendered by two
   * TextFields, for from/to values respectively.
   * State is formatted as: {
   *  from: number
   *  to: number
   * }
   */
  type: 'numeric'
  /** Minimum value for field */
  min?: number
  /** Maximum value for field */
  max?: number
  /** Conversion method from number to string */
  formatter?: (val: number, field: 'from'|'to') => number|string
}

type DateField = {
  /** 
   * Specifies that the field should be rendered by two
   * TextFields, for from/to values respectively.
   * State is formatted as: {
   *  from: string
   *  rawFrom: string
   *  to: string
   *  rawTo: string
   * }
   */
  type: 'date'
  /** Conversion method from Date to string */
  formatter: (val: Date, field: 'from'|'to') => string
}

type StringField = {
  /** 
   * Specifies that the field should be rendered by one
   * TextField.
   * State is formatted as: string
   */
  type: 'string'
}

type EnumField = {
  /** 
   * Specifies that the field should be rendered by a
   * combo box (Select).
   * State is formatted as: string
   */
  type: 'enum'
  /** The enum represented by the field */
  options: {
    /** Actual value of the enum */
    value: string
    /** Displayed name of the enum */
    title: string
  }[]
  /** Initial selected enum value */
  initialValue: string
}

type CustomField = {
  /**
   * Specifies that the field should be rendered by a
   * custom component.
   * State is formatted however it is specified by the setter.
   */
  type: 'custom'
  /** Custom component to render for the field */
  component: React.JSXElementConstructor<any>
  /** Props for the component derived from the state setter and current state */
  propFactory: (setter: (val: any) => void, state: Record<string,any>) => any
}

type ContentSearchProps = {
  /** Fields to display in the search bar */
  fields: FieldDescriptor[]
  /** Callback to fire whenever any field changes */
  onQueryChange: (values: any) => void
}

/**
 * Expandable search bar for content (or general use).
 * Contains preset fields for various purposes, specified by
 * the 'type' property in the FieldDescriptor type.
 * @param props The callback and fields of the search bar.
 * @returns A search bar nested in an expandable panel.
 */
function ContentSearch(props: ContentSearchProps): React.ReactElement {
  const [state, setState] = React.useState<Record<string,any>>(
    // Create initial state
    props.fields.reduce<Record<string,any>>(
      (accum, field) => {
        // Takes into account fields with initial values
        if ('initialValue' in field) {
          return {
            ...accum,
            [field.field]: field.initialValue,
          };
        } else {
          return {
            ...accum,
            [field.field]: undefined,
          };
        }
      },
      {},
    ),
  );

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
  }, [state]);

  // Check for whether a date is ready for submission (by nature of being valid)
  const isValidDate = (date: Date) => date && !isNaN(date.getTime());

  return (
    <ExpandPanel header={'Search'}>
      <Grid container spacing={2}>
        {props.fields.map(field => {
          const current = state[field.field];
          const setter = setterFactory(field.field);
          let element: React.ReactElement;
          
          // Construct search field according to field descriptor
          if (field.type === 'string') {
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
          } else if (field.type === 'numeric') {
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
                  value={current?.rawFrom ?? ''}
                  onChange={event => {
                    event.persist();
                    setter(
                      (oldState: any) => ({
                        ...oldState,
                        from: event.target.value ?
                          field.formatter ?
                            field.formatter(
                              parseInt(event.target.value),
                              'from',
                            )
                            :
                            parseInt(event.target.value)
                          :
                          null,
                        rawFrom: event.target.value,
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
                  value={current?.rawTo ?? ''}
                  onChange={event => {
                    event.persist();
                    setter(
                      (oldState: any) => ({
                        ...oldState,
                        to: event.target.value ?
                          field.formatter ?
                            field.formatter(
                              parseInt(event.target.value),
                              'to',
                            )
                            :
                            parseInt(event.target.value)
                          :
                          null,
                        rawTo: event.target.value,
                      })
                    );
                  }}
                />
              </Grid>
            </>);
          } else if (field.type === 'date') {
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
                  // Raw input values are stored in rawTo/From in state,
                  // and valid dates are stored in from/to in state, after
                  // stringification.
                  value={null}
                  inputValue={current?.rawFrom ?? ''}
                  onChange={(date: Date, val?: string|null) => setter(
                    (oldState: any) => ({
                      ...oldState,
                      rawFrom: val,
                      from: val ?
                        isValidDate(date) ?
                          field.formatter(date,'from')
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
                          field.formatter(date,'to')
                          :
                          oldState?.to
                        :
                        null,
                    })
                  )}
                />
              </Grid>
            </>);
          } else if (field.type === 'enum') {
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
          } else if (field.type === 'custom') {
            element = (
              <Grid item xs={field.width}>
                <field.component {...field.propFactory(setter, state)} />
              </Grid>
            );
          } else {
            throw Error('Invalid field type.');
          }

          return <React.Fragment key={field.field}>{element}</React.Fragment>;
        })}
      </Grid>
    </ExpandPanel>
  );
}

export default ContentSearch;
