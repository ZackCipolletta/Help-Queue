import React from "react";
import ReactDOM from 'react-dom';
import App from './components/App';
import { legacy_createStore as createStore } from 'redux';
import reducer from './reducers/ticket-list-reducer';
import './index.css';
import { Provider } from "react-redux";

const store = createStore(reducer);

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