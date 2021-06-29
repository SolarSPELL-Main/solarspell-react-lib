import { BaseMetadata, BaseMetadataType, BaseContent } from 'solarspell-react-lib';

export type DLMSContent = {
  duplicatable: boolean
  notes: string
  reviewDate: Date
  file?: File
} & BaseContent

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
  
export const metadata: Record<number, BaseMetadata[]> = {
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

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const content: DLMSContent[] = [
  {
    duplicatable: true,
    notes: 'Pretty good',
    reviewDate: yesterday,
    title: 'Content A',
    id: 0,
    description: 'Lorem ipsum, and additional latin gibberish',
    fileName: '',
    file: undefined,
    datePublished: '2025',
    copyright: 'Apache 2.0',
    rightsStatement: 'I hereby grant legal rights of this content to whoever',
    metadata: metadata,
  },
];
