import * as actions from '../global/actions';
import _ from 'lodash';
import Threat from '../models/Threat';

const initState = {
  threats: null,
  total: 0,
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
      const threats = [...state.threats]
      threats.push(action.response);
      return {
        ...state,
        loadingCreateThreat: false,
        threats
      };
    case actions.THREATS_LOAD_REQUEST:
      return {
        ...state,
        loadingThreatsFetch: true
      };
    case actions.THREATS_LOAD_SUCCESS:
      return {
        ...state,
        loadingThreatsFetch: false,
        threats: action.response.threats,
        total: action.response.total
      };
    case actions.THREAT_DELETE_REQUEST:
      return {
        ...state,
        loadingDeleteThreat: true
      };
    case actions.THREAT_DELETE_SUCCESS:
      state.threats = state.threats.filter(
        (threat: any) => threat.id !== action.id
      );
      return {
        ...state,
        loadingDeleteThreat: false,
        threats: state.threats
      };
    case actions.THREAT_UPDATE:
      return {
        ...state,
        loadingUpdateThreat: true
      };
    case actions.THREAT_UPDATE_SUCCESS:
      debugger
      const {id} = action.response;
      const newThreat = action.response;
      const index = _.findIndex(state.threats, {id});
      state.threats[id] = newThreat;
      return {
        ...state,
        loadingUpdateThreat: false,
        threats: [...state.threats]
      };
    default:
      return state;
  }
}
