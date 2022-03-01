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
            var _a, _b, _c;
            const metadata = props.metadata[metadataType.id];
            return (_jsx(MetadataTable, Object.assign({ metadataType: metadataType, 
                /** Syntax ? */
                metadata: metadata !== null && metadata !== void 0 ? metadata : [] }, props.tableProps, { paginationProps: {
                    onPageSizeChange: (params) => {
                        var _a;
                        /** Syntax ?. */
                        return (_a = props.paginationProps) === null || _a === void 0 ? void 0 : _a.dispatch(props.paginationProps.update({
                            id: metadataType.id,
                            pageSize: params.pageSize,
                            page: params.page,
                            rowCount: params.total,
                        }));
                    },
                    onPageChange: (params) => {
                        var _a;
                        return (_a = props.paginationProps) === null || _a === void 0 ? void 0 : _a.dispatch(props.paginationProps.update({
                            id: metadataType.id,
                            page: params.page,
                            rowCount: params.total,
                        }));
                    },
                    pageSize: (_a = props.paginationProps) === null || _a === void 0 ? void 0 : _a.pageSize(metadataType.id),
                    page: (_b = props.paginationProps) === null || _b === void 0 ? void 0 : _b.page(metadataType.id),
                    rowCount: (_c = props.paginationProps) === null || _c === void 0 ? void 0 : _c.rowCount(metadataType.id),
                } }), metadataType.id));
        }) }, void 0));
}
export default MetadataDisplay;
