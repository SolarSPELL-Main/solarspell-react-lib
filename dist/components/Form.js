import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
//Importing from outside the project
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Importing from other files of the projects
import ConfirmationDialog from './ConfirmationDialog';
import { fullEvery } from '../utils';
/**
 * A generic form for submitting data.
 * Takes care of state, validation, and callback.
 * Displays fields in a descending order in a column.
 * Can be displayed in a dialog instead of in page body.
 * @param props The form content and callbacks.
 * @returns A form.
 */
function Form(props) {
    const [state, setState,] = React.useState({});
    const [reasons, setReasons,] = React.useState({});
    const [submitting, setSubmitting] = React.useState(false);
    // Setter factory functions
    const genericSetter = React.useCallback((name, val) => {
        setState(oldState => (Object.assign(Object.assign({}, oldState), { [name]: (val instanceof Function) ? val(oldState[name]) : val })));
    }, [setState]);
    const genericReasonSetter = React.useCallback((name, val) => {
        setReasons(oldState => (Object.assign(Object.assign({}, oldState), { [name]: (val instanceof Function) ? val(oldState[name]) : val })));
    }, [setReasons]);
    const stateSetter = React.useCallback((name) => genericSetter.bind(null, name), [setState, genericSetter]);
    // Performs validation on submission
    const onSubmit = React.useCallback(() => {
        if (!submitting) {
            // To enable async validation, assume all results are promises
            setSubmitting(true);
            const promises = props.fields.map(item => item.validator ?
                item.validator(state)
                :
                    null);
            Promise.all(promises).then(res => {
                const reasonDraft = {};
                // Check no reasons present
                const valid = fullEvery(res, (item, idx) => {
                    reasonDraft[props.fields[idx].field] = item;
                    return !item;
                });
                // State updates should come before external callbacks
                setSubmitting(false);
                setReasons(reasonDraft);
                if (valid) {
                    props.onSubmit(state);
                }
            });
        }
    }, [props.onSubmit, setState, setReasons, state, props.fields]);
    const formBody = (_jsx(Grid, Object.assign({ container: true }, { children: props.fields.map((item, idx) => {
            return (_jsx(Grid, Object.assign({ item: true, xs: 12, style: { marginBottom: '10px' } }, { children: item.component && _jsx(item.component, Object.assign({}, item.propFactory(state, reasons, stateSetter(item.field), genericSetter, genericReasonSetter)), void 0) }), idx));
        }) }), void 0));
    let finalRender = _jsx(_Fragment, {}, void 0);
    let deps = [];
    switch (props.type) {
        case 'dialog':
            deps = [props.open, props.initialState];
            finalRender = (_jsx(ConfirmationDialog, Object.assign({ onClose: (submitted) => {
                    // Form was submitted
                    if (submitted) {
                        // Submit with state
                        onSubmit();
                        // Form was closed
                    }
                    else {
                        // Submit with nothing
                        props.onSubmit();
                    }
                }, open: props.open, preventDefault: false, confirmAdditionalProps: {
                    endIcon: submitting && _jsx(CircularProgress, { size: '1em' }, void 0),
                } }, props.dialogStyle, { children: formBody }), void 0));
            break;
        default:
            deps = [props.initialState];
            finalRender = (_jsxs(_Fragment, { children: [formBody, _jsx(Button, Object.assign({ onClick: onSubmit }, { children: "Submit" }), void 0)] }, void 0));
            break;
    }
    // Initializes state with initial values and initial state
    // initialState takes priority over initialValue properties
    React.useEffect(() => {
        setState(Object.assign(props.fields.reduce((accum, val) => (Object.assign(Object.assign({}, accum), { [val.field]: val.initialValue })), {}), props.initialState));
        setReasons({});
    }, deps);
    return finalRender;
}
export default Form;
