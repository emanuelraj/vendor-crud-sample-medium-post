// all actions for items
import * as actions from '../global/actions';
import { action } from './util';

export default {
  loadThreats: (option: object) => action(actions.THREATS_LOAD, option),
  loadThreatsRequest: () => action(actions.THREATS_LOAD_REQUEST),
  loadThreatsSuccess: (response: any) =>
    action(actions.THREATS_LOAD_SUCCESS, { response }),

  createThreat: (option: object) => action(actions.THREAT_CREATE, option),
  createThreatRequest: (option: object) =>
    action(actions.THREAT_CREATE_REQUEST, option),
  createThreatSuccess: (response: any) =>
    action(actions.THREAT_CREATE_SUCCESS, { response }),

  deleteThreat: (option: object) => action(actions.THREAT_DELETE, option),
  deleteThreatRequest: () => action(actions.THREAT_DELETE_REQUEST),
  deleteThreatSuccess: (response: any, id: string) =>
    action(actions.THREAT_DELETE_SUCCESS, { response, id }),

  updateThreat: (option: object) => action(actions.THREAT_UPDATE, option),
  updateThreatRequest: (option: object) =>
    action(actions.THREAT_UPDATE_REQUEST, { option }),
    updateThreatSuccess: (response: any) =>
    action(actions.THREAT_UPDATE_SUCCESS, { response }),
};
