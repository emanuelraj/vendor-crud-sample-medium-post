import * as actions from '../global/actions'
import { action } from './util'

export const userLogin = {
  login: (option: object) => action(actions.USER_LOGIN, option),
  request: () => action(actions.USER_LOGIN_REQUEST),
  success: (response: any) =>
    action(actions.USER_LOGIN_SUCCESS, { response }),
  failure: (error:any) => action(actions.USER_LOGIN_FAILURE, { error })
}

export const userSignup = {
  signup: (option: object) => action(actions.USER_SIGNUP, option),
  request: () => action(actions.USER_SIGNUP_REQUEST),
  success: (response: any) =>
    action(actions.USER_SIGNUP_SUCCESS, { response }),
  failure: (error:any) => action(actions.USER_SIGNUP_FAILURE, { error })
}

export const userLogout = () => action(actions.USER_LOGOUT)
