import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { almacenamiento } from './redux/almacenamiento';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={almacenamiento}>
      <App />
    </Provider>

);
