import React from 'react';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { BaseMetadata, BaseMetadataType } from '../../types';

type CreatableProps<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
> = {
  creatable: true
  // Fired whenever a new tag is created
  // Can be used for async metadata creation
  onCreate: (
    metadataType: T,
    newTags: M[],
  ) => Promise<M[]>
} | {
  creatable?: false
  onCreate?: never
}

type ContentTaggerActionProps<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
> = {
  // Fired whenever a tag is selected
  onSelect?: (
    metadataType: T,
    tags: M[],
  ) => void
  // Fired whenever TextField input changes
  // Can be used for async metadata fetching/filtering
  onInputChange?: (
    metadataType: T,
    val: string,
  ) => void
} & CreatableProps<T,M>

type ContentTaggerProps<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
> = {
  label?: string
  // Overarching type
  metadataType: T
  // Possible options for metadata
  options: M[]
  // Initial selected tags
  selected?: M[]
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
  const filter = createFilterOptions<M>();

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

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      clearOnBlur
      clearOnEscape
      handleHomeEndKeys
      selectOnFocus
      value={props.selected}
      options={props.options}
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
          filtered.length === 0 &&
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
