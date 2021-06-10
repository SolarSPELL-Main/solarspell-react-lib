import React from 'react';
import { KebabMenu, KebabMenuItem, BaseMetadataType } from 'solarspell-react-lib';

type DLMSKebabMenuProps = {
  onAdd: (type: BaseMetadataType, val: string) => void
  onEditType: (type: BaseMetadataType, val: string) => void
  onDeleteType: (type: BaseMetadataType) => void
  onDownload: (type: BaseMetadataType) => void
  metadataType: BaseMetadataType
}

function DLMSKebabMenu(props: DLMSKebabMenuProps): React.ReactElement {
  const onAdd = React.useCallback(props.onAdd.bind(null, props.metadataType), [props.onAdd, props.metadataType]);
  const onEditType = React.useCallback(props.onEditType.bind(null, props.metadataType), [props.onAdd, props.metadataType]);
  const onDeleteType = React.useCallback((confirmation: string) => {
    if (confirmation === props.metadataType.name) {
      props.onDeleteType(props.metadataType);
    }
  }, [props.onDeleteType, props.metadataType]);
  const onDownload = React.useCallback(props.onDownload.bind(null, props.metadataType), [props.onDownload, props.metadataType]);

  return (
    <KebabMenu>
      <KebabMenuItem
        type={'text_input'}
        label={'Add Metadata'}
        onAction={onAdd}
        textInputTitle={`Create a new Metadata of type ${props.metadataType.name}`}
        textInputLabel={'Metadata Name'}
        submitButtonText={'Create'}
      />
      <KebabMenuItem
        type={'text_input'}
        label={'Edit Metadata Type'}
        onAction={onEditType}
        textInputTitle={`Edit Metadata Type ${props.metadataType.name}`}
        textInputLabel={'Metadata Type Name'}
        textInputSize={'xs'}
      />
      <KebabMenuItem
        type={'text_input'}
        label={'Delete Metadata Type'}
        onAction={onDeleteType}
        textInputTitle={`Delete Metadata Type ${props.metadataType.name}`}
        textInputDescription={`WARNING: Deleting a metadata type will also delete all metadata of that type and is irreversible. Enter "${props.metadataType.name}" to confirm deletion`}
        textInputLabel={`Enter "${props.metadataType.name}" here to confirm deletion`}
        submitButtonColor={'secondary'}
        cancelButtonColor={'primary'}
        textInputSize={'md'}
      />
      <KebabMenuItem
        type={'button'}
        label={'Download Spreadsheet'}
        onAction={onDownload}
      />
    </KebabMenu>
  );
}

export default DLMSKebabMenu;
