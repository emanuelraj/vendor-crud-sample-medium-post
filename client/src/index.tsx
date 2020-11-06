import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/fonts/stylesheet.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './config/store';
import rootSaga from './sagas';
import { StoreContext } from 'redux-react-hook';
import "antd/dist/antd.css";

const { store, runSaga } = configureStore();
runSaga(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <StoreContext.Provider value={store}>
      <div className="App">
        <App history={history} />
      </div>
    </StoreContext.Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
