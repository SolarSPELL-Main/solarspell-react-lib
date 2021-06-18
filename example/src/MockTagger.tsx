import { ContentTagger } from 'solarspell-react-lib';

import { metadata, metadataTypes } from './MockData';

function MockTagger(): React.ReactElement {
    return (
        <ContentTagger
            metadataType={metadataTypes[0]}
            options={metadata[0]}
        />
    );
}

export default MockTagger;
