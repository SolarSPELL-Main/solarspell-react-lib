import { jsx as _jsx } from "react/jsx-runtime";
//Importing from outside the project
import React from 'react';
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
    const [metadata, setMetadata] = React.useState(props.metadata);
    React.useEffect(() => {
        setMetadata(props.metadata);
    }, [props.metadata]);
    React.useEffect(() => {
        const toAdd = props.toAdd;
        if (!toAdd) {
            return;
        }
        setMetadata(oldState => {
            const keySet = new Set(Object.values(oldState).reduce((accum, val) => {
                return accum.concat(val.map(m => m.id));
            }, []));
            const newState = Object.entries(oldState).reduce((accum, [key, val]) => {
                var _a;
                const newMetadata = ((_a = toAdd[key]) !== null && _a !== void 0 ? _a : []).filter(metadata => !keySet.has(metadata.id));
                return Object.assign(Object.assign({}, accum), { [key]: val.concat(newMetadata) });
            }, {});
            Object.entries(toAdd).forEach(([key, val]) => {
                if (!(key in newState)) {
                    newState[key] = val;
                }
            });
            return newState;
        });
        const onSelect = props.actions.onSelect;
        if (onSelect) {
            Object.keys(toAdd).forEach(key => {
                const metadataType = props.metadataTypes.find(m => m.id === key);
                onSelect(metadataType, metadata[key]);
            });
        }
    }, [props.toAdd]);
    return (_jsx(Grid, Object.assign({ container: true, spacing: props.spacing }, { children: props.metadataTypes.map(metadataType => {
            var _a, _b, _c, _d;
            return (_jsx(Grid, Object.assign({ item: true, xs: (_a = props.width) !== null && _a !== void 0 ? _a : 12, style: { marginBottom: (_b = props.mb) !== null && _b !== void 0 ? _b : '10px' } }, { children: _jsx(ContentTagger, Object.assign({}, props.actions, { metadataType: metadataType, selected: (_c = metadata[metadataType.id]) !== null && _c !== void 0 ? _c : [], options: (_d = props.options[metadataType.id]) !== null && _d !== void 0 ? _d : [], label: metadataType.name }), void 0) }), metadataType.id));
        }) }), void 0));
}
export default ContentMetadata;
