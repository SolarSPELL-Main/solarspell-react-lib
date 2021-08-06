/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Grid, { GridSize } from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from '@material-ui/pickers';

import ExpandPanel from '../ExpandPanel';

/** Specifies how a field should be displayed on the SearchBar */
type FieldDescriptor = {
  /** Key name of the field */
  field: string
  /** Displayed title of the field */
  title: string
  /** What units the field is in */
  unit?: string
  /** 
   * Grid columns taken up by each component in the field.
   * Fields with to/from fields have two components,
   * other fields only have one.
   */
  width: GridSize
} & Field

/** Union type of all possible Field types */
type Field = NumericField | DateField | StringField | EnumField | CustomField

/** Field for from/to numbers */
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
  /** Whether the value should be parsed as an int or a float */
  parseAs?: 'int' | 'float'
  /** Conversion method from number to string */
  formatter?: (val: number, field: 'from'|'to') => number|string
}

/** Field for from/to dates */
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

/** Field for a string */
type StringField = {
  /** 
   * Specifies that the field should be rendered by one
   * TextField.
   * State is formatted as: string
   */
  type: 'string'
}

/** Field for selectable values from a set */
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

/** Field for just about anything */
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

/** Main props object */
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
          let element: React.ReactElement|React.ReactElement[];
          
          // Construct search field according to field descriptor
          // Single TextField for string field
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
          // Two TextFields for numeric field
          } else if (field.type === 'numeric') {
            const parseAs = field.parseAs ?? 'int';
            const parser = parseAs === 'float' ? parseFloat : parseInt;

            element = ['From', 'To'].map(s =>
              <Grid item xs={field.width} key={s}>
                <TextField
                  label={`${field.title} ${s}` + 
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
                  value={current?.[`raw${s}`] ?? ''}
                  onKeyDown={e => {
                    // Stops keys such as 'e' showing up in TextFields,
                    // or '.' if the number should be an integer
                    if (e.key === 'e' || (e.key === '.' && parseAs === 'int')) {
                      e.stopPropagation();
                      e.preventDefault();
                    }
                  }}
                  onChange={event => {
                    event.persist();
                    setter(
                      (oldState: any) => ({
                        ...oldState,
                        [s.toLowerCase()]: event.target.value ?
                          field.formatter ?
                            field.formatter(
                              parser(event.target.value),
                              s.toLowerCase() as 'from'|'to',
                            )
                            :
                            parser(event.target.value)
                          :
                          null,
                        [`raw${s}`]: event.target.value,
                      })
                    );
                  }}
                />
              </Grid>
            );
          // Two TextFields for date field
          } else if (field.type === 'date') {
            element = ['From', 'To'].map(s => 
              <Grid item xs={field.width} key={s}>
                <KeyboardDatePicker
                  label={`${field.title} ${s}` + 
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
                  inputValue={current?.[`raw${s}`] ?? ''}
                  onChange={(date: Date, val?: string|null) => setter(
                    (oldState: any) => ({
                      ...oldState,
                      [`raw${s}`]: val,
                      [s.toLowerCase()]: val ?
                        isValidDate(date) ?
                          field.formatter(date,s.toLowerCase() as 'from'|'to')
                          :
                          oldState?.[s.toLowerCase()]
                        :
                        null,
                    })
                  )}
                />
              </Grid>
            );
          // Select component for enum field
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
          // Custom component for custom field
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
