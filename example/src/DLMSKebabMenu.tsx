import React from 'react';
import { KebabMenu, KebabMenuItem, BaseMetadataType } from 
                                                      'solarspell-react-lib';

type DLMSKebabMenuProps = {
  onAdd: (type: BaseMetadataType, val: string) => void
  onEditType: (type: BaseMetadataType, val: string) => void
  onDeleteType: (type: BaseMetadataType) => void
  onDownload: (type: BaseMetadataType) => void
  metadataType: BaseMetadataType
}

function DLMSKebabMenu({
  onAdd,
  onEditType,
  onDeleteType,
  onDownload,
  metadataType,
}: DLMSKebabMenuProps): React.ReactElement {
  const onAdd_ = React.useCallback((val: string) => onAdd(metadataType, val), 
                                                        [onAdd, metadataType]);
  const onEditType_ = React.useCallback((val: string) => 
                    onEditType(metadataType, val), [onEditType, metadataType]);
  const onDeleteType_ = React.useCallback((confirmation: string) => {
    if (confirmation === metadataType.name) {
      onDeleteType(metadataType);
    }
  }, [onDeleteType, metadataType]);
  const onDownload_ = React.useCallback(() => onDownload(metadataType), 
                                                    [onDownload, metadataType]);

  return (
    <KebabMenu>
      <KebabMenuItem
        type={'text_input'}
        label={'Add Metadata'}
        onAction={onAdd_}
        textInputTitle={`Create a new Metadata of type ${metadataType.name}`}
        textInputLabel={'Metadata Name'}
        submitButtonText={'Create'}
      />
      <KebabMenuItem
        type={'text_input'}
        label={'Edit Metadata Type'}
        onAction={onEditType_}
        textInputTitle={`Edit Metadata Type ${metadataType.name}`}
        textInputLabel={'Metadata Type Name'}
        textInputSize={'xs'}
      />
      <KebabMenuItem
        type={'text_input'}
        label={'Delete Metadata Type'}
        onAction={onDeleteType_}
        textInputTitle={`Delete Metadata Type ${metadataType.name}`}
        textInputDescription={`WARNING: Deleting a metadata type will also delete all metadata of that type and is irreversible. Enter "${metadataType.name}" to confirm deletion`}
        textInputLabel={`Enter "${metadataType.name}" here to confirm deletion`}
        submitButtonColor={'secondary'}
        cancelButtonColor={'primary'}
        textInputSize={'md'}
      />
      <KebabMenuItem
        type={'button'}
        label={'Download Spreadsheet'}
        onAction={onDownload_}
      />
    </KebabMenu>
  );
}

export default DLMSKebabMenu;