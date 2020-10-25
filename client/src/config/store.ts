// redux store configuration
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from '../reducers';

const isProd = process.env.NODE_ENV === 'production';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      isProd
        ? applyMiddleware(...middlewares)
        : composeWithDevTools(applyMiddleware(...middlewares))
    )
  );

  const runSaga = sagaMiddleware.run;
  const close = () => store.dispatch(END);
  return { store, runSaga, close };
}
