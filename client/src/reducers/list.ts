import * as actions from '../global/actions';
import _ from 'lodash';
import Threat from '../models/Threat';

const initState = {
  threats: null,
  loadingThreatsFetch: false,
  loadingCreateThreat: false,
  loadingDeleteThreat: false,
  loadingUpdateThreat: false
};

export default function(state: any = initState, action: any = {}) {
  switch (action.type) {
    case actions.THREAT_CREATE_REQUEST:
      return {
        ...state,
        loadingCreateThreat: true
      };
    case actions.THREAT_CREATE_SUCCESS:
      ({
        response: {  }
      } = action);
      return {
        ...state,
        loadingCreateThreat: false
      };
    case actions.THREATS_LOAD_REQUEST:
      return {
        ...state,
        loadingThreatsFetch: true
      };
    case actions.THREATS_LOAD_SUCCESS:
      ({
        response: { }
      } = action);
      return {
        ...state,
        loadingThreatsFetch: false
      };
    case actions.THREAT_DELETE_REQUEST:
      return {
        ...state,
        loadingDeleteThreat: true
      };
    case actions.THREAT_DELETE_SUCCESS:
      return {
        ...state,
        loadingDeleteThreat: false
      };
    case actions.THREAT_UPDATE:
      return {
        ...state,
        loadingUpdateThreat: true
      };
    case actions.THREAT_UPDATE_SUCCESS:
      return {
        ...state,
        loadingUpdateThreat: false
      };
    default:
      return state;
  }
}
