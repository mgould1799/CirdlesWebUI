// @flow
import {
  LATLNG_TO_LATLNG_INIT,
  LATLNG_TO_LATLNG_SUCCESS,
  LATLNG_TO_LATLNG_FAILURE
} from 'actions';

const initialState = {
  latLngToLatLngData: null
};

export default function profile(state: any = initialState, action: any) {
  switch (action.type) {
    case LATLNG_TO_LATLNG_SUCCESS: {
      return { ...state, latLngToLatLngData: action.data };
    }
    default:
      return state;
  }
}
