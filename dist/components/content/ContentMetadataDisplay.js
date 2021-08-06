import { jsx as _jsx } from "react/jsx-runtime";

import Grid from '@material-ui/core/Grid';

import ContentTagger from './ContentTagger';
/**
 * This component displays all the metadata of content.
 * It also provides the ability to edit such tags.
 * Internally, it creates ContentTagger components, one
 * for each metadata type in its props.
 * @param props The context and callbacks of the component.
 * @returns A display for all content metadata.
 */
function ContentMetadata(props) {
    return (_jsx(Grid, Object.assign({ container: true, spacing: props.spacing }, { children: props.metadataTypes.map(metadataType => {
            var _a, _b, _c, _d, _e;
            return (_jsx(Grid, Object.assign({ item: true, xs: (_a = props.width) !== null && _a !== void 0 ? _a : 12, style: { marginBottom: (_b = props.mb) !== null && _b !== void 0 ? _b : '10px' } }, { children: _jsx(ContentTagger, Object.assign({}, props.actions, { metadataType: metadataType, selected: (_c = props.metadata[metadataType.id]) !== null && _c !== void 0 ? _c : [], toAdd: (_d = props.toAdd) === null || _d === void 0 ? void 0 : _d[metadataType.id], options: (_e = props.options[metadataType.id]) !== null && _e !== void 0 ? _e : [], label: metadataType.name }), void 0) }), metadataType.id));
        }) }), void 0));
}
export default ContentMetadata;
