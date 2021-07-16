import { __rest } from "tslib";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Button from '@material-ui/core/Button';
//Importing functions from other files of the projects
import GenericDialog from './GenericDialog';
/**
 * Creates a single-button dialog that will call a callback.
 * For the purposes of viewing something or alerting the user.
 * @param props The styling and functional properties of the dialog.
 * @returns A single-button dialog component.
 */
function ButtonDialog(_a) {
    var { size = 'md', buttonText = 'Close', buttonColor = 'secondary' } = _a, props = __rest(_a, ["size", "buttonText", "buttonColor"]);
    return (_jsx(GenericDialog, Object.assign({ title: props.title, description: props.description, size: size, open: props.open, onClose: props.onClose, actions: (_jsx(_Fragment, { children: _jsx(Button, Object.assign({ onClick: props.onClose, color: buttonColor }, props.buttonAdditionalProps, { children: buttonText }), void 0) }, void 0)), additionalProps: {
            fullWidth: true,
        } }, { children: props.children }), void 0));
}
export default ButtonDialog;
