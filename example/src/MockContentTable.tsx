import React from 'react';
import { ContentTable } from 'solarspell-react-lib';

import ContentActionPanel from './ContentActionPanel';
import { content, DLMSContent } from './MockData';

type MockContentTableProps = {

}

function MockContentTable(props: MockContentTableProps): React.ReactElement {
  const [stateContent, setStateContent] = React.useState(content);

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
    />
  )
}

export default MockContentTable;
