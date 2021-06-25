import React from 'react';
import Grid from '@material-ui/core/Grid';
import ContentTagger, { ContentTaggerActionProps } from './ContentTagger';

import { BaseMetadata, BaseMetadataType } from '../types';

type ContentMetadataProps<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
> = {
  metadataTypes: T[]
  metadata: Record<number,M[]>
  options: Record<number,M[]>
  actions: ContentTaggerActionProps<T,M>
}

/**
 * This component displays all the metadata of content.
 * It also provides the ability to edit such tags.
 * @param props The context and callbacks of the component.
 * @returns A display for all content metadata.
 */
function ContentMetadata<
  T extends BaseMetadataType,
  M extends BaseMetadata<T>,
>(props: ContentMetadataProps<T,M>): React.ReactElement {
  return (
    <>
      {props.metadataTypes.map(metadataType => {
        return (
          <Grid
            item
            key={metadataType.id}
            xs={12}
            style={{ marginBottom: '10px' }}
          >
            <ContentTagger
              {...props.actions}
              metadataType={metadataType}
              selected={props.metadata[metadataType.id] ?? []}
              options={props.options[metadataType.id] ?? []}
              label={metadataType.name}
            />
          </Grid>
        );
      })}
    </>
  );
}

export default ContentMetadata;
