// @flow
import {
  LATLONG_TO_LATLONG_INIT,
  LATLONG_TO_LATLONG_SUCCESS,
  LATLONG_TO_LATLONG_FAILURE
} from 'actions';

const initialState = {
  fetchingLatLongToLatLong: false,
  latLongToLatLongData: null
};

export default function profile(state: any = initialState, action: any) {
  switch (action.type) {
    case LATLONG_TO_LATLONG_SUCCESS: {
      return { ...state, latLongToLatLongData: action.data };
    }
    default:
      return state;
  }
}
