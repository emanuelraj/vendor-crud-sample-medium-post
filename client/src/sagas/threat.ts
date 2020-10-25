import { delay, put, call, takeEvery } from 'redux-saga/effects';
import * as actionType from '../global/actions';
import actions from '../actions/threat';
import { apiCalls } from '../global/Api';
import { toast } from 'react-toastify';

/** *************************** Subroutines ************************************/
function* createThreat(option: any) {
  const { title, classification, impact, likelihood } = option;
  yield put(actions.createThreatRequest({ title, classification, impact, likelihood }));
  try {
    const { response, error } = yield call(apiCalls.createThreat, {
      title, classification, impact, likelihood
    });
    if (response) {
      yield put(actions.createThreatSuccess(response));
      toast.success('Item created successfully!');
    } else {
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.createThreat({ title, classification, impact, likelihood }));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

function* deleteItem(option: any) {
  const { id: id } = option;
  yield put(actions.deleteThreatRequest());
  try {
    const { response, error } = yield call(apiCalls.deleteThreat, {
      id
    });
    if (response) {
      yield put(actions.deleteThreatSuccess(response, id));
      toast.success('Item deleted successfully!');
    } else {
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.deleteThreat({ id }));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

function* updateThreat(option: any) {
  const { id, title, classification, impact, likelihood } = option;
  yield put(actions.updateThreatRequest({id, title, classification, impact, likelihood}));
  try {
    const { response, error } = yield call(apiCalls.updateThreat, {id, title, classification, impact, likelihood});
    if (response) {
      yield put(actions.updateThreatSuccess(response));
      toast.success('updated successfully!');
    } else {
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.updateThreat({id, title, classification, impact, likelihood}));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

function* loadThreats(option: any) {
  yield put(actions.loadThreatsRequest());
  const { listId } = option;
  try {
    const { response, error } = yield call(apiCalls.loadThreats, { id: listId });
    if (response) {
      yield put(actions.loadThreatsSuccess(response));
    } else {
      if (error.message === 'list not found.') {
        toast.error(`We couldn't find the list! please make a new one.`);
        // history.push('/');
        return;
      }
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.loadThreats({ listId }));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}
/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/
export default function* watchJob() {
  yield takeEvery(actionType.THREAT_CREATE, createThreat);
  yield takeEvery(actionType.THREAT_DELETE, deleteItem);
  yield takeEvery(actionType.THREAT_UPDATE, updateThreat);
  yield takeEvery(actionType.THREATS_LOAD, loadThreats);
}
