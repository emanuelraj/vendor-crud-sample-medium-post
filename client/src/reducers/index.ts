import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import list from './list';

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    listStore: list
  });
