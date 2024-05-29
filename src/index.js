import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import {BrowserRouter} from 'react-router-dom'
import { createTheme ,ThemeProvider } from '@mui/material/styles';
 const themeOptions =createTheme ({
  palette: {
    mode: 'light',
    primary: {
      main: '#808000',
      contrastText: 'rgba(18,11,11,0.87)',
      dark: 'rgba(128,0,128,0)',
      light: '#808000',
    },
    secondary: {
      main: '#808000',
      light: '#808000',
      dark: '#808000',
      contrastText: '#808000',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={themeOptions}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
   </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
