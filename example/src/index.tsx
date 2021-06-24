import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// Disable Transitions for Strict Mode
// Also use unstable func to create MUI theme specific for Strict Mode
const theme = createMuiTheme({
  transitions: { create: () => 'none' },
});

ReactDOM.render(
  <React.StrictMode>
  <CssBaseline />
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <App />
    </MuiPickersUtilsProvider>
  </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
