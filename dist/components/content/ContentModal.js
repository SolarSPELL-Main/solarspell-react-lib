import { jsx as _jsx } from "react/jsx-runtime";
//Importing from other files of the projects
import Form from '../Form';
/**
 * The modal for adding/editing content.
 * Takes care of state, validation, and callback.
 * @param props The form content and callbacks.
 * @returns A modal for content, displayed in a dialog.
 */
function ContentModal(props) {
    return (_jsx(Form, Object.assign({}, props, { fields: props.fields.concat(
        // Add default value for content ID
        [{ field: 'id', initialValue: -1 }]), type: 'dialog' }), void 0));
}
export default ContentModal;
