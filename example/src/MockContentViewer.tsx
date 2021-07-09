import React from 'react';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';

import { ContentViewer } from 'solarspell-react-lib';
import { content, metadataTypes } from './MockData';

function MockContentViewer(): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>View</Button>
      <ContentViewer
        open={open}
        onClose={() => setOpen(false)}
        content={content[0]}
        metadataTypes={metadataTypes}
        items={[
          {
            title: 'Title',
            field: 'title',
          },
          {
            title: 'Description',
            field: 'description',
          },
          {
            title: 'Filename',
            field: 'fileName',
          },
          {
            title: 'Year of Publication',
            field: 'datePublished',
          },
          {
            title: 'Reviewed On',
            field: 'reviewDate',
            formatter: (d: Date) => format(d, 'yyyy-MM-dd'),
          },
          {
            title: 'Copyright Notes',
            field: 'copyright',
          },
          {
            title: 'Rights Statement',
            field: 'rightsStatement',
          },
          {
            title: 'Additional Notes',
            field: 'notes',
          },
          {
            title: 'Duplicatable',
            field: 'duplicatable',
            formatter: (b: boolean) => b ? 'Yes' : 'No',
          },
        ]}
      />
    </>
  );
}

export default MockContentViewer;
