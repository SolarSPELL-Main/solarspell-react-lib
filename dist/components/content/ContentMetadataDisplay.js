import { jsx as _jsx } from "react/jsx-runtime";
import Grid from '@material-ui/core/Grid';
//Importing from other files of the projects
import ContentTagger from './ContentTagger';
/**
 * This component displays all the metadata of content.
 * It also provides the ability to edit such tags.
 * @param props The context and callbacks of the component.
 * @returns A display for all content metadata.
 */
function ContentMetadata(props) {
    return (_jsx(Grid, Object.assign({ container: true, spacing: props.spacing }, { children: props.metadataTypes.map(metadataType => {
            var _a, _b, _c;
            return (_jsx(Grid, Object.assign({ item: true, xs: (_a = props.width) !== null && _a !== void 0 ? _a : 12, style: { marginBottom: '10px' } }, { children: _jsx(ContentTagger, Object.assign({}, props.actions, { metadataType: metadataType, selected: (_b = props.metadata[metadataType.id]) !== null && _b !== void 0 ? _b : [], options: (_c = props.options[metadataType.id]) !== null && _c !== void 0 ? _c : [], label: metadataType.name }), void 0) }), metadataType.id));
        }) }), void 0));
}
export default ContentMetadata;
