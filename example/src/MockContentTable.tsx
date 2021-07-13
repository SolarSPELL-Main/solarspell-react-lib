import React from 'react';
import Button from '@material-ui/core/Button';
import { GridColDef } from '@material-ui/data-grid';
import { format } from 'date-fns';

import { ContentTable, ContentColumnSelection } from 'solarspell-react-lib';

import ContentActionPanel from './ContentActionPanel';
import { metadataTypes, content, DLMSContent } from './MockData';

function MockContentTable(): React.ReactElement {
  const [stateContent, setStateContent] = React.useState(content);
  const [open, setOpen] = React.useState(false);
  const [cols, setCols] = React.useState<GridColDef[]>([]);

  const onEdit_ = React.useCallback(
    (item: DLMSContent, vals: Partial<DLMSContent>) => {
      setStateContent(oldState => [
        ...oldState.filter(v => v.id !== item.id),
        Object.assign({}, item, vals),
      ]);
    },
    [setStateContent],
  );

  const onToggleActive_ = React.useCallback(
    (item: DLMSContent, active: boolean) => {
      setStateContent(oldState => [
        ...oldState.filter(v => v.id !== item.id),
        Object.assign({}, item, { active }),
      ]);
    },
    [setStateContent],
  );

  return (
    <>
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => setOpen(true)}
      >
        Column Selection
      </Button>
      <ContentColumnSelection<DLMSContent>
        open={open}
        metadataTypes={metadataTypes}
        onClose={c => {
          setCols(c);
          setOpen(false);
        }}
        fields={[
          {
            title: 'Duplicatable',
            field: 'duplicatable',
            column: (f, b) => ({
              field: f.field,
              headerName: f.title,
              flex: 1,
              disableColumnMenu: true,
              filterable: false,
              hide: b,
              valueFormatter: (params) => {
                return params.getValue(
                  params.id, f.field,
                ) ? 'Yes' : 'No';
              },
            }),
          },
          {
            title: 'Review Data',
            field: 'reviewDate',
            column: (f, b) => ({
              field: f.field,
              headerName: f.title,
              flex: 1,
              disableColumnMenu: true,
              filterable: false,
              hide: b,
              valueFormatter: (params) => {
                return format(params.getValue(
                  params.id, f.field,
                ) as Date, 'yyyy-MM-dd');
              },
            }),
          },
        ]}
      />
      <ContentTable
        content={stateContent}
        selectable
        components={{
          ActionPanel: ContentActionPanel,
        }}
        componentProps={{
          ActionPanel: {
            onEdit: onEdit_,
            onToggleActive: onToggleActive_,
          },
        }}
        additionalColumns={cols}
      />
    </>
  )
}

export default MockContentTable;
