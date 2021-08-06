import React from 'react';

import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { BaseMetadata, BaseMetadataType } from '../../types';

/** Enables creation of new metadata in the tagger */
type CreatableProps<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
> = {
  /**
   * Whether the tagger should allow for tag creation.
   * This means if the user input does not match
   * the listed tags, it displays an additional
   * 'Add "{user input}"' option.
   */
  creatable: true
  /**
   * Callback to fire on tag creation.
   * Should ideally return a Promise that
   * resolves into the newly created tags,
   * but this can be circumvented using
   * the toAdd prop.
   */
  onCreate: (
    metadataType: T,
    newTags: M[],
  ) => Promise<M[]>
} | {
  creatable?: false
  onCreate?: never
}

/** Callbacks associated with the component */
type ContentTaggerActionProps<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
> = {
  /** Callback to fire on tag selection */
  onSelect?: (
    metadataType: T,
    tags: M[],
  ) => void
  /**
   * Callback to fire on input change.
   * Can be used for async option fetching, etc.
   */
  onInputChange?: (
    metadataType: T,
    val: string,
  ) => void
} & CreatableProps<T,M>

/** Main props object */
type ContentTaggerProps<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
> = {
  /** The label to display on the textfield used for tagging */
  label?: string
  /** The metadata type to which all the options belong */
  metadataType: T
  /** Possible options for tagging */
  options: M[]
  /** List of currently selected tags */
  selected?: M[]
  /** Additional tags to add to selected */
  toAdd?: M[]
} & ContentTaggerActionProps<T,M>

/**
 * This component displays editable metadata of content of a single type.
 * If creation is enabled, onCreate should handle adding metadata to options
 * and returning an array of the new metadata.
 * @param props The context and callbacks of the component.
 * @returns A tagger component.
 */
function ContentTagger<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
>(props: ContentTaggerProps<T,M>): React.ReactElement {
  const [selected, setSelected] = React.useState(props.selected);
  const filter = createFilterOptions<M>();

  // Check if callbacks are null before calling them
  const onInputChange = React.useCallback((_event, val: string) => {
    if (props.onInputChange) {
      props.onInputChange(props.metadataType, val);
    }
  }, [props.onInputChange, props.metadataType]);

  const onSelect = React.useCallback((tags: M[]) => {
    if (props.onSelect) {
      props.onSelect(props.metadataType, tags);
    }
  }, [props.onSelect, props.metadataType]);

  const onChange = React.useCallback((_event, selected: M[]) => {
    if (props.creatable) {
      // Split between regular tags and to-be-added tags
      const regularTags = selected.filter(val => val.id !== -1);
      const customTags = selected.filter(val => val.id === -1);

      props.onCreate(props.metadataType, customTags).then(res => {
        onSelect(regularTags.concat(res));
      });
    } else {
      onSelect(selected);
    }
  }, [onSelect, props.metadataType]);

  React.useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  // Sync option for adding metadata to selected
  React.useEffect(() => {
    const keySet = new Set(selected?.map(v => v.id));
    const toAdd = props.toAdd?.filter(v => !keySet.has(v.id));
    const onSelect = props.onSelect;

    if (toAdd && toAdd.length > 0) {
      setSelected(oldState => {
        if (!oldState) {
          if (onSelect) {
            onSelect(props.metadataType, toAdd);
          }

          return toAdd;
        }

        const newState = oldState.concat(toAdd);

        if (onSelect) {
          onSelect(props.metadataType, newState);
        }

        return newState;
      });
    }

  }, [props.toAdd]);

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      clearOnBlur
      clearOnEscape
      handleHomeEndKeys
      selectOnFocus
      value={selected}
      options={[...props.options, ...selected ?? []]}
      getOptionSelected={(option, val) => option.id === val.id}
      getOptionLabel={option => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={'Enter tag name...'}
          variant={'standard'}
          label={props.label}
        />
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value if metadata not present
        if (
          props.creatable &&
          !filtered.some(v => v.name === params.inputValue) &&
          params.inputValue !== ''
        ) {
          // Partial can be cast as M since it will not be included
          // in the final results anyways (id == -1)
          filtered.push({
            name: `Add "${params.inputValue}"`,
            id: -1,
            metadataType: props.metadataType,
          } as M);
        }

        return filtered;
      }}
      onChange={onChange}
      onInputChange={onInputChange}
    />
  );
}

export type { ContentTaggerActionProps };
export default ContentTagger;
