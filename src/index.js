import React from "react";
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { legacy_createStore as createStore } from 'redux';
import './index.css';
import { Provider } from "react-redux";
import rootReducer from './reducers/index';

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