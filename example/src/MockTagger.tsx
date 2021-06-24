import React from 'react';
import { ContentTagger, BaseMetadata } from 'solarspell-react-lib';

import { metadata, metadataTypes } from './MockData';

function MockTagger(): React.ReactElement {
  const [selected, setSelected] = React.useState<BaseMetadata[]>([]);
  const [
  stateMetadata,
  setStateMetadata,
  ] = React.useState<BaseMetadata[]>(metadata[0]);

  return (
  <ContentTagger
    metadataType={metadataTypes[0]}
    options={stateMetadata}
    selected={selected}
    creatable
    onCreate={(tags) => {
    return new Promise(res => {
      const newTags = tags.map((tag, idx) => ({
      name: tag.name.substring(5, tag.name.length - 1),
      id: idx,
      metadataType: metadataTypes[0],
      }));

      setStateMetadata(stateMetadata.concat(newTags));
      res(newTags);
    });
    }}
    onSelect={(tags) => {
    setSelected(tags);
    }}
  />
  );
}

export default MockTagger;
