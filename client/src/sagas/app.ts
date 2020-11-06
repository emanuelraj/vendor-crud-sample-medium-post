import { delay, put, call, takeEvery } from 'redux-saga/effects';
import * as actionType from '../global/actions';
import {userSignup, userLogin } from '../actions/app';
import { apiCalls } from '../global/Api';
import { toast } from 'react-toastify';
import { history } from '../config/store';

/** *************************** Subroutines ************************************/
function* login(option: any) {
    const { email, password } = option;
    yield put(userLogin.request());
    try {
      debugger;
      const { response, error } = yield call(apiCalls.userLogin, {
        email, password
      });
      debugger;
      if (response) {
        yield put(userLogin.success(response));
        localStorage.setItem('token', response.token);
        history.push('/')
      } else {
        toast.error(`we are gonna retry because of ${error.message}`);
        yield delay(5000);
        yield put(userLogin.failure(response));
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  }

function* signup(option: any) {
    const { email, password } = option;        
    yield put(userSignup.request());
    debugger;
    try {
      const { response, error } = yield call(apiCalls.userSignup, {
        email, password
      });
      debugger;
      if (response) {
        yield put(userSignup.success(response));
      } else {
        toast.error(`we are gonna retry because of ${error.message}`);
        yield delay(5000);
        yield put(userSignup.failure(response));
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  }

  function* logout(option: any) {
    yield localStorage.removeItem('token');
    history.push('/')
  }

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/
export default function* watchJob() {
    yield takeEvery(actionType.USER_LOGIN, login);
    yield takeEvery(actionType.USER_SIGNUP, signup);
    yield takeEvery(actionType.USER_LOGOUT, logout);
  }