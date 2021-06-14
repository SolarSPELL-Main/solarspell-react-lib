import React from 'react';
import { MetadataDisplay, BaseMetadata, BaseMetadataType } from 'solarspell-react-lib';
import DLMSActionPanel from './DLMSActionPanel';
import DLMSKebabMenu from './DLMSKebabMenu';

const metadataTypes: BaseMetadataType[] = [
  {
    name: 'Language',
    id: 0,
  },
  {
    name: 'Subject',
    id: 1,
  },
];

const metadata: Record<string, BaseMetadata[]> = {
  0: [
    {
      id: 0,
      name: 'English',
      type_id: 0,
      base_metadata_type: metadataTypes[0],
    },
    {
      id: 1,
      name: 'Spanish',
      type_id: 0,
      base_metadata_type: metadataTypes[0],
    },
  ],
  1: [
    {
      id: 2,
      name: 'Mathematics',
      type_id: 1,
      base_metadata_type: metadataTypes[1],
    },
    {
      id: 3,
      name: 'History',
      type_id: 1,
      base_metadata_type: metadataTypes[1],
    },
  ],
};

function MockMetadataTable(): React.ReactElement {
  const [metadataTypesState, setMetadataTypes] = React.useState(metadataTypes);
  const [metadataState, setMetadata] = React.useState(metadata);
  const [nextId, setnextId] = React.useState(4);

  function onEdit(metadata: BaseMetadata, newVal: string) {
    const metadataType: number = metadata.type_id;
    const metadataOfType: BaseMetadata[] = metadataState[metadataType];
    const newMetadata: Record<number, BaseMetadata[]> = {
      [metadata.type_id]: metadataOfType.filter(v => v.id !== metadata.id),
    };
    newMetadata[metadata.type_id].push(Object.assign({}, metadata, { name: newVal }));
    setMetadata(Object.assign({}, metadataState, newMetadata));
  }

  function onDelete(metadata: BaseMetadata) {
    const metadataType: number = metadata.type_id;
    const metadataOfType: BaseMetadata[] = metadataState[metadataType];
    const newMetadata: Record<number, BaseMetadata[]> = {
      [metadata.type_id]: metadataOfType.filter(v => v.id !== metadata.id),
    };
    setMetadata(Object.assign({}, metadataState, newMetadata));
  }

  function onAdd(type: BaseMetadataType, name: string) {
    const metadataOfType: BaseMetadata[] = metadataState[type.id];
    const newMetadata: Record<number, BaseMetadata[]> = {
      [type.id]: metadataOfType.concat([{
        name: name,
        id: nextId,
        type_id: type.id,
        base_metadata_type: type,
      }]),
    };
    setnextId(nextId + 1);
    setMetadata(Object.assign({}, metadataState, newMetadata));
  }

  function onEditType(type: BaseMetadataType, name: string) {
    const newMetadataTypes = metadataTypesState.slice();
    newMetadataTypes.find(v => v.id === type.id)!.name = name;
    setMetadataTypes(newMetadataTypes);
  }

  function onDeleteType(type: BaseMetadataType) {
    setMetadataTypes(metadataTypesState.filter(v => v.id !== type.id));
  }

  return (
    <div style={{ height: 'auto', width: '100%' }} >
      <MetadataDisplay
        metadataTypes={metadataTypesState}
        metadata={metadataState}
        tableProps={{
          components: {
            KebabMenu: DLMSKebabMenu,
            ActionPanel: DLMSActionPanel,
          },
          componentProps: {
            KebabMenu: {
              onAdd,
              onEditType,
              onDeleteType,
              onDownload: (type: BaseMetadataType) => console.log(type),
            },
            ActionPanel: {
              onEdit,
              onDelete,
            },
          },
        }}
      />
    </div>
  );
}

export default MockMetadataTable;
