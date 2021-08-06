import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import MetadataTable from './MetadataTable';
/**
 * This component creates multiple tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed.
 * @param props The data for the tables. The metadata should be a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
function MetadataDisplay(props) {
    return (_jsx(_Fragment, { children: props.metadataTypes.map(metadataType => {
            const metadata = props.metadata[metadataType.id];
            return (_jsx(MetadataTable, Object.assign({ metadataType: metadataType, metadata: metadata !== null && metadata !== void 0 ? metadata : [] }, props.tableProps), metadataType.id));
        }) }, void 0));
}
export default MetadataDisplay;
