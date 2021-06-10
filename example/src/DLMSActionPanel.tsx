import React from 'react';
import { ActionPanel, ActionPanelItem, BaseMetadata, BaseMetadataType } from 'solarspell-react-lib';
import { Edit, Delete } from '@material-ui/icons';

type DLMSActionPanelProps = {
  onEdit: (item: BaseMetadata, val: string) => void
  onDelete: (item: BaseMetadata) => void
  metadata: BaseMetadata
  metadataType: BaseMetadataType
}

function DLMSActionPanel(props: DLMSActionPanelProps): React.ReactElement {
  const onAction = React.useCallback(props.onEdit.bind(null, props.metadata), [props.onEdit, props.metadata]);
  const onDelete = React.useCallback(props.onDelete.bind(null, props.metadata), [props.onDelete, props.metadata]);

  return (
    <ActionPanel>
      <ActionPanelItem
        type={'text_input'}
        tooltip={'Edit'}
        icon={Edit}
        onAction={onAction}
        textInputTitle={`Edit Metadata ${props.metadata.name}`}
        textInputLabel={'Metadata Name'}
      />
      <ActionPanelItem
        type={'confirm'}
        tooltip={'Delete'}
        icon={Delete}
        onAction={onDelete}
        confirmationTitle={`Delete Metadata item ${props.metadata.name} of type ${props.metadataType.name}?`}
        confirmationDescription={'WARNING: Deleting a metadata will also delete each of that metadata on every content and is irreversible.'}
      />
    </ActionPanel>
  );
}

export default DLMSActionPanel;
