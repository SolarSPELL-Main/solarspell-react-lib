import React from 'react';
import { ContentMetadataDisplay } from 'solarspell-react-lib';

import { metadata, metadataTypes } from './MockData';

function MockTagger(): React.ReactElement {
  const [
    selected,
    setSelected,
  ] = React.useState<typeof metadata>({});
  const [
    stateMetadata,
    setStateMetadata,
  ] = React.useState<typeof metadata>(metadata);

  return (
    <ContentMetadataDisplay
      metadataTypes={metadataTypes}
      metadata={selected}
      options={stateMetadata}
      actions={{
        creatable: true,
        onCreate: (metadataType, tags) => {
          return new Promise(res => {
            const newTags = tags.map((tag) => ({
              name: tag.name.substring(5, tag.name.length - 1),
              id: Math.round(Math.random() * 1000),
              metadataType: metadataTypes[0],
            }));

            setStateMetadata(oldMetadata => ({
              ...oldMetadata,
              [metadataType.id]: newTags.concat(
                oldMetadata[metadataType.id],
              ),
            }));
            res(newTags);
          });
        },
        onSelect: (metadataType, tags) => {
          setSelected(oldTags => ({
            ...oldTags,
            [metadataType.id]: tags,
          }));
        }
      }}
    />
  );
}

export default MockTagger;
