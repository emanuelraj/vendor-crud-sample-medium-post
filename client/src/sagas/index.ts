import { all, fork } from 'redux-saga/effects';

import threat from './threat';
import app from './app';

export default function* root() {
  yield all([fork(threat),fork(app)]);
}
