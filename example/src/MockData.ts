import { BaseMetadata, BaseMetadataType } from 'solarspell-react-lib';

export const metadataTypes: BaseMetadataType[] = [
  {
    name: 'Language',
    id: 0,
  },
  {
    name: 'Subject',
    id: 1,
  },
];
  
export const metadata: Record<string, BaseMetadata[]> = {
  0: [
    {
      id: 0,
      name: 'English',
      metadataType: metadataTypes[0],
    },
    {
      id: 1,
      name: 'Spanish',
      metadataType: metadataTypes[0],
    },
  ],
  1: [
    {
      id: 2,
      name: 'Mathematics',
      metadataType: metadataTypes[1],
    },
    {
      id: 3,
      name: 'History',
      metadataType: metadataTypes[1],
    },
  ],
};
