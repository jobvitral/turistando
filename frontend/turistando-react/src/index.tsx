import React from 'react';
import ReactDOM from 'react-dom';
import PrimeReact from 'primereact/utils';
import './index.css';
import App from './App';
import {HelperLogin} from "./helpers/helper-login";
import {HelperSessao} from "./helpers/helper-sessao";

// inicializa o ripple
PrimeReact.ripple = true;

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
