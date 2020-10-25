import { all, fork } from 'redux-saga/effects';

import threat from './threat';

export default function* root() {
  yield all([fork(threat)]);
}
