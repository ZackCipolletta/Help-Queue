import React from "react";
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from "react-redux";
import rootReducer from './reducers/index';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

const store = createStore(rootReducer);

store.subscribe(() =>
  console.log(store.getState())
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>
);