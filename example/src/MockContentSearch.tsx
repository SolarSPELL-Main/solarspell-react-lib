import React from 'react';
import {
  ContentSearch,
  ContentMetadataDisplay,
  BaseMetadataType,
  BaseMetadata,
} from 'solarspell-react-lib';
import { format } from 'date-fns';

import { metadata, metadataTypes } from './MockData';

function MockContentSearch(): React.ReactElement {
  return (
    <ContentSearch
      fields={[
        {
          field: 'title',
          title: 'Title',
          type: 'string',
          width: 4,
        },
        {
          field: 'fileName',
          title: 'Filename',
          type: 'string',
          width: 4,
        },
        {
          field: 'copyright',
          title: 'Copyright Notes',
          type: 'string',
          width: 4,
        },
        {
          field: 'years',
          title: 'Years',
          type: 'numeric',
          width: 2,
          min: 0,
        },
        {
          field: 'filesize',
          title: 'Filesize',
          type: 'numeric',
          unit: 'MB',
          width: 2,
          min: 0,
        },
        {
          field: 'reviewed',
          title: 'Reviewed',
          type: 'date',
          width: 2,
          stringifier: (val: Date) => format(val, 'yyyy-MM-dd'),
        },
        {
          field: 'active',
          title: 'Active',
          type: 'enum',
          width: 2,
          options: [
            {
              value: 'all',
              title: 'All',
            },
            {
              value: 'active',
              title: 'Active',
            },
            {
              value: 'inactive',
              title: 'Inactive',
            },
          ],
          initialValue: 'all',
        },
        {
          field: 'duplicatable',
          title: 'Duplicatable',
          type: 'enum',
          width: 2,
          options: [
            {
              value: 'all',
              title: 'All',
            },
            {
              value: 'duplicatable',
              title: 'Duplicatable',
            },
            {
              value: 'nonduplicatable',
              title: 'Non-Duplicatable',
            },
          ],
          initialValue: 'all',
        },
        {
          field: 'metadata',
          title: 'Metadata',
          type: 'custom',
          width: 12,
          component: ContentMetadataDisplay,
          propFactory: (setter, state) => ({
            metadataTypes: metadataTypes,
            metadata: state['metadata'] ?? {},
            options: metadata,
            actions: {
              onSelect: (
                metadataType: BaseMetadataType,
                tags: BaseMetadata[],
              ) => setter(
                (oldState: any) => ({
                  ...oldState,
                  [metadataType.id]: tags,
                })
              )
            },
            width: 6,
            spacing: 2,
          }),
        },
      ]}
      onQueryChange={vals => console.log(vals)}
    />
  );
}

export default MockContentSearch;
