import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsx(_Fragment, { children: props.metadataTypes.map(metadataType => {
            var _a, _b;
            return (_jsx(Grid, Object.assign({ item: true, xs: 12, style: { marginBottom: '10px' } }, { children: _jsx(ContentTagger, Object.assign({}, props.actions, { metadataType: metadataType, selected: (_a = props.metadata[metadataType.id]) !== null && _a !== void 0 ? _a : [], options: (_b = props.options[metadataType.id]) !== null && _b !== void 0 ? _b : [], label: metadataType.name }), void 0) }), metadataType.id));
        }) }, void 0));
}
export default ContentMetadata;
