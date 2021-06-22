import { ContentTagger } from 'solarspell-react-lib';

import { metadata, metadataTypes } from './MockData';

function MockTagger(): React.ReactElement {
    return (
        <ContentTagger
            metadataType={metadataTypes[0]}
            options={metadata[0]}
            creatable
            onCreate={(tags) => {
                return new Promise((res, rej) => {
                    res(
                        tags.map((tag, idx) => {
                            return {
                                name: tag.name.substring(5, tag.name.length - 1),
                                id: idx,
                                metadataType: metadataTypes[0],
                            };
                        })
                    );
                });
            }}
        />
    );
}

export default MockTagger;
