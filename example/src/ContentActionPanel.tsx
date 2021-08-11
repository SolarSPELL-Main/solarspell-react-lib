import React from 'react';

import { Edit, CheckCircleOutline, HighlightOff, Visibility } from '@material-ui/icons';

import {
  ActionPanel,
  ActionPanelItem,
} from 'solarspell-react-lib';
import MockEditContentModal from './MockEditContentModal';
import { DLMSContent } from './MockData';

type ContentActionPanelProps = {
  onEdit: (item: DLMSContent, vals: Partial<DLMSContent>) => void
  onToggleActive: (item: DLMSContent, active: boolean) => void
  content: DLMSContent
}

function ContentActionPanel({
  onEdit,
  onToggleActive,
  content,
}: ContentActionPanelProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const onEdit_ = React.useCallback(
    () => setOpen(true),
    [setOpen],
  );

  const onEditSubmit_ = React.useCallback(
    (vals?: Partial<DLMSContent>) => {
      setOpen(false);
      if (vals) {
        onEdit(content, vals);
      }
    },
    [onEdit, content, setOpen],
  );

  const onToggleActive_ = React.useCallback(
    (active, setActive) => {
      onToggleActive(content, active);
      setActive(active);
    },
    [onToggleActive, content],
  );

  const onView_ = React.useCallback(
    () => console.log('Viewed!'),
    [],
  );

  return (
    <>
      <MockEditContentModal
        open={open}
        content={content}
        onSubmit={onEditSubmit_}
      />
      <ActionPanel>
        <ActionPanelItem
          type={'button'}
          icon={Edit}
          onAction={onEdit_}
          tooltip={'Edit Content'}
        />
        <ActionPanelItem
          type={'toggle'}
          activeIcon={HighlightOff}
          inactiveIcon={CheckCircleOutline}
          toggle={onToggleActive_}
          tooltip={content.active ? 'Set inactive' : 'Set active'}
          active={content.active}
        />
        <ActionPanelItem
          type={'button'}
          icon={Visibility}
          onAction={onView_}
        />
      </ActionPanel>
    </>
  );
}

export default ContentActionPanel;
