import React from 'react';
import {
  MetadataDisplay,
  BaseMetadata,
  BaseMetadataType,
} from 'solarspell-react-lib';
import MetadataActionPanel from './MetadataActionPanel';
import MetadataKebabMenu from './MetadataKebabMenu';

import { metadata, metadataTypes } from './MockData';

function MockMetadataTable(): React.ReactElement {
  const [metadataTypesState, setMetadataTypes] = React.useState(metadataTypes);
  const [metadataState, setMetadata] = React.useState(metadata);
  const [nextId, setnextId] = React.useState(4);

  function onEdit(metadata: BaseMetadata, newVal: string) {
    const metadataType: number = metadata.metadataType.id;
    const metadataOfType: BaseMetadata[] = metadataState[metadataType];
    const newMetadata: Record<number, BaseMetadata[]> = {
      [metadata.metadataType.id]: metadataOfType.filter(v => v.id !== metadata.id),
    };
    newMetadata[metadata.metadataType.id].push(
      Object.assign({}, metadata, { name: newVal })
    );
    setMetadata(Object.assign({}, metadataState, newMetadata));
  }

  function onDelete(metadata: BaseMetadata) {
    const metadataType: number = metadata.metadataType.id;
    const metadataOfType: BaseMetadata[] = metadataState[metadataType];
    const newMetadata: Record<number, BaseMetadata[]> = {
      [metadata.metadataType.id]: metadataOfType.filter(v => v.id !== metadata.id),
    };
    setMetadata(Object.assign({}, metadataState, newMetadata));
  }

  function onAdd(type: BaseMetadataType, name: string) {
    const metadataOfType: BaseMetadata[] = metadataState[type.id];
    const newMetadata: Record<number, BaseMetadata[]> = {
      [type.id]: metadataOfType.concat([{
        name: name,
        id: nextId,
        metadataType: type,
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
            KebabMenu: MetadataKebabMenu,
            ActionPanel: MetadataActionPanel,
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
