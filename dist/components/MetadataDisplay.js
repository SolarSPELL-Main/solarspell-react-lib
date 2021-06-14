import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import MetadataTable from './MetadataTable';
/**
 * This component creates multiple expandable tabs containg tables for each metadata type.
 * Only the types in metadataTypes will be displayed, even if metadata contains additional types.
 * @param props The data for the tables. The metadata should be organized in a dictionary
 *        mapping metadata type IDs (not names!) to metadata arrays.
 * @returns A series of expandable panels containing the metadata in tables.
 */
function MetadataDisplay(props) {
    return (_jsx(_Fragment, { children: props.metadataTypes.map(metadataType => {
            return (_jsx(MetadataTable, Object.assign({ metadataType: metadataType, metadata: props.metadata[metadataType.id] }, props.tableProps), metadataType.id));
        }) }, void 0));
}
export default MetadataDisplay;
