import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";

// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


ReactDOM.render(
    <BrowserRouter>
         <App />
    </BrowserRouter>  ,
    document.getElementById('root')
);
serviceWorker.unregister();
