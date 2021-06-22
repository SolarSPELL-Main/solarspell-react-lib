import React from 'react';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { BaseMetadata, BaseMetadataType } from '../types';

type CreatableProps = {
  creatable: true
  onCreate: (newTags: BaseMetadata[]) => Promise<BaseMetadata[]>
} | {
  creatable?: false
  onCreate?: never
}

type ContentTaggerProps = {
  metadataType: BaseMetadataType
  initialTags?: BaseMetadata[]
  options: BaseMetadata[]
} & CreatableProps

/**
 * This component displays the metadata tags of with the ability to add tags.
 * If creation is enabled, onCreate should handle adding metadata to options
 * and returning an array of the new metadata.
 * @param props The context and callbacks of the component.
 * @returns A tagger component.
 */
function ContentTagger(props: ContentTaggerProps): React.ReactElement {
  const filter = createFilterOptions<BaseMetadata>();
  const [selected, setSelected] = React.useState<BaseMetadata[]>(
    props.initialTags ?? []
  );

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      clearOnBlur
      clearOnEscape
      handleHomeEndKeys
      selectOnFocus
      value={selected}
      options={props.options}
      getOptionLabel={option => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={'Enter tag name...'}
          variant={'outlined'}
        />
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (props.creatable && params.inputValue !== '') {
          filtered.push({
            name: `Add "${params.inputValue}"`,
            id: -1,
            metadataType: props.metadataType,
          });
        }

        return filtered;
      }}
      onChange={(_event, selected) => {
        if (props.creatable) {
          const regularTags = selected.filter(val => val.id !== -1);
          const customTags = selected.filter(val => val.id === -1);

          props.onCreate(customTags).then(res => {
            setSelected(regularTags.concat(res));
          });
        } else {
          setSelected(selected);
        }
      }}
    />
  );
}

export default ContentTagger;
