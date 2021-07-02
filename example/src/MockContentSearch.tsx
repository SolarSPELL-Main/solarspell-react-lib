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
          label: 'title',
          title: 'Title',
          type: 'string',
          width: 4,
        },
        {
          label: 'fileName',
          title: 'Filename',
          type: 'string',
          width: 4,
        },
        {
          label: 'copyright',
          title: 'Copyright Notes',
          type: 'string',
          width: 4,
        },
        {
          label: 'years',
          title: 'Years',
          type: 'numeric',
          width: 2,
          min: 0,
        },
        {
          label: 'filesize',
          title: 'Filesize',
          type: 'numeric',
          unit: 'MB',
          width: 2,
          min: 0,
        },
        {
          label: 'reviewed',
          title: 'Reviewed',
          type: 'date',
          width: 2,
          stringifier: (val: Date) => format(val, 'yyyy-MM-dd'),
        },
        {
          label: 'active',
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
          label: 'duplicatable',
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
          label: 'metadata',
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
          }),
        },
      ]}
      onQueryChange={vals => console.log(vals)}
    />
  );
}

export default MockContentSearch;
