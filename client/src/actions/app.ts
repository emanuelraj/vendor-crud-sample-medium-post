import * as actions from '../global/actions'
import { action } from './util'

export const loadUserLogin = (filters: any) => action(actions.APP_LOAD_USER_LOGIN, filters)

export const userLogin = {
  request: () => action(actions.USER_LOGIN_REQUEST),
  success: (filters: any, response: any) =>
    action(actions.USER_LOGIN_SUCCESS, { filters, response }),
  failure: (filters:any , error:any) => action(actions.USER_LOGIN_FAILURE, { filters, error })
}

export const userLogout = () => action(actions.USER_LOGOUT_SUCCESS)
