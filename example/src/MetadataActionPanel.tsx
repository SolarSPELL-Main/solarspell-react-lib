import React from 'react';
import {
  ActionPanel,
  ActionPanelItem,
  BaseMetadata,
  BaseMetadataType
} from 'solarspell-react-lib';
import { Edit, Delete } from '@material-ui/icons';

type MetadataActionPanelProps = {
  onEdit: (item: BaseMetadata, val: string) => void
  onDelete: (item: BaseMetadata) => void
  metadata: BaseMetadata
  metadataType: BaseMetadataType
}

function MetadataActionPanel({
  onEdit,
  onDelete,
  metadata,
  metadataType,
}: MetadataActionPanelProps): React.ReactElement {
  const onAction = React.useCallback(
    (val: string) => onEdit(metadata, val),
    [onEdit, metadata],
  );
  const onDelete_ = React.useCallback(
    () => onDelete(metadata),
    [onDelete, metadata],
  );

  return (
  <ActionPanel>
    <ActionPanelItem
      type={'text_input'}
      tooltip={'Edit'}
      icon={Edit}
      onAction={onAction}
      textInputTitle={`Edit Metadata ${metadata.name}`}
      textInputLabel={'Metadata Name'}
      textInputDefaultValue={metadata.name}
      allowEnter
    />
    <ActionPanelItem
      type={'confirm'}
      tooltip={'Delete'}
      icon={Delete}
      onAction={onDelete_}
      confirmationTitle={`Delete Metadata item ${metadata.name} of type ${metadataType.name}?`}
      confirmationDescription={'WARNING: Deleting a metadata will also delete each of that metadata on every content and is irreversible.'}
    />
  </ActionPanel>
  );
}

export default MetadataActionPanel;
